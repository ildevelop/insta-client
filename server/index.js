const express = require('express')
const next = require('next')
require('dotenv').config()
const apiRoute =require('./routes.js')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const bodyParser = require('body-parser');

app.prepare().then(() => {
  const server = express()

    server.use(function (req, res, next) {

      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      // res.setHeader('Access-Control-Allow-Credentials', true);

      // Pass to next layer of middleware
      next();
    })
  server.use(bodyParser.json());
  server.use('/api',apiRoute)
  server.get('/ping', (req, res) => {
    return res.send({'status':'pong'})
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})