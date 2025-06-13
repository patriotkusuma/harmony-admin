import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, FormFeedback, FormGroup, FormText, Input, InputGroup, InputGroupText, Label, Modal, Row } from 'reactstrap'
import { useForm, usePage } from '@inertiajs/react'
import { NumericFormat } from 'react-number-format'

const Tambah = (props) => {
    const {isOpen, filteredData,toggleModal} = props;


    const {data, setData, errors, reset,patch,post, get, processing, recentySuccessfull} = useForm({
        id:  '',
        keperluan:  '',
        jumlah_keluar:  '',
        bukti_keluar:  '',
        keterangan:  '',
        tanggal_keluar:  '',
    })

    const onChanged = (e) => {
        console.log(e);
    }

    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");

    const numberWithComma = (e) => {
        setData('jumlah_keluar',addCommas(removeNonNumeric(e.target.value)));
    }

    useEffect(()=>{
        if(filteredData != null){
            setData({
                id:  filteredData.id,
                keperluan:  filteredData.keperluan,
                jumlah_keluar:  addCommas(removeNonNumeric(filteredData.jumlah_keluar)),
                bukti_keluar:  filteredData.bukti_keluar,
                keterangan:  filteredData.keterangan,
                tanggal_keluar:  filteredData.tanggal_keluar,
            });
        }else{
            setData({
                id:  '',
                keperluan:  '',
                jumlah_keluar:  '',
                bukti_keluar:  '',
                keterangan:  '',
                tanggal_keluar:  '',
            })
        }
    },[filteredData])

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
            patch(route('dana-keluar.update',filteredData, filteredData.id),{
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
                  {filteredData == null ? 'Tambah' : 'Edit'} Data Dana Keluar
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
                            Keperluan
                        </Label>
                        <Input
                            className='form-control-alternative'
                            id='keperluan'
                            name='keperluan'
                            placeholder='Keperluan'
                            type='text'
                            autoFocus
                            defaultValue={filteredData != null ? filteredData.keperluan : ''}
                            onChange={(e) => setData('keperluan', e.target.value)}
                            invalid={errors.keperluan && true}
                        />
                        <FormFeedback>
                            {errors.keperluan && errors.keperluan }
                        </FormFeedback>
                    </FormGroup>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label
                                    className='form-control-label'
                                >
                                    Jumlah Keluar
                                </Label>
                                <InputGroup className='input-group-alternative'>
                                    <InputGroupText>
                                        Rp
                                    </InputGroupText>

                                    <Input
                                        className='form-control-alternative'
                                        id='jumlah_keluar'
                                        name='jumlah_keluar'
                                        placeholder='Jumlah Keluar'
                                        type='text'
                                        value={data.jumlah_keluar}
                                        defaultValue={filteredData != null ? filteredData.jumlah_keluar : ''}
                                        onChange={numberWithComma}
                                        invalid={errors.jumlah_keluar && true}
                                    />
                                </InputGroup>


                                {errors.harga && (
                                    <small style={{color:'#fb6340'}} className='text-sm justify-content-start'>
                                        {errors.harga}
                                    </small>
                                ) }

                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <label
                                    className='form-control-label'
                                    htmlFor="exampleFormControlSelect1">
                                        Tipe
                                </label>
                                <br/>
                                <Input
                                    className='form-control-alternative'
                                    id='tanggal_keluar'
                                    name='tanggal_keluar'
                                    placeholder='Tanggal Keluar'
                                    type='date'
                                    defaultValue={filteredData != null ? filteredData.tanggal_keluar : ''}
                                    onChange={(e) => setData('tanggal_keluar', e.target.value)}
                                    invalid={errors.tanggal_keluar && true}
                                />

                                <FormFeedback>
                                    {errors.tipe && errors.tipe }
                                </FormFeedback>
                            </FormGroup>
                            </Col>
                    </Row>

                    <FormGroup>
                        <Label
                            className='form-control-label'
                            htmlFor='bukti_keluar'
                        >
                            Bukti Keluar
                        </Label>
                        <Input
                            className='form-control-alternative'
                            id='bukti_keluar'
                            name='bukti_keluar'
                            placeholder='Bukti Keluar'
                            type='file'
                            accept='image/*, .pdf'
                            defaultValue={filteredData != null ? filteredData.bukti_keluar : ''}
                            onChange={(e) => setData('bukti_keluar', e.target.value)}
                            invalid={errors.bukti_keluar && true}
                        />
                        <FormFeedback>
                            {errors.keperluan && errors.keperluan }
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
