const express = require("express");
const cors = require('cors'); // Used to connect to full stack app or react app
const morgan = require("morgan"); // Used to visualize requests when testing the server on postman
const bodyParser = require("body-parser"); // Used to access content that is passed in the body of the HTTP request
const helmet = require("helmet"); // Provides security
const path = require("path"); // Provides way of working with dir and file paths
const mongoose = require("mongoose"); // Connects to the Database in this 'app.js' file
const carRoutes = require("./routes/car.routes");

// Initialize Express
const app = express();

// Connecting mongoose to the database
const uri = 'mongodb+srv://shanayNair:JNg6Y4Hcgbw8PjW@hyperiondevsh2205000310.6hu9pmx.mongodb.net/?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Cars' // Connects to the Cars DB
})
mongoose.connection.on('error', function () {
    console.log("Could not connect to the database. Exiting now.");
    process.exit();
})
mongoose.connection.once('open', function () {
    console.log("Successfully connected to the database");
})

// App Middleware 
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
// The body-parser middleware extracts the entire body portion of an incoming request stream and exposes it on req.body.
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(helmet());

app.use("/app", carRoutes)

app.listen(4000, () => {
    console.log("Server is listening")
});