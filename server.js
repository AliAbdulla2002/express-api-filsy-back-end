const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const PORT = process.env.PORT ? process.env.PORT : "3000"

const expensesCtrl = require('./controllers/expenses')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}. 🥭`)
})

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


app.post('/expenses', verifyToken, expensesCtrl.create)
app.get('/expenses', verifyToken, expensesCtrl.index)
app.put('/expenses/:expenseId', verifyToken, expensesCtrl.update)


app.listen(PORT, () => {
  console.log(`The express app is ready on port ${PORT}! 😀`)
})
