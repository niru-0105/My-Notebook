const connectToMongoose = require('./db')
const express = require('express')
const app = express()
const cors = require('cors')

connectToMongoose()

app.use(express.json())
app.use(cors())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.get('/',(req,res)=>{
    res.send('Hello')
})


app.listen(5000,()=>{
    console.log('Listening at port 5000')
})
