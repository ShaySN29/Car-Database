import React from 'react';
import { Button } from 'react-bootstrap';

function HeaderButtons( {showAddnewCarForm,showOlderCars,updateMultipleCarMakes} ) {
    return (
        <div className="headerButtons">
            <Button
                variant="outline-dark"
                className='me-2 ms-2'
                onClick={() => showAddnewCarForm()}>Add New Car
            </Button>
          
            <Button
                variant="outline-dark"
                className='me-2'
                onClick={() => showOlderCars()}>View Cars Older Than 5 Years
            </Button>
          
            <Button
                variant="outline-dark"
                className='me-2 ms-2'
                onClick={() => updateMultipleCarMakes()}>Update Car Make
            </Button>
        </div>
    );
};

export default HeaderButtons;