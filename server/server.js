const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const {uuid} = require('uuidv4');
const imgModel = require('./db/models/image');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary
  });
var upload = multer({ storage});

mongoose.connect(process.env.ATLAS_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, dbName:"PersonalWebsiteData" }, err => {
        console.log('connected')
    }
);

app.get('/', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.json(items)
        }
    });
});

app.post('/upload', upload.single('image'), async (req, res) => {
  
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: req.file.filename
    }

    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            res.send("Image uploaded");
        }
    });
});

app.listen(port,err => {
    // perform a database connection when server starts
    if (err) {
        throw err
    }
    console.log(`Server is running on port: ${port}`);
  });