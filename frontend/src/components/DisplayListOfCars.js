import React from 'react';
import { Card, Button} from 'react-bootstrap';


// The functional component maps through the listOfCars array and displays each car in a card. It receives the array as a prop.
function DisplayListOfCars( {listOfCars, getListOfCarsFromDatabase, showEditCarForm} ) {
 
  // The function below deletes the item selected from the database by using its id and then invokes the getListOfCarsFromDatabase
  // function to refresh the list of cars
  function deleteCarFromList(_id) {
      fetch("/app/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: _id,
        }),
      })
    .then(res => res.json())
    .then(response => {
      alert('The Car Has Been Deleted Successfully!', JSON.stringify(response))
      getListOfCarsFromDatabase()
    })
    .catch(error => console.log('Error:', error));
  };

  return (
    <div>
      {listOfCars.map(car => (
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

            <Button className="mb-1" variant="outline-dark" onClick={() => showEditCarForm(car)}>Edit</Button>
            <Button variant="outline-dark" onClick={() => deleteCarFromList(car._id)}>Delete</Button>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default DisplayListOfCars;
