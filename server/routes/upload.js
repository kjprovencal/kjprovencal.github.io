const express = require("express");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const mongoose = require('mongoose');
console.log(process.env.ATLAS_URI);
mongoose.connect(process.env.ATLAS_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, dbName:"PersonalWebsiteData" }, err => {
        console.log(err)
    }
);
const imgModel = require('../db/models/image');
// uploadRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /upload.
const uploadRoutes = express.Router();

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary
  });
var upload = multer({ storage});
// This section will help you get a list of all the records.
uploadRoutes.route("/upload").get(function (req, res) {
    const query_res = imgModel.find({});
    res.send(query_res);
}).post(upload.single('image'), async function (req, res) {
    var obj = {
       name: req.body.name,
       desc: req.body.desc,
       img: req.file.filename
   }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
            res.status(400);
        } else{
            item.save();
            res.status(200);
        }
    })
});
 

module.exports = uploadRoutes;
