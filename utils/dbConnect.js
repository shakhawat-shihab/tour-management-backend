const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');
const connectionString = process.env.ATLAS_URI;

module.exports = () => {
    console.log('connecting to DB...', connectionString);
    mongoose
        .connect('mongodb://localhost:27017/acc-inventory', {
            useNewUrlParser: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
            useUnifiedTopology: true,
        })
        .then(() => console.log(`DB connection successful!`))
        .catch((err) => {
            console.log('DB Connection Failed !');
            console.log(`err`, err);
        });
};