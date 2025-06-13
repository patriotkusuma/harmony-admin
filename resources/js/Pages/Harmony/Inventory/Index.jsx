import Header from '@/Components/Argon/Headers/Header';
import CustomTable from '@/Components/Custom/Tables/CustomTable';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react'
import { Col, Container, Row } from 'reactstrap';

const headRow = [
    "No",
    "Nama",
    "Tanggal Beli",
    "Tanggal Digunakan",
    "Tanggal Hanis",
    "Action"
];

const Index = (props) => {
    const {auth, inventories}= props;
    const {get} = useForm();
    const addData = () => {
        get(route('inventory.create'))
    }
    return (
        <AdminLayout user={auth.user} header="Gudang" >
            <Head title='Gudang'/>

            <Header>

            </Header>
            <Container className='mt--7' fluid>
                <Row>
                    <Col>
                        <CustomTable
                            isAdd={true}
                            data={inventories}
                            tableHead='Gudang'
                            headData={headRow}
                            addData={addData}
                        >

                        </CustomTable>
                    </Col>
                </Row>
            </Container>
        </AdminLayout>
    )
}

export default Index
