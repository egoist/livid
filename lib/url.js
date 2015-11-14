const qs = require('qs')

module.exports = function (segment, query) {
  query = query ? qs.stringify(query) : ''
  return `http://cn.v2ex.com/api/${segment}.json?${query}`
}
