const express = require('express');
const app = express();
const routes = express.Router();
const mongoose = require('mongoose')
require('dotenv').config();
require('module-alias/register');
const user = require('@controllers/user');
const news = require('@controllers/new');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use('/user', user);
app.use('/news', news)
app.get('/', (req, res)=> {
    res.send("hello")
})
try {
    mongoose.connect("mongodb://127.0.0.1:27017/newAggregator");
} catch (err) {
    console.log("Failed while connecting to mongodb");
}

app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${process.env.PORT}`);
});

module.exports = app;