import Header from "@/Components/Argon/Headers/Header";
import ModalDelete from "@/Components/Custom/Modals/ModalDelete";
import Tambah from "@/Components/Custom/Modals/Pegawai/Tambah";
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
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    PopoverBody,
    Row,
    UncontrolledCollapse,
    UncontrolledDropdown,
    UncontrolledPopover,
} from "reactstrap";
import { Head } from "@inertiajs/react";
import ChangePassword from "@/Components/Custom/Modals/Pegawai/ChangePassword";

const headRow = [
    "No",
    "Pegawai",
    "Gaji",
    "Tanggal Masuk",
    "Kontak",
    "Status",
    "Action",
];

const cardRow = [
    {
        title: "Jumlah Pengeluaran",
        data: 23,
        icon: "fa-solid fa-money-bill-wave",
        iconClass:
            "icon icon-shape bg-success text-white rounded-circle shadow",
        color: "success",
    },
];

const checkStatus = (status) => {
    var color = status == "active" ? "success " : "danger";
    return color;
};

const Pegawai = (props) => {
    const { auth, pegawais, totalPegawai } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [filtered, setFiltered] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);

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

    const updatePasswordPegawai = (value) => {
        setFiltered(value);
        setPasswordModal(true);
    };

    const togglePasswordModal = () => {
        setPasswordModal(!passwordModal);
    };

    return (
        <AdminLayout user={auth.user} header="Daftar Pegawai">
            <Head title="Daftar Pegawai" />

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
                                        Total Pegawai
                                    </CardTitle>
                                    <span className="h2 font-weight-bold mb-0">
                                        {totalPegawai}
                                    </span>
                                </div>
                                <Col className="col-auto">
                                    <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                                        <i className="fa-solid fa-user-tie" />
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
                            data={pegawais}
                            tableHead="Daftar Pegawai"
                            headData={headRow}
                            toggleModal={toggleModal}
                            addData={addData}
                            isAdd={true}
                        >
                            {pegawais.data.map((pegawai, index) => {
                                return (
                                    <tr>
                                        <th scope="row">
                                            {index + 1}
                                            {/* {(((data.current_page - 2) * data.per_page) + index + data.per_page + 1)} */}
                                        </th>
                                        <td className="d-flex flex-column">
                                            <strong className="mb-0 text-sm">
                                                {pegawai.nama}
                                            </strong>
                                            <span>{pegawai.email}</span>
                                        </td>

                                        <td>
                                            <span className="mb-0 text-sm">
                                                {"Rp " +
                                                    addCommas(
                                                        removeNonNumeric(
                                                            pegawai.gaji
                                                        )
                                                    )}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="mb-0 text-sm">
                                                {moment(
                                                    pegawai.tanggal_masuk
                                                ).format("DD MMMM YYYY")}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="mb-0 text-sm">
                                                {pegawai.telpon}
                                            </span>
                                        </td>

                                        <td>
                                            <span className="mb-0 text-sm">
                                                <Button
                                                    color={checkStatus(
                                                        pegawai.status
                                                    )}
                                                    size="sm"
                                                    onClick={(e) =>
                                                        e.preventDefault()
                                                    }
                                                >
                                                    {pegawai.status}
                                                </Button>
                                            </span>
                                        </td>
                                        <td>
                                            <Button
                                                id={"popover-" + pegawai.id}
                                                size="sm"
                                            >
                                                <i class="fa-solid fa-ellipsis-vertical"></i>
                                            </Button>
                                            <UncontrolledPopover
                                                defaultOpen={false}
                                                direction="left"
                                                className="z-50"
                                                target={"popover-" + pegawai.id}
                                            >
                                                <PopoverBody className="z-50">
                                                    <a
                                                        // className="bg"
                                                        size="sm"
                                                        className="d-flex p-2 justify-content-start bg-white align-items-center text-default"
                                                        onClick={(e) =>
                                                            editData(pegawai)
                                                        }
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <i class="fa-solid fa-pen-to-square mr-2 "></i>
                                                        <span>Edit</span>
                                                    </a>
                                                    <a
                                                        // className="bg"
                                                        size="sm"
                                                        className="d-flex p-2 justify-content-start bg-white align-items-center text-default"
                                                        onClick={(e) =>
                                                            updatePasswordPegawai(
                                                                pegawai
                                                            )
                                                        }
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <i class="fa-solid fa-key"></i>
                                                        <span>Password</span>
                                                    </a>

                                                    <DropdownItem divider />

                                                    <DropdownItem
                                                        onClick={() =>
                                                            deleteData(pegawai)
                                                        }
                                                        // className="bg-danger text-white rounded-lg"
                                                        className="text-white bg-danger align-items-center justify-content-start d-flex"
                                                    >
                                                        <i class="fa-solid fa-trash-can mr-2"></i>
                                                        <span>Hapus</span>
                                                    </DropdownItem>
                                                </PopoverBody>
                                            </UncontrolledPopover>
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
            />
            <ModalDelete
                isOpen={deleteOpen}
                toggleModal={deleteToggle}
                deleteData={filtered}
                deleteRoute="pegawai.destroy"
            />
            <ChangePassword
                isOpen={passwordModal}
                toggleModal={togglePasswordModal}
                filteredData={filtered}
            />

            {/* </header> */}
        </AdminLayout>
    );
};

export default Pegawai;
