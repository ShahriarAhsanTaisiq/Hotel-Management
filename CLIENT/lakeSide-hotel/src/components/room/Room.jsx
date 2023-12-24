import React, { useEffect } from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import RoomCard from './RoomCard';
import RoomFilter from '../common/RoomFilter';
import RoomPaginator from '../common/RoomPaginator'; 
import getAllRooms from '../utils/ApiFunctions.js';



const Room = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [roomsPerPage, setRoomsPerPage] = useState(8)
    const [filterData, setFilteredData] = useState([{id:""}])

    useEffect(() => {
        setLoading(true)
        getAllRooms().then((data) => {
            setData(data)
            setFilteredData(data)
            setLoading(false)
        })
        .catch((error) => {
                setError(error.message)
                setLoading(false)
            })
    },[])

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div> 
            )
    }
    if(error) {
        return (
            <div className='text-danger'>
                <p> Error: {error}</p>
            </div>
        )
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const tatalPages = Math.ceil(filterData.length / roomsPerPage)

    const renderRooms = () => {
        const startIndex = (currentPage - 1) * roomsPerPage
        const endIndex = startIndex + roomsPerPage
        return filterData.slice(startIndex, endIndex).map((room) => <RoomCard key={room.id} room={room} />)
    }

    return (
        <Container>
            <Row>
                <Col md={6} className='mb-3 mb-md-0'>
                    <RoomFilter data={data} setFilteredData={setFilteredData} />
                </Col>

                <Col md={6} className='d-flex aling-items-center justify-content-end'>
                    <RoomPaginator 
                    currentPage={currentPage}
                    totalPages={tatalPages}
                    onPageChange={handlePageChange}
                    />
                </Col>
            </Row>

            <Row>{renderRooms()}</Row>

            <Row>
                <Col md={6} className='d-flex aling-items-center justify-content-end'>
                    <RoomPaginator 
                    currentPage={currentPage}
                    totalPages={tatalPages}
                    onPageChange={handlePageChange}
                    />
                </Col>
            </Row>

        </Container>
       
    );
};

export default Room;
