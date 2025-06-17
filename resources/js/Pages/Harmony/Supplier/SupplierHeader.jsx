import Header from '@/Components/Argon/Headers/Header'
import React from 'react'
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap'

const SupplierHeader = () => {

    return (
        <>
            <Header>
                <Col md="6">
                    <Card className='card-stats mb-4 mb-xl-0'>
                        <CardBody>
                            <Row>
                                <div className='col'>
                                    <CardTitle
                                        tag={'h5'}
                                        className='text-uppercase text-muted mb-0'
                                    >
                                        Supplier
                                    </CardTitle>
                                    <span className='h2 font-weight-bold mb-0'>
                                        0
                                    </span>
                                </div>
                                <Col className='col-auto'>
                                    <div className='icon icon-shape bg-success text-white rounded-circle shadow'>
                                        <i className='fa-solid fa-building-columns'></i>
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

export default SupplierHeader
