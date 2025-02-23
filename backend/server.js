const express = require('express')
require('dotenv').config()
const connectDB = require('./configs/db')
const cors = require('cors')

const port = process.env.PORT
const app = express()

// Connect to MongoDB
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use('/api/users', require('./routes/userRoute'))   // User routes
app.use('/api/users', require('./routes/noteRoute')) 

app.listen(port, () => console.log(`Server is running at port ${port}`))
