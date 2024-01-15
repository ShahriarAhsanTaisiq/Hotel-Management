import React, { useState } from 'react';
import { cancelBooking, getBookingByConfirmationCode } from '../utils/ApiFunctions';


const FindBooking = () => {

    const [confirmationCode, setConfirmationCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [bookingInfo, setBookingInfo] = useState({
        id: '',
        room: {id:'', roomType:''},
        bookingConfirmationCode: '',
        roomNumber:'',
        guestFullName: '',
        guestEmail: '',
        checkInDate: '',
        checkOutDate: '',
        numOfAdults: '',
        numOfChildren: '',
        totalNumOfGuest: ''
    });

    const clearBookingInfo = {
        id: '',
        room: {id:'', roomType:''},
        bookingConfirmationCode: '',
        roomNumber:'',
        guestFullName: '',
        guestEmail: '',
        checkInDate: '',
        checkOutDate: '',
        numOfAdults: '',
        numOfChildren: '',
        totalNumOfGuest: ''
    };


    const handleInputChange = (event) => {
        setConfirmationCode(event.target.value);
    }

    const handleFormSubmit = async(event)  => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await getBookingByConfirmationCode(confirmationCode);
            setBookingInfo(response);
            setIsLoading(false);
            setError(null);
        } catch (error) {
            setBookingInfo(clearBookingInfo);
            if( error.response && error.response.status === 404) {
                setError(error.response.data.message);
            }
            else {
                setError(error.message);
            }
            setTimeout(() => {
                setIsLoading(false); 
            }
            , 2000);

        }
    }

    const handleBookingCancelation = async(bookingId) => {
        // console.log(bookingId);
        try {
            await cancelBooking(bookingInfo.bookingId);
            setIsDeleted(true);
            setSuccess('Booking has been successfully cancelled.');
            setBookingInfo(clearBookingInfo);
            setConfirmationCode('');
            setError('');
        }
        catch (error) {
            setError(error.response);
        }
        setTimeout(() => {
            setSuccess('');
            setIsDeleted(false);
        }
        , 2000);
    }




    return (
        <>
        <div className='container mt-5 d-flex flex-column 
        justify-content-center align-items-center'>

                <h2>Find my Bookings </h2>
                <form onSubmit={handleFormSubmit} className='col-md-6'>
                    <div className='input-group mb-3'>

                        <input 
                        className='form-control'
                        id='confirmationCode'
                        name='confirmationCode'
                        value={confirmationCode}
                        onChange={handleInputChange}
                        placeholder='Enter Confirmation Code'
                        />
                        <button className='btn btn-hotel input-group-text'>
                            Find Booking</button>
                    </div>
                </form>
                {isLoading ? (
                    <div className='text-center hotel-color '>Finding Booking....</div>
                ):error ? (
                    <div className='text-danger'>{error}</div>
                ): bookingInfo.bookingConfirmationCode ? (
                    // console.log(bookingInfo),
                    <div className='col-md-6 mt-4 mb-5'>
                        <h3 className='text-center'>Booking Information <hr /> </h3>
                        <p><strong>Confirmation Code:</strong> {bookingInfo.bookingConfirmationCode}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <div style={{ flexBasis: '48%' }}>
                            {/* <p><strong>Confirmation Code:</strong> {bookingInfo.bookingConfirmationCode}</p> */}
                            <p><strong>Booking ID:</strong> {bookingInfo.bookingId}</p>
                            <p><strong>Room Details:</strong><hr /></p>
                            <ul>
                            <li><strong>Room No:</strong> {bookingInfo.room.id}</li>
                            <li><strong>Room Type:</strong> {bookingInfo.room.roomType}</li>
                            </ul>
                            <p><strong>Stay Dates:</strong><hr /></p>
                            <ul>
                            <li><strong>Check In:</strong> {bookingInfo.checkInDate}</li>
                            <li><strong>Check Out:</strong> {bookingInfo.checkOutDate}</li>
                            </ul>
                        </div>

                        <div style={{ flexBasis: '48%' }}>

                            <p><strong>Guest Information:</strong><hr /></p>
                            <ul>
                            <li><strong>Name:</strong> {bookingInfo.guestFullName}</li>
                            <li><strong>Email:</strong> {bookingInfo.guestEmail}</li>
                            </ul>

                            <p><strong>Number of Guests:</strong><hr /></p>
                            <ul>
                            <li><strong>Adults:</strong> {bookingInfo.numOfAdults}</li>
                            <li><strong>Children:</strong> {bookingInfo.numOfChildren}</li>
                            </ul>

                            <p><strong>Total Number of Guests:</strong> {bookingInfo.totalNumOfGuest}</p>
                        </div>
                        </div>

                        {!isDeleted && (
                            <button className='btn btn-danger btn-sm' 
                            onClick={() => handleBookingCancelation(bookingInfo.bookingId)}>
                                Cancel Booking
                            </button>
                        )}
                    </div>
                ):( 
                    <div className=''> <hr/></div>
                )}

                {isDeleted && (
                    <div className='alert alert-success mt-3 ' role='alert'>{success}</div>
                )}
            </div>
        </>
    );
};

export default FindBooking;
