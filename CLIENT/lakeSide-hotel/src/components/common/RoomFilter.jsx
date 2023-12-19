import React, { useState } from 'react';

const RoomFilter = ({ data, setFilteredData }) => {
  const [filter, setFilter] = useState();
//   console.log("=======Room Filter=======");
    // console.log("Data:", data);

  
  const handleSelectChange = (e) => {
    const selectedRoomType = e.target.value;
    // console.log("Selected Room Type:", selectedRoomType);
  
    // Check if data is an array before using map
    if (Array.isArray(data)) {
      const filteredRooms = data.filter((room) =>
        room.roomType && room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase())
      );
    //   console.log("Filtered Rooms:", filteredRooms);
      setFilteredData(filteredRooms);
    }
  };
  

const clearFilter = () => {
    // console.log("RoomFilter.jsx");
    if (Array.isArray(data)) {
      setFilteredData(data);
    }
    setFilter("");
  };

  // Check if data is an array before using map
  const roomTypes = Array.isArray(data)
    ? ["", ...new Set(data.map((room) => room.roomType))]
    : [];


  return (
    <div className='input-group mb-3'>
      <span className='input-group-text' id='room-type-filter'>
        Filter Rooms by Types
      </span>
      <select
        className='form-select'
        value={filter}
        onChange={handleSelectChange}
      >
        <option value=""> Select a Room Type to Filter </option>
        {roomTypes.map((type, index) => (
          <option key={index} value={type}>
            {type} 
          </option>
        ))}
      </select>
      <button className='btn btn-hotel' type="button" onClick={clearFilter}>
        Clear Filter
      </button>
    </div>
  );
};

export default RoomFilter;
