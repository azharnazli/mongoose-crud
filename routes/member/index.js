const routes = require('express').Router()
const memberController = require('../../controllers/memberController')

routes.get('/', memberController.findAllMember)
routes.get('/:id', memberController.findMember)
routes.post('/', memberController.create)
routes.put('/:id', memberController.updateMember)
routes.delete('/:id', memberController.deleteMember)




module.exports = routes