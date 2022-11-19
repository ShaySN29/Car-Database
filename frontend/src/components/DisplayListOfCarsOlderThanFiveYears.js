import React from 'react';
import { Card } from 'react-bootstrap';

// The functional component maps through the listOfOlderCars array and displays each car in a card. It receives the array as a prop
function DisplayListOfCarsOlderThanFiveYears( {listOfOlderCars} ) {
    return (
        <div>
            {listOfOlderCars.map(car => (
                <div key={car._id} className="carDiv">
                    <Card border="dark" style={{ width: '25rem' }} className="carCard p-3">
                        <Card.Body>
                            <Card.Title>{car.carMake} {car.carModel}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{car.carModelYear}</Card.Subtitle>
                            <Card.Text>
                                Registration Number: {car.carRegistrationNumber} <br />
                                Owner: {car.currentOwner}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default DisplayListOfCarsOlderThanFiveYears;