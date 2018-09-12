const express = require('express')
const opn = require('opn')
const server = express()
const port = 3000
server.use('', express.static('./dist'))
server.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
  opn(uri)
})