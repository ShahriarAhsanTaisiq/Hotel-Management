import React from 'react';
import { useState } from 'react';
import { getAvailableRooms } from '../utils/ApiFunctions';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import moment from 'moment';
import RoomTypeSelector from './RoomTypeSelector';
import RoomSearchResult from './RoomSearchResult';


const RoomSearch = () => {

    const [searchQuery, setSearchQuery] = useState({
        checkInDate: '',
        checkOutDate: '',
        roomType: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [availableRooms, setAvailableRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        const checkInMoment = moment(searchQuery.checkInDate);
        const checkOutMoment = moment(searchQuery.checkOutDate);
        if(!checkInMoment.isValid() || !checkOutMoment.isValid()) {
            setErrorMessage('Please, enter a valid date.');
            return;
        } 
        if (!checkOutMoment.isAfter(checkInMoment)) {
            setErrorMessage('Check in date must be come before check out date.');
            return;
        }
        setIsLoading(true);
        getAvailableRooms(searchQuery.checkInDate, 
            searchQuery.checkOutDate, 
            searchQuery.roomType).then((response) => {
                setAvailableRooms(response.data);
                
                setTimeout(() => { 
                    setIsLoading(false);
                }, 2000);
            }).catch((error) => {  
            setErrorMessage(error.message);
        }).finally(() => {
            setIsLoading(false);
        }
        );
    }

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setSearchQuery({
    //         ...searchQuery,
    //         [name]: value
    //     });
    
    //     // Validate date format
    //     const checkInDate = moment(name === 'checkInDate' ? value : searchQuery.checkInDate);
    //     const checkOutDate = moment(name === 'checkOutDate' ? value : searchQuery.checkOutDate);
    
    //     if (!checkInDate.isValid() || !checkOutDate.isValid() || !checkOutDate.isAfter(checkInDate)) {
    //         setErrorMessage('Please, enter a valid date range.');
    //     } else {
    //         setErrorMessage('');
    //     }
    // }
    
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchQuery({
            ...searchQuery,
            [name]: value
        });
        const checkInDate = moment(searchQuery.checkInDate);
        const checkOutDate = moment(searchQuery.checkOutDate);
        if (checkInDate.isValid() && checkOutDate.isValid()) {
            setErrorMessage('');
        }
    }

    const handleClearSearch = () => {
        setSearchQuery({
            checkInDate: '',
            checkOutDate: '',
            roomType: ''
        });
        setAvailableRooms([]);
    }
    

    return (
        <>
            <Container className='mt-5 mb-5 py-5 shadow'>
                <h4 className='hotel-color mb-3 text-center'>Search for Available Rooms</h4>
                <Form onSubmit={handleSearch}>
                    <Row className='justify-content-center'>
                        <Col xs={12} md={3}>
                            <Form.Group controlId='checkInDate'>
                                <Form.Label> <strong>Check In</strong></Form.Label>
                                <Form.Control 
                                    type='date'
                                    name='checkInDate'
                                    value={searchQuery.checkInDate}
                                    onChange={handleInputChange}
                                    min={moment().format('YYYY-MM-DD')}
                                    required/>
                            </Form.Group>                   
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group controlId='checkOutDate'>
                                <Form.Label><strong>Check Out</strong></Form.Label>
                                <Form.Control 
                                    type='date'
                                    name='checkOutDate'
                                    value={searchQuery.checkOutDate}
                                    onChange={handleInputChange}
                                    min={moment().format('YYYY-MM-DD')}
                                    required/>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Group controlId='roomType'>
                                <Form.Label><strong>Room Type</strong></Form.Label>
                                <div className='d-flex gap-1'>
                                    <RoomTypeSelector
                                        roomType={searchQuery.roomType}
                                        handleNewRoomTypeInputChange={handleInputChange}
                                        newRoom={searchQuery}
                                    />
                                    <div>
                                    <Button type='submit' variant='secondary' className='btn btn-hotel'>Search</Button>
                                    </div>
                                </div>

                            </Form.Group>
                            
                        </Col>
                        
                    </Row>
                </Form>
                {isLoading ? (
                <p>Finding Available Rooms..</p> 
                ): availableRooms ? (
                    <RoomSearchResult
                    results={availableRooms}
                    onClearSearch={handleClearSearch}
                    />
                ):(
                    <p> No Rooms Availables for the Selected Dates.</p>
                )}
                {errorMessage && (
                    <p className='text-danger'>{errorMessage}</p>
                )}
                
            </Container>
        </>
    );
};

export default RoomSearch;
