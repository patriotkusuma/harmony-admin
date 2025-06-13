import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardImg,
    CardTitle,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    Row,
    Table,
} from "reactstrap";
import AddComma from "@/Components/Custom/Services/AddComma";
import moment from "moment";
import Create from "@/Components/Custom/Modals/RiwayatPesanan/Create";
import CustomTable from "@/Components/Custom/Tables/CustomTable";
import QRCode from "react-qr-code";

const headDetailPakaian = [
    "No", "Nama", "Jumlah", "Action"
]

const Show = (props) => {
    const { pesanan, detailPesanans } = props;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [filteredData, setFilteredData] = useState(null);
    // let filteredData = useRef();

    const {get, patch, delete:destroy} = useForm();

    const toggleModal = (e) => {
        setFilteredData(null);
        setModalIsOpen(!modalIsOpen);
    }

    const editModal = (e) => {
        setFilteredData(e);
        setModalIsOpen(true);
    }


    const updateJumlah = (value, id) => {

        router.patch(route("update-jumlah", id), {
            jumlah: value,
        });
        // patch(route('detail-pakaian.update.jumlah', id));
    }

    const print = (e) => {
        get(route('print-pakaian', pesanan.id));
    }

    const deleteData = (e) => {
        destroy(route('detail-pakaian.destroy', e.id));
    }
    return (
        <AdminLayout header={"Detail"} user={props.auth.user}>
            <Head title="Detail"></Head>
            <header className="bg-gradient-info pb-8 pt-5 pt-md-8">
                <Container fluid>
                    <Row className="mb-3">
                        <Col>
                            <Button
                                color="secondary"
                                href={route("pesanan.all")}
                                tag={Link}
                                size="sm"
                            >
                                <i className="fa-solid fa-arrow-left"></i>
                                <span>Kembali</span>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </header>

            <Container className="mt--7" fluid>
                <Row>
                    <Col md="6">
                        <Card className="bg-secondary shadow">
                            <CardHeader>
                                <h3 className="mb-0 font-weight-light">
                                    Pesanan{" "}
                                    <strong className="font-weight-bold">
                                        {" "}
                                        {pesanan.kode_pesan}
                                    </strong>
                                </h3>
                            </CardHeader>
                            <CardBody>
                                <h6 className="heading-small text-muted">
                                    Pengerjaan
                                </h6>
                                <Row className="pl-md-3">
                                    <Col md="6">
                                        <FormGroup>
                                            <Label className="form-control-label">
                                                Order Masuk
                                            </Label>
                                            <h4>
                                                {moment(
                                                    pesanan.tanggal_pesan
                                                ).format("DD MMMM YYYY")}
                                            </h4>
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label className="form-control-label">
                                                Estimasi Selesai
                                            </Label>
                                            <h4>
                                                {moment(
                                                    pesanan.tanggal_selesai
                                                ).format("DD MMMM YYYY")}
                                            </h4>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <hr className="my-4" />
                                <h6 className="heading-small text-muted">
                                    Pelanggan
                                </h6>
                                <Row className="pl-md-3">
                                    <Col md="6">
                                        <FormGroup>
                                            <Label className="form-control-label">
                                                Nama
                                            </Label>
                                            <Input
                                                className="form-control-alternative"
                                                value={pesanan.customer.nama}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label className="form-control-label">
                                                No Wa
                                            </Label>
                                            <Input
                                                className="form-control-alternative"
                                                value={pesanan.customer.telpon}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <hr className="my-4" />
                                <h6 className="heading-small text-muted">
                                    Pesanan
                                </h6>
                                {detailPesanans.map(
                                    (detailPesanan, detailIndex) => {
                                        return (
                                            <Row>
                                                <Col md="7">
                                                    <div className="d-flex align-items-center">
                                                        <CardImg
                                                            className="rounded-lg"
                                                            style={{
                                                                width: "80px",
                                                            }}
                                                            src={
                                                                detailPesanan
                                                                    .jenis_cuci
                                                                    .gambar
                                                            }
                                                        />
                                                        <h4 className="d-flex flex-column w-full text-dark ml-2">
                                                            <span className="text-default">
                                                                {
                                                                    detailPesanan
                                                                        .jenis_cuci
                                                                        .category_paket
                                                                        .nama
                                                                }
                                                            </span>
                                                            <span>
                                                                {
                                                                    detailPesanan
                                                                        .jenis_cuci
                                                                        .nama
                                                                }
                                                            </span>
                                                            <span>
                                                                {
                                                                    detailPesanan.qty
                                                                }
                                                                <span className="mx-2">
                                                                    x
                                                                </span>
                                                                <AddComma
                                                                    value={
                                                                        detailPesanan.harga
                                                                    }
                                                                />
                                                            </span>
                                                        </h4>
                                                    </div>
                                                </Col>
                                                <Col
                                                    md="5"
                                                    className="d-flex align-items-end justify-content-center"
                                                >
                                                    <h4>
                                                        <AddComma
                                                            value={
                                                                detailPesanan.total_harga
                                                            }
                                                        />
                                                    </h4>
                                                </Col>
                                            </Row>
                                        );
                                    }
                                )}
                                <hr className="my-4" />
                                <Row>
                                    <Col
                                        md="7"
                                        className="d-flex align-items-end justify-content-center"
                                    >
                                        <h4>Total</h4>
                                    </Col>
                                    {/* <Col md="3">
                                        <h4>Total</h4>
                                    </Col> */}
                                    <Col
                                        md="5"
                                        className="d-flex align-items-end justify-content-center"
                                    >
                                        <h4>
                                            <AddComma
                                                value={pesanan.total_harga}
                                            />
                                        </h4>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="6">

                        <Card className="bg-secondary shadow">
                            <CardHeader>
                                <Row className="align-items-center">
                                    <Col xs="6">
                                        <h3 className="mb-0">Detail Pakaian</h3>
                                    </Col>
                                    <Col className="text-right" xs="2">
                                        <Button
                                            color="default"
                                            onClick={print}
                                            size="sm"
                                        >
                                            {/* <i className="fa-solid fa-print"></i> */}
                                            Print
                                        </Button>
                                    </Col>
                                    <Col className="text-right" xs="2">
                                        <Button
                                            color="primary"
                                            onClick={()=>{setModalIsOpen(true)}}
                                            size="sm"
                                        >
                                            Tambah
                                        </Button>
                                    </Col>
                                </Row>

                            </CardHeader>
                            <CardBody>
                            <Table className="align-items-center  table-flush " responsive>
                                <thead className="thead-light">
                                    <tr>
                                        {headDetailPakaian.map((th, index) => {
                                            return (
                                                <th scope="col" key={index}>
                                                    {th}
                                                </th>
                                            );
                                        })}
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {pesanan.detail_pakaian.map((detailPakaian, index) => {
                                        return (<tr>
                                            <td>{index+1}</td>
                                            <td>{detailPakaian.nama_pakaian}</td>
                                            <td >
                                                {/* {detailPakaian.jumlah} */}

                                                <Input
                                                    onChange={(e)=>{updateJumlah(e.target.value, detailPakaian.id)}}
                                                    name="jumlah"
                                                    id="jumlah"
                                                    defaultValue={detailPakaian.jumlah}
                                                    />
                                            </td>
                                            <td>
                                                <Button
                                                    color="success"
                                                    size="sm"
                                                    onClick={()=>editModal(detailPakaian)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    color="danger"
                                                    size="sm"
                                                    onClick={()=>deleteData(detailPakaian)}
                                                >
                                                    Hapus
                                                </Button>
                                            </td>
                                        </tr>)
                                    })}
                                </tbody>
                            </Table>
                                {/* <CustomTable
                                    data={pesanan.detail_pakaian}
                                    tableHead="Detail Pakaian"
                                    headData={headDetailPakaian}
                                    // isAdd={true}
                                    // addData={addData}
                                >

                                </CustomTable> */}
                            </CardBody>
                        </Card>
                        <br/>
                        <QRCode value={pesanan.kode_pesan}/>
                    </Col>
                </Row>
            </Container>

            <Create
                isOpen={modalIsOpen}
                toggleModal={toggleModal}
                kodePesan={pesanan.kode_pesan}
                filteredData={filteredData}
            />
        </AdminLayout>
    );
};

Show.propTypes = {};

export default Show;
