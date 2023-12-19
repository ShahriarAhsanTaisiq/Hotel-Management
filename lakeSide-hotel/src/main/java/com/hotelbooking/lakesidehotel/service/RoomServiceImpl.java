package com.hotelbooking.lakesidehotel.service;

import com.hotelbooking.lakesidehotel.exception.InternalServerException;
import com.hotelbooking.lakesidehotel.exception.ResourceNotFoundException;
import com.hotelbooking.lakesidehotel.model.Room;
import com.hotelbooking.lakesidehotel.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    // Constructor injection
    @Autowired
    public RoomServiceImpl(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Override
    public Room addNewRoom(MultipartFile file, String roomType, BigDecimal roomPrice) throws SQLException, IOException {
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);
        if (!file.isEmpty()){
            byte[] photoBytes = file.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            room.setPhoto(photoBlob);
        }
        return roomRepository.save(room);
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException {
        Optional<Room> theRoom = roomRepository.findById(roomId);

        if (theRoom.isEmpty()){
            throw new ResourceNotFoundException("Sorry, the room not found.");
        }
        Blob photoBlob = theRoom.get().getPhoto();
        if (photoBlob != null){
            return photoBlob.getBytes(1,(int) photoBlob.length());

        }

        return null;
    }

    @Override
    public void deleteRoom(Long id) {
        Optional<Room> theRoom = roomRepository.findById(id);
        if (theRoom.isPresent()){
            roomRepository.deleteById(id);
        }
    }

    @Override
    public Room updateRoom(Long id, String roomType, BigDecimal  roomPrice, byte[] photoBytes) throws InternalServerException {
        Room room = roomRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Room Not Found"));
        if (roomType!=null){
            room.setRoomType(roomType);
        }
        if (roomPrice!=null){
            room.setRoomPrice(roomPrice);
        }
        if (photoBytes!= null && photoBytes.length >0){
            try{
                room.setPhoto(new SerialBlob(photoBytes));

            }catch (SQLException ex){
                throw new InternalServerException("Error updating Room.");
            }
        }


        return roomRepository.save(room);
    }

    @Override
    public Optional<Room> getRoomById(Long id) {
        return Optional.of(roomRepository.findById(id).get());
    }
}

