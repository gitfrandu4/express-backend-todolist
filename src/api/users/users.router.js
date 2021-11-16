const router = require('express').Router();
const controller = require('./users.controller')

router.get('', controller.getAll )
router.get('/:email', controller.getUser )
router.post('', controller.createUser )
router.delete('/:id', controller.removeUser )
router.patch('/:id', controller.modifyUser )

module.exports = router;