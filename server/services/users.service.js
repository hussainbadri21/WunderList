const usersRepo = require('../repositories/users.repository');
const {decrypt} = require("../utils/common.util");
const {createJWT} = require("../utils/jwt");
const {v4: uuidv4} = require('uuid');

const addUser = async (params) => {
    if (params.email !== undefined && params.name !== undefined && params.pswd !== undefined) {
        if (await usersRepo.checkUserExists(params) === null) {
            params.uid = uuidv4();
            params.status = 1;
            const response = await usersRepo.addUser(params)
            if (response) {
                return {
                    status: 1,
                    message: "Registration Successful."
                }
            } else {
                return {status: 2, message: "Registration failed!, Try again"};
            }
        } else {
            return {
                status: 3,
                message: "Account already exists with this email, please try logging in!"
            };
        }
    } else {
        return {
            status: 0,
            message: "Required parameters not sent!"
        };
    }

}
const loginUser = async (params) => {
    if (params.email !== undefined && params.pswd !== undefined) {
        const response = await usersRepo.checkUserExists(params)
        if (response !== null) {
            if (decrypt(response.pswd) === decrypt(params.pswd)) {
                return {
                    status: 1,
                    message: "Login Successful.",
                    token:  createJWT(response)
                }
            } else
                return {status: 2, message: "Login failed!, please check your credentials and try again"};
        } else {
            return {
                status: 3,
                message: "Account doesn't exists with this email, please try signing up!"
            };
        }
    } else {
        return {
            status: 0,
            message: "Required parameters not sent!"
        };
    }

}

module.exports = {
    addUser,
    loginUser
};
