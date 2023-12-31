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


function App() {
  return (
    <>
      <main>
            <Router> 
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
              </Routes>              
            </Router>
            <Footer/>
                
      </main>
    </>
  );
}

export default App;




// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   // const [count, setCount] = useState(0)

//   return (
//     <>
//       {/* <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p> */}

//       <AddRoom/>
//     </>
//   )
// }

// export default App
