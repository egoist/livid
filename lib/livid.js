const topics = require('./topics')

module.exports = function (args, flags) {
  switch (args[0]) {
    case 'hot':
    case 'recent':
      topics(args[0])
      break
    default:
      console.log('Bad Options:', args)
      return
  }
}
