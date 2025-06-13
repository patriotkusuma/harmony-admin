import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupText,
    Label,
    Modal,
    Row,
} from "reactstrap";
import { useForm } from "@inertiajs/react";


const Create = (props) => {
    const { isOpen, toggleModal, filteredData } = props;
    const { data, setData, post, patch } = useForm({
        id:"",
        nama: "",
        tipe_durasi:  "hari",
        durasi:"",
        deskripsi: "",
    });

    useEffect(()=>{
        setData({
            'id' : filteredData != null ? filteredData.id : '',
            'nama' : filteredData != null ? filteredData.nama : '',
            'tipe_durasi' : filteredData != null? filteredData.tipe_durasi : 'hari',
            'durasi' : filteredData != null ? filteredData.durasi : '',
            'deskripsi' : filteredData != null ? filteredData.deskripsi : ''
        })
    },[filteredData]);
    const submit = (e) => {
        e.preventDefault()
        if(filteredData == null){
            post(route(route().current()),{
                onSuccess: toggleModal(),
            })
        }else {
            patch(route('category-paket.update', data.id),{
                onSuccess: toggleModal(),
            })
        }
        console.log(data);
    }
    // console.log('data');
    // console.log(data);
    // console.log('filter');
    // console.log(filteredData);

    return (
        <Modal
            className="modal-dialog-centered modal-md"
            toggle={toggleModal}
            isOpen={isOpen}
            autoFocus={false}
        >
            <div className="modal-header">
                <h2 className="modal-title" id="modal-title-default">
                    {filteredData != null ? "Edit" : "tambah"} Data Category
                    Paket
                </h2>
                <button
                    aria-label="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={toggleModal}
                    className="close"
                >
                    <span aria-hidden={true}>
                        <i className="fa-solid-fa-xmark"></i>
                    </span>
                </button>
            </div>

            <div className="modal-body">
                <Form role="form">
                    <FormGroup>
                        <Label className="form-control-label">Nama *</Label>
                        <Input
                            autoFocus={true}
                            className="form-control-alternative"
                            name="nama"
                            id="nama"
                            type="text"
                            defaultValue={filteredData != null ? filteredData.nama : ''}
                            onChange={(e) =>setData('nama',e.target.value)}
                            placeholder="Nama Category"
                        />
                    </FormGroup>

                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label className="form-control-label">
                                    Tipe Durasi *
                                </Label>
                                <Input
                                    className="form-control form-control-alternative form-select"
                                    name="tipe_durasi"
                                    id="tipe_durasi"
                                    type="select"
                                    placeholder="Tipe Durasi"
                                    defaultValue={filteredData != null ? filteredData.tipe_durasi : 'Hari'}
                                    onChange={(e) => {
                                        setData("tipe_durasi", e.target.value);
                                    }}
                                >
                                    <option value="">Pilih Tipe</option>
                                    <option value="hari">Hari</option>
                                    <option value="jam">Jam</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label className="form-control-label">
                                    Durasi *
                                </Label>
                                <InputGroup className="input-group-alternative">
                                    <Input
                                        className="form-control form-control-alternative form-select"
                                        name="nama"
                                        id="nama"
                                        type="select"
                                        defaultValue={filteredData != null ? filteredData.durasi : ''}
                                        onChange={(e)=>setData('durasi', e.target.value)}
                                        placeholder="Nama Category"
                                    >
                                        <option value="">Pilih Durasi</option>
                                        {data.tipe_durasi == 'jam' || (filteredData != null && filteredData.tipe_durasi == 'jam') ? Array.from(Array(24), (e, i) => {
                                            return (
                                                <option value={i+1}>{i+1}</option>
                                            );
                                        }) : Array.from(Array(10),(e,i)=>{
                                            return(
                                                <option value={i+1}>{i+1}</option>
                                            )
                                        })}
                                    </Input>
                                    <InputGroupText>
                                        {data.tipe_durasi}
                                    </InputGroupText>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup>
                        <Label className="form-control-label">Deskripsi</Label>
                        <Input
                            className="form-control-alternative"
                            name="deskripsi"
                            id="deskripsi"
                            rows="3"
                            defaultValue={filteredData !=null ? filteredData.deskripsi : ''}
                            onChange={(e) => setData('deskripsi', e.target.value)}
                            type="textarea"
                        />
                    </FormGroup>
                </Form>
            </div>
            <div className="modal-footer">
                {/* <div className="d-flex flex-row align-items-center justify-content-between"> */}
                <Button
                    className="mr-auto"
                    color="link"
                    data-dismiss="modal"
                    type="button"
                    onClick={toggleModal}
                >
                    Close
                </Button>
                <Button color="primary" size="md" type="button" onClick={submit}>
                    <i className="fa-regular fa-floppy-disk"></i>
                    <span>Save Change</span>
                </Button>
                {/* </div> */}
            </div>
        </Modal>
    );
};

Create.propTypes = {
    toggleModal: PropTypes.func,
    isOpen: PropTypes.bool,
    filteredData: PropTypes.array,
};

export default Create;
