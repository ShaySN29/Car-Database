import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

// Functional component to update the car makes of multiple cars
function CarMakesUpdateForm( {returnToFullListOfCars} ) {
    // Initialise State
    const [carMake, setCarMake] = useState("");
    const [newCarMake, setNewCarMake] = useState("");

    // Functions below changes the state of the carMake and the newCarMake to the value that the user inputs in the form
    const handleCarMakeChange = (e) => {
        setCarMake(e.target.value);
    };

    const handleNewCarMakeChange = (e) => {
        setNewCarMake(e.target.value);
    };

    // function below sends the body to the backend using the PUT method to update the car makes. The returnToFullListOfCars invoked to 
    // return to the full list of cars
    const handleClick = () => {
        fetch("/app/updatemany", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                carMake: carMake,
                newCarMake: newCarMake
            }),
        })
            .then(res => res.json())
            .then(response => {
                alert('The Car Make Has Been Updated!', JSON.stringify(response))
                returnToFullListOfCars();
            })
            .catch(error => console.log('Error:', error));
    }; 

    return (
        <div>
            <Form className="updateMakesForm m-4">
                <Form.Group className="mb-3">
                    <Form.Label>Make:</Form.Label>
                    <Form.Control
                        type="input"
                        id="carMake"
                        placeholder='Car Make to Update'
                        onChange={handleCarMakeChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Updated Make:</Form.Label>
                    <Form.Control
                        type="input"
                        id="newCarMake"
                        placeholder='Updated Car Make'
                        onChange={handleNewCarMakeChange}
                    />
                </Form.Group>
            </Form>
            <Button variant="outline-dark" className="m-4" onClick={handleClick}>Update Car</Button>
        </div>
    );
};

export default CarMakesUpdateForm;
