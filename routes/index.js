const routes = require('express').Router()
const book = require('./book')
const member = require('./member')
const transaction = require('./transaction')

routes.use('/books', book )
routes.use('/members', member )
routes.use('/transaction', transaction )


module.exports = routes