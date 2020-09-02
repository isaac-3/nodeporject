const express = require('express')
const { response } = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors()) 
app.use(bodyParser)

const names = [
    {
        first: 'isaac',
        last: 'chavez'
    }
]

app.get('/names', function(req, res){
    res.json(names)
})


app.listen(3000)