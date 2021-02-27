const express = require("express");
const app = express();
const PORT = process.env.PORT || 3080;
const path = require("path");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");

// Version Base Route
const versionRouter = require("./versions/v1/version.router");

// Compressing Response of js files to gzip format
app.use(compression());

const APP_URL = path.resolve(__dirname, "../client/build");
const APP_URL_HOME = path.resolve(__dirname, "../client/build/index.html");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.text());
app.use(cors());

app.use("/api/", versionRouter);
app.use(express.static(APP_URL));
app.enable("trust proxy");

// Global route handler
app.get("*", async (req, res) => {
    res.sendFile(APP_URL_HOME);
});

app.listen(PORT, () => {
    console.log("Log in service is listening at PORT ", PORT);
});
