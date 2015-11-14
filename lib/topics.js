'use strict'
const fetch = require('node-fetch')
const co = require('co')
const Table = require('cli-table2')
const colors = require('colors')
const url = require('./url')
const logUpdate = require('log-update')
const inq = require('inquirer')
const log = require('typelog')

function ask (q) {
  return new Promise((resolve, reject) => {
    inq.prompt(q, a => {
      resolve(a)
    })
  })
}

module.exports = function run (type) {
  co(function* () {
    logUpdate('fetching topics...')
    const api = url(`topics/${type === 'recent' ? 'latest' : type}`)
    const data = yield fetch(api).then(data => data.json())
    const table = new Table({
      colWidths: [3,30,30]
    })
    const topics = []
    data.map((d, i) => {
      topics.push(d.id)
      table.push({[i.toString().cyan]: [d.title.green, `http://v2ex.com/t/${d.id}`]})
    })
    logUpdate.clear()
    console.log('\n', `${type === 'recent' ? '最新主题' : '今日热门'}`.rainbow, '\n\n')
    console.log(table.toString(), '\n')
    const askForNumber = [
      {
        type: 'input',
        name: 'number',
        message: '输入帖子楼层号继续阅读 (Ctrl+C 来退出):',
        validate (val) {
          return /\d/.test(val)
        }
      }
    ]
    const answer = yield ask(askForNumber)
    const id = topics[parseInt(answer.number)]
    if (id) {
      const topic = yield fetch(url('topics/show', { id })).then(data => data.json()).then(data => data[0])
      console.log('\n', topic.title.rainbow, '\n')
      console.log('\n', topic.content, '\n')
      const askForReturn = [
        {
          type: 'confirm',
          default: true,
          name: 'return',
          message: '是否返回帖子列表页面:'
        }
      ]
      const returnToMain = yield ask(askForReturn)
      if (returnToMain.return) {
        run(type)
      }
    } else {
      log.error('你没有输入一个正确的楼层号')
    }
  }).catch(err => console.log(err))
}
