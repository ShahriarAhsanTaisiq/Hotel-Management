package com.hotelbooking.lakesidehotel.repository;

import com.hotelbooking.lakesidehotel.model.BookedRoom;
import com.hotelbooking.lakesidehotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface BookingRepository extends JpaRepository<BookedRoom,Long> {

    Optional<BookedRoom> findByBookingConfirmationCode(String confirmationCode);
    List<BookedRoom> findByRoomId(Long roomId);

    List<BookedRoom> findByGuestEmail(String email);
}
