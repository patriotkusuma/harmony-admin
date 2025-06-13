import React from 'react'
import PropTypes from 'prop-types'
import Header from '@/Components/Argon/Headers/Header'
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap'
import AddComma from '@/Components/Custom/Services/AddComma'

const AccountHeader = props => {
  return (
    <>
        <Header>
            <Col lg="6" xl="2">
                <Card className='card-stats mb-4 mb-xl-0'>
                    <CardBody>
                        <Row>
                            <div className='col'>
                                <CardTitle
                                    tag={"h5"}
                                    className='text-uppercase text-muted mb-0'
                                >
                                    Assets
                                </CardTitle>
                                <span className='h2 font-weight-bold mb-0'>
                                    <AddComma value={0}/>
                                </span>
                            </div>
                            <Col className="col-auto">
                                <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                                    <i className="fa-solid fa-building-columns"></i>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col lg="6" xl="2">
                <Card className='card-stats mb-4 mb-xl-0'>
                    <CardBody>
                        <Row>
                            <div className='col'>
                                <CardTitle
                                    tag={"h5"}
                                    className='text-uppercase text-muted mb-0'
                                >
                                    Liability
                                </CardTitle>
                                <span className='h2 font-weight-bold mb-0'>
                                    <AddComma value={0}/>
                                </span>
                            </div>
                            <Col className="col-auto">
                                <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                    <i className="fa-solid fa-file-invoice-dollar"></i>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col lg="6" xl="2">
                <Card className='card-stats mb-4 mb-xl-0'>
                    <CardBody>
                        <Row>
                            <div className='col'>
                                <CardTitle
                                    tag={"h5"}
                                    className='text-uppercase text-muted mb-0'
                                >
                                    Equity
                                </CardTitle>
                                <span className='h2 font-weight-bold mb-0'>
                                    <AddComma value={0}/>
                                </span>
                            </div>
                            <Col className="col-auto">
                                <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                                    <i className="fa-solid fa-people-group"></i>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col lg="6" xl="2">
                <Card className='card-stats mb-4 mb-xl-0'>
                    <CardBody>
                        <Row>
                            <div className='col'>
                                <CardTitle
                                    tag={"h5"}
                                    className='text-uppercase text-muted mb-0'
                                >
                                    Revenue
                                </CardTitle>
                                <span className='h2 font-weight-bold mb-0'>
                                    <AddComma value={0}/>
                                </span>
                            </div>
                            <Col className="col-auto">
                                <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                    <i className="fa-solid fa-sack-dollar"></i>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col lg="6" xl="2">
                <Card className='card-stats mb-4 mb-xl-0'>
                    <CardBody>
                        <Row>
                            <div className='col'>
                                <CardTitle
                                    tag={"h5"}
                                    className='text-uppercase text-muted mb-0'
                                >
                                    Expense
                                </CardTitle>
                                <span className='h2 font-weight-bold mb-0'>
                                    <AddComma value={0}/>
                                </span>
                            </div>
                            <Col className="col-auto">
                                <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                    <i className="fa-solid fa-file-invoice"></i>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Header>
    </>
  )
}

AccountHeader.propTypes = {}

export default AccountHeader
