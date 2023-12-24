import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

const Footer = () => {
    let today = new Date();
    return (
        <footer className='bg-dark text-light  py-3 footer mt-lg-'>
            <Container>
                <Row>
                    <Col xs={12} md={12} className='text-center'>
                    <p className='mb-0'>&copy; {today.getFullYear()} lakeSide Hotel </p>
                    
                    </Col>
                </Row>


            </Container>
        </footer>
    );
};

export default Footer;
