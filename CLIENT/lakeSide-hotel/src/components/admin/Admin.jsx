import React from 'react';
import { Link } from 'react-router-dom';


const Admin = () => {
    return (
        <section className='container mt-5'>
            <h2>Welcome to the Admin Panel!</h2>
            <hr />
            <Link to={"/add-room"}>
            Manage Rooms
            </Link>
            {/* Add your admin-specific content here */}
        </section>
    );
};

export default Admin;
