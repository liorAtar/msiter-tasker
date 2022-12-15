const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getTasks, getTaskById, addTask, updateTask, removeTask, addReview, addTaskMsg, removeTaskMsg } = require('./task.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getTasks)
router.get('/:id', getTaskById)
router.post('/', requireAuth, addTask)
router.put('/:id', requireAuth, updateTask)
router.delete('/:id', requireAuth, requireAdmin, removeTask)

router.post('/:id/msg', requireAuth, addTaskMsg)
router.delete('/:id/msg/:msgId', requireAuth, removeTaskMsg)

module.exports = router