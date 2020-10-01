const express = require('express')
const { response } = require('express')
const PORT = process.env.PORT || 3001
const cors = require('cors')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false); // for findoneandupdate
const {MONGOURI} = require('./config/keys')
const app = express()

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log('commected')
})
mongoose.connection.on('error',(err)=>{
    console.log('err', err)
})


app.use(express.json())
app.use(cors()) 
// app.use(bodyParser())


require('./models/user')
require('./models/post')
app.use(require('./routes/post'))
app.use(require('./routes/auth'))
app.use(require('./routes/user'))

if(process.env.NODE_ENV == "production"){
    app.use(express.static('frontend/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("app is running on", PORT)
})