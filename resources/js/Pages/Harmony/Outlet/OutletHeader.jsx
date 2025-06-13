import React from "react";
import PropTypes from "prop-types";
import Header from "@/Components/Argon/Headers/Header";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";

function OutletHeader(props) {
    return (
        <Header>
            <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                        <Row>
                            <div className="col">
                                <CardTitle
                                    tag="h5"
                                    className="text-uppercase text-muted mb-0"
                                >
                                    Total Outlet
                                </CardTitle>
                                <span className="h2 font-weight-bold mb-0">
                                    0
                                </span>
                            </div>
                            <Col className="col-auto">
                                <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                                    <i className="fas fa-store"></i>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Header>
    );
}

OutletHeader.propTypes = {};

export default OutletHeader;
