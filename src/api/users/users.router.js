const router = require('express').Router();
const controller = require('./users.controller')

router.get('', controller.getAll )
router.get('/:id', controller.getTodo )
router.post('', controller.createTodo )
router.delete('/:id', controller.removeTodo )
router.patch('/:id', controller.modifyTodo )

module.exports = router;