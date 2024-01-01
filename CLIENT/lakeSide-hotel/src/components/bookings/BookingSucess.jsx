import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../common/Header';


const BookingSuccess = () => {

    const Location = useLocation();
    const message = Location.state.message;
    const error = Location.state.error;

    return (
        <div className='container'>
            <Header title = {"Booking Sucess"}/>
            <div className='mt-5'>
                {message ? (
                    <div>
                        <h3 className='text-success'>Booking Sucess</h3>
                        <p className='text-success '>{message}</p>  
                    </div>
                ):
                (
                    <div>
                        <h3 className='text-danger'>Booking Failed</h3>
                        <p className='text-danger'>{error}</p>
                    </div> 
                )
                }
            </div>
        </div>
    );
};

export default BookingSuccess;
