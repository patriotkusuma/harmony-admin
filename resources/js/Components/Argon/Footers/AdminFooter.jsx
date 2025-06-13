import React from 'react'
import { Col, Nav, NavItem, NavLink, Row } from 'reactstrap'

export const AdminFooter = () => {
  return (
    <footer className='footer mx-4' >
        <Row className='align-items-center justify-content-xl-between'>
            <Col xl="6">
                <div className="copyright text-center text-xl-left text-muted">
                    © {new Date().getFullYear()}{" "}
                    <a
                        className='font-weight-bold ml-1'
                        href='/'
                        rel='noopener noreferrer'
                        target='_blank'
                    >
                        Harmony Laundry
                    </a>
                </div>
            </Col>

            <Col xl="6">
                <Nav className='nav-footer justify-content-center justify-content-xl-end'>
                    <NavItem>
                        <NavLink
                            href='/'
                            target='_blank'
                        >
                            Harmony Laundry
                        </NavLink>
                    </NavItem>

                </Nav>
            </Col>
        </Row>
    </footer>
  )
}
