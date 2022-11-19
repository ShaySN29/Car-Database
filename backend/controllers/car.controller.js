/* Controller contains the code to perform CRUD operations using Mongoose. */
const Car = require('../models/car.model'); // import model
const mongoose = require('mongoose');

// addNewCar function below adds a car to the collection using the save() method
exports.addNewCar = (req, res) => {
    let carTemplate = new Car({
        carMake: req.body.carMake,
        carModel: req.body.carModel,
        carModelYear: req.body.carModelYear,
        carRegistrationNumber: req.body.carRegistrationNumber,
        currentOwner: req.body.currentOwner
    });

    carTemplate.save( (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: "There was an error while adding the car" })
        } else {
            console.log(data);
            res.json("The car has been added");
        }
    });
};

// listCars function below lists the information about all the cars in database using the findAll() method
exports.listCars = (req, res) => {
    Car.find((error, cars) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: "Some error occurred while retrieving the list of cars." });
        } else {
            res.json(cars);
        }
    });
};

// function below lists the info for cars older than 5 years using the find() method and $lt - less than selector
exports.listCarsOlderThanFiveYears = (req, res) => {
    var currentTime = new Date() // Returns Date and Time
    let currentYear = currentTime.getFullYear() // Returns the year
    let searchYear = currentYear - 5 // Gets the year a car would be 5 years
    let query = searchYear;

    Car.find({ carModelYear: { $lt: query } }, (error, cars) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: "Some error occurred while retrieving the list of cars." });
        } else {
            res.json(cars);
        }
    });
};

// Update information about a single car using the findOneAndUpdate() method
exports.updateSingleCar = (req, res) => {
    let query = { _id: req.body._id };
    let updatedCar = {
        carMake: req.body.carMake,
        carModel: req.body.carModel,
        carModelYear: req.body.carModelYear,
        carRegistrationNumber: req.body.carRegistrationNumber,
        currentOwner: req.body.currentOwner
    }
    
    Car.findOneAndUpdate(query, updatedCar, { new: true }, (error, data) => {
        if (error) {
            console.log("The update was unsuccessful.");
            res.json("ERROR: Not Updated. " + error);
        }
        res.json("The data was updated.");
    });
};

// Update information about more than one car using the updateMany method
exports.updateMultipleCars = (req, res) => {
    let query = { carMake: req.body.carMake };
    
    Car.updateMany(query, { $set: { carMake: req.body.newCarMake } }, (error, data) => {
        if (error) {
            console.log("The update was unsuccessful.");
            res.json("ERROR: Not Updated. " + error)
        }
        res.json("Multiple updates have been made.")
    })
};

// the function below deletes a car using the findOneAndRemove() method to delete it
exports.deleteCar = (req, res) => {
    let query = { _id: req.body._id };
    Car.findOneAndRemove(query, (error) => {
        if (error) {
            console.log("ERROR: The car could not be removed." + error);
            res.json("ERROR: Car NOT removed. " + error);
        }
        res.json("The car was successfully removed");
    });
};

