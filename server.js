const mongoose = require("mongoose");
const app = require('./app');
const dbConnect = require("./utils/dbConnect");

// database connection
dbConnect();

// server
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});


