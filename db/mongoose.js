// This file will handle connection login to mongo db database

const mongoose = require('mongoose');

const mongopath = 'mongodb+srv://codeatgit:codeatgit3144@mongodb.c0bmd.mongodb.net/notes?retryWrites=true&w=majority';

mongoose.Promise = global.Promise;

mongoose.connect(mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection to mongodb is established successfully");
}).catch((e) => {
    console.log("Error Occured while connection to mongodb database: ");
    console.log(e);
});

module.exports = {
    mongoose
};
