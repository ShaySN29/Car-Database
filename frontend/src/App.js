import React, { Component } from 'react';
import './App.css';
// Importing Bootstrap and Bootstrap Components
import 'bootstrap/dist/css/bootstrap.css';
// Import Components
import DisplayListOfCars from './components/DisplayListOfCars';
import DisplayListOfCarsOlderThanFiveYears from './components/DisplayListOfCarsOlderThanFiveYears';
import AddNewCarForm from './components/AddNewCarForm';
import EditCarForm from './components/EditCarForm';
import CarMakesUpdateForm from './components/CarMakesUpdateForm';
import ReturnToFullListButton from './components/ReturnToFullListButton';
import HeaderButtons from './components/HeaderButtons';

class App extends Component {
  constructor(props) {
    super(props);
    this.getListOfCarsFromDatabase = this.getListOfCarsFromDatabase.bind(this);
    this.getListOfCarsOlderThanFiveYearsFromDatabase = this.getListOfCarsOlderThanFiveYearsFromDatabase.bind(this);
    this.showOlderCars = this.showOlderCars.bind(this);
    this.returnToFullListOfCars = this.returnToFullListOfCars.bind(this);
    this.showAddnewCarForm = this.showAddnewCarForm.bind(this);
    this.showEditCarForm = this.showEditCarForm.bind(this);
    this.updateMultipleCarMakes = this.updateMultipleCarMakes.bind(this);
    this.state = {
      error: null,
      listOfCars: [], // Empty array to store the list of cars retrieved from the database
      listOfOlderCars: [], // Empty array to store the list of cars older than 5 years retrieved from the database
      listOfOlderCarsShown: false, // false when the "View Cars Older Than 5 Years" button is unclicked
      addNewCarFormShown: false, // false when the "add new car" button is unclicked
      editCarFormShown: false, // false when the edit button is unclicked
      carToBeUpdated: {}, // Empty object to store the selected car to be updated info
      updateMultipleShown: false // false when the update many button is unclicked
    };
  };

  // The function to retrieve the list of cars from the database is invoked when the component mounts
  componentDidMount() {
    this.getListOfCarsFromDatabase();
  };

  // The function below gets the list of cars from the database. The results are set in state in the empty listOfCars array.
  getListOfCarsFromDatabase() {
    fetch("/app")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            listOfCars: result
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      );
  };

  // The function below gets the list of cars older than 5 years from the database.
  // The results are set in state in the empty listOfOlderCars array.
  getListOfCarsOlderThanFiveYearsFromDatabase() {
    fetch("/app/oldercars")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            listOfOlderCars: result
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      );
  };

  // The function below sets the state of the listOfOlderCarsShown to true and invokes the function to retrieve the list of cars older 
  // than 5 years from database
  showOlderCars() {
    this.setState( {listOfOlderCarsShown: true} );
    this.getListOfCarsOlderThanFiveYearsFromDatabase();
  };

  // The function below sets the state of the listOfOlderCarsShown and the addNewCarFormShown to false and editCarFormShown to false
  // and invokes the function to retrieve the full list of cars from database
  returnToFullListOfCars() {
    this.setState({ listOfOlderCarsShown: false, addNewCarFormShown: false, editCarFormShown: false, updateMultipleShown: false});
    this.getListOfCarsFromDatabase();
  };
  
  // The function below sets the addNewCarFormShown to true so the form to add a new car is shown
  showAddnewCarForm() {
    this.setState({ addNewCarFormShown: true });
  };

  // The function below sets the editCarFormShown to true so the form to update the car selected is shown
  showEditCarForm(car) {
    this.setState({ editCarFormShown: true, carToBeUpdated: car });
  };

  // The function below sets the updateMultipleShown to true so the form to update the car makes is shown
  updateMultipleCarMakes() {
    this.setState({updateMultipleShown: true})
  };

  /*
  If the addNewCarFormShown is true => the form to add a new car is shown and the user can add a new car to the collection
  If the editCarFormShown is true => the form to edit a car is shown and the user can edit a car in the collection
  If the updateMultipleShown is true => the form to update the car makes is shown and the user can update multiple car makes in the collection
  If the listOfOlderCarsShown is true =>the list of cars older than 5 years is shown
  If all of the above are false then the list of cars are shown
  */
  render() {
    const { error, listOfCars, listOfOlderCars, carToBeUpdated} = this.state;

    if (error) {
      return <div>Error: {`There was an error`}</div>;
    } else {
      if (this.state.addNewCarFormShown) {
        return (
          <div>
            <ReturnToFullListButton
              returnToFullListOfCars={this.returnToFullListOfCars}
            />
            <AddNewCarForm
              returnToFullListOfCars={this.returnToFullListOfCars}
            />
          </div>
        )
      } else if (this.state.editCarFormShown) {
        return (
          <div>
            <ReturnToFullListButton
              returnToFullListOfCars={this.returnToFullListOfCars}
            />
            <EditCarForm
              carToBeUpdated={carToBeUpdated}
              returnToFullListOfCars={this.returnToFullListOfCars}
            />
          </div>
        )
      } else if (this.state.updateMultipleShown) {
        return (
          <div>
            <ReturnToFullListButton
              returnToFullListOfCars={this.returnToFullListOfCars}
            />
            <CarMakesUpdateForm
              returnToFullListOfCars={this.returnToFullListOfCars}
            />
          </div>
        )
      } else if (this.state.listOfOlderCarsShown) {
        return (
          <div>
            <ReturnToFullListButton
              returnToFullListOfCars={this.returnToFullListOfCars}
            />
            <DisplayListOfCarsOlderThanFiveYears
              listOfOlderCars={listOfOlderCars}
            />
          </div>
        )
      } else {
          return (
            <div>
                <HeaderButtons
                showAddnewCarForm={this.showAddnewCarForm}
                showOlderCars={this.showOlderCars}
                updateMultipleCarMakes={this.updateMultipleCarMakes}
                />
              <DisplayListOfCars
                  listOfCars={listOfCars}
                  getListOfCarsFromDatabase={this.getListOfCarsFromDatabase}
                  showEditCarForm={this.showEditCarForm}
                />
            </div>
          )
        }
    }
  };
};  

export default App;



