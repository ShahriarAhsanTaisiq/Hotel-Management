import React, { useEffect, useState } from 'react'; // Add missing import statement
import RoomFilter from '../common/RoomFilter';
import RoomPaginator from '../common/RoomPaginator';
import {Col} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import getAllRooms, {deleteRoom} from '../utils/ApiFunctions';
import { FaPlus, FaTrashAlt } from 'react-icons/fa'; 
import { FaEdit } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const ExistingRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(1);
    const [roomsPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const [selectedRoomType, setSelectedRoom] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {   
        fetchRooms();
    } ,[])

    const fetchRooms = async () => {
        setIsLoading(true);
        try {
          const response = await getAllRooms();
        //   console.log("API Response:", response);
          setRooms(response);
          setFilteredRooms(response);  
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching rooms:", error);
          setErrorMessage(error.message);
        }
      };
    

      useEffect(() => {
        if (selectedRoomType === "") {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter((room) => room.roomType === selectedRoomType);
            setFilteredRooms(filtered);
        }
        setCurrentPage(1);
    }, [selectedRoomType, rooms]); 
       

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    }; 
    
    
const handleDelete = async (id) => {
    try {
        const response = await deleteRoom(id);
        console.log("Delete Room Response:", response.status);
        if (response.status === 204) {
            console.log("Delete Room Response:", response);
            setSuccessMessage(`Room number ${id} deleted successfully`);
            fetchRooms();
        } else {
            console.log(`Delete Room Error: ${response ? response.message : 'Unknown error'}`);
            // setErrorMessage(response);
        }
    } catch (error) {
        console.error("Error deleting room:", error);
        setErrorMessage(error.message);
    }
    setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
    }, 3000);
};


    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalRooms =
          (filteredRooms && filteredRooms.length > 0 ? filteredRooms.length : 0) ||
          (rooms && rooms.length > 0 ? rooms.length : 0);
        //   console.log("Total Rooms:", totalRooms);
        //   console.log("Rooms Per Page:", roomsPerPage);
        //   console.log("Total Pages:", Math.ceil(totalRooms / roomsPerPage));
        return Math.ceil(totalRooms / roomsPerPage);
      };
    
    
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    // console.log("indexOfLastRoom:", indexOfLastRoom);
    // console.log("indexOfFirstRoom:", indexOfFirstRoom);
    // console.log("Filtered Rooms Length:", filteredRooms.length);
    const currentRooms = filteredRooms ? filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom) : [];
    // console.log("Current Rooms:", currentRooms); 
    return (
        <>
        <div className='container col-md-8 col-lg-6'>
            {successMessage && <p className='alert alert-sucess t-5'> {successMessage} </p>}
            {errorMessage && <p className='alert alert-danger t-5'> {errorMessage} </p>}
        </div>
            {isLoading ? (
            <p> Loading Existing Rooms </p>

            ) : (
                <>
                <section className=' mt-5 mb-5 container'>
                    <div className='d-flex justify-content-between mb-3 mt-5'>
                        <h2>
                            Existing Rooms
                        </h2>
                        </div>
                        <Row>
                        <Col md={6} className='mb-3 mb-md-0'>
                            <RoomFilter data = {rooms} setFilteredData = {setFilteredRooms}/>
                        </Col>
                        <Col md={6} className='d-flex justify-content-end'>
                        <Link to={"/add-room"}>
                            <FaPlus/>Add Room 
                        </Link>
                        </Col> 
                        </Row>

                        <table className='table table-bordered table-hover'>
                            <thead>
                                <tr className='text-center'>
                                    <th >Id</th>
                                    <th >Room Type</th>
                                    <th >Room Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRooms.map((room) => (
                                        <tr key={room.id} className='text-center'>
                                        <td>{room.id}</td>
                                        <td>{room.roomType}</td>
                                        <td>{room.roomPrice}</td>
                                        <td className='gap-2'>
                                        <Link to={`/edit-room/${room.id}`}>
                                                
                                            <span className='btn btn-info btn-sm'>
                                                <FaEye/> 
                                            </span>
                                            <span className='btn btn-warning btn-sm'> 
                                                <FaEdit/> 
                                            </span>
                                                 
                                        </Link>
                                         <button
                                            className='btn btn-danger btn-sm'
                                            onClick={() => handleDelete(room.id)}>                                                
                                                <FaTrashAlt/>
                                        </button>                                           
                                    </td>
                                </tr>
                                ))}
                            </tbody>

                        </table>

                        <RoomPaginator
                            currentPage={currentPage}
                            totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                            onPageChange={handlePaginationClick}
                        />
                </section>
                </>
            )    
            }
        </>
    );

};

export default ExistingRooms;
