# socket-io-reverse-proxy-server

## Features
Helps developers to reverse proxy their localhost via socket.io on on aws, heroku or any server can run node.js
Uses socket.io to make a one way reverse proxy
## Requirements
- any cloud or dedicated server can run Node.js installed with [Reverse proxy publisher server](https://github.com/msacar/socket-io-reverse-proxy-server) (which is going to be our publicly reachable server)
- a [Reverse proxy backend server](https://github.com/msacar/socket-io-proxy-backend) (which is make a connection from localhost to proxy server and serve our localhost)

This project works with a [Reverse proxy backend server](https://github.com/msacar/socket-io-proxy-backend)
## How to use

Sample Publisher Server Code:

```js
const proxyServer  = require('socket-io-reverse-proxy-server')
const proxyPublisherServer = proxyServer({
    secretKey:"very_secret_key"
})

proxyPublisherServer.listen(80,(e)=>{
    console.log("Proxy Publisher server running and waiting for socket-io-proxy-backend's connection.")
})
```

Sample Localhost Server Code:

```js
const proxyBackend  = require('socket-io-reverse-proxy-server')

const proxyBackendClient =  proxyBackend({
    //its your localhost
    server :"http://localhost",//its default
    port : 80, //its default
    //secret key for authentication with proxy publisher server
    secretKey: "very_secret_key",
})
//Publish localhost to cloud
const socket  = proxyBackendClient.publish({
    //its your cloud server
    server : "http://ec2-3-120-246-199.eu-central-1.compute.amazonaws.com/", // our cloud server's publicly reachable address
    port : 80  //its default
})
```


## Installation

```bash
// with npm
npm install socket-io-reverse-proxy-server

```

## License

[MIT](LICENSE)
