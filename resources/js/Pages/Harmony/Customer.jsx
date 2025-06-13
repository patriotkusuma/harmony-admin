import CustomTable from '@/Components/Custom/Tables/CustomTable';
import AdminLayout from '@/Layouts/AdminLayout'
import React from 'react'
import { Container, Row } from 'reactstrap';

const customerHead = [
    "No", "Identitas", "Pesanan Aktif", "Pesanan Selesai", "Action"
];

const Customer = (props) => {
    const {auth, customers, flash} = props;

    return (
        <AdminLayout
            header="Pelanggan"
            user={auth.user}
        >
            <header className="bg-gradient-info pb-8 pt-5 pt-md-8">
                <Container fluid>
                    <Row>
                        <div className="col">

                        </div>
                    </Row>
                </Container>
            </header>

            <Container className='mt--7' fluid>
                <Row>
                    <div className="col">
                        <CustomTable
                            data={customers}
                            tableHead="Pelanggan"
                            headData={customerHead}
                            >

                            </CustomTable>
                    </div>
                </Row>
            </Container>
        </AdminLayout>
    )
}

export default Customer
