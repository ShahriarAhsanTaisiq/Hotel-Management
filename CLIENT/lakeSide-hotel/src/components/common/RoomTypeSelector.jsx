import React, { useEffect } from 'react';
import { getRoomType } from '../utils/ApiFunctions.js';
import { useState } from 'react';

const RoomTypeSelector = ({ handleNewRoomTypeInputChange, newRoom, roomType }) => {
    const [roomTypes, setRoomTypes] = useState([" "]);
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
    const [newRoomType, setNewRoomType] = useState('');
    const [selectedName, setSelectedName] = useState('Select Room Type');

    const handleClick = (name) => {
        setSelectedName(name);
        roomType(name);
    };

    useEffect(() => {
        getRoomType().then((data) => {
            setRoomTypes(data);
        });
    }, []);

    const handleAddNewRoomType = () => {
        console.log("++++ In Handle Add New Room Type");
        if (newRoomType !== '') {
            setRoomTypes([...roomTypes, newRoomType]);
            setNewRoomType('');
            roomType(newRoomType);
            setShowNewRoomTypeInput(false);
        }
    };

    return (
        <>
            {roomTypes.length > 0 && (
                <div>
                    <select
                        className='form-control w-100 mb-4'
                        id='roomType'
                        name='roomType'
                        value={newRoom.roomType}
                        onChange={(e) => {
                            // console.log("e.target.value:", e.target.value);
                            if (e.target.value === 'Add New') {
                                setShowNewRoomTypeInput(true);
                            } else {
                                handleClick(e.target.value);
                            }
                        }}>
                        <option value=''>{selectedName}</option>
                        <option value='Add New'>Add New</option>
                        {roomTypes.map((type, index) => (
                            <option
                                onClick={() => {
                                    handleClick(type);
                                }}
                                key={index}
                                value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    {showNewRoomTypeInput && (
                        <div className='input-group'>
                            <input
                                className="form-control"
                                type='text'
                                placeholder='Enter New Room Type'
                                onChange={(e) => setNewRoomType(e.target.value)}
                                value={newRoomType || ''}  // Ensure value is not null
                            />
                            <button
                                className='btn btn-hotel'
                                type='button'
                                onClick={handleAddNewRoomType}>
                                Add
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default RoomTypeSelector;

// Path: lakeSide-hotel/src/components/common/RoomTypeSelector.jsx