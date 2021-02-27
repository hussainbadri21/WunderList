const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.post("/signup", usersController.addUser);
router.post("/login", usersController.loginUser);

module.exports = router;
