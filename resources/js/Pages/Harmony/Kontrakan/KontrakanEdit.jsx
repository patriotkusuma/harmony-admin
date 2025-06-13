import React, { useState } from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import {
    Alert,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardImg,
    Col,
    Container,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    InputGroup,
    InputGroupText,
    Label,
    Media,
    Row,
} from "reactstrap";

const KontrakanEdit = (props) => {
    const { kontrakan, auth, flash } = props;
    const [prevImage, setPrevImage] = useState(kontrakan.foto);

    const { data, setData, post, put, progress, errors, processing } = useForm({
        id: kontrakan ? kontrakan.id : "",
        no_wa: kontrakan ? kontrakan.no_wa : "",
        nama: kontrakan ? kontrakan.nama : "",
        alamat: kontrakan ? kontrakan.alamat : "",
        harga: kontrakan ? kontrakan.harga : "",
        keterangan: kontrakan ? kontrakan.keterangan : "",
        foto: "",
        _method:'put',
    });

    const imageChange = (e) => {
        setData("foto", e.target.files[0]);
        setPrevImage(URL.createObjectURL(e.target.files[0]));
    };

    const imageReset = () => {
        setPrevImage(kontrakan.foto);
    };


    const submit = (e) => {
        if(data['foto']){
            router.post(`/kontrakan/${kontrakan.id}`, data,)

            // put(`/kontrakan/${kontrakan.id}`,{
            //     _method:'put',
            // })
        }else{
            put(route('kontrakan.update',data.id));
        }
    }

    return (
        <>
            <AdminLayout
                header={"Edit Data +62" + kontrakan.no_wa}
                user={auth.user}
            >
                <Head title={"Edit Data +62" + kontrakan.no_wa} />

                <header className="bg-gradient-info pb-8 pt-5 pt-md-7">
                    <Container fluid>
                        <Alert
                            color="success"
                            isOpen={flash.success != null ? true : false}
                        >
                            <strong>Success!</strong>{" "}
                            {flash.success != null && flash.success}
                        </Alert>
                        <Row className="mb-3">
                            <Col>
                                <Button
                                    color="secondary"
                                    href={route("kontrakan.index")}
                                    tag={Link}
                                    size="sm"
                                >
                                    <i className="fa-solid fa-arrow-left"></i>
                                    <span>Kembali</span>
                                </Button>
                            </Col>
                        </Row>

                        {/* Data*/}
                        <Row className="gap-2">
                            <Col lg="6">
                                <Card className="bg-secondary shadow">
                                    <CardHeader className="bg-white border-0">
                                        <Row className="align-items-center">
                                            <Col xs="8">
                                                <h3 className="mb-0">
                                                    Edit Data
                                                </h3>
                                            </Col>
                                            <Col className="text-right" xs="4">
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                    onClick={submit}
                                                >
                                                    <i class="fa-regular fa-floppy-disk"></i>
                                                    <span>Save</span>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </CardHeader>

                                    <CardBody>
                                        <Form>
                                            <FormGroup>
                                                <Label className="form-control-label">
                                                    No Wa
                                                </Label>
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupText>
                                                        +62
                                                    </InputGroupText>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="no_wa"
                                                        name="no_wa"
                                                        placeholder="No Wa"
                                                        type="number"
                                                        defaultValue={
                                                            data != null
                                                                ? data.no_wa
                                                                : ""
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "no_wa",
                                                                e.target.value
                                                            )
                                                        }
                                                        invalid={
                                                            errors.no_wa && true
                                                        }
                                                    />
                                                </InputGroup>
                                                {errors.no_wa && (
                                                    <small
                                                        style={{
                                                            color: "#fb6340",
                                                        }}
                                                        className="text-sm justify-content-start"
                                                    >
                                                        {errors.no_wa}
                                                    </small>
                                                )}
                                            </FormGroup>

                                            {/* Nama dan Harga */}
                                            <Row>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label className="form-control-label">
                                                            Nama (optional)
                                                        </Label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="nama"
                                                            name="nama"
                                                            placeholder="Nama"
                                                            type="text"
                                                            defaultValue={
                                                                data.nama !=
                                                                null
                                                                    ? data.nama
                                                                    : ""
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "nama",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            invalid={
                                                                errors.nama &&
                                                                true
                                                            }
                                                        />
                                                        <FormFeedback>
                                                            {errors.nama &&
                                                                errors.nama}
                                                        </FormFeedback>
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <Label className="form-control-label">
                                                            Harga
                                                        </Label>
                                                        <InputGroup className="input-group-alternative">
                                                            <InputGroupText>
                                                                Rp
                                                            </InputGroupText>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="harga"
                                                                name="harga"
                                                                placeholder="No Wa"
                                                                type="number"
                                                                defaultValue={
                                                                    data != null
                                                                        ? data.harga
                                                                        : ""
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "harga",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                invalid={
                                                                    errors.harga &&
                                                                    true
                                                                }
                                                            />
                                                        </InputGroup>
                                                        {errors.harga && (
                                                            <small
                                                                style={{
                                                                    color: "#fb6340",
                                                                }}
                                                                className="text-sm justify-content-start"
                                                            >
                                                                {errors.harga}
                                                            </small>
                                                        )}
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            {/* Alamat */}
                                            <FormGroup>
                                                <Label className="form-control-label">
                                                    Alamat
                                                </Label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="alamat"
                                                    name="alamat"
                                                    placeholder="alamat"
                                                    type="textarea"
                                                    rows="3"
                                                    defaultValue={
                                                        data.alamat != null
                                                            ? data.alamat
                                                            : ""
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "alamat",
                                                            e.target.value
                                                        )
                                                    }
                                                    invalid={
                                                        errors.alamat && true
                                                    }
                                                />
                                                <FormFeedback>
                                                    {errors.alamat &&
                                                        errors.alamat}
                                                </FormFeedback>
                                            </FormGroup>

                                            {/* Keterangan */}
                                            <FormGroup>
                                                <Label className="form-control-label">
                                                    Keterangan
                                                </Label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="keterangan"
                                                    name="keterangan"
                                                    placeholder="keterangan"
                                                    type="textarea"
                                                    rows="3"
                                                    defaultValue={
                                                        data.keterangan != null
                                                            ? data.keterangan
                                                            : ""
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "keterangan",
                                                            e.target.value
                                                        )
                                                    }
                                                    invalid={
                                                        errors.keterangan &&
                                                        true
                                                    }
                                                />
                                                <FormFeedback>
                                                    {errors.keterangan &&
                                                        errors.keterangan}
                                                </FormFeedback>
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6">
                                <Card className="card-profile shadow">
                                    <CardHeader className="bg-white border-0">
                                        <Row className="align-items-center">
                                            <Col xs="6">
                                                <h3 className="mb-0">
                                                    Ganti Foto
                                                </h3>
                                            </Col>
                                            <Col xs="6" className="text-right">
                                                <Button
                                                    color="secondary"
                                                    size="sm"
                                                    onClick={imageReset}
                                                >
                                                    <i class="fa-solid fa-rotate-left"></i>
                                                    <span>Reset</span>
                                                </Button>
                                                {data.foto != '' && (

                                                    <Button
                                                    color="primary"
                                                    onClick={submit}
                                                    size="sm"
                                                    >
                                                    <i class="fa-regular fa-floppy-disk"></i>
                                                    <span>Save</span>
                                                </Button>
                                                    )}
                                            </Col>
                                        </Row>
                                    </CardHeader>
                                    <CardBody className="pt-0 pt-md4">
                                        <Form
                                            onSubmit={submit}
                                            encType="multipart/form-data"
                                        >
                                            <Row>
                                                {prevImage != null && (
                                                    <Media>
                                                        <CardImg
                                                            src={prevImage}
                                                        />
                                                    </Media>
                                                )}
                                            </Row>
                                            <Row className="mt-3">
                                                <Col>
                                                    <FormGroup>
                                                        <Label className="form-control-label">
                                                            Ganti Gambar
                                                        </Label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="foto"
                                                            name="foto"
                                                            placeholder="Foto"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={
                                                                imageChange
                                                            }
                                                        ></Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </header>
            </AdminLayout>
        </>
    );
};

KontrakanEdit.propTypes = {};

export default KontrakanEdit;
