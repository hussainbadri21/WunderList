const mongoose = require("mongoose");
const keys = require("./keys");
const env = process.env.NODE_ENV
const conf = keys.mongodb[env];

let connectionString;

mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);

switch (env) {
    case "local":
        connectionString = `mongodb://${conf.host}:${conf.port}/${conf.database}`;
        break;
    case "dev":
        connectionString = `mongodb+srv://${conf.username}:${conf.password}@${conf.host}/${conf.database}?retryWrites=true&w=majority`;
        break;
    case "staging":
    case "preprod":
    case "prod":
        connectionString = `mongodb+srv://${conf.username}:${conf.password}@${conf.host}/${conf.database}?retryWrites=true&w=majority`;
        break;
}

console.log(env);

var con_pj = mongoose.createConnection(connectionString);

module.exports = {con_pj};
