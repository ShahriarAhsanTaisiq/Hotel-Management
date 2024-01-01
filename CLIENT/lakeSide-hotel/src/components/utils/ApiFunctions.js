import axios from 'axios';
import FormData from 'form-data';

export const api = axios.create({
    baseURL: 'http://localhost:9192/' 
});


// This function add a new room to the database
export async function addRoom(photo, roomType, roomPrice) {
    try {
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("roomType", roomType);
        formData.append("roomPrice", roomPrice);

        // console.log("++++ formData:", formData);
        const response = await api.post('/rooms/new', formData);
        // let data = 0;
        console.log("++++ API Response:", response);
        if (response.status === 200) {
            // data = 1;
            // console.log("data value:", data);
            return true;
        } else {
            throw new Error(`Failed to add room. Server returned status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error adding room: ${error.message}`);
    }

}

export async function getRoomType() {
    try {
        const response = await api.get('/rooms/roomType');
        return response.data;
    } catch (error) {
        throw new Error("Error in getting room type");
    }
}

// This function get all the rooms from the database
export default async function getAllRooms() {
    try {
        const result = await api.get('/rooms/all-rooms');
        return result.data;
    } catch (error) {
        throw new Error("Error in getting all rooms");
    }
}

// This function delete a room by ID
export async function deleteRoom(id) {
    console.log("++++ I am froom delete function ID:", id);
    try {
        const response = await api.delete(`/rooms/delete/room/${id}`);
        console.log("++++ API Response:", response);
           return response;
         
    } catch (error) {
        throw new Error(`Error deleting room: ${error.message}`);
    }
}

// This function update a room by ID
export async function updateRoom(id, photo, roomType, roomPrice) {  
   console.log("++++ I am from update function ID:", id);
    try {
        console.log("++++----> API submntion start:" );
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("roomType", roomType);
        formData.append("roomPrice", roomPrice);

        const response = await api.put(`/rooms/update/${id}`, formData);
        console.log("++++----> API Response:", response);
        return response;
        } catch (error) {
            // console.error("Error updating room:", error);
            throw new Error(`Error updating room: ${error.message}`);
        }
}

// This function get a room by ID
export async function getRoomById(id) {
    // console.log("++++ I am froom getRoomById function ID:", id);
    try {
        const response = await api.get(`/rooms/room/${id}`);
        // console.log("++++ API Response getRoomById :", response);
        return response.data;
    } catch (error) {
        throw new Error(`Error getting room: ${error.message}`);
    }
}
// This function get all the bookings from the database
export async function bookRoom(id,booking){
    try {
        const response = await api.post(`bookings/room/${id}/booking`,booking);
        return response.data;
    }
    catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data);
        }
        else{
            throw new Error(`Error Booking Room:  ${error.message}`);
        }
    }
}

// This function get all the bookings from the database
export async function getAllBookings(){
    try {
        const response = await api.get('/bookings/all-bookings');
        return response.data;
    } catch (error) {
        throw new Error(`Error in getting all bookings: ${error.message}`);
    }
}

// This function get the bookings by confirmation code from the database
export async function getBookingByConfirmationCode(confirmationCode){
    try {
        const response = await api.get(`/bookings/confirmation/${confirmationCode}`);
        return response.data;
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data);
        }else{
            throw new Error(`Error in getting booking: ${error.message}`);
        }
    }
}

// This function cancel the booking by bookingId from the database
export async function cancelBooking(bookingId){
    // console.log("++++ I am froom cancelBooking function bookingId:", bookingId);
    try {
        const response = await api.delete(`/bookings/booking/${bookingId}/delete`);
        return response.data;
    } catch (error) {

        throw new Error(`Error in cancelling booking: ${error.message}`);
    }
}

// This function gets all available rooms from database with a given date and room type
export async function getAvailableRooms(checkInDate, checkOutDate, roomType){
    // console.log("GetAvailableRooms function roomType:", roomType);
    // console.log("GetAvailableRooms function checkInDate:", checkInDate);
    // console.log("GetAvailableRooms function checkOutDate:", checkOutDate);
    const response = await api.get(`/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`);
    // console.log("++++ API Response getAvailableRooms :", response);
    return response;

}