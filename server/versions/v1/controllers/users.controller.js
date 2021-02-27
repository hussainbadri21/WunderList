const usersService = require("../../../services/users.service");


const addUser = async (req, res) => {
    try {
        const params = req.params;
        const bodyParams = req.body;
        const response = await usersService.addUser({...params, ...bodyParams});
        return res.status(200).send(response);
    } catch (e) {
        res.status(500).send(e.message);
    }
};

const loginUser = async (req, res) => {
    try {
        const params = req.params;
        const bodyParams = req.body;
        const response = await usersService.loginUser({...params, ...bodyParams});
        return res.status(200).send(response);
    } catch (e) {
        res.status(500).send(e.message);
    }
};


module.exports = {
    addUser,
    loginUser
};
