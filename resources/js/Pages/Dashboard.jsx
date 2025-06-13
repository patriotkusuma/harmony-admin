import AddComma from "@/Components/Custom/Services/AddComma";
import AdminLayout from "@/Layouts/AdminLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import moment from "moment";
import { Card, CardBody, CardHeader, CardTitle, Col, Container, Row, Table } from "reactstrap";

export default function Dashboard({ auth }) {
    const { data } = usePage().props;



    return (
        <AdminLayout user={auth.user}
            header="Dashboard"
        >

            <Head title="Dashboard" />

            <header className="header bg-gradient-info pb-8 pt-5 pt-md-8">
                <Container fluid>
                    {auth.user.role!="pegawai" && (
                        <>
          <Row className="g-2"> {/* g-4 untuk memberikan celah antar kolom/baris, seperti div class="row" */}

            {/* Kartu 1: Traffic */}
            <Col xl={3} lg={6} className="mb-4 mb-xl-0"> {/* col-xl-3 col-lg-6 mb-4 mb-xl-0 */}
                <Card className="card-stats border-0 shadow"> {/* card card-stats mb-4 mb-xl-0 */}
                    <CardBody className="p-4"> {/* card-body */}
                        <Row className="align-items-center"> {/* row */}
                            <Col> {/* col */}
                                <h5 className="card-title text-uppercase text-muted mb-0">Total Pesanan</h5> {/* h5 class="card-title text-uppercase text-muted mb-0" */}
                                <span className="h2 fw-bold mb-0">{data.totalPesanan}</span> {/* span class="h2 font-weight-bold mb-0" */}
                            </Col>
                            <Col xs="auto"> {/* col-auto */}
                                <div className="icon icon-shape bg-danger text-white rounded-circle shadow"> {/* icon icon-shape bg-danger text-white rounded-circle shadow */}
                                    <i className="fas fa-receipt"></i>
                                </div>
                            </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted fs-6"> {/* p class="mt-3 mb-0 text-muted text-sm" diubah ke fs-6 */}
                            <span className="text-success me-2"> {/* span class="text-success mr-2" diubah ke me-2 */}
                                <i className="fa fa-arrow-up"></i> 3.48%
                            </span>
                            <span className="text-nowrap">Since last month</span>
                        </p>
                    </CardBody>
                </Card>
            </Col>

            {/* Kartu 2: New users */}
            <Col xl={3} lg={6} className="mb-4 mb-xl-0">
                <Card className="card-stats border-0 shadow">
                    <CardBody className="p-4">
                        <Row className="align-items-center">
                            <Col>
                                <h5 className="card-title text-uppercase text-muted mb-0 h6">Estimasi Bulan Ini</h5>
                                <span className="h3 fw-bold mb-0"><AddComma value={data.estimasiBulanIni}/></span>
                            </Col>
                            <Col xs="auto">
                                <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                    <i className="fas fa-sack-dollar"></i>
                                </div>
                            </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted fs-6">
                            <span className="text-danger me-2">
                                <i className="fas fa-arrow-down"></i> 3.48%
                            </span>
                            <span className="text-nowrap">Since last week</span>
                        </p>
                    </CardBody>
                </Card>
            </Col>

            {/* Kartu 3: Sales */}
            <Col xl={3} lg={6} className="mb-4 mb-xl-0">
                <Card className="card-stats border-0 shadow">
                    <CardBody className="p-4">
                        <Row className="align-items-center">
                            <Col>
                                <h5 className="card-title h6 text-uppercase text-muted mb-0">Pendapatan Bulan</h5>
                                <span className="h3 fw-bold mb-0"><AddComma value={data.pendapatanBulanIni}/></span>
                            </Col>
                            <Col xs="auto">
                                {/* bg-yellow dari kode asli mungkin kelas kustom. Menggunakan bg-warning sebagai pengganti standar Bootstrap terdekat. */}
                                <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                    <i className="fas fa-piggy-bank"></i>
                                </div>
                            </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted fs-6">
                            <span className="text-warning me-2">
                                <i className="fas fa-arrow-down"></i> 1.10%
                            </span>
                            <span className="text-nowrap">Since yesterday</span>
                        </p>
                    </CardBody>
                </Card>
            </Col>

            {/* Kartu 4: Performance */}
            <Col xl={3} lg={6} className="mb-4 mb-xl-0">
                <Card className="card-stats border-0 shadow">
                    <CardBody className="p-4">
                        <Row className="align-items-center">
                            <Col>
                                <h5 className="card-title text-uppercase text-muted mb-0">Belum Dibayar</h5>
                                <span className="h3 fw-bold mb-0"><AddComma value={(data.estimasiBulanIni - data.pendapatanBulanIni)}/> </span>
                            </Col>
                            <Col xs="auto">
                                <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                    <i className="fas fa-file-invoice-dollar"></i>
                                </div>
                            </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted fs-6">
                            <span className="text-success me-2">
                                <i className="fas fa-arrow-up"></i> 12%
                            </span>
                            <span className="text-nowrap">Since last month</span>
                        </p>
                    </CardBody>
                </Card>
            </Col>

            {/* Customers */}
            <Col xl={3} lg={6} className="mb-4 mb-xl-0">
                <Card className="card-stats border-0 shadow">
                    <CardBody className="p-4">
                        <Row className="align-items-center">
                            <Col>
                                <h5 className="card-title text-uppercase text-muted mb-0">Customers</h5>
                                <span className="h3 fw-bold mb-0">{data.totalCustomer} </span>
                            </Col>
                            <Col xs="auto">
                                <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                    <i className="fas fa-users"></i>
                                </div>
                            </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted fs-6">
                            <span className="text-success me-2">
                                <i className="fas fa-arrow-up"></i> 12%
                            </span>
                            <span className="text-nowrap">Since last month</span>
                        </p>
                    </CardBody>
                </Card>
            </Col>
            {/* Pesanan Dicuci */}
            <Col xl={3} lg={6} className="mb-4 mb-xl-0">
                <Card className="card-stats border-0 shadow">
                    <CardBody className="p-4">
                        <Row className="align-items-center">
                            <Col>
                                <h5 className="card-title text-uppercase text-muted mb-0">Pesanan Dicuci</h5>
                                <span className="h3 fw-bold mb-0">{data.pesananDicuci} </span>
                            </Col>
                            <Col xs="auto">
                                <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                    <i className="fas fa-soap"></i>
                                </div>
                            </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted fs-6">
                            <span className="text-success me-2">
                                <i className="fas fa-arrow-up"></i> 12%
                            </span>
                            <span className="text-nowrap">Since last month</span>
                        </p>
                    </CardBody>
                </Card>
            </Col>
            {/* Pesanan Selesai */}
            <Col xl={3} lg={6} className="mb-4 mb-xl-0">
                <Card className="card-stats border-0 shadow">
                    <CardBody className="p-4">
                        <Row className="align-items-center">
                            <Col>
                                <h5 className="card-title text-uppercase text-muted mb-0 h6">Pesanan Selesai</h5>
                                <span className="h3 fw-bold mb-0">{data.pesananSelesai} </span>
                            </Col>
                            <Col xs="auto">
                                <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                    <i className="fas fa-clipboard-check"></i>
                                </div>
                            </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted fs-6">
                            <span className="text-success me-2">
                                <i className="fas fa-arrow-up"></i> 12%
                            </span>
                            <span className="text-nowrap">Since last month</span>
                        </p>
                    </CardBody>
                </Card>
            </Col>
            {/* Pesanan Diambil */}
            <Col xl={3} lg={6} className="mb-4 mb-xl-0">
                <Card className="card-stats border-0 shadow">
                    <CardBody className="p-4">
                        <Row className="align-items-center">
                            <Col>
                                <h5 className="card-title text-uppercase text-muted mb-0">Pesanan Diambil</h5>
                                <span className="h3 fw-bold mb-0">{data.pesananDiambil} </span>
                            </Col>
                            <Col xs="auto">
                                <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                    <i className="fas fa-hand-holding"></i>
                                </div>
                            </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted fs-6">
                            <span className="text-success me-2">
                                <i className="fas fa-arrow-up"></i> 12%
                            </span>
                            <span className="text-nowrap">Since last month</span>
                        </p>
                    </CardBody>
                </Card>
            </Col>
        </Row>

                        </>
                    )}
                </Container>
            </header>

            <Container fluid className="mt--7">
                <Row className="gy-5">
                    <Col md="6" sm="12 mt-3">
                        <Card className="shadow">
                            <CardHeader className="bg-white border-0">
                                <CardTitle>
                                    <h2>Urutan Pengerjaan Hari Ini</h2>
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th>Nama</th>
                                            <th>Pesanan</th>
                                            <th>Deadline</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.urutanPesanan.map((urutan,index) => {
                                            return (
                                                <tr className={index == "0" ? "bg-danger text-white" : ""}>
                                                    <td>{index +1}</td>
                                                    <td>
                                                        <h4 className={index == "0" ? "text-white" : ""}>
                                                            {urutan.customer.nama}
                                                        </h4>

                                                    </td>
                                                    <td>

                                                        {urutan.detail_pesanan.map((detailPesanan, index) => {
                                                            return(
                                                                <Row>
                                                                    <Col>
                                                                        {detailPesanan.jenis_cuci.nama }
                                                                    </Col>
                                                                </Row>
                                                            )
                                                        })}
                                                    </td>
                                                    <td className="font-bold">
                                                        <strong>{moment(urutan.tanggal_selesai).format('HH:mm, DD MMMM YYYY')}</strong>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="6" sm="12 mt-3">
                        <Card className="shadow">
                            <CardHeader className="bg-white border-0">
                                <CardTitle className="d-flex justify-content-space-between">
                                    <h2>Diambil Hari Ini</h2>
                                    <h2>{moment().format('DD MMMM YYYY')}</h2>
                                </CardTitle>
                                <CardBody>
                                    <Table className="align-items-center table-flush" responsive>
                                        <thead>
                                            <th>No</th>
                                            <th>Nama</th>
                                            <th>Jam</th>
                                            <th>Status</th>
                                        </thead>
                                        <tbody>
                                            {data.ambilHariIni.map((ambil,index) => {
                                                return (
                                                    <tr className={index == 0 && ('font-extrabold')}>
                                                        <td>{index+1}</td>
                                                        <td>{ambil.customer.nama}</td>
                                                        <td>{moment(ambil.tanggal_selesai).format("HH:mm")}</td>
                                                        <td>
                                                            <h4 className={`text-white text-center p-2 ${ambil.status != "diambil" ? "bg-success" : "bg-default"} text-align-center rounded-lg`}>
                                                                <span className="mr-2">
                                                                    {ambil.status}
                                                                </span>
                                                                {ambil.status == "diambil" && (
                                                                    <i class="fa-solid fa-circle-check"></i>
                                                                )}
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </CardHeader>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </AdminLayout>
    );
}
