const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

const bookingRoute = require('./api/routes/booking')
const eventRoute = require('./api/routes/event')
const userRoute = require('./api/routes/user')

mongoose.connect("mongodb+srv://bobby:1234@cluster0-lc4fu.mongodb.net/gql?retryWrites=true&w=majority");

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requestted-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*');
        return res.status(200).json({})
    }
    next();
})

app.use('/bookings', bookingRoute);
app.use('/events', eventRoute);
app.use('/user', userRoute);

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;