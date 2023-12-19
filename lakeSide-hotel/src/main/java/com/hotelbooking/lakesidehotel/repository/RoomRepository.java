package com.hotelbooking.lakesidehotel.repository;

import com.hotelbooking.lakesidehotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room,Long> {

    @Query("SELECT DISTINCT r.roomType  from Room r")

    List<String> findDistinctRoomTypes();
}
