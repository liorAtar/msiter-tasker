const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const utilService = require('../../services/util.service')

async function query(filterBy) {
    try {
        const criteria = {}

        const collection = await dbService.getCollection('task')
        var tasks = await collection.find(criteria).toArray()
        return tasks
    } catch (err) {
        logger.error('cannot find tasks', err)
        throw err
    }
}

async function getById(taskId) {
    try {
        const collection = await dbService.getCollection('task')
        console.log('taskId', taskId)
        const task = collection.findOne({ _id: taskId})
        return task
    } catch (err) {
        logger.error(`while finding task ${taskId}`, err)
        throw err
    }
}

async function remove(taskId) {
    try {
        const collection = await dbService.getCollection('task')
        await collection.deleteOne({ _id: taskId })
        return taskId
    } catch (err) {
        logger.error(`cannot remove task ${taskId}`, err)
        throw err
    }
}

async function add(task) {
    try {
        const collection = await dbService.getCollection('task')
        const addedTask = await collection.insertOne(task)
        return addedTask
    } catch (err) {
        logger.error('cannot insert task', err)
        throw err
    }
}
async function update(task) {
    try {
        var id = task._id
        delete task._id
        const collection = await dbService.getCollection('task')
        await collection.updateOne({ _id: id }, { $set: { ...task } })
        return task
    } catch (err) {
        logger.error(`cannot update task ${task._id}`, err)
        throw err
    }
}

async function addTaskMsg(taskId, msg) {
    try {
      msg.id = utilService.makeId()
      const collection = await dbService.getCollection('task')
      await collection.updateOne(
        { _id: taskId },
        { $push: { msgs: msg } }
      )
      return msg
    } catch (err) {
      logger.error(`cannot add task msg ${taskId}`, err)
      throw err
    }
  }
  
  async function removTaskMsg(taskId, msgId) {
    try {
      const collection = await dbService.getCollection('task')
      await collection.updateOne(
        { _id: taskId },
        { $pull: { msgs: { id: msgId } } }
      )
      return msgId
    } catch (err) {
      logger.error(`cannot add task msg ${taskId}`, err)
      throw err
    }
  }

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addTaskMsg,
    removTaskMsg
}