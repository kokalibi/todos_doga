var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var todoRouter = require('./routes/todoRoutes');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', todoRouter);


app.use(function(req, res) {
  res.status(404).json({ error: "Az erőforrás nem található" }); 
});

module.exports = app; 
