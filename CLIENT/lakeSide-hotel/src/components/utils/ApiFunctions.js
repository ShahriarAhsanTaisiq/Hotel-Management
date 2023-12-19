import axios from 'axios';

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

        const response = await api.post('/rooms/new');
        // let data = 0;
        // console.log("++++ API Response:", response);
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
export async function updateRoom(id,roomData) {
    console.log("abc",roomData)
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    formData.append("photo", roomData.photo);

    try {
        const response = await api.put(`/rooms/update/${id}`, formData);
        return response;
        } catch (error) {
        throw new Error(`Error updating room: ${error.message}`, formData);
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

