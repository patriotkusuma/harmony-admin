import React, { useState } from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Sidebar from "@/Components/Argon/Sidebars/Sidebar";
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

const Edit = (props) => {
    const { jenisCuci, auth, flash, categoryPakets } = props;
    const [prevImage, setPrevImage] = useState(jenisCuci.gambar);
    const [image, setImage] = useState();

    const { data, setData, post, put, progress, errors } = useForm({
        id: jenisCuci ? jenisCuci.id : "",
        id_category_paket: jenisCuci ? jenisCuci.id_category_paket : null,
        nama: jenisCuci ? jenisCuci.nama : "",
        harga: jenisCuci ? jenisCuci.harga : "",
        tipe: jenisCuci ? jenisCuci.tipe : "",
        keterangan: jenisCuci ? jenisCuci.keterangan : "",
        gambar: "",
    });

    const imageChange = (e) => {
        setData("gambar", e.target.files[0]);
        setPrevImage(URL.createObjectURL(e.target.files[0]));
    };
    const imageReset = () => {
        setPrevImage(jenisCuci.gambar);
    };

    const submit = (e) => {
        if (data["gambar"]) {
            post(route("jenis-cuci-image.update", jenisCuci.id));
        } else {
            put(route("jenis-cuci.update", data.id));
        }
    };

    return (
        <AdminLayout header={"Edit Data " + jenisCuci.nama} user={auth.user}>
            <Head title={"Edit Data " + jenisCuci.nama} />

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
                                href={route("jenis-cuci.index")}
                                tag={Link}
                                size="sm"
                            >
                                <i class="fa-solid fa-arrow-left"></i>
                                <span>Kembali</span>
                            </Button>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">Edit Data</h3>
                                        </Col>
                                        <Col className="text-right" xs="4">
                                            <Button
                                                color="primary"
                                                onClick={submit}
                                                size="sm"
                                            >
                                                Save
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    {/* <Form> */}
                                    <Form>
                                        <FormGroup>
                                            <Label className="form-control-label">
                                                Nama
                                            </Label>
                                            <Input
                                                className="form-control-alternative"
                                                id="nama"
                                                name="nama"
                                                placeholder="Nama Paket"
                                                type="text"
                                                required
                                                defaultValue={
                                                    data != null
                                                        ? data.nama
                                                        : ""
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "nama",
                                                        e.target.value
                                                    )
                                                }
                                                invalid={errors.nama && true}
                                            />
                                            <FormFeedback>
                                                {errors.nama && errors.nama}
                                            </FormFeedback>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label className="form-control-label">
                                                Category
                                            </Label>
                                            <Input
                                                className="form-control form-control-alternative form-select"
                                                type="select"
                                                defaultValue={data != null ? data.id_category_paket : ''}
                                                onChange={(e) => setData('id_category_paket',e.target.value)}
                                            >
                                                <option value="">Pilih Category</option>
                                                {
                                                    categoryPakets.map((value, index) => {
                                                        return (
                                                            <option value={value.id}  s>{value.nama}</option>
                                                        )
                                                    })
                                                }
                                            </Input>
                                        </FormGroup>
                                        <Row>
                                            <Col>
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
                                                            placeholder="Harga"
                                                            type="number"
                                                            min="0"
                                                            required
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
                                            <Col>
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="exampleFormControlSelect1"
                                                    >
                                                        Tipe
                                                    </label>
                                                    <br />
                                                    <Input
                                                        bsSize="lg"
                                                        className="form-control form-control-alternative form-select"
                                                        type="select"
                                                        id="tipe"
                                                        name="tipe"
                                                        defaultValue={
                                                            data != null
                                                                ? data.tipe
                                                                : ""
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "tipe",
                                                                e.target.value
                                                            )
                                                        }
                                                        invalid={
                                                            errors.tipe && true
                                                        }
                                                        required
                                                    >
                                                        <option value="">
                                                            Pilih Tipe
                                                        </option>
                                                        <option value="per_kilo">
                                                            Per Kilo
                                                        </option>
                                                        <option value="satuan">
                                                            Satuan
                                                        </option>
                                                    </Input>

                                                    <FormFeedback>
                                                        {errors.tipe &&
                                                            errors.tipe}
                                                    </FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <FormGroup>
                                            <Label className="form-control-label">
                                                Keterangan
                                            </Label>
                                            <Input
                                                className="form-control-alternative"
                                                id="keterangan"
                                                name="keterangan"
                                                placeholder="Keterangan"
                                                type="textarea"
                                                rows="4"
                                                autoFocus
                                                defaultValue={
                                                    data != null
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
                                                    errors.keterangan && true
                                                }
                                            />
                                            <FormFeedback>
                                                {errors.keterangan &&
                                                    errors.keterangan}
                                            </FormFeedback>
                                        </FormGroup>
                                    </Form>
                                    {/* </Form> */}
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="card-profile shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="6">
                                            <h3 className="mb-0">
                                                Edit Gambar
                                            </h3>
                                        </Col>

                                        <Col className="text-right" xs="6">
                                            <Button
                                                color="secondary"
                                                href="#pablo"
                                                onClick={imageReset}
                                                size="sm"
                                            >
                                                <i class="fa-solid fa-rotate-left"></i>
                                                <span>Reset</span>
                                            </Button>
                                            <Button
                                                color="primary"
                                                onClick={submit}
                                                size="sm"
                                            >
                                                <i class="fa-regular fa-floppy-disk"></i>
                                                <span>Save</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody className="pt-0 pt-md-4">
                                    <Form
                                        onSubmit={submit}
                                        encType="multipart/form-data"
                                    >
                                        <Row>
                                            {prevImage != null && (
                                                <Media>
                                                    <CardImg
                                                        src={prevImage}
                                                    ></CardImg>
                                                </Media>
                                            )}
                                        </Row>
                                        <Row className="">
                                            <FormGroup>
                                                <Label className="form-control-label">
                                                    Upload Gambar
                                                </Label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="gambar"
                                                    name="gambar"
                                                    placeholder="Gambar"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) =>
                                                        imageChange(e)
                                                    }
                                                    // value={filteredData != null ?filteredData.gambar : ''}
                                                    // defaultValue={filteredData != null ? filteredData.gambar : ''}
                                                    // onChange={(e) => {
                                                    //     setData(
                                                    //         "gambar",
                                                    //         e.target.files[0]
                                                    //     );
                                                    //     setPrevImage(
                                                    //         URL.createObjectURL(
                                                    //             e.target
                                                    //                 .files[0]
                                                    //         )
                                                    //     );
                                                    // }}
                                                    // invalid={
                                                    //     errors.gambar && true
                                                    // }
                                                />
                                                {/* <FormFeedback>
                                                    {errors.gambar &&
                                                        errors.gambar[0]}
                                                </FormFeedback> */}
                                            </FormGroup>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </header>
        </AdminLayout>
    );
};

Edit.propTypes = {};

export default Edit;
