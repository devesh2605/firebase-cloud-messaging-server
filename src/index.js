const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config/');

const app = express();
const port = 3000;

/** Body Parser */
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

/**CORS- Enable Cors & Helmet- Secures App */
app.use(cors());
app.use(helmet());

/**
* MongoDB Connection
*/
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true })
    .then(() =>
        console.log('MONGODB connection succesfully established'))
    .catch((err) =>
        console.log('error in connecting to MONGODB ' + err));
mongoose.set('useCreateIndex', true);

/**
* Required Routes
*/
require('./routes/notification.route')(app);
require('./routes/cloudMessaging.route')(app);

/**
* Listen to server
*/
app.listen(port, function () {
    console.log(`Server is listening on port ${port}`);
});