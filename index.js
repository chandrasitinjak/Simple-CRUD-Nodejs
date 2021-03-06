const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected");
}).catch(err => {
    console.log("not connected", err.message)
    process.exit()
})

app.get('/', (req, res) => {
    res.json({
        "message": "Hello World"
    })
})

require('./app/routes/note.routes.js')(app)

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})