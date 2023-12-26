package com.hotelbooking.lakesidehotel.service;

import com.hotelbooking.lakesidehotel.model.BookedRoom;

import java.util.List;


public interface BookingService {
    void cancelBooking(Long bookingId);

    String saveBooking(Long roomId, BookedRoom bookingRequest);

    BookedRoom findByBookingConfirmationCode(String confirmationCode);

    List<BookedRoom> getAllBookings();

    List<BookedRoom> getAllBookingsByRoomId(Long roomId);
}
