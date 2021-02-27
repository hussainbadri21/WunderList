const usersModel = require("../models/users.model");

const addUser = async (data) => {
    const user_details = new usersModel(data);
    return await user_details.save();
}

const checkUserExists = async (data) => {
    return usersModel.findOne({email: data.email, status: 1}).lean();
}

module.exports = {
    addUser,
    checkUserExists
};
