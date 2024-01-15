import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddRoom from './components/room/AddRoom';
import ExistingRooms from './components/room/ExistingRooms';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import EditRoom from './components/room/EditRoom';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/NavBar';
import RoomListing from './components/room/RoomListing';
import Admin from './components/admin/Admin';
import CheckOut from './components/bookings/CheckOut';
import BookingSuccess from './components/bookings/BookingSucess';
import Bookings from './components/bookings/Bookings';
import FindBooking from './components/bookings/FindBooking';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Profile from './components/auth/Profile';
import Logout from './components/auth/Logout';
import AuthProvider from './components/auth/AuthProvider';
import RequireAuth from './components/auth/RequireAuth';

function App() {
  return (
    <AuthProvider>
      <main>
            <Router
            path = "/book-room/:roomId"
            element={
              <RequireAuth>
                <CheckOut/>
              </RequireAuth>
              
            }> 

                <Navbar/>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/edit-room/:id" element={<EditRoom/>} />
                <Route path="/existing-rooms" element={<ExistingRooms/>} />
                <Route path="/add-room" element={<AddRoom/>} />
                <Route path="/book-room/:id" element={<CheckOut/>} />
                <Route path="/browse-all-rooms" element={<RoomListing/>} />
                <Route path="/booking-sucess" element={<BookingSuccess/>} />
                <Route path="/admin" element={<Admin/>} /> 
                <Route path="/existing-bookings" element={<Bookings/>} />
                <Route path="/find-booking" element={<FindBooking/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Registration/>} />  
                <Route path="/profile" element={<Profile/>} />
                <Route path="/logout" element={<FindBooking/>} /> 
              </Routes>              
            </Router>
            <Footer/>
                
      </main>
    </AuthProvider>
  );
}

export default App;




