package com.hotelbooking.lakesidehotel.controller;

import com.hotelbooking.lakesidehotel.exception.InternalServerException;
import com.hotelbooking.lakesidehotel.exception.PhotoRetriverException;
import com.hotelbooking.lakesidehotel.exception.ResourceNotFoundException;
import com.hotelbooking.lakesidehotel.model.BookedRoom;
import com.hotelbooking.lakesidehotel.model.Room;
import com.hotelbooking.lakesidehotel.response.RoomResponse;
import com.hotelbooking.lakesidehotel.service.BookingService;
import com.hotelbooking.lakesidehotel.service.RoomServiceImpl;
import jakarta.persistence.metamodel.ListAttribute;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.sql.Blob;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.ListResourceBundle;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")

@RequestMapping("/rooms")
public class RoomController {

    private final RoomServiceImpl roomServiceImpl;
    private final BookingService bookingService;

    @PostMapping("/new")
    public ResponseEntity<RoomResponse> addNewRoom(@RequestParam("photo") MultipartFile photo,
                                                   @RequestParam("roomType") String roomType,
                                                   @RequestParam("roomPrice") BigDecimal roomPrice) throws SQLException, IOException {

        Room savedRoom = roomServiceImpl.addNewRoom(photo,roomType,roomPrice);

        RoomResponse response= new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(),savedRoom.getRoomPrice());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/roomType")
    public List<String> getRoomTypes(){
        return roomServiceImpl.getAllRoomTypes();
    }

    @GetMapping("/all-rooms")
    public ResponseEntity<List<RoomResponse>> getAllRooms() throws SQLException {
        List<Room> rooms = roomServiceImpl.getAllRooms();
        List<RoomResponse> roomResponses = new ArrayList<>();

        for (Room room: rooms){
            byte [] photoBytes = roomServiceImpl.getRoomPhotoByRoomId(room.getId());
            if(photoBytes != null && photoBytes.length>0){
                String base64Photo = Base64.encodeBase64String(photoBytes);
                RoomResponse roomResponse = getRoomResponse(room);

                roomResponse.setPhoto(base64Photo);
                roomResponses.add(roomResponse);

            }
        }
        return ResponseEntity.ok(roomResponses);
    }

    @DeleteMapping("/delete/room/{roomId}")
    public ResponseEntity<Void> deleteRoom(@PathVariable("roomId") Long id){
        roomServiceImpl.deleteRoom(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<RoomResponse> updateRoom( @PathVariable Long id,
                                                    @RequestParam(required = false) String roomType,
                                                    @RequestParam(required = false) BigDecimal roomPrice,
                                                    @RequestParam(required = false) MultipartFile photo) throws IOException, SQLException, InternalServerException {
    byte[] photoBytes = photo != null && !photo.isEmpty()?
             photo.getBytes() : roomServiceImpl.getRoomPhotoByRoomId(id);
    Blob photoBlob = photoBytes != null && photoBytes.length > 0 ?
            new SerialBlob(photoBytes) : null;
    Room theRoom = roomServiceImpl.updateRoom(id,roomType,roomPrice,photoBytes);
    theRoom.setPhoto(photoBlob);

    RoomResponse roomResponse = getRoomResponse(theRoom);
    return ResponseEntity.ok(roomResponse);

    }

    @GetMapping("/room/{id}")
    public ResponseEntity<Optional<RoomResponse>> getRoomById(@PathVariable Long id){
        Optional<Room> theRoom = roomServiceImpl.getRoomById(id);
        return theRoom.map( room -> {
            RoomResponse roomResponse = getRoomResponse(room);
            return ResponseEntity.ok(Optional.of(roomResponse));

        }).orElseThrow( () -> new ResourceNotFoundException(" Room not found."));

    }

    @GetMapping("/available-rooms")
    public ResponseEntity<List<RoomResponse>> getAvailableRooms( @RequestParam("checkInDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
                                                                @RequestParam("checkOutDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutData,
                                                                @RequestParam ("roomType") String roomType) throws SQLException {
        List<Room> availableRooms = roomServiceImpl.getAvailableRooms(checkInDate,checkOutData,roomType);
        List<RoomResponse> roomResponses = new ArrayList<>();
        for (Room room: availableRooms){
            byte[] photoBytes = roomServiceImpl.getRoomPhotoByRoomId(room.getId());

            if (photoBytes!= null && photoBytes.length > 0){
                String photoBase64 = Base64.encodeBase64String(photoBytes);
                RoomResponse roomResponse = getRoomResponse(room);
                roomResponse.setPhoto(photoBase64);
                roomResponses.add(roomResponse);
            }

        }
        if (roomResponses.isEmpty()){
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(roomResponses);
        }
    }


    private RoomResponse getRoomResponse(Room room) {

        List<BookedRoom> bookings = getAllBookingsByRoomId(room.getId());
//        List<BookingResponse> bookingInfo = bookings
//                .stream()
//                .map(booking -> new BookingResponse(
//                        booking.getBookingId(),
//                        booking.getCheckInDate(),
//                        booking.getCheckOutDate(),
//                        booking.getBookingConfirmationCode()
//                )).toList();

        byte[] photoBytes = null;
        Blob photoBlob = room.getPhoto();
        if (photoBlob !=null){
            try {
                photoBytes = photoBlob.getBytes(1, (int) photoBlob.length());
            } catch (SQLException e) {
                throw new PhotoRetriverException("Error retriving Photo.");
            }
        }
        return new RoomResponse(
                room.getId(),
                room.getRoomType(),
                room.getRoomPrice(),
                room.isBooked(),
                photoBytes
//                bookingInfo
        );
    }



    private List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return bookingService.getAllBookingsByRoomId(roomId);
    }
}
