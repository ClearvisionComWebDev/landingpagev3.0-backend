const express     = require('express')
const app         = express()
const port        = 3000
const bodyparser  = require('body-parser')
const path        = require('path')

// Middleware
const	apiRoutes   = require('./middleware/api.js')

// Bodyparser
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

// Routing
app.use('/api', apiRoutes)

app.listen(port, () => console.log(`Server listening on port ${port}`))