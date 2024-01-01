import React, { useState, useEffect } from 'react';
import getAllRooms from '../utils/ApiFunctions';
import { Carousel } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';


const RoomCarousel = () => {
    const[rooms , setRooms] = useState([{id:"",roomType:"",roomPrice:"",photo:""}])
    const[errorMessage , setErrorMessage] = useState('')
    const[loading , setLoading] = useState(true)


    useEffect(() => {
        setLoading(true)
        getAllRooms().then((data) => {
            setRooms(data)
            setLoading(false)
        }
        ).catch((error) => {
            setErrorMessage(error.message)
            setLoading(false)
        })
    }
    , [])

    if (loading) {
        return <div className='mt-5'>Loading Rooms...</div>
    }

    if (errorMessage) {
        return <div className='mt-5 text-danger mb-5'>Error: {errorMessage} </div>
    }

    return (
        <section className='bg-light mb-5 mt-5 shadow'>
            <Link to={'/browse-all-rooms'} className='hotel-color text-center py-5 px-3 '>
            Browse All Rooms
            </Link>

            <Container>
                <Carousel indicators={false}>
                        {[...Array(Math.ceil(rooms.length/4))].map((_,index)=> {
                            return (
                                <Carousel.Item key={index}>
                                    <Row>
                                        {rooms.slice(index*4 , (index*4)+4).map((room) => {
                                            return (
                                                <Col xs={12} md={6} lg={3}  className='mb-4' key={room.id}>
                                                    <Card>

                                                        <Link to={`/booked-room/${room.id}`}>
                                                            <Card.Img
                                                                variant='top' 
                                                                src={`data:image/jpeg;base64,${room.photo}`} 
                                                                alt="Room Photo"
                                                                className="w-100"
                                                                style={{height: '200px'}}
                                                            />
                                                        
                                                        </Link>

                                                        <Card.Body>
                                                            <Card.Title className='hotel-color'>{room.roomType}</Card.Title>
                                                            <Card.Title className='room-price'>${room.roomPrice}</Card.Title>
                                                            <div className='flex-shrink-0'>
                                                                <Link className='btn btn-sm btn-hotel' to={`/book-room/${room.id}`}>
                                                                    Book Now
                                                                </Link>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            )
                                        })}

                                    </Row> 
                                </Carousel.Item>
                            )
                                    })}


                </Carousel>
            </Container>
        </section>
    );
};

export default RoomCarousel;
