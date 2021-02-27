const tasksModel = require("../models/tasks.model");

const addTask = async (data) => {
    const task = new tasksModel(data);
    return await task.save();
}

const updateTask = async (data) => {
    let query = {}
    if (data.starred !== undefined)
        query['starred'] = data.starred
    if (data.content !== undefined)
        query['content'] = data.content
    if (data.completed !== undefined)
        query['status'] = data.completed == true ? 2 : 1

    return tasksModel.updateOne({uid: data.uid, task_id: data.task_id}, {$set: query});
}

const deleteTask = async (data) => {
    return tasksModel.deleteOne({uid: data.uid, task_id: data.task_id});
}

const getTasks = async (data) => {
    return tasksModel.find({uid: data.uid}, {_id: 0, uid: 0}).sort({starred: -1});
}


module.exports = {
    addTask,
    updateTask,
    deleteTask,
    getTasks
};
