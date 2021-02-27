const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks.controller');
const {checkToken} = require("../../../utils/jwt");

router.post("/",checkToken, tasksController.addTask);
router.put("/",checkToken, tasksController.updateTask);
router.delete("/",checkToken, tasksController.deleteTask);
router.get("/",checkToken, tasksController.getTasks);

module.exports = router;
