const createError = require('http-errors');
const express = require('express');
const path = require('path');
const rateLimit=require('express-rate-limit');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const mongoose = require("mongoose");
const indexRouter = require('./routes/index');
const helmet = require('helmet');

const server = express();
const PORT = process.env.PORT || 5000 ;

// Use helmet
server.use(helmet());

// Use rateLimit agains DoS attacks
const limiter= new rateLimit({
    windowMs: 15*60*1000, // 15 minutes
    max:100, // limit of number of request per IP
    delayMs:0 // disables delays
});

const optionKey = "mongodb+srv://admin:admin@cluster0-qcgko.mongodb.net/test?retryWrites=true&w=majority"; 
mongoose.connect(optionKey);
const db = mongoose.connection;
db.on("open", function(){
    console.log("Connection is now open with Database");
});

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');
server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(session({ secret: 'TheSession' }));
server.use(express.static(path.join(__dirname, 'public')));
server.use('/', indexRouter);
// server.use('/home', homeRouter);

server.use(function(req, res, next) {
    next(createError(404));
});
server.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = server.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
server.listen(PORT, ()=> {
    console.log('server is running ! ');
})


module.exports = server;

