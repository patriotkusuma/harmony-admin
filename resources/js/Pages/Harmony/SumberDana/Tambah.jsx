import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, FormFeedback, FormGroup, FormText, Input, InputGroup, InputGroupText, Label, Modal, Row } from 'reactstrap'
import { useForm, usePage } from '@inertiajs/react'
import { NumericFormat } from 'react-number-format'

const Tambah = (props) => {
    const {isOpen, filteredData,toggleModal} = props;
    const [totalPembelian, setTotalPembelian] = useState(0);

    const {data, setData, errors, reset,patch,post, get, processing, recentySuccessfull} = useForm({
        id:  '',
        nama:  '',
        keterangan:  '',
    })


    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");

    const numberWithComma = (e) => {
        setData('harga',addCommas(removeNonNumeric(e.target.value)));
    }

    useEffect(()=>{
        if(filteredData != null){
            setData({
                id:  filteredData.id,
                nama:  filteredData.nama,
                keterangan:  filteredData.keterangan,
            });
            setTotalPembelian(addCommas(removeNonNumeric(filteredData.harga * filteredData.qty)));
        }else{
            setData({
                id:  '',
                nama:  '',
                keterangan:  '',
            })
        }

    },[filteredData]);

    const qtyChange = (e) => {
        var totalBeli = e.target.value * data['harga'].replaceAll('.', '');
        setData('qty', e.target.value);
        setTotalPembelian(addCommas(removeNonNumeric(totalBeli)));

    }

    const submit = (e) => {
        // setData('id', filteredData !=null ? filteredData.id : '' );
        // e.preventDefault();
        // console.log(data);
        if(filteredData == null){
            post(route(route().current()),{
                onSuccess: () => toggleModal(),
            })
        }else{
            // console.log(data);
            patch(route('belanja-kebutuhan.update',filteredData, filteredData.id),{
                preserveState:true,
                replace:true,
                preserveScroll:true,
                onSuccess: () => toggleModal(),
            })
        }
    }

    return (
        <Modal
            className='modal-dialog-centered'
            toggle={toggleModal}
            isOpen={isOpen}
        >
            <div className="modal-header">
                <h2  className="modal-title" id="modal-title-default">
                  {filteredData == null ? 'Tambah' : 'Edit'} Data Sumber Dana
                </h2>
                <button
                    aria-label='close'
                    className='close'
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
                <Form role='form' onSubmit={submit}>
                    <FormGroup>
                        <Label
                            className='form-control-label'
                        >
                            Nama
                            <span className='text-light'>(*)</span>

                        </Label>
                        <Input
                            className='form-control-alternative'
                            id='nama'
                            name='nama'
                            placeholder='nama'
                            type='text'
                            autoFocus
                            defaultValue={filteredData != null ? filteredData.nama : ''}
                            onChange={(e) => setData('nama', e.target.value)}
                            invalid={errors.nama && true}
                        />
                        <FormFeedback>
                            {errors.nama && errors.nama }
                        </FormFeedback>
                    </FormGroup>



                    <FormGroup>
                        <Label
                            className='form-control-label'
                        >
                            Keterangan
                        </Label>
                        <Input
                            className='form-control-alternative'
                            id='keterangan'
                            name='keterangan'
                            placeholder='Keterangan'
                            type='textarea'
                            rows="3"
                            autoFocus
                            defaultValue={filteredData != null ? filteredData.keterangan : ''}
                            onChange={(e)=>setData('keterangan', e.target.value)}
                            invalid={errors.keterangan && true}
                        />

                        <FormFeedback>
                            {errors.keterangan && errors.keterangan }
                        </FormFeedback>
                    </FormGroup>

                    <br/>




                </Form>
                <div className='d-flex justify-content-between'>

                    <Button color="primary" type="submit" disabled={processing} onClick={submit}>
                        <i className="fa-regular fa-floppy-disk"></i>
                        <span>
                            Save changes
                        </span>
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
    )
}

Tambah.propTypes = {
    isOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
    filteredData: PropTypes.any,
}

export default Tambah
