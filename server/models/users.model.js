const mongoose = require("mongoose");
const {con_pj} = require("../config/connection.mongo");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const usersSchema = new Schema(
    {
        uid: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        pswd: {
            type: String,
            required: true
        },
        status: {
            type: Number,
            required: true
        },
    },
    {versionKey: false}
);

module.exports = Users = con_pj.model("users", usersSchema);
