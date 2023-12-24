import React from 'react';
import { useState } from 'react';
import { addRoom } from '../utils/ApiFunctions';
import RoomTypeSelector from '../common/RoomTypeSelector';
import { Link } from 'react-router-dom';
import ExistingRooms from './ExistingRooms';


const AddRoom = () => {
    //console.log("+++++ In Add Room");
    const [newRoom, setNewRoom] = useState({
        photo: null,
        roomType: '',
        roomPrice: ''
    });

    const [imagePreview, setImagePreview] = useState("");
    const [sucessMsg, setSucessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const updateRoomType = (data) => {
        console.log("++++ data", data);
        setNewRoom({...newRoom, roomType:data});
    }


    const handleRoomInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        if(name === 'roomPrice'){
            if (!isNaN(value)) {
                value = parseInt(value);
            }
            else{
                value = null;
            }
        }
        
        setNewRoom({...newRoom, [name]:value});
    };



    const handleRoomImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setNewRoom({...newRoom, photo:selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))

    }
    const handleNewRoomTypeInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        // console.log("New room type input change:", e.target.value);
        // console.log("++++++ new room for room type", newRoom);
        setNewRoom({...newRoom, [name]:value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("++++ new room from handleSubmit : ", newRoom);
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
            console.log("++++ success value:", success);

            if (success) {
                setSucessMsg("Room added successfully!");
                setErrorMsg("");
                setNewRoom({
                    photo: null,
                    roomType: '',
                    roomPrice: ''
                });
                setImagePreview("");
    
            } else {
                setErrorMsg("Failed to add room");
                setSucessMsg("");
            }
    
        } catch (error) {
            setErrorMsg(error.errorMessage);
    
        }
        setTimeout(() => {  
            setSucessMsg("");
            setErrorMsg("");
        }, 2000);
        // window.location.reload();
    }
    return (
       // <p>Hello Beautiful</p>
        <section className="container mt-5 mb-5">
            <div className='row justify-content-center'>
            <div className='col-md-8 col-lg-6'>
                <h2 className='mt-5 mb-2'> Add a New Room </h2>

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
                            handleNewRoomTypeInputChange={handleNewRoomTypeInputChange}  // Corrected prop name
                            newRoom={newRoom}
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
                        value={newRoom.roomPrice}
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
                            <img src={imagePreview}
                            alt='Preview Room Photo'
                            style={{maxWidth:"400px", maxHeight:"400px"}}
                            className="mb-3"/>
                        )}
                    </div>

                    <div className='d-grid d-md-flex mt-2'>
                    
                        <button className='btn btn-sm btn-outline-primary ml-5 '> Save Room </button>
                        <Link to={"/existing-rooms"} className='btn btn-outline-info'style={{ marginLeft: '0.5rem' }}>
                            All Rooms
                        </Link>

                    </div>


                </form>

            </div>

        </div>
       </section>
        );
    };

export default AddRoom;
