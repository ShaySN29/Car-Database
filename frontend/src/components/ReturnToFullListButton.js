import React from 'react';
import { Button } from 'react-bootstrap';

function ReturnToFullListButton( {returnToFullListOfCars} ) {
    return (
        <div className="headerButtons">
            <Button
                variant="outline-dark"
                className='me-2'
                onClick={() => returnToFullListOfCars()}>Return to Full List of Cars
            </Button>
        </div>
    );
};

export default ReturnToFullListButton;