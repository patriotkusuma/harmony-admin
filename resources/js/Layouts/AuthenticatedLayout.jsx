import AuthFooter from '@/Components/Argon/Footers/AuthFooter';
import AuthNavbar from '@/Components/Argon/Navbars/AuthNavbar';
import React, { useRef } from 'react'
import {useLocation} from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap';

export default function AuthenticatedLayout({children}) {
    const mainContent = useRef(null);

    React.useEffect(()=>{
        document.body.classList.add('bg-default');
        return()=>{
            document.body.classList.remove('bg-default');
        }
    },[]);

    return (
        <>
            <div className='main-content' ref={mainContent}>
                <AuthNavbar/>
                <div className='header bg-gradient-info py-7 py-lg'>
                    <Container>
                        <div className='header-body text-center mb-7'>
                            <Row className='justify-content-center'>
                                <Col lg="5" md="6">
                                    <h1 className="text-white">Welcome !</h1>
                                    <p className="text-lead text-light">
                                        Use these awesome forms to login or create new account in
                                        your project for free.
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                    <div className='separator separator-bottom separator-skew zindex-100'>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                        >
                        <polygon
                            className="fill-default"
                            points="2560 0 2560 100 0 100"
                        />
                        </svg>
                    </div>
                </div>
                {/* Page content */}
                <Container className='mt--8 pb-5'>
                    <Row className='justify-content-center'>
                        {children}
                    </Row>
                </Container>
                <AuthFooter/>
            </div>
        </>
    )
}
