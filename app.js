const mongoose = require("mongoose");
const express= require("express");
const app = express();
const path= require('path');
const bodyParser = require("body-parser");
const config= require('config');
const cors= require('cors');
const indexRouter = require('./routes/index');
const questions = require('./routes/questions');
const users = require('./routes/users');

mongoose.connect(config.get('db'),{useNewUrlParser: true,useUnifiedTopology: true})
  .then(()=> console.log(`Connected to ${config.get('db')}...`))
  .catch(err => console.log(`Could not connect to ${config.get('db')}...`,err));

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'Client/build')));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/quiz', questions);
app.use('/user', users);

require('./prod.js')(app);

app.set("view engine", "pug");

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'Client/build', 'index.html'));
});

module.exports= app;