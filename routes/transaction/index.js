const routes = require('express').Router()
const transactionController = require('../../controllers/transcationController')

routes.get('/', transactionController.findAllTransaction)
routes.get('/:id', transactionController.findTransaction)
routes.post('/', transactionController.create)
routes.put('/:id', transactionController.updateTransaction)
routes.delete('/:id', transactionController.deleteTranscation)

module.exports = routes