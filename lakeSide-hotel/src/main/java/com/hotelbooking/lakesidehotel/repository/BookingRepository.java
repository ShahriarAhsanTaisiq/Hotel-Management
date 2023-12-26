package com.hotelbooking.lakesidehotel.repository;

import com.hotelbooking.lakesidehotel.model.BookedRoom;
import com.hotelbooking.lakesidehotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<BookedRoom,Long> {

    BookedRoom findByBookingConfirmationCode(String confirmationCode);
    List<BookedRoom> findByRoomId(Long roomId);
}
