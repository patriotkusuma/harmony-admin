import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    Button,
    CardImg,
    Col,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    InputGroup,
    InputGroupText,
    Label,
    Media,
    Modal,
    Row,
} from "reactstrap";
import { useForm } from "@inertiajs/react";

const Create = (props) => {
    const { isOpen, toggleModal, filteredData } = props;
    const [prevImage, setPrevImage] = useState('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freeiconspng.com%2Fimages%2Fno-image-icon&psig=AOvVaw0YJfT3Pl2FIay9wskzwTdd&ust=1696211150373000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKDquYrd04EDFQAAAAAdAAAAABAE');

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
        no_wa: "",
        nama: "",
        alamat: "",
        foto: "",
        keterangan: "",
    });

    const submit = (e) => {
        // console.log(e);
        if(filteredData == null){
            post(route('kontrakan.store'), {
                onSuccess: () => {
                    setData('id','');
                    setData('no_wa','');
                    setData('nama','');
                    setData('foto','');
                    setData('keterangan','');
                    setData('alamat','');
                    toggleModal()
                },
            })
        }
    }

    return (
        <Modal
            className="modal-dialog-centered modal-lg"
            toggle={toggleModal}
            isOpen={isOpen}
        >
            <div className="modal-header">
                <h2 className="modal-title" id="modal-title-default">
                    {filteredData == null ? "Tambah" : "Edit"} Data Calon
                    Kontrakan
                </h2>
                <button
                    aria-label="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={toggleModal}
                    className="close"
                >
                    <span aria-hidden={true}>
                        <i className="fa-solid fa-xmark"></i>
                    </span>
                </button>
            </div>

            {/* modal Body */}
            <div className="modal-body">
                <Form role="form" onSubmit={submit}>
                    <Row>
                        <Col md="8">
                            <FormGroup>
                                <Label className="form-control-label">
                                    No Wa (tanpa 0)
                                </Label>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupText>+62</InputGroupText>
                                    <Input
                                        className="form-control-alternative"
                                        id="no_wa"
                                        name="no_wa"
                                        type="number"
                                        value={data.no_wa}
                                        defaultValue={
                                            data != null
                                                ? data.no_wa
                                                : ""
                                        }
                                        onChange={(e) =>
                                            setData("no_wa", e.target.value)
                                        }
                                        invalid={errors.no_wa && true}
                                    />
                                </InputGroup>
                                {errors.no_wa && (
                                    <small
                                        style={{ color: "#fb6340" }}
                                        className="text-sm justify-content-start"
                                    >
                                        {errors.no_wa}
                                    </small>
                                )}
                            </FormGroup>
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
                                            type="text"
                                            value={data.nama}
                                            defaultValue={
                                                data != null
                                                    ? data.nama
                                                    : ""
                                            }
                                            onChange={(e) =>
                                                setData("nama", e.target.value)
                                            }
                                            invalid={errors.nama && true}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label className="form-control-label">
                                            Harga
                                        </Label>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupText>Rp </InputGroupText>
                                            <Input
                                                className="form-control-alternative"
                                                id="harga"
                                                name="harga"
                                                type="number"
                                                value={data.harga}
                                                defaultValue={
                                                    data != null
                                                        ? data.harga
                                                        : ""
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "harga",
                                                        e.target.value
                                                    )
                                                }
                                                invalid={errors.harga && true}
                                            />
                                        </InputGroup>
                                        {errors.harga && (
                                            <small
                                                style={{ color: "#fb6340" }}
                                                className="text-sm justify-content-start"
                                            >
                                                {errors.harga}
                                            </small>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>

                            <FormGroup>
                                <Label className="form-control-label">
                                    Foto
                                </Label>

                                <Input
                                    className="form-control-alternative"
                                    id="foto"
                                    name="foto"
                                    placeholder="Foto"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        setData("foto", e.target.files[0]);
                                        setPrevImage(
                                            URL.createObjectURL(
                                                e.target.files[0]
                                            )
                                        );
                                    }}
                                    invalid={errors.foto && true}
                                />
                                <FormFeedback>
                                    {errors.foto && errors.foto[0]}
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label className="form-control-label">
                                    Alamat
                                </Label>
                                <Input
                                    type="textarea"
                                    id="alamat"
                                    name="alamat"
                                    defaultValue={
                                        data != null
                                            ? data.alamat
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setData("alamat", e.target.value)
                                    }
                                    className="form-control-alternative"
                                    rows="3"
                                    invalid={errors.alamat && true}
                                />

                                <FormFeedback>
                                    {errors.keterangan && errors.keterangan}
                                </FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label className="form-control-label">
                                    Keterangan (optional)
                                </Label>
                                <Input
                                    type="textarea"
                                    id="keterangan"
                                    name="keterangan"
                                    defaultValue={
                                        data.keterangan != null
                                            ? data.keterangan
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setData("keterangan", e.target.value)
                                    }
                                    rows="3"
                                    invalid={errors.keterangan && true}
                                />

                                <FormFeedback>
                                    {errors.keterangan && errors.keterangan}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <FormGroup>
                                <Label className="form-control-label">Preview Foto</Label>
                            </FormGroup>
                            {prevImage != null && (
                                <Media>
                                    <CardImg src={prevImage}></CardImg>
                                </Media>
                            )}

                            <div className="d-flex flex-row mt-5">
                                <Button
                                    className="mr-auto"
                                    color="link"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={toggleModal}
                                >
                                    Close
                                </Button>
                                <Button
                                    color="primary"
                                    size="sm"
                                    type="button"
                                    disabled={processing}
                                    onClick={submit}
                                >
                                    <i className="fa-regular fa-floppy-disk"></i>
                                    <span>Save Change</span>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Modal>
    );
};

Create.propTypes = {
    isOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
    filteredData: PropTypes.any,
};

export default Create;
