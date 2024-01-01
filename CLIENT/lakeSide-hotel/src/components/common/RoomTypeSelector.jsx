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
        if (name === 'Add New') {
            setShowNewRoomTypeInput(true);
        } else {
            if (typeof handleNewRoomTypeInputChange === 'function') {
                handleNewRoomTypeInputChange({
                    target: {
                        name: 'roomType',
                        value: name,
                    },
                });
            }
        }
    };

    useEffect(() => {
        getRoomType().then((data) => {
            setRoomTypes(data);
        });
    }, []);

    const handleAddNewRoomType = () => {
        if (newRoomType !== '') {
            setRoomTypes([...roomTypes, newRoomType]);
            setNewRoomType('');
            if (typeof handleNewRoomTypeInputChange === 'function') {
                handleNewRoomTypeInputChange({
                    target: {
                        name: 'roomType',
                        value: newRoomType,
                    },
                });
            }
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
                            handleClick(e.target.value);
                        }}>
                        <option value=''>{selectedName}</option>
                        <option value='Add New'>Add New</option>
                        {roomTypes.map((type, index) => (
                            <option
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
