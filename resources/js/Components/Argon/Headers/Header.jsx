import React from "react";
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";

const Header = ({ children }) => {
    return (
        <>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-7">
                <Container fluid>
                    <div className="header-body">
                        {/* Card Stats */}
                        <Row>{children}</Row>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default Header;
