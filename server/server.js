const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");
const bodyParser = require('body-parser');
require("dotenv").config({path: path.resolve(__dirname, '..', '.env'), debug: true});
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require('./routes/upload'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port,err => {
    // perform a database connection when server starts
    if (err) {
        throw err
    }
    console.log(`Server is running on port: ${port}`);
});