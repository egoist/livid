#!/usr/bin/env node
'use strict';
const meow = require('meow')
const livid = require('./lib/livid')
const update = require('update-notifier')
const help = require('./help')

const cli = meow(help, {
    alias: {
        v: 'version',
        h: 'help'
    }
})
const notifier = update({pkg: cli.pkg})
notifier.notify()
livid(cli.input, cli.flags)
