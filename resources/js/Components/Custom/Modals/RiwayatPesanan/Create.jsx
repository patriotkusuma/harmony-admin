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
    const { isOpen, toggleModal, filteredData, kodePesan } = props;
    const { data, setData, post, patch } = useForm({
        id:"",
        kodePesan: "",
        nama: "",
        jumlah: "",
    });

    useEffect(()=>{
        setData({
            'id' : filteredData != null ? filteredData.id : '',
            'kodePesan' : kodePesan != null ? kodePesan : '',
            'nama' : filteredData != null ? filteredData.nama_pakaian : '',
            'jumlah' : filteredData != null ? filteredData.jumlah : ''
        })
    },[filteredData]);
    const submit = (e) => {
        e.preventDefault()
        if(filteredData == null){
            post(route('detail-pakaian.store'),{
                onSuccess: toggleModal(),
            })
        }else {
            patch(route('detail-pakaian.update', data.id),{
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
                    {filteredData != null ? "Edit" : "tambah"} Detail Pakaian
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
                            defaultValue={filteredData != null ? filteredData.nama_pakaian : ''}
                            onChange={(e) =>setData('nama',e.target.value)}
                            placeholder="Nama Category"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label className="form-control-label">Jumlah</Label>
                        <Input
                            className="form-control-alternative"
                            name="jumlah"
                            id="deskripsi"
                            defaultValue={filteredData !=null ? filteredData.jumlah : 0}
                            onChange={(e) => setData('jumlah', e.target.value)}
                            type="number"
                            min={0}
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
    kodePesan: PropTypes.string,
};

export default Create;
