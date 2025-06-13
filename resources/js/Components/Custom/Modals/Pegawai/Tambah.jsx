import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Col,
    Form,
    FormFeedback,
    FormGroup,
    FormText,
    Input,
    InputGroup,
    InputGroupText,
    Label,
    Modal,
    Row,
} from "reactstrap";
import { useForm, usePage } from "@inertiajs/react";
import { NumericFormat } from "react-number-format";

const Tambah = (props) => {
    const { isOpen, filteredData, toggleModal } = props;
    const [totalPembelian, setTotalPembelian] = useState(0);
    const [passwordCheck, setPasswordCheck] = useState(false);

    const {
        data,
        setData,
        errors,
        reset,
        patch,
        post,
        get,
        processing,
        recentySuccessfull,
    } = useForm({
        id: "",
        nama: "",
        email: "",
        password: "",
        password_confirmation: "",
        alamat: "",
        telpon: "",
        gaji: "",
        status: "",
        tanggal_masuk: "",
        tanggal_keluar: "",
        keterangan: "",
    });

    const addCommas = (num) =>
        num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

    const numberWithComma = (e) => {
        setData("harga", addCommas(removeNonNumeric(e.target.value)));
    };

    useEffect(() => {
        if (filteredData != null) {
            setData({
                id: filteredData.id,
                nama: filteredData.nama,
                email: filteredData.email,
                alamat: filteredData.alamat,
                telpon: filteredData.telpon,
                gaji: filteredData.gaji,
                status: filteredData.status,
                tanggal_masuk: filteredData.tanggal_masuk,
                tanggal_keluar: filteredData.tanggal_keluar,
                keterangan: filteredData.keterangan,
            });
            setTotalPembelian(
                addCommas(
                    removeNonNumeric(filteredData.harga * filteredData.qty)
                )
            );
        }
        // else{
        //     setData({
        //         id:  '',
        //         nama:  '',
        //         email:  '',
        //         password: '',
        //         password_confirmation: '',
        //         alamat:  '',
        //         telpon:  '',
        //         gaji: '',
        //         status:  '',
        //         tanggal_masuk:  '',
        //         tanggal_keluar:  '',
        //         keterangan:  '',
        //     })
        // }
    }, [filteredData]);

    const qtyChange = (e) => {
        var totalBeli = e.target.value * data["harga"].replaceAll(".", "");
        setData("qty", e.target.value);
        setTotalPembelian(addCommas(removeNonNumeric(totalBeli)));
    };

    const submit = (e) => {
        if (filteredData == null) {
            post(route(route().current()), {
                onSuccess: () => toggleModal(),
            });
        } else {
            // console.log(data);
            patch(
                route(
                    "pegawai.update",
                    filteredData,
                    filteredData.id
                ),
                {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true,
                    onSuccess: () => toggleModal(),
                }
            );
        }
    };

    return (
        <Modal
            className="modal-dialog-centered"
            toggle={toggleModal}
            isOpen={isOpen}
        >
            <div className="modal-header">
                <h2 className="modal-title" id="modal-title-default">
                    {filteredData == null ? "Tambah" : "Edit"} Data Belanja
                    Kebutuhan
                </h2>
                <button
                    aria-label="close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={toggleModal}
                >
                    <span aria-hidden={true}>
                        <i className="fa-solid fa-xmark"></i>
                    </span>
                </button>
            </div>
            <div className="modal-body">
                <Form role="form" onSubmit={submit}>
                    <Row>
                        <Col sm="6">
                            <FormGroup>
                                <Label className="form-control-label">
                                    Nama
                                    <span className="text-light">(*)</span>
                                </Label>
                                <Input
                                    className="form-control-alternative"
                                    id="nama"
                                    name="nama"
                                    placeholder="nama"
                                    type="text"
                                    autoFocus
                                    defaultValue={
                                        filteredData != null
                                            ? filteredData.nama
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setData("nama", e.target.value)
                                    }
                                    invalid={errors.nama && true}
                                />
                                <FormFeedback>
                                    {errors.nama && errors.nama}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col sm="6">
                            <FormGroup>
                                <Label className="form-control-label">
                                    Email
                                    <span className="text-light">(*)</span>
                                </Label>
                                <Input
                                    className="form-control-alternative"
                                    id="email"
                                    name="email"
                                    placeholder="email"
                                    type="email"
                                    autoFocus
                                    defaultValue={
                                        filteredData != null
                                            ? filteredData.email
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    invalid={errors.email && true}
                                />
                                <FormFeedback>
                                    {errors.email && errors.email}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>

                    {filteredData == null && (
                        <Row>
                            <Col sm="6">
                                <FormGroup>
                                    <Label className="form-control-label">
                                        Password
                                        <span className="text-light">(*)</span>
                                    </Label>
                                    <InputGroup className="input-group-alternative">
                                        <Input
                                            className="form-control-alternative"
                                            id="password"
                                            name="password"
                                            placeholder="password"
                                            type={
                                                passwordCheck == true
                                                    ? "text"
                                                    : "password"
                                            }
                                            autoFocus
                                            defaultValue={
                                                filteredData != null
                                                    ? filteredData.password
                                                    : ""
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            invalid={errors.password && true}
                                        />
                                        <InputGroupText
                                            onClick={() => {
                                                setPasswordCheck(
                                                    !passwordCheck
                                                );
                                            }}
                                            role="button"
                                        >
                                            <i className="fa-regular fa-eye"></i>
                                        </InputGroupText>
                                    </InputGroup>

                                    {errors.password && (
                                        <small
                                            style={{ color: "#fb6340" }}
                                            className="text-sm justify-content-start"
                                        >
                                            {errors.password}
                                        </small>
                                    )}
                                </FormGroup>
                            </Col>

                            <Col sm="6">
                                <FormGroup>
                                    <Label className="form-control-label">
                                        Password Confirmation
                                        <span className="text-light">(*)</span>
                                    </Label>
                                    <InputGroup className="input-group-alternative">
                                        <Input
                                            className="form-control-alternative"
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            placeholder="Password Confirmation"
                                            type={
                                                passwordCheck == true
                                                    ? "text"
                                                    : "password"
                                            }
                                            autoFocus
                                            defaultValue={
                                                filteredData != null
                                                    ? filteredData.password_confirmation
                                                    : ""
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                            invalid={
                                                errors.password_confirmation &&
                                                true
                                            }
                                        />
                                        <InputGroupText
                                            onClick={() =>
                                                setPasswordCheck(!passwordCheck)
                                            }
                                            role="button"
                                        >
                                            <i className="fa-regular fa-eye"></i>
                                        </InputGroupText>
                                    </InputGroup>

                                    {errors.password_confirmation && (
                                        <small
                                            style={{ color: "#fb6340" }}
                                            className="text-sm justify-content-start"
                                        >
                                            {errors.password_confirmation}
                                        </small>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>
                    )}

                    <Row>
                        <Col sm="6">
                            <FormGroup>
                                <Label className="form-control-label">
                                    Nomor Telp/Wa
                                    <span className="text-light">(*)</span>
                                </Label>

                                <Input
                                    className="form-control-alternative"
                                    id="telpon"
                                    name="telpon"
                                    placeholder="08123456789"
                                    type="text"
                                    autoFocus
                                    defaultValue={
                                        filteredData != null
                                            ? filteredData.telpon
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setData("telpon", e.target.value)
                                    }
                                    invalid={errors.telpon && true}
                                />

                                {errors.telpon && (
                                    <small
                                        style={{ color: "#fb6340" }}
                                        className="text-sm justify-content-start"
                                    >
                                        {errors.telpon}
                                    </small>
                                )}
                            </FormGroup>
                        </Col>
                        <Col sm="6">
                            <FormGroup>
                                <Label className="form-control-label">
                                    Gaji
                                    <span className="text-light">(*)</span>
                                </Label>

                                <InputGroup className="input-group-alternative">
                                    <InputGroupText className="">
                                        Rp
                                    </InputGroupText>
                                    <Input
                                        className="form-control-alternative"
                                        id="gaji"
                                        name="gaji"
                                        placeholder="Besar Gaji"
                                        type="text"
                                        autoFocus
                                        defaultValue={
                                            filteredData != null
                                                ? filteredData.gaji
                                                : ""
                                        }
                                        onChange={(e) =>
                                            setData("gaji", e.target.value)
                                        }
                                        invalid={errors.gaji && true}
                                    />
                                </InputGroup>

                                {errors.gaji && (
                                    <small
                                        style={{ color: "#fb6340" }}
                                        className="text-sm justify-content-start"
                                    >
                                        {errors.gaji}
                                    </small>
                                )}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="exampleFormControlSelect1"
                                >
                                    Status
                                </label>
                                <br />
                                <Input
                                    bsSize="lg"
                                    className="form-control form-control-alternative form-select"
                                    type="select"
                                    id="status"
                                    name="status"
                                    defaultValue={
                                        filteredData != null
                                            ? filteredData.status
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    invalid={errors.status && true}
                                    required
                                >
                                    <option value="">Pilih status</option>
                                    <option value="active">Aktif</option>
                                    <option value="inactive">
                                        Tidak Aktif
                                    </option>
                                </Input>

                                <FormFeedback>
                                    {errors.status && errors.status}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6">
                            <FormGroup>
                                <Label className="form-control-label">
                                    Tanggal Masuk
                                    <span className="text-light">(*)</span>
                                </Label>
                                <InputGroup className="input-group-alternative">
                                    <Input
                                        className="form-control-alternative"
                                        id="tanggal_masuk"
                                        name="tanggal_masuk"
                                        placeholder="DD/MM/YYYY"
                                        type="date"
                                        defaultValue={
                                            filteredData != null
                                                ? filteredData.tanggal_masuk
                                                : ""
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "tanggal_masuk",
                                                e.target.value
                                            )
                                        }
                                        invalid={errors.tanggal_masuk && true}
                                    />
                                </InputGroup>

                                {errors.tanggal_masuk && (
                                    <small
                                        style={{ color: "#fb6340" }}
                                        className="text-sm justify-content-start"
                                    >
                                        {errors.tanggal_masuk}
                                    </small>
                                )}
                            </FormGroup>
                        </Col>
                        <Col sm="6">
                            <FormGroup>
                                <Label className="form-control-label">
                                    Tanggal Keluar
                                </Label>
                                <InputGroup className="input-group-alternative">
                                    <Input
                                        className="form-control-alternative"
                                        id="tanggal_keluar"
                                        name="tanggal_keluar"
                                        placeholder="Tanggal Keluar"
                                        type="date"
                                        defaultValue={
                                            filteredData != null
                                                ? filteredData.tanggal_keluar
                                                : ""
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "tanggal_keluar",
                                                e.target.value
                                            )
                                        }
                                        invalid={errors.tanggal_keluar && true}
                                    />
                                </InputGroup>

                                {errors.tanggal_keluar && (
                                    <small
                                        style={{ color: "#fb6340" }}
                                        className="text-sm justify-content-start"
                                    >
                                        {errors.tanggal_keluar}
                                    </small>
                                )}
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup>
                        <Label className="form-control-label">Alamat</Label>
                        <Input
                            className="form-control-alternative"
                            id="alamat"
                            name="alamat"
                            placeholder="Alamat"
                            type="textarea"
                            rows="3"
                            autoFocus
                            defaultValue={
                                filteredData != null ? filteredData.alamat : ""
                            }
                            onChange={(e) => setData("alamat", e.target.value)}
                            invalid={errors.alamat && true}
                        />

                        <FormFeedback>
                            {errors.alamat && errors.alamat}
                        </FormFeedback>
                    </FormGroup>

                    <br />
                </Form>
                <div className="d-flex justify-content-between">
                    <Button
                        color="primary"
                        type="submit"
                        disabled={processing}
                        onClick={submit}
                    >
                        <i className="fa-regular fa-floppy-disk"></i>
                        <span>Save changes</span>
                    </Button>
                    <Button
                        className="ml-auto"
                        color="link"
                        data-dismiss="modal"
                        type="button"
                        onClick={toggleModal}
                    >
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

Tambah.propTypes = {
    isOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
    filteredData: PropTypes.any,
};

export default Tambah;
