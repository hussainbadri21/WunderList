const mongoose = require("mongoose");
const {con_pj} = require("../config/connection.mongo");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const tasksSchema = new Schema(
    {
        task_id: {
            type: String,
            required: true
        },
        content: {
            type: String,
        },
        starred: {
            type: Boolean,
            default: false
        },
        uid: {
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

module.exports = Tasks = con_pj.model("tasks", tasksSchema);
