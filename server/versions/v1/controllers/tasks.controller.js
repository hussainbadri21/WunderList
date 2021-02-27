const tasksService = require("../../../services/tasks.service");


const addTask = async (req, res) => {
    try {
        const params = req.params;
        const bodyParams = req.body;
        const token = req.token;
        const response = await tasksService.addTask({...params, ...bodyParams,...token});
        return res.status(200).send(response);
    } catch (e) {
        res.status(500).send(e.message);
    }
};

const updateTask = async (req, res) => {
    try {
        const params = req.params;
        const bodyParams = req.body;
        const token = req.token;
        const response = await tasksService.updateTask({...params, ...bodyParams,...token});
        return res.status(200).send(response);
    } catch (e) {
        res.status(500).send(e.message);
    }
};

const deleteTask = async (req, res) => {
    try {
        const params = req.params;
        const bodyParams = req.body;
        const queryPrams = req.query;
        const token = req.token;
        const response = await tasksService.deleteTask({...params, ...bodyParams,...queryPrams,...token});
        return res.status(200).send(response);
    } catch (e) {
        res.status(500).send(e.message);
    }
};

const getTasks = async (req, res) => {
    try {
        const params = req.params;
        const bodyParams = req.body;
        const token = req.token;
        const queryPrams = req.query;
        const response = await tasksService.getTasks({...params, ...bodyParams, ...queryPrams,...token});
        return res.status(200).send(response);
    } catch (e) {
        res.status(500).send(e.message);
    }
};


module.exports = {
    addTask,
    updateTask,
    deleteTask,
    getTasks
};
