import React, { useEffect } from 'react';
import { getRoomById, updateRoom } from '../utils/ApiFunctions';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import RoomTypeSelector from '../common/RoomTypeSelector';
import { Link } from 'react-router-dom';


const EditRoom = () => {
    const [room, setRoom] = useState({
        photo: null,
        roomType: '',
        roomPrice: ''
    });

    const [imagePreview, setImagePreview] = useState("");
    const [sucessMsg, setSucessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const {id} = useParams(); 

    const updateRoomType = (data) => {
        // console.log("++++ data", data);
        setRoom({...room, roomType:data});
    }



    // const handleRoomImageChange = (e) => {
    //     const selectedImage = e.target.files[0]
    //     setRoom({...room, photo:selectedImage})
    //     setImagePreview(selectedImage)

    // }
    const handleRoomImageChange = (e) => {
        const selectedImage = e.target.files[0];
    
        // Check if a file is selected
        if (selectedImage) {
            // Read the file and convert it to a base64 string
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setRoom({ ...room, photo: selectedImage });
                setImagePreview(selectedImage);
            };
            reader.readAsDataURL(selectedImage);
        } else {
            // Handle the case when no file is selected
            setRoom({ ...room, photo: null });
            setImagePreview("");
        }
    };
    

    const handleRoomInputChange = (event) => { 
        const {name, value} = event.target;
        setRoom({...room, [name]:value});
    }

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await getRoomById(id);
                setRoom(roomData);
    
                // Check if photo is defined before setting imagePreview
                if (roomData.photo) {
                    setImagePreview(roomData.photo);
                } else {
                    setImagePreview(""); // or set to a default image if needed
                }
            } catch (error) {
                console.error("Error fetching room:", error);
                setErrorMsg(error.message);
            }
        }
    
        fetchRoom();
    }, [id]);
    

//     useEffect(() => {
//     const fetchRoom  = async () => { 
//         try {
//             const roomData = await getRoomById(id);
//             setRoom(roomData);
//             setImagePreview(roomData.photo);
//         } catch (error) {
//             console.error("Error fetching room:", error);
//             setErrorMsg(error.message);
//         }
//     }

//     fetchRoom();
// }, [id]);

    
    // const handleSubmit = async (e) => { 
    //     e.preventDefault();
    //     try {
    //         const success = await updateRoom(id,room);
    //         if (success.status === 200) {
    //             setSucessMsg("Room updated successfully!!");
    //             const updatedRoomData = await getRoomById(id);
    //             setRoom(updatedRoomData);
    //             setImagePreview(updatedRoomData.photo);
    //             setErrorMsg("");
    //         } else { 
    //             setErrorMsg("Error updating room. Please try again later.");
    //             setSucessMsg("");
    //         }
    //     }
    //         catch (error) {
    //             console.error("Error editing room:", error);
    //             setErrorMsg(error.message);
    //         }
    //     }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
    
            // Append photo, roomPrice, and roomType to FormData
            formData.append('photo', room.photo);
            formData.append('roomPrice', room.roomPrice);
            formData.append('roomType', room.roomType);
    
            // Call the updateRoom function with FormData
            const success = await updateRoom(id, formData);
    
            if (success.status === 200) {
                setSucessMsg("Room updated successfully!!");
                const updatedRoomData = await getRoomById(id);
                setRoom(updatedRoomData);
                setImagePreview(updatedRoomData.photo);
                setErrorMsg("");
            } else {
                setErrorMsg("Error updating room. Please try again later.");
                setSucessMsg("");
            }
        } catch (error) {
            console.error("Error editing room:", error);
            setErrorMsg(error.message);
        }
    };
    
                


    return (
        <section className="container mt-5 mb-5">
        <div className='row justify-content-center'>
        <div className='col-md-8 col-lg-6'>
            <h2 className='mt-5 mb-2'> Edit Room </h2>

            {sucessMsg && (
                <div className='alert alert-success fade show' role='alert'>
                    {sucessMsg}
                </div>
            )}

            {errorMsg && ( 
                <div className='alert alert-danger fade show' role='alert'> 
                    {errorMsg}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                 <div className='mb-3'>
                    <label htmlFor='roomType' className='form-label'> Room Type </label>
                    <div >  
                    <RoomTypeSelector 
                        handleNewRoomTypeInputChange={handleRoomInputChange}  
                        newRoom={room}
                        roomType={updateRoomType}
                    />
                    </div>
                </div>


                <div className='mb-3'>
                    <label htmlFor='roomPrice' className='form-label'> Room Price </label>
                    <input
                    className='form-control'
                    required
                    id='roomPrice'
                    name='roomPrice'
                    type='number'
                    value={room.roomPrice}
                    onChange={handleRoomInputChange}
                    />
                </div>

                <div className='mb-3'>
                        <label htmlFor='photo' className='form-label'> Room Photo </label>
                        <input
                        className='form-control mb-3 mr-3 ml-3'
                        required
                        id='photo'
                        name='photo'
                        type='file'
                       // value={newRoom.photo}
                        onChange={handleRoomImageChange}
                        />

                        {imagePreview && (
                            <img 
                            src={`data:image/jpeg;base64,${imagePreview}`}
                            alt='Room Photo Preview'
                            style={{maxWidth:"400px", maxHeight:"400px"}}
                            className="mb-3"/>
                        )}
                    </div>


                <div className='d-grid d-md-flex mt-2 gap-2'>
                        <Link to={"/existing-rooms"} className='btn btn-outline-info ml-5'>
                             Back
                        </Link>
                    <button className='btn btn-outline-warning ml-5'> 
                    Edit Room 
                    </button>

                </div>
            </form>   
        </div>
    </div>
   </section>
    );
};

export default EditRoom;
