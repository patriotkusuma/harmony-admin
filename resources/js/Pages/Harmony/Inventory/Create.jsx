import Header from '@/Components/Argon/Headers/Header';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react'
import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';

const Create = (props) => {
    const {auth} = props;
    const {data, setData, errors, reset, patch, post, get} = useForm({
        'id': '',
        'nama': '',
    });


    const submit = (e) => {
        console.log('kdjfkdjf');
    }


  return (
    <AdminLayout user={auth.user} header={(data.nama == '' ? "Tambah" : "Edit") + " Barang"} >
        <Header>

        </Header>

        <Container className='mt--7' fluid>
            <Row>
                <Col>
                    <Button
                        color='secondary'
                        href={route('inventory.index')}
                        tag={Link}
                        size='sm'
                        >
                            <i class="fa-solid fa-arrow-left"></i>
                            <span>Kembali</span>
                    </Button>
                </Col>
            </Row>

            <Row className='mt-3'>
                <Col>
                    <Card className='bg-secondary shadow'>
                        <CardHeader className='bg-white border-0'>
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-0">{data.nama == '' ? 'Tambah' : 'Edit'} Data</h3>
                                </Col>
                                <Col className="text-right" xs="4">
                                    <Button
                                        color="primary"
                                        onClick={submit}
                                        size="sm"
                                    >
                                        Save
                                    </Button>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {/* Form */}
                            <Form>
                                <FormGroup>
                                    <Label className='form-control-label'>
                                        Nama Barang *
                                    </Label>
                                    <Input
                                        className='form-control-alternative'
                                        id='nama'
                                        name='nama'
                                        placeholder='Nama Barang'
                                        type='text'
                                        required
                                        defaultValue={data != null ? data.nama : ''}
                                        onChange={(e) => setData('nama', e.target.value)}
                                        invalid={errors.nama && true}
                                    />
                                </FormGroup>

                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    </AdminLayout>
  )
}

export default Create
