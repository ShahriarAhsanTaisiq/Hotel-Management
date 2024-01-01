import React, { useEffect } from 'react';
import { useState } from 'react';
import { parseISO } from 'date-fns';
// import DateSlider from '../common/DateSlider';

const BookingsTable = ({bookingInfo,handleBookingCancelation}) => {
    const [filteredBookings, setFilteredBookings] = useState(bookingInfo);

    const filterBookings = (startDate, endDate) => {
        let filtered = bookingInfo;
        if (startDate && endDate) {
            filtered = bookingInfo.filter((booking) => {
                const bookingStartDate = parseISO(booking.checkInDate);
                const bookingEndDate = parseISO(booking.checkOutDate);
                return bookingStartDate >= startDate && bookingEndDate <= endDate && bookingEndDate > startDate; 
            })
        }
        setFilteredBookings(filtered);
        // console.log(filtered);
        // console.log(bookingInfo);
    }

    useEffect(() => {
        setFilteredBookings(bookingInfo);
    },[bookingInfo])
    // console.log(bookingInfo);

    return (
        <section className='p-4'> 
        {/* <DateSlider onBookingDateChange={filterBookings} /> */}
        <table className='table table-bordered table-hover text-center shadow'>
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>Booking ID</th>
                    <th>Room ID</th>
                    <th>Room Type</th>
                    <th>Check In Date</th>
                    <th>Check Out Date</th>
                    <th>Guest Name</th>
                    <th>Guest Email</th>
                    <th>Adults</th>
                    <th>Children</th>
                    <th>Total Guests</th>
                    <th>Confirmation Code</th>
                    <th colspan={2}>Actions</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {filteredBookings.map((booking,index) => (
                    
                        <tr key={booking.id || index}>
                            <td>{index + 1}</td>
                            <td>{booking.bookingId}</td>
                            <td>{booking.room.id}</td>
                            <td>{booking.room.roomType}</td>
                            <td>{booking.checkInDate}</td>
                            <td>{booking.checkOutDate}</td>
                            <td>{booking.guestFullName}</td>
                            <td>{booking.guestEmail}</td>
                            <td>{booking.numOfAdults}</td>
                            <td>{booking.numOfChildren}</td>
                            <td>{booking.totalNumOfGuest}</td>
                            <td>{booking.bookingConfirmationCode}</td>
                            <td>
                                <button className='btn btn-danger btn-sm' 
                                onClick={() => handleBookingCancelation(booking.id)}>
                                    Cancel
                                </button>
                                    
                            </td>
            </tr>
                )
                )}
            </tbody>
        </table>
        {filteredBookings.length === 0 && <p className='text-center mt-5'>No Bookings Found for the Selected Date.</p>}

        </section>
    );
};

export default BookingsTable;
