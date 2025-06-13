import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AdminLayout from '@/Layouts/AdminLayout'
import { Head } from '@inertiajs/react';
import Header from '@/Components/Argon/Headers/Header';
import { Col, Container, Row } from 'reactstrap';
import CustomTable from '@/Components/Custom/Tables/CustomTable';
import Tambah from './Tambah';
import AddComma from '@/Components/Custom/Services/AddComma';


const headRow = [
    "No",
    "Nama",
    "Total",
    "Keterangan",
    "Action"
];

const Index = props => {
    const {auth, sumberDanas} =props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filtered, setFiltered] = useState(null);

    console.log(sumberDanas);

    const addData  = () => {
        setIsModalOpen(true);
        setFiltered(null);
    }


    const editData = (value) => {
        setFiltered(value);
        setIsModalOpen(true);
    }

    const toggleModal = () => {
        setIsModalOpen(isModalOpen!=isModalOpen);
    }
  return (
    <AdminLayout user={auth.user} header="Sumber Dana">
        <Head title='Sumber Dana'/>

        <Header>
            <Col md="6">

            </Col>
            <Col md="6"></Col>
        </Header>

        <Container className='mt--7' fluid>
            <Row>
                <Col>
                    <CustomTable
                        isAdd={true}
                        data={sumberDanas}
                        tableHead="Sumber Dana"
                        headData={headRow}
                        toggleModal={toggleModal}
                        addData={addData}
                    >
                        {sumberDanas.data.map((sumberDana, index) => {
                            return (
                                <tr>
                                    <th scope='row'>
                                        {(((sumberDanas.current_page -2) * sumberDanas.per_page) + index + sumberDanas.per_page + 1)}
                                    </th>
                                    <td className='d-felx flex-column'>
                                        <strong>{sumberDana.nama}</strong>
                                    </td>
                                    <td><AddComma value={sumberDana.belanja_kebutuhan_sum_total_pembelian}/></td>
                                    <td>{sumberDana.keterangan}</td>
                                    <td>

                                    </td>
                                </tr>
                            )
                        })}
                    </CustomTable>
                </Col>
            </Row>
        </Container>

        <Tambah
            isOpen={isModalOpen}
            toggleModal={toggleModal}
            filteredData={filtered}
            />

    </AdminLayout>
  )
}

Index.propTypes = {}

export default Index
