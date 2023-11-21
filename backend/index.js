require('dotenv').config();
const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')

connectToMongo()

const app = express()
const port = 5000

app.use(cors())

//So that we can use req.body in json format
app.use(express.json())

app.use("/api/task", require('./routes/tasks'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})