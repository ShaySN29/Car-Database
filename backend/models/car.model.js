/* Model below created using the model() method. The model handles the creation and retrieval of documents from the database */
const mongoose = require('mongoose'); 

const CarSchema = mongoose.Schema({
    carMake: {
        type: String,
        required: true
    },
    carModel: {
        type: String,
        required: true
    },
    carModelYear: {
        type: Number,
        required: true
    },
    carRegistrationNumber: {
        type: String,
        required: true
    },
    currentOwner: {
        type: String,
        required: true
    }
});

// The Name of the model and the schema object created passed as arguments
module.exports = mongoose.model('Car', CarSchema);