const express = require('express')
const Controller = require('./Controller')
const Eureka = require('eureka-js-client').Eureka;

const app = express()
app.use(express.json());
const port = 9050

//process.env.DB = "local"
// process.env.MYSQL_HOST = "localhost"
// process.env.MYSQL_USER = "user"
// process.env.MYSQL_PASSWORD = "password"
// process.env.MYSQL_DB_NAME = "db"

// example configuration
const client = new Eureka({
  // application instance information
  instance: {
    app: 'customerService',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: port,
    vipAddress: 'jq.test.something.com',
    dataCenterInfo: {
      name: 'MyOwn',
    },
    registerWithEureka: true,
    fetchRegistry: true,
    serviceUrls: {
        default: [
           'http://localhost:8761/eureka/'
        ]
      }
  },
  eureka: {
    // eureka server host / port
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/'
  },
});

client.start()

this.controllerObj = new Controller()

app.get('/ping', (req, res) => {
    res.send('Pong!')
})

//create Customer
app.post('/customer', async (req, res) => {
    let myJson = req.body
    let j
    try {
        j = await this.controllerObj.Create(myJson["email"], myJson["firstName"], myJson["lastName"])
    } catch (err) {
        res.send(500).send({})
    }
    res.status(201).send(j)
})

//get Customer with Id
app.get('/customer/:id', async (req, res) => {
    let val
    try {
        val = await this.controllerObj.Get(req.params.id)
    } catch (err) {
        res.send(500).send({})
    }
    res.status(200).send(val)
})

//get all Customer
app.get('/customer', async (req, res) => {
    let val
    try {
        val = await this.controllerObj.GetAll()
    } catch (err) {
        res.send(500).send({})
    }
    res.status(200).send(val)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}) 

