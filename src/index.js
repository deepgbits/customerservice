const express = require('express')
const Controller = require('./Controller')
const app = express()
app.use(express.json());
const port = 9050

//process.env.DB = "local"
// process.env.MYSQL_HOST = "localhost"
// process.env.MYSQL_USER = "user"
// process.env.MYSQL_PASSWORD = "password"
// process.env.MYSQL_DB_NAME = "db"

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