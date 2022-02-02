const fs    = require('fs');
const express    = require('express');
const app        = express();
const http       = require('http');
const server     = http.createServer(app);
const { Server } = require("socket.io");
const ss = require('socket.io-stream');
const io         = new Server(server);

let bodyParser = require('body-parser')
let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })

module.export = module.exports  =  function (configData){
  let defaults =  {
  }

  let config = {...configData, ...defaults}

  if (!config.secretKey)
      throw new Error("Please provide secretKey")

  app.use(urlencodedParser);
  app.use(jsonParser);

  app.get('/_status', (req, res) => {
    res.json({ status: true })
  });

  app.get('*', (req, res) => {
    let url     = req.url
    let method  = req.method
    let headers = req.headers
    let body    = req.body
    let query   = req.query
    let ip   = req.socket.remoteAddress

    console.log(`${method} ${url} ${ip}`)

    ss(_socket).emit('request',
        {
      ip,
      url,
      method,
      headers,
      body,
      query
    },
        function (response,data) {
            console.log("Complete " +url)
            res.statusCode = data.status
            res.set(data.headers)
            response.pipe(res)
          }
        );

  });

  app.post('*', (req, res) => {

    let url     = req.url
    let method  = req.method
    let headers = req.headers
    let body    = req.body
    let query   = req.query
    let ip   = req.socket.remoteAddress

    console.log(`${method} ${url} ${ip}`)

    _socket.emit('request', {
      ip,
      url,
      method,
      headers,
      body,
      query
    }, function (response) {
      res.statusCode = response.status
      res.set(response.headers)
      res.send(response.content)
    })
  });

  app.options('*', (req, res) => {
    let url     = req.url
    let method  = req.method
    let headers = req.headers
    let body    = req.body
    let query   = req.query
    let ip   = req.socket.remoteAddress
    console.trace(`${method} ${url} ${ip}`)
  });

  let _socket = null

  io.use((socket,next)=>{
    if (socket.client.conn.request._query.secret_key !== config.secretKey){
      console.warn("Socket tried to connect with wrong secret key !")
      return  socket.disconnect()
    }
    next()
  })

  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    _socket = socket
  });

  return   server

}
