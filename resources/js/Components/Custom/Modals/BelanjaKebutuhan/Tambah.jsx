import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, FormFeedback, FormGroup, FormText, Input, InputGroup, InputGroupText, Label, Modal, Row } from 'reactstrap'
import { useForm, usePage } from '@inertiajs/react'
import { NumericFormat } from 'react-number-format'

const Tambah = (props) => {
    const {isOpen, filteredData,toggleModal, sumberDanas} = props;
    const [totalPembelian, setTotalPembelian] = useState(0);

    const {data, setData, errors, reset,patch,post, get, processing, recentySuccessfull} = useForm({
        id:  '',
        sumber_dana_id: '',
        nama:  '',
        qty:  '',
        satuan:  '',
        harga:  '',
        total_pembelian: '',
        keterangan:  '',
        tanggal_pembelian:  '',
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
                sumber_dana_id: filteredData.sumber_dana_id,
                nama:  filteredData.nama,
                qty:  filteredData.qty,
                satuan:  filteredData.satuan,
                harga:  addCommas(removeNonNumeric(filteredData.harga)),
                total_pembelian:  addCommas(removeNonNumeric(filteredData.harga * filteredData.qty)),
                keterangan:  filteredData.keterangan,
                tanggal_pembelian:  filteredData.tanggal_pembelian,

            });
            setTotalPembelian(addCommas(removeNonNumeric(filteredData.harga * filteredData.qty)));
        }else{
            setData({
                id:  '',
                sumber_dana_id: '',
                nama:  '',
                qty:  '',
                satuan:  '',
                harga:  '',
                total_pembelian: '',
                keterangan:  '',
                tanggal_pembelian:  '',
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
                  {filteredData == null ? 'Tambah' : 'Edit'} Data Belanja Kebutuhan
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
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label
                                    className='form-control-label'
                                >
                                    Harga Satuan
                                    <span className='text-light'>(*)</span>

                                </Label>
                                <InputGroup className='input-group-alternative'>
                                    <InputGroupText>
                                        Rp
                                    </InputGroupText>

                                    <Input
                                        className='form-control-alternative'
                                        id='harga'
                                        name='harga'
                                        placeholder='Jumlah Keluar'
                                        type='text'
                                        value={data.harga}
                                        defaultValue={filteredData != null ? filteredData.harga : ''}
                                        onChange={numberWithComma}
                                        invalid={errors.harga && true}
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
                                <Label
                                    className='form-control-label'
                                >
                                    QTY
                                    <span className='text-light'>(*)</span>

                                </Label>
                                <InputGroup className='input-group-alternative'>

                                    <Input
                                        className='form-control-alternative'
                                        id='qty'
                                        name='qty'
                                        placeholder='QTY'
                                        type='number'
                                        value={data.qty}
                                        defaultValue={filteredData != null ? filteredData.qty : ''}
                                        onChange={qtyChange}
                                        invalid={errors.qty && true}
                                    />
                                </InputGroup>


                                {errors.qty && (
                                    <small style={{color:'#fb6340'}} className='text-sm justify-content-start'>
                                        {errors.qty}
                                    </small>
                                ) }

                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <FormGroup>
                                <label
                                    className='form-control-label'
                                    htmlFor="exampleFormControlSelect1">
                                        Sumber Dana
                                </label>
                                <br/>
                                <Input
                                    bsSize="lg"
                                    className="form-control form-control-alternative form-select"
                                    type="select"
                                    id='sumber_dana_id'
                                    name='sumber_dana_id'
                                    defaultValue={filteredData != null ? filteredData.sumber_dana_id : ''}
                                    onChange={(e)=>setData('sumber_dana_id', e.target.value)}
                                    invalid = {errors.sumber_dana_id && true}
                                    required
                                >
                                    <option value="">Pilih Sumber Dana</option>
                                    {sumberDanas.map((sumberDana, index) => {
                                        return (
                                            <option value={sumberDana.id}>{sumberDana.nama}</option>
                                        )
                                    })}
                                </Input>

                                <FormFeedback>
                                    {errors.sumber_dana_id && errors.sumber_dana_id }
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <label
                                    className='form-control-label'
                                    htmlFor="exampleFormControlSelect1">
                                        Satuan
                                </label>
                                <br/>
                                <Input
                                    bsSize="lg"
                                    className="form-control form-control-alternative form-select"
                                    type="select"
                                    id='satuan'
                                    name='satuan'
                                    defaultValue={filteredData != null ? filteredData.satuan : ''}
                                    onChange={(e)=>setData('satuan', e.target.value)}
                                    invalid = {errors.satuan && true}
                                    required
                                >
                                    <option value=''>Pilih Satuan</option>
                                    <option value="kilo">Kilo</option>
                                    <option value="liter">Liter</option>
                                    <option value="satuan">Satuan</option>
                                </Input>

                                <FormFeedback>
                                    {errors.satuan && errors.satuan }
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label
                                    className='form-control-label'
                                >
                                    Total Pembelian
                                    <span className='text-light'>(**)</span>
                                </Label>
                                <InputGroup className='input-group-alternative '>
                                    <InputGroupText className=''>
                                        Rp
                                    </InputGroupText>

                                    <Input
                                        className='form-control-alternative  disable'
                                        id='total_pembelian'
                                        name='total_pembelian'
                                        placeholder='Total Pembelian'
                                        type='text'
                                        value={totalPembelian}

                                        defaultValue={filteredData != null ? filteredData.total_pembelian : ''}
                                        // onChange={numberWithComma}
                                        invalid={errors.total_pembelian && true}
                                    />
                                </InputGroup>


                                {errors.total_pembelian && (
                                    <small style={{color:'#fb6340'}} className='text-sm justify-content-start'>
                                        {errors.total_pembelian}
                                    </small>
                                ) }

                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label
                                    className='form-control-label'
                                >
                                    Tanggal Pembelian
                                    <span className='text-light'>(*)</span>

                                </Label>
                                <InputGroup className='input-group-alternative'>

                                    <Input
                                        className='form-control-alternative'
                                        id='tanggal_pembelian'
                                        name='tanggal_pembelian'
                                        placeholder='tanggal_pembelian'
                                        type='date'
                                        defaultValue={filteredData != null ? filteredData.tanggal_pembelian : ''}
                                        onChange={(e) => setData('tanggal_pembelian', e.target.value)}
                                        invalid={errors.tanggal_pembelian && true}
                                    />
                                </InputGroup>


                                {errors.qty && (
                                    <small style={{color:'#fb6340'}} className='text-sm justify-content-start'>
                                        {errors.qty}
                                    </small>
                                ) }

                            </FormGroup>
                        </Col>
                    </Row>




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
    sumberDanas: PropTypes.array,
}

export default Tambah
