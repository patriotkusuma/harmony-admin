import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import PesananLayout from "@/Layouts/PesananLayout";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupText,
    Label,
    Modal,
    ModalHeader,
    Row,
} from "reactstrap";
// import QrScanner from '@yudiel/react-qr-scanner/lib/esm/components/QrScanner';
import { useForm } from "@inertiajs/react";
import QRCode from "react-qr-code";
import AddComma from "@/Components/Custom/Services/AddComma";
import moment from "moment";

const Index = (props) => {
    const { auth, pesanan } = props;

    const [result, setResult] = useState();
    const [bayarModalOpen, setBayarModalOpen] = useState(false);
    let resultRef = useRef("");

    const { get, data, setData } = useForm({
        total_pembayaran: pesanan != null ? pesanan.total_harga : 0,
        nominal_bayar: 0,
        kembalian: 0,
    });

    const updateResult = (value) => {
        setResult(value);
        get(route("pengambilan.index", { kode_pesan: value }));
    };

    const openBayarModal = () => {
        setBayarModalOpen(true);
    };

    const toggleBayarModal = () => {
        setBayarModalOpen(!bayarModalOpen);
    };

    return (
        <>
            <PesananLayout auth={auth.user} header="Pengambilan">
                <Row className="justify-content-center">
                    <Col md="8">
                        <Card>
                            <CardHeader title="">
                                <CardTitle tag={"h3"}>
                                    <Row>
                                        <Col md="7">Pengambilan</Col>
                                        <Col md="5">
                                            <Button
                                                color={
                                                    pesanan != null &&
                                                    pesanan.status_pembayaran ==
                                                        "Lunas"
                                                        ? "default"
                                                        : "danger"
                                                }
                                            >
                                                {pesanan != null
                                                    ? pesanan.status_pembayaran
                                                    : ""}
                                            </Button>
                                            {/* {pesanan != null ? pesanan.status : ''} */}
                                        </Col>
                                    </Row>
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col md="4">
                                        {pesanan != null && (
                                            <QRCode
                                                value={
                                                    pesanan != null
                                                        ? pesanan.kode_pesan
                                                        : ""
                                                }
                                            />
                                        )}
                                    </Col>
                                    <Col md="8">
                                        {pesanan != null && (
                                            <>
                                                <h2 className="p-2 bg-warning rounded-lg text-center text-white">
                                                    <AddComma
                                                        value={
                                                            pesanan.total_harga
                                                        }
                                                    />
                                                </h2>
                                                <h3>{pesanan.kode_pesan}</h3>
                                                <h3>{pesanan.customer.nama}</h3>
                                                <h3>
                                                    {moment(
                                                        pesanan.tanggal_pesan
                                                    ).format("DD MMMM YYYY") +
                                                        " - " +
                                                        moment(
                                                            pesanan.tanggal_selesai
                                                        ).format(
                                                            "DD MMMM YYYY"
                                                        )}
                                                </h3>
                                            </>
                                        )}
                                    </Col>
                                </Row>
                                {/* <QrScanner
                                onResult={(result)=> updateResulte(result)}
                            /> */}

                                {/* {resultRef} */}
                            </CardBody>
                        </Card>

                        <Row className="mt-2">
                            <Col md="6"></Col>

                            <Col md="6">
                                {pesanan != null &&
                                    pesanan.status_pembayaran != "Lunas" && (
                                        <Button
                                            color="default"
                                            className="float-right"
                                            onClick={openBayarModal}
                                        >
                                            <i className="fa-solid fa-cash-register"></i>
                                            <span>Bayar</span>
                                        </Button>
                                    )}
                            </Col>
                        </Row>
                    </Col>
                    <Col md="4">
                        <Card>
                            <CardBody>
                                {/* <QrScanner
                                    onResult={(result) =>
                                        updateResult(result.text)
                                    }
                                    constraints={{
                                        facingMode: "environment",
                                    }}
                                /> */}
                                <br />
                                <FormGroup>
                                    <InputGroup>
                                        <Input
                                            name="cari"
                                            id="cari"
                                            autoFocus={bayarModalOpen == false ? true: false}
                                            placeholder="Kode Pesan"
                                            defaultValue={
                                                pesanan != null
                                                    ? pesanan.kode_pesan
                                                    : ""
                                            }
                                        />
                                        <InputGroupText>
                                            <Button size="sm">Cari</Button>
                                        </InputGroupText>
                                    </InputGroup>
                                </FormGroup>

                                <h4>
                                    Result : {pesanan ? pesanan.kode_pesan : ""}
                                </h4>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>


                <Modal
                    className="modal-dialog-centered modal-md"
                    toggle={toggleBayarModal}
                    isOpen={bayarModalOpen}
                    autoFocus={false}
                >
                    <div className="modal-header">
                        <h2 className="modal-title" id="modal-title-default">
                            Bayar
                        </h2>
                        <button
                            aria-label="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={toggleBayarModal}
                            className="close"
                        >
                            <span aria-hidden={true}>
                                <i className="fa-solid-fa-xmark"></i>
                            </span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h2>Total : <strong> <AddComma value={pesanan != null && pesanan.total_harga}/></strong></h2>


                        <FormGroup>
                            <Label className="form-control-label">Bayar</Label>
                            <InputGroup className="input-group-alternative">
                                <InputGroupText>Rp</InputGroupText>
                                <Input
                                    autoFocus={bayarModalOpen == true ? true: false}
                                    className="form-control-alternative"
                                    name="nama"
                                    id="nama"
                                    type="number"
                                    min={pesanan != null && pesanan.total_harga}
                                    // defaultValue={filteredData != null ? filteredData.nama : ''}

                                    onChange={(e) =>{
                                        setData('nominal_bayar', e.target.value)
                                        setData('kembalian', (e.target.value - pesanan.total_harga))
                                    }}
                                    placeholder="Nama Category"
                                />
                            </InputGroup>
                        </FormGroup>
                        <h2
                            className="p-2 bg-default rounded-lg text-center mt-4 text-white"
                        >
                            <AddComma value={data.kembalian}/>
                        </h2>
                    </div>
                </Modal>
            </PesananLayout>
        </>
    );
};

Index.propTypes = {};

export default Index;
