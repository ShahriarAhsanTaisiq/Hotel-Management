import React from 'react';
import MainHeader from '../layout/MainHeader';
import HotelService from '../common/HotelService';
import Parallax from '../common/Parallax';
import RoomCarousel from '../common/RoomCarousel';
import RoomSearch from '../common/RoomSearch';
import { useLocation } from 'react-router-dom';


const Home = () => {
    const location = useLocation()
    const message = location.state && location.state.message
    const currentUser = localStorage.getItem('currentUser')
    return (
        <>
            {message && <p className='text-warning text-center mt-2'> {message} </p> }
            {currentUser && <h6 className='text-success text-center'>You are logged in as {currentUser}</h6>}
                
            <section>
                <MainHeader />
                    <div className='container'>
                        <RoomSearch />
                        <RoomCarousel/>
                        <Parallax />
                        <HotelService />
                        <Parallax />
                        <RoomCarousel/>
                    </div>
            </section>
        </>
    );
};

export default Home;
