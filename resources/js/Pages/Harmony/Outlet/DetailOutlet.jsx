import Header from '@/Components/Argon/Headers/Header'
import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, FormGroup, Label, Row } from 'reactstrap'
import OutletPegawai from './partials/OutletPegawai'
import OutletInfo from './partials/OutletInfo'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const DetailOutlet = (props) => {
    const {auth, outlet, pegawais, jabatans, flash} = props

    console.log(outlet)
    if('success' in flash){
        toast.info(flash.success)
    }
    return (
        <AdminLayout user={auth.user} header="Detail Outlet">
            <Head title='Daftar Outlet'/>
            <Header>
                <Container>
                    <Button
                        href={route('outlet.index')}
                        tag={Link}
                        size='sm'
                    >
                        <i className='fa fa-arrow-left mr-1'></i>
                        Kembali
                    </Button>
                </Container>
            </Header>
            <Container fluid className='mt--7'>


                <Row>
                    <Col md="5">
                        <OutletInfo outlet={outlet}/>
                    </Col>
                    <Col md="7">

                        <OutletPegawai
                            outlet={outlet}
                            pegawais={pegawais}
                            jabatans={jabatans}
                        >
                            {'pegawai_on_outlet' in outlet && outlet.pegawai_on_outlet.map((pegawaiOutlet, index) => (
                                <tr key={pegawaiOutlet.id}>
                                    <td>{index +1}</td>
                                    <td>{pegawaiOutlet.pegawai.nama}</td>
                                    <td>{pegawaiOutlet.jabatan.nama_jabatan}</td>
                                    <td>
                                        <Button
                                            color='warning'
                                            size='sm'
                                        >
                                            <i className='fa fa-pencil-square mr-1'></i>
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </OutletPegawai>
                    </Col>
                </Row>
            </Container>
            <ToastContainer limit={3} stacked/>

        </AdminLayout>
    )
}

export default DetailOutlet
