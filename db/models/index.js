const { List } = require('./list.model');
const { Task } = require('./task.model');
const mongoose = require('../mongoose')

module.exports = {
    List,
    Task,
    mongoose
}