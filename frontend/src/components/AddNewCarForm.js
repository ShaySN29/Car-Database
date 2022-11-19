import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

// Functional component to add a new car to the database 
function AddNewCarForm( {returnToFullListOfCars} ) {
    // Initialise State
    const [carMake, setCarMake] = useState("");
    const [carModel, setCarModel] = useState("");
    const [carModelYear, setCarModelYear] = useState(0);
    const [carRegistrationNumber, setCarRegistrationNumber] = useState("");
    const [carCurrentOwner, setCarCurrentOwner] = useState("");

    // Functions below handles the change of the input from the user. It sets the state of the value as the input values
    const handleCarMakeChange = (e) => {
        setCarMake(e.target.value);
    };

    const handleCarModelChange = (e) => {
        setCarModel(e.target.value);
    };

    const handleCarModelYearChange = (e) => {
        setCarModelYear(e.target.value);
    };

    const handleCarRegistrationNumberChange = (e) => {
        setCarRegistrationNumber(e.target.value);
    };

    const handleCarCurrentOwnerChange = (e) => {
        setCarCurrentOwner(e.target.value);
    };

    // function posts the body to the backend and then invokes the returnToFullListOfCars function to go to the list of cars
    const handleClick = (e) => {
        fetch("/app/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                carMake: carMake,
                carModel: carModel,
                carModelYear: carModelYear,
                carRegistrationNumber: carRegistrationNumber,
                currentOwner: carCurrentOwner
            }),
        })
            .then(res => res.json())
            .then(response => {
                alert('The Car Has Been Added Successfully!', JSON.stringify(response))
                returnToFullListOfCars();
            })
            .catch(error => console.log('Error:', error));
    };

    return (
        <div>
            <Form className="addNewCarForm m-4">
                <Form.Group className="mb-3">
                    <Form.Label>Make:</Form.Label>
                    <Form.Control
                        type="input"
                        id="carMake"
                        placeholder="Eg. Hyundai"
                        onChange={handleCarMakeChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Model:</Form.Label>
                    <Form.Control
                        type="input"
                        id="carModel"
                        placeholder="Eg. Elantra"
                        onChange={handleCarModelChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Year:</Form.Label>
                    <Form.Control
                        type="input"
                        id="carYear"
                        placeholder="Eg. 2015"
                        onChange={handleCarModelYearChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Registration Number:</Form.Label>
                    <Form.Control
                        type="input"
                        id="carRegistrationNumber"
                        placeholder="Enter the Registration Number of the Car"
                        onChange={handleCarRegistrationNumberChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Current Owner:</Form.Label>
                    <Form.Control
                        type="input"
                        id="carCurrentOwner"
                        placeholder="Enter the Current Owner of the Car"
                        onChange={handleCarCurrentOwnerChange}
                    />
                </Form.Group>
            </Form>
            <Button variant="outline-dark" className="m-4" onClick={handleClick}>Add New Car</Button>
        </div>
    );
};

export default AddNewCarForm;