const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { User } = require('./models/userSchema');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect("mongodb://127.0.0.1:27017/employee")
  .then(() => console.log("mongoDB Connected..."))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single('file'), (req, res) => {
  User.create({ image: req.file.filename })
    .then(result => res.json({ message: 'File uploaded successfully', file: req.file, result }))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/getImage', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(3000, () => {
  console.log(`LIVE: http://localhost:3000`);
});
