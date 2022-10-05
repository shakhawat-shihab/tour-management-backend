const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');
// const connectionString = process.env.ATLAS_URI
const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zwiso.mongodb.net/acc-inventory?retryWrites=true&w=majority`;

module.exports = () => {
    console.log('connecting to DB...');
    mongoose
        .connect(connectionString, {
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