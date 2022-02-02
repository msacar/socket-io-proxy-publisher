# socket-io-reverse-proxy-server

## Features
Helps developers to reverse proxy their localhost via socket.io on on aws, heroku or any server can run node.js
Uses socket.io to make a one way reverse proxy
## Requirements
- a Node.js server (any server can run node.js which is going to be our publicly reachable server)
- a [Localhost proxy client](https://github.com/msacar/socket-io-proxy-localhost) (which is make a connection from localhost to proxy server and serve our localhost)

This project works with a [Localhost proxy client](https://github.com/msacar/socket-io-proxy-localhost)
## How to use

Sample Publisher Server Code:

```js
const proxyServer  = require('msacar/socket-io-proxy-publisher')
const proxyPublisherServer = proxyServer({
    secretKey:"very_secret_key"
})

proxyPublisherServer.listen(80,(e)=>{
    console.log("Proxy Publisher server running and waiting for localhost's connection.")
})
```
Sample Localhost Server Code:

```js
const proxyBackend  = require('socket-io-reverse-proxy-client')

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
