const express = require('express')
const multer = require('multer')

const { v4: uuidv4 } = require('uuid');
uuidv4();
const  router = express.Router();
//const mongoose = require('mongoose'),
const db = require("../models")
const DIR = "./fileStore";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype ==="application/pdf") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
// User model
// let User = require('../models/user.model');
const File = db.file;
router.post('/upload', upload.single('fileAddress'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const file = new File({
        //_id: new mongoose.Types.ObjectId(),
        //name: req.body.name,
        fileAddress: url + '/fileStore/' + req.file.filename
    });
    file.save().then(result => {
        res.status(201).json({
            message: "User registered successfully!",
            fileCreated: {
                //_id: result._id,
                fileAddress: result.fileAddress
            }
        })
    }).catch(err => {
        console.log(err)
            res.status(500).json({
                error: err
            });
    })
})
router.get("/", (req, res, next) => {
    File.find().then(data => {
        res.status(200).json({
            message: "User list retrieved successfully!",
            files: data
        });
    });
});
//app.use("/api/users", router);
module.exports = router;