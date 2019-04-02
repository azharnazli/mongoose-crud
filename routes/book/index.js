const routes = require('express').Router()
const bookController = require('../../controllers/bookController')

routes.get('/', bookController.findAllBook)
routes.get('/:id', bookController.findBook)
routes.post('/', bookController.create)
routes.put('/:id', bookController.updateBook)
routes.delete('/:id', bookController.deleteBook)




module.exports = routes