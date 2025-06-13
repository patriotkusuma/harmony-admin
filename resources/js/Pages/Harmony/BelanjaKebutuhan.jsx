import Header from "@/Components/Argon/Headers/Header";
import Delete from "@/Components/Custom/Modals/BelanjaKebutuhan/Delete";
import Tambah from "@/Components/Custom/Modals/BelanjaKebutuhan/Tambah";
import CustomTable from "@/Components/Custom/Tables/CustomTable";
import DanaKeluarTable from "@/Components/Custom/Tables/DanaKeluarTable";
import AdminLayout from "@/Layouts/AdminLayout";
import moment from "moment";
import React, { useState } from "react";
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Col,
    Container,
    Row,
} from "reactstrap";
import { Head } from "@inertiajs/react";

const headRow = [
    "No",
    "Satuan",
    "Harga",
    "Total Pembelian",
    "Tanggal Pembelian",
    "Action",
];

const DanaKeluar = (props) => {
    const { auth, kebutuhans, totalByMonth, sumberDanas } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [filtered, setFiltered] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const addCommas = (num) =>
        num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

    const addData = () => {
        setIsOpen(true);
        setFiltered(null);
    };
    const toggleModal = () => {
        setIsOpen(isOpen != isOpen);
    };

    const editData = (value) => {
        setFiltered(value);
        setIsOpen(true);
    };

    const deleteData = (value) => {
        setFiltered(value);
        setDeleteOpen(true);
    };

    const deleteToggle = () => {
        setDeleteOpen(deleteOpen != deleteOpen);
    };

    return (
        <AdminLayout user={auth.user} header="Belanja Kebutuhan">
            <Head title="Belanja Kebutuhan" />

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
                                        Bulan Ini
                                    </CardTitle>
                                    <span className="h2 font-weight-bold mb-0">
                                        {addCommas(
                                            removeNonNumeric(totalByMonth)
                                        )}
                                    </span>
                                </div>
                                <Col className="col-auto">
                                    <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                                        <i className="fa-solid fa-coins" />
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="6" xl="3">
                    <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                            <Row>
                                <div className="col">
                                    <CardTitle
                                        tag="h5"
                                        className="text-uppercase text-muted mb-0"
                                    >
                                        Tahun Ini
                                    </CardTitle>
                                    <span className="h2 font-weight-bold mb-0">
                                        {addCommas(
                                            removeNonNumeric(props.totalByYear)
                                        )}
                                    </span>
                                </div>
                                <Col className="col-auto">
                                    <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                        <i class="fa-solid fa-money-bill-transfer"></i>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Header>
            {/* <header className="bg-gradient-info pb-8 pt-5 pt-md-8"> */}
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <CustomTable
                            isAdd={true}
                            data={kebutuhans}
                            tableHead="Dana Keluar"
                            headData={headRow}
                            toggleModal={toggleModal}
                            addData={addData}
                        >
                            {kebutuhans.data.map((kebutuhan, index) => {
                                return (
                                    <tr>
                                        <th scope="row">
                                            {/* {index + 1} */}
                                            {(((kebutuhans.current_page - 2) * kebutuhans.per_page) + index + kebutuhans.per_page + 1)}
                                        </th>
                                        <td className="d-flex flex-column">
                                            <strong className="mb-0 text-sm">{kebutuhan.nama}</strong>
                                            <span>{kebutuhan.qty + ' x Rp ' + addCommas(kebutuhan.harga)}</span>
                                        </td>
                                        <td>
                                            <span className="mb-0 text-sm">
                                                {kebutuhan.satuan}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="mb-0 text-sm">
                                                {"Rp " +
                                                    addCommas(
                                                        removeNonNumeric(
                                                            kebutuhan.total_pembelian
                                                        )
                                                    )}
                                            </span>
                                        </td>
                                        <td>
                                        <span className="mb-0 text-sm">
                                            {moment(kebutuhan.tanggal_pembelian).format('DD MMMM YYYY')}
                                            </span>
                                        </td>

                                        <td>
                                            <Button
                                                color="warning"
                                                size="sm"
                                                onClick={() =>
                                                    editData(kebutuhan)
                                                }
                                            >
                                                <i class="fa-solid fa-pen-to-square mr-2"></i>
                                                Edit
                                            </Button>
                                            <Button
                                                color="danger"
                                                size="sm"
                                                onClick={() =>
                                                    deleteData(kebutuhan)
                                                }
                                            >
                                                <i class="fa-solid fa-trash-can mr-2"></i>
                                                Hapus
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </CustomTable>
                    </div>
                </Row>
            </Container>

            <Tambah
                isOpen={isOpen}
                toggleModal={toggleModal}
                filteredData={filtered}
                sumberDanas={sumberDanas}
            />
            <Delete
                isOpen={deleteOpen}
                toggleModal={deleteToggle}
                deleteData={filtered}
            />

            {/* </header> */}
        </AdminLayout>
    );
};

export default DanaKeluar;
