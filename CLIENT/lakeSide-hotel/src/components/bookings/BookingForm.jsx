import React, { useEffect } from 'react';
import { getRoomById } from '../utils/ApiFunctions';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { bookRoom } from '../utils/ApiFunctions';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import BookingSummary from './BookingSummary';




const BookingForm = () => {

    const [isValidated, setIsValidated] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessages, setErrorMessages] = useState('');
    const [roomPrice, setRoomPrice] = useState(0);

    const currentUser = localStorage.getItem('userId');

    const [booking, setBooking] = useState({
        guestFullName: '',
        guestEmail: currentUser,
        checkInDate: '',
        checkOutDate: '',
        numOfAdults: '',
        numOfChildren: ''
    });

    const [roomInfo, setRoomInfo] = useState({
        photo: '',
        roomType: '',
        roomPrice: '',
    });

    const formRef = React.createRef();
    const {id} = useParams(); 
    const navigate = useNavigate();

const handleInputChange = (e) => {
    console.log("handleInputChange");
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    setErrorMessages("");
}

const getRoomPriceById = async(id) => {
    try {
        const response = await getRoomById(id);
        setRoomPrice(response.roomPrice);
    } catch (error) {
        throw new Error(error);
    }
}

useEffect(() => {
    getRoomPriceById(id);
} ,[id]);


const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate, 'days');
    const price = roomPrice ? roomPrice : 0
    return diffInDays * price;
}


const isGuestValid = () => {
    const adultCount = parseInt(booking.numOfAdults);
    const childCount = parseInt(booking.numOfChildren);
    const totalCount = adultCount + childCount;
    return totalCount >=1 && adultCount >= 1;
}

const isCheckOutDateValid = () => {
    if(!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
        setErrorMessages("Check out date must be after check in date");
        return false;
     } else {
            setErrorMessages("");
            return true;
        }
}
const isCheckInDateValid = () => {
    const today = moment().startOf('day'); // Get the start of today
    const checkInDate = moment(booking.checkInDate);
  
    if (!checkInDate.isSameOrAfter(today)) {
      setErrorMessages("Check-in date must be today or after today");
      return false;
    } else {
      setErrorMessages("");
      return true;
    }
  };
  

const handleSubmit = (e) => {
    e.preventDefault();
  
    const form = formRef.current;
  
    if (form.checkValidity() === false || !isGuestValid() || !isCheckOutDateValid() || !isCheckInDateValid()) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
  
    setIsValidated(true);
  };
  

// const handleSubmit = (e) => {
//         e.preventDefault();
//         if (Form.checkValidity() === false || isGuestValid() || !isCheckOutDateValid()) {
//             e.stopPropagation();
//         } else {
//             setIsSubmitted(true);
//         }
//         setIsValidated(true);
//     }
    
const handleFormSubmit = async () => {
    try {
        const confirmationCode = await bookRoom(id,booking);
        setIsSubmitted(true);
        navigate("/booking-sucess", { state: { message: confirmationCode } });
    } catch (error) {
        const errorMessages = error.message;
        // setErrorMessages(error.message);
        navigate("/booking-sucess", { state: { error: errorMessages} }); 
    }
}

        return (
            <>
            <div className='container mb-5'>
                <div className='row'>

                    <div className='col-md-6'>
                        <div className='card card-body mt-5'>

                            <h4> Reserved <br/> Room</h4>
                            <hr />
                            <Form noValidate ref={formRef} validated={isValidated} onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor='guestFullName'>Full Name : </Form.Label>

                                    <Form.Control
                                        required
                                        type='text'
                                        id='guestFullName'
                                        name='guestFullName'
                                        value={booking.guestFullName}
                                        placeholder='Enter your full name'
                                        onChange={handleInputChange}
                                          
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        Please enter your full name
                                    </Form.Control.Feedback> 
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label htmlFor='guestEmail'>Email :</Form.Label>
                                        <Form.Control
                                            required
                                            type='email'
                                            id='guestEmail'
                                            name='guestEmail'
                                            value={booking.guestEmail}
                                            placeholder='Enter your email'
                                            onChange={handleInputChange}
                                            
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            Please enter your email
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <fieldset style={{border: "2px"}}>
                                        <h5 className='mt-2'>Lodging Period</h5 >
                                        <div className='row'>
                                            <div className='col-6'>
                                                    <Form.Label htmlFor='checkInDate'>Check In Date :</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type='date'
                                                        id='checkInDate'
                                                        name='checkInDate'
                                                        value={booking.checkInDate}
                                                        placeholder='Enter your check in date'
                                                        onChange={handleInputChange}
                                                        
                                                    />
                                                    <Form.Control.Feedback type='invalid'>
                                                        Please select your check in date
                                                    </Form.Control.Feedback>
                                            </div>
                                            <div className='col-6'>
                                                    <Form.Label htmlFor='checkOutDate'>Check Out Date :</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type='date'
                                                        id='checkOutDate'
                                                        name='checkOutDate'
                                                        value={booking.checkOutDate}
                                                        placeholder='Enter your check out date'
                                                        onChange={handleInputChange}
                                                        
                                                    />
                                                    <Form.Control.Feedback type='invalid'>
                                                        Please select your check out date
                                                    </Form.Control.Feedback>    
                                            </div>
                                            {errorMessages && <p className=' error-message text-danger'> {errorMessages}</p>}
                                        </div>
                                    </fieldset>

                                    <fieldset style={{border: "2px"}}>
                                        <h5 className='mt-2'>Number of Guest</h5>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <Form.Label htmlFor='numberOfAdults'>Adults :</Form.Label>
                                                <Form.Control
                                                    required
                                                    type='number'
                                                    id='numOfAdults'
                                                    name='numOfAdults'
                                                    value={booking.numOfAdults}
                                                    min={1}
                                                    placeholder='0'
                                                    onChange={handleInputChange}
                                                    
                                                />
                                                <Form.Control.Feedback type='invalid'>
                                                    Please select aleast one adult.
                                                </Form.Control.Feedback>
                                            </div>
                                            <div className='col-6'>
                                                <Form.Label htmlFor='numberOfChildren'>Children :</Form.Label>
                                                <Form.Control
                                                    required
                                                    type='number'
                                                    id='numOfChildren'
                                                    name='numOfChildren'
                                                    value={booking.numOfChildren}
                                                    placeholder='Number of child'
                                                    min={0}
                                                    onChange={handleInputChange}
                                                     />                                               
                                            </div>
                                        </div>
                                    </fieldset>
                                <div className='form-group mt-2 mb-2'>
                                    <button type='submit' className='btn btn-hotel'>
                                        Continue
                                    </button>
                                </div>
                            </Form>
                            <hr />
                        </div>
                    </div>
                     <div className='col-md-4'>
                                        {isSubmitted ? (
                                            <BookingSummary
                                            booking={booking}
                                            payment={calculatePayment()}
                                            isFormValid={isValidated}
                                            onConfirm={handleFormSubmit}  

                                            />
                                        ) : null}
                                     </div>
                                </div>
      
                            </div>
                            </>
                        );
    };

export default BookingForm;
