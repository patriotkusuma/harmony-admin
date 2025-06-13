import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Header from "@/Components/Argon/Headers/Header";
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardTitle,
    Col,
    Container,
    Row,
} from "reactstrap";
import CustomTable from "@/Components/Custom/Tables/CustomTable";
import moment from "moment";
import AddComma from "@/Components/Custom/Services/AddComma";
import QRCode from "react-qr-code";

const headRow = [
    "No",
    "Kode Pesan",
    "Customer",
    "Tanggal",
    "Total",
    "Status",
    "Action",
];

const Index = (props) => {
    const { auth, riwayatPesanans, todayGet, bulanIni, todayKilo, monthKilo } =
        props;

    const { data, setData, get, patch } = useForm();

    console.log(props);
    const detailButton = (e) => {
        get(route("pesanan.show", e.id));
    };

    const printButton = (e) => {
        get(route("pesanan.print",e.id));
    };

    const printNama = (e, jumlah=2) => {
        get(route('customer.print', [e.id, {jumlah:jumlah, kode_pesan: e.kode_pesan}]),);
    }

    const updateStatus = (e, curStatus) => {
        patch(route("pesanan.update",[{
            id:e.id,
        }, {status: curStatus}]));
    };
    return (
        <>
            <AdminLayout user={auth.user} header="Riwayat Pesanan">
                <Head title="Riwayat Pesanan" />

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
                                            Hari Ini
                                        </CardTitle>
                                        <span className="h2 font-weight-bold mb-0">
                                            <AddComma value={todayGet} />
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
                    {auth.user.role != "pegawai" && (
                        <>
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
                                                    <AddComma value={bulanIni} />
                                                </span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                                    <i className="fa-solid fa-hand-holding-dollar"></i>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </>
                    )}
                    <Col lg="6" xl="3">
                        <Card className="card-stats mb-4 mb-xl-0">
                            <CardBody>
                                <Row>
                                    <div className="col">
                                        <CardTitle
                                            tag="h5"
                                            className="text-uppercase text-muted mb-0"
                                        >
                                            Hari Ini
                                        </CardTitle>
                                        <span className="h2 font-weight-bold mb-0">
                                            {(Math.round(todayKilo * 100) / 100).toFixed(2)} Kg
                                            {/* <AddComma value={todayKilo} /> */}
                                        </span>
                                    </div>
                                    <Col className="col-auto">
                                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                            {/* <i className="fa-solid fa-coins" /> */}
                                            <i className="fa-solid fa-weight-hanging"></i>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>

                    {auth.user.role != "pegawai" && (
                        <>

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
                                                    {monthKilo}
                                                    Kg
                                                    {/* <AddComma value={monthKilo} /> */}
                                                </span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-default text-white rounded-circle shadow">
                                                    <i className="fa-solid fa-weight-hanging"></i>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </>
                    )}
                </Header>

                <Container fluid className="mt--7 fluid">
                    <Row>
                        <div className="col">
                            <CustomTable
                                isAdd={false}
                                data={riwayatPesanans}
                                tableHead="Riwayat Pesanan"
                                headData={headRow}
                            >
                                {riwayatPesanans.data.map(
                                    (riwayatPesanan, index) => {
                                        return (
                                            <tr>
                                                <th scope="row" width="50px">
                                                    {(riwayatPesanans.current_page -
                                                        2) *
                                                        riwayatPesanans.per_page +
                                                        index +
                                                        riwayatPesanans.per_page +
                                                        1}
                                                </th>
                                                <td>

                                                    {riwayatPesanan.detail_pesanan.map((detailPesanan, index) => {
                                                        return (
                                                            <h4>{detailPesanan.jenis_cuci.nama}</h4>
                                                        )
                                                    })}
                                                    {/* <QRCode value={riwayatPesanan.kode_pesan} size="40" /> */}
                                                    <h4>
                                                        <Link
                                                            href={route(
                                                                "pesanan.show",
                                                                riwayatPesanan.id
                                                            )}
                                                        >
                                                            {
                                                                riwayatPesanan.kode_pesan
                                                            }
                                                        </Link>
                                                    </h4>
                                                </td>
                                                <td className="d-flex flex-column">
                                                    <strong className="mb-0 text-sm">
                                                        {
                                                            riwayatPesanan
                                                                .customer.nama
                                                        }
                                                    </strong>
                                                    <span>
                                                        WA :{" "}
                                                        <a
                                                            href={
                                                                "https://wa.me/628" +
                                                                riwayatPesanan
                                                                    .customer
                                                                    .telpon
                                                            }
                                                        >
                                                            {
                                                                riwayatPesanan
                                                                    .customer
                                                                    .telpon
                                                            }
                                                        </a>
                                                    </span>
                                                    {/* <Button
                                                        color="default"
                                                        size="sm"
                                                        onClick={() =>
                                                            printNama(riwayatPesanan)
                                                        }
                                                    >
                                                        <i className="fa-solid fa-print"></i>
                                                        <span>Print</span>
                                                    </Button> */}

                                                </td>
                                                <td>
                                                    <div className="d-flex flex-column">
                                                        <h4 className="font-weight-light">
                                                            <i className="fa-solid fa-calendar-check"></i>
                                                            <span className="ml-2">
                                                                {moment(
                                                                    riwayatPesanan.tanggal_pesan
                                                                ).format(
                                                                    "DD MMMM YYYY"
                                                                )}
                                                            </span>
                                                        </h4>
                                                        <h4 className="text-success">
                                                            <i className="fa-solid fa-calendar-check"></i>
                                                            <span className="ml-2">
                                                                {moment(
                                                                    riwayatPesanan.tanggal_selesai
                                                                ).format(
                                                                    "DD MMMM YYYY"
                                                                )}
                                                            </span>
                                                        </h4>
                                                    </div>
                                                </td>
                                                <td>
                                                    <h5 className={`bg-${riwayatPesanan.status_pembayaran == "Lunas" ? "default" : "danger"} text-white text-center p-2 rounded-lg`}>
                                                        {riwayatPesanan.status_pembayaran}
                                                    </h5>
                                                    <h3>
                                                        <AddComma
                                                            value={
                                                                riwayatPesanan.total_harga
                                                            }
                                                        />
                                                    </h3>
                                                </td>
                                                <td>
                                                    <h4
                                                        className={`text-white text-center p-2 ${
                                                            riwayatPesanan.status !=
                                                            "diambil"
                                                                ? "bg-success"
                                                                : "bg-default"
                                                        } text-align-center rounded-lg`}
                                                    >

                                                        <span className="mr-2">{riwayatPesanan.status}</span>
                                                        {riwayatPesanan.status =="diambil" &&  (
                                                                <i class="fa-solid fa-circle-check"></i>
                                                        )}
                                                    </h4>
                                                    {riwayatPesanan.status !=
                                                        "diambil" && (
                                                        <>
                                                            {/* <a href="#">Batal</a>
                                                            <span className="mx-2">-</span> */}
                                                            {riwayatPesanan.status == "cuci" && (
                                                                <>

                                                            <a
                                                                type="button"
                                                                onClick={() =>
                                                                    {
                                                                        updateStatus(
                                                                            riwayatPesanan,
                                                                            "selesai"
                                                                            )
                                                                        }
                                                                    }
                                                                    className="text-danger font-weight-bold mr-2"
                                                                    >
                                                                Selesai
                                                            </a>
                                                            <span>-</span>
                                                                </>
                                                            )}
                                                            <a
                                                                type="button"
                                                                onClick={() =>
                                                                    {
                                                                    updateStatus(
                                                                        riwayatPesanan,
                                                                        "diambil"
                                                                        )
                                                                    }
                                                                }
                                                                className="text-danger font-weight-bold ml-2    "
                                                            >
                                                                Diambil
                                                            </a>
                                                        </>
                                                    )}
                                                </td>
                                                <td width="30%">
                                                    {/* <Button
                                                        color="default"
                                                        size="sm"
                                                        onClick={() =>
                                                            printButton(
                                                                riwayatPesanan
                                                            )
                                                        }
                                                    >
                                                        <i className="fa-solid fa-print"></i>
                                                        <span>Print</span>
                                                    </Button> */}

                                                    <Button
                                                        color="warning"
                                                        size="sm"
                                                        // onSubmit={}
                                                        onClick={() =>
                                                            detailButton(
                                                                riwayatPesanan
                                                            )
                                                        }
                                                    >
                                                        <i className="fa-solid fa-circle-info"></i>
                                                        <span>Detail</span>
                                                    </Button>

                                                    {/* <Button
                                                        color="default"
                                                        size="sm"
                                                    >
                                                        <i className="fa-solid fa-print"></i>
                                                        <span>Print</span>
                                                    </Button> */}
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </CustomTable>
                        </div>
                    </Row>
                </Container>

            </AdminLayout>
        </>
    );
};

Index.propTypes = {};

export default Index;
