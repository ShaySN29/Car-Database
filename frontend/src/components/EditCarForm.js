import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

// Functional component below updates the car in the collection 
function EditCarForm( {carToBeUpdated, returnToFullListOfCars} ) {
    // Initialise State to the current value of the selected car, passed down as props
    const [carMake, setCarMake] = useState(carToBeUpdated.carMake);
    const [carModel, setCarModel] = useState(carToBeUpdated.carModel);
    const [carModelYear, setCarModelYear] = useState(carToBeUpdated.carModelYear);
    const [carRegistrationNumber, setCarRegistrationNumber] = useState(carToBeUpdated.carRegistrationNumber);
    const [carCurrentOwner, setCarCurrentOwner] = useState(carToBeUpdated.currentOwner);

    // Functions below handles the change of the input from the user. It sets the state of the value as the input
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

    // When the update car button is clicked the update is made to the car in the database and the user is returned to the home page
    const handleClick = () => {
        fetch("/app/updateone", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: carToBeUpdated._id,
                carMake: carMake,
                carModel: carModel,
                carModelYear: carModelYear,
                carRegistrationNumber: carRegistrationNumber,
                currentOwner: carCurrentOwner
            }),
        })
            .then(res => res.json())
            .then(response => {
                alert('The Car Has Been Updated!', JSON.stringify(response))
                returnToFullListOfCars();
            })
            .catch(error => console.log('Error:', error));
    };

    return (
        <div>
            <Form className="updateCarForm m-4">
                <Form.Group className="mb-3">
                    <Form.Label>Make:</Form.Label>
                    <Form.Control
                        type="input"
                        id="carMake"
                        defaultValue={carToBeUpdated.carMake}
                        onChange={handleCarMakeChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Model:</Form.Label>
                    <Form.Control
                        type="input"
                        id="carModel"
                        defaultValue={carToBeUpdated.carModel}
                        onChange={handleCarModelChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Year:</Form.Label>
                    <Form.Control
                        type="input"
                        id="carYear"
                        defaultValue={carToBeUpdated.carModelYear}
                        onChange={handleCarModelYearChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Registration Number:</Form.Label>
                    <Form.Control
                        type="input"
                        id="carRegistrationNumber"
                        defaultValue={carToBeUpdated.carRegistrationNumber}
                        onChange={handleCarRegistrationNumberChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Current Owner:</Form.Label>
                    <Form.Control
                        type="input"
                        id="carCurrentOwner"
                        defaultValue={carToBeUpdated.currentOwner}
                        onChange={handleCarCurrentOwnerChange}
                    />
                </Form.Group>
            </Form>
            <Button variant="outline-dark" className="m-4" onClick={handleClick}>Update Car</Button>
        </div>
    );
};

export default EditCarForm;