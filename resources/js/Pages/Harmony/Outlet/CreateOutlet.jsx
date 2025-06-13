import React from 'react'
import PropTypes from 'prop-types'
import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import Header from '@/Components/Argon/Headers/Header';
import OutletInfForm from './partials/OutletInfForm';

const CreateOutlet = props => {
    const {data, setData,post, errors} = useForm({
        'nama': null,
        'nickname': null,
        'alamat': null,
        'latitude': null,
        'longitude': null,
        'kode_qris': null,
        'telpon': null,
        'keterangan': null

    })

    const submit = (e)=>{
        post(route('outlet.store'));
    }
  const {auth} = props;
    return (
    <AdminLayout
        user={auth.user}
        header="Tambah Outlet"
    >
        <Head title='Tambah Outlet'/>
        <Header>
            <Container>

                <Button
                    color='secondary'
                    href={route('outlet.index')}
                    tag={Link}
                    size='sm'
                >
                    <i className="fa-solid fa-arrow-left"></i>
                    <span>Kembali</span>
                </Button>
            </Container>
        </Header>

        <Container fluid className='mt--7 min-vh-100'>
            <Row>
                <Col md="6">
                    <Card className='bg-secondary shadow'>
                        <CardHeader className=''>
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-0">Laundry</h3>
                                </Col>
                                <Col className="text-right" xs="4">
                                    <Button
                                        color="primary"
                                        onClick={submit}
                                        size="sm"
                                    >
                                        <i className='fa fa-save mr-1'></i>
                                        Simpan
                                    </Button>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <h6 className='heading-small text-muted mb-4'>
                                Laundry Information
                            </h6>
                            <div className='pl-lg-3'>
                                <OutletInfForm
                                    data={data}
                                    errors={errors}
                                    setData={setData}
                                    post={post}
                                    submit={submit}
                                />
                            </div>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>

    </AdminLayout>
  )
}

CreateOutlet.propTypes = {}

export default CreateOutlet
