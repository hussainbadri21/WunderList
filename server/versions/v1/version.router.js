const express = require("express");
const router = express.Router();


const usersRouter = require("./routes/users.router");
const tasksRouter = require("./routes/tasks.router");

router.get("/", function(req, res) {
    res.status(200).send({ status: "success", message: "API is working fine." });
});

//All Route Paths

router.use("/user", usersRouter);
router.use("/task", tasksRouter);

module.exports = router;
