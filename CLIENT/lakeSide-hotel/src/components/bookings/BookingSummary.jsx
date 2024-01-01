import React, { useEffect } from 'react';
import moment from 'moment';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BookingSummary = ({booking, payment, isFormValid,onConfirm}) => {

    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const numberOfDays = checkOutDate.diff(checkInDate, 'days');
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const navigate = useNavigate();

    const handleConfirmBooking = async () => {
        setIsProcessingPayment(true);
        setTimeout(() => {
            setIsBookingConfirmed(true);
            setIsProcessingPayment(false);
            onConfirm();
        }, 3000);   
    }

    useEffect(() => {
        if (isBookingConfirmed) {
            navigate('/booking-success');
        }
    }, [isBookingConfirmed, navigate]);


    return (
        <div className='card card-body mt-5'>

            <h4>Reservation Summary</h4>
            <hr /> 

            <p>Full Name: <strong> {booking.guestFullName} </strong></p>
            <p>Email: <strong> {booking.guestEmail} </strong></p>
            <p>Check In Date: <strong> {moment(booking.checkInDate).format("MMM Do YYYY")} </strong></p>
            <p>Check Out Date: <strong> {moment(booking.checkOutDate).format("MMM Do YYYY")} </strong></p>
            <p>Number of Days: <strong> {numberOfDays} </strong></p>

            <div>
                <h5>Number of Guests</h5>
                <strong>Adult{booking.numberOfAdults >1 ? "s": "" } : {booking.numOfAdults}</strong> <br/>
                
                <strong>Children :{booking.numOfChildren}</strong> <br/>
            </div>

            {payment>0 ?(
                <>
                <p>
                    Total Payment: <strong> ${payment} </strong>
                </p>

                {isFormValid && !isBookingConfirmed ? (
                    <Button 
                    variant='success'
                    onClick={handleConfirmBooking}>

                        {isProcessingPayment ? (
                            <>
                            <span className='spinner-border spinner-border-sm mr-2'
                            role='status'
                            aria-hidden='true'></span>
                            Booking Confirmed, redirect to payment..
                            </>
                        ) : (
                            "Confirm Booking and Proceed to Payment"
                        )}
                    </Button>
                ) : isBookingConfirmed ? (
                    
                    <div className='d-flex justify-content-center aling-item-center'>
                        <div className='spinner-border text-primary text-center' role='status'>
                            <span className='sr-only'>
                                Loading..
                            </span>
                        </div>
                    </div>

            ) : null}
            </>
            ) : (
                <p className='text-danger'>Checkout date must be after check in date</p>
            )
        }    
        </div> 
    );
};

export default BookingSummary;
