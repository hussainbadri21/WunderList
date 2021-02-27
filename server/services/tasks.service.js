const tasksRepo = require('../repositories/tasks.repository');
const {v4: uuidv4} = require('uuid');

const addTask = async (params) => {
    if (params.uid !== undefined) {
        params.task_id = uuidv4();
        params.status = 1;
        const response = await tasksRepo.addTask(params)
        if (!params.content)
            params.content = ''
        if (!params.starred)
            params.starred = false
        if (response) {
            return {
                status: 1,
                message: "Task added Successfully.",
                task: params
            }
        } else {
            return {status: 0, message: "Task could not be added"};
        }

    } else {
        return {
            status: 2,
            message: "Required parameters not sent!"
        };
    }
}

const updateTask = async (params) => {
    if (params.uid !== undefined && params.task_id !== undefined) {
        const response = await tasksRepo.updateTask(params)
        if (response) {
            return {
                status: 1,
                message: "Task updated Successfully."
            }
        } else {
            return {status: 0, message: "Task could not be updated"};
        }
    } else {
        return {
            status: 2,
            message: "Required parameters not sent!"
        };
    }
}


const deleteTask = async (params) => {
    if (params.uid !== undefined && params.task_id !== undefined) {
        const response = await tasksRepo.deleteTask(params)
        if (response) {
            return {
                status: 1,
                message: "Task deleted Successfully."
            }
        } else {
            return {status: 0, message: "Task could not be deleted"};
        }
    } else {
        return {
            status: 2,
            message: "Required parameters not sent!"
        };
    }
}

const getTasks = async (params) => {
    if (params.uid !== undefined) {
        const response = await tasksRepo.getTasks(params)
        if (response) {
            return {
                status: 1,
                message: "Tasks fetched Successfully.",
                tasks: response
            }
        } else {
            return {status: 0, message: "Tasks could not be fetched"};
        }
    } else {
        return {
            status: 2,
            message: "Required parameters not sent!"
        };
    }
}


module.exports = {
    addTask,
    updateTask,
    deleteTask,
    getTasks
};
