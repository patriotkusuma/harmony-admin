import Header from "@/Components/Argon/Headers/Header";
import Create from "@/Components/Custom/Modals/CategoryPaket/Create";
import ModalDelete from "@/Components/Custom/Modals/ModalDelete";
import CustomTable from "@/Components/Custom/Tables/CustomTable";
import AdminLayout from "@/Layouts/AdminLayout";
import React, { useRef, useState } from "react";
import { Alert, Button, Col, Container, Row } from "reactstrap";

const headRow = ["No", "Nama", "Durasi", "Keterangan", "Action"];

const Index = (props) => {
    const { auth, categoryPakets, flash } = props;
    const [modalAdd, setModalAdd] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [filteredData, setFilteredData] = useState();
    const filteredRef = useRef([]);
    const deleteRef = useRef([]);

    const addData = () => {
        setFilteredData(null);
        filteredRef.current = null;
        setModalAdd(true);
    };

    const editData = (value) => {
        setFilteredData(value);
        filteredRef.current = value;
        setModalAdd(true);
    };

    const deleteData = (value) => {
        deleteRef.current = value;
        setModalDelete(true);
    }

    const toggleModal = () => {
        setModalAdd(!modalAdd);
    };

    const toggleModalDelete = () =>{
        setModalDelete(!modalDelete);
    }
    return (
        <AdminLayout user={auth.user} header="Category Paket">
            <header className="bg-gradient-info pb-8 pt-5 pt-md-8">
                <Container fluid>
                    <Alert
                        color="success"
                        isOpen={flash.success != null ? true : false}
                    >
                        <strong>Success ! </strong>
                        {flash.success != null && flash.success}
                    </Alert>
                </Container>
            </header>

            {/* <Header><Col lg="6" xl="3"></Col></Header> */}

            <Container className="mt--7" fluid>
                <Row>
                    <Col>
                        <CustomTable
                            data={categoryPakets}
                            tableHead="List Category"
                            headData={headRow}
                            isAdd={true}
                            addData={addData}
                        >
                            {categoryPakets.data.length > 0 &&
                                categoryPakets.data.map(
                                    (categoryPaket, index) => {
                                        return (
                                            <tr>
                                                <th scope="row">
                                                    {(categoryPakets.current_page -
                                                        2) *
                                                        categoryPakets.per_page +
                                                        index +
                                                        1 +
                                                        categoryPakets.per_page}
                                                </th>

                                                <td>{categoryPaket.nama}</td>
                                                <td>
                                                    {categoryPaket.durasi +
                                                        " " +
                                                        categoryPaket.tipe_durasi}
                                                </td>
                                                <td>
                                                    {categoryPaket.deskripsi}
                                                </td>
                                                <td>
                                                    <Button
                                                        color="warning"
                                                        size="sm"
                                                        onClick={() =>
                                                            editData(
                                                                categoryPaket
                                                            )
                                                        }
                                                    >
                                                        <i class="fa-solid fa-pen-to-square mr-2"></i>
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        color="danger"
                                                        size="sm"
                                                        onClick={() =>
                                                            deleteData(
                                                                categoryPaket
                                                            )
                                                        }
                                                    >
                                                        <i class="fa-solid fa-trash-can mr-2"></i>
                                                        Hapus
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                        </CustomTable>
                    </Col>
                </Row>
            </Container>

            <Create
                isOpen={modalAdd}
                toggleModal={toggleModal}
                filteredData={filteredRef.current}
            />

            <ModalDelete
                isOpen={modalDelete}
                toggleModal={toggleModalDelete}
                deleteData={deleteRef.current}
                deleteRoute="category-paket.destroy"
            />
        </AdminLayout>
    );
};

export default Index;
