import { useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { Button, Col, Form, FormFeedback, FormGroup, Input, InputGroup, Label, Modal, Row } from 'reactstrap'
import AsyncSelect  from "react-select/async"
import moment from 'moment'


const TambahAset = ({isModalOpen, selectedData, toggleModal, }) => {
    const {data, setData, patch, processing, post, errors, reset, get} = useForm({
        id: selectedData?.id || '',
        id_outlet: selectedData?.id_outlet || '',
        asset_name: selectedData?.asset_name || '',
        purchase_date: selectedData?.purchase_date || '',
        purchase_price: selectedData?.purchase_price != null ? parseFloat(selectedData.purchase_price).toFixed(2) : '',
        depreciation_method: selectedData?.depreciation_method || '',
        usefull_live_years: selectedData?.usefull_live_years != null ? parseInt(selectedData.usefull_live_years) : '',
        salvage_value: selectedData?.salvage_value != null ? parseFloat(selectedData.salvage_value).toFixed(2) : '',
        accumulated_depreciation: selectedData?.accumulated_depreciation != null ? parseFloat(selectedData?.accumulated_depreciation).toFixed(2) : '',
        current_book_value: selectedData?.current_book_value != null ? parseFloat(selectedData?.current_book_value).toFixed(2) : '',
        description: selectedData?.description || '',
        last_depreciation_date: selectedData?.last_depreciation_date || '',
        status: selectedData?.status || ''
    })
    const [selectedOutlet, setSelectedOutlet] = useState(
        selectedData?.id_outlet && selectedData?.nama_outlet ? {value: selectedData.id_outlet, label: selectedData.nama_outlet} : null
    )

    const selectedStyle = {
        control:(base, state) => ({
            ...base,
            backgroundColor: '#1e1e2f',
            borderColor: 'transparent',
            color: 'white',
            borderRadius: '0.375rem',
            boxShadow: 'none',
            minHeight: '38px',
            fontWeight: 'bold',
            '&:hover': {
                borderColor: 'transparent'
            }
        }),
        singleValue: (base) => ({
            ...base,
            color:'white'
        }),
        input: (base) => ({
            ...base,
            color: 'white'
        }),
        placeholder: (base) => ({
            ...base,
            color: '#b0b0b0',
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: '#1e1e2f',
            color:'white'
        }),
        option: (base,state) => ({
            ...base,
            backgroundColor: state.isFocused? '#323240' : '#1e1e2f',
            color: 'white',
            cursor: 'pointer'
        })
    }


    const loadOutlets = async (inputValue) => {
        const response = await fetch(`/outlet-search?search-outlet=${inputValue}`)
        console.log(response)
        const data = await response.json()

        return data.map(outlet => ({
            value: outlet.id,
            label: outlet.nama
        }))

    }

    const submit = (e) => {
        e.preventDefault()

        const purchase_price = parseFloat(data.purchase_price.replace(/\./g, '').replace(',', '.')) || 0
        const salvage_value = parseFloat(data.salvage_value.replace(/\./g, '').replace(',', '.')) || 0
        const accumulated_depreciation = parseFloat(data.accumulated_depreciation.replace(/\./g, '').replace(',', '.')) || 0
        const current_book_value = parseFloat(data.current_book_value.replace(/\./g, '').replace(',', '.')) || 0

        setData({
            ...data,
            purchase_price: purchase_price,
            salvage_value: salvage_value,
            accumulated_depreciation: accumulated_depreciation,
            current_book_value: current_book_value,
        })

        const onSuccess = () => {
            toggleModal()
            reset()
        }

        const onError = (errors) => {
            console.log(errors)
        }

        if(selectedData){
            alert('update')
            // patch(route('asset.update', data.id), {onSuccess, onError})
        }else{
            post(route('asset.store'), {onSuccess, onError})
        }

    }


    return (
        <Modal
            className='modal-dialog-centered modal-default modal-lg'
            toggle={toggleModal}
            isOpen={isModalOpen}
        >
            <Form role='form' onSubmit={submit}>
                <div className='modal-header'>
                    <h2 className='modal-title'>{selectedData ? 'Edit' : 'Tambah'}</h2>
                    <button className='close' type='button' onClick={toggleModal}>
                        <span aria-hidden='true'><i className="fa-solid fa-xmark" /></span>
                    </button>
                </div>

                {/* Modal Body */}
                <div className='modal-body bg-default text-white px-4 py-3'>
                    <div className='mb-4'>
                        <h5 className='text-info font-weight-bold mb-3'>
                            <i className="fa-solid fa-circle-plus mr-2" />
                            Informasi Aset
                        </h5>
                    </div>

                    <FormGroup>
                        <Label for="asset_name" className='font-weight-bold text-white' >Nama Aset</Label>
                        <Input
                            id='asset_name'
                            name='asset_name'
                            value={data.asset_name}
                            onChange={e => setData('asset_name', e.target.value)}
                            disabled={processing}
                            invalid={!!errors.asset_name}
                            className='form-control bg-dark text-white border-0 font-weight-bold'
                            placeholder='Nama Aset'
                        />
                        <FormFeedback>{errors?.asset_name}</FormFeedback>
                    </FormGroup>
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label for="id_outlet" className='font-weight-bold text-white'>Outlet</Label>
                                <AsyncSelect
                                    id='id_outlet'
                                    cacheOptions={true}
                                    defaultOptions
                                    loadOptions={loadOutlets}
                                    value={selectedOutlet}
                                    onChange={(selected) => {
                                        setData('id_outlet', selected? selected.value : '')
                                        setSelectedOutlet(selected)
                                    }}
                                    placeholder="Pilih Outlet"
                                    isClearable
                                    styles={selectedStyle}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label for="status" className='font-weight-bold'>Status</Label>
                                <Input
                                    id='status'
                                    name='status'
                                    value={data?.status}
                                    onChange={e=>setData('status', e.target.value)}
                                    disabled={processing}
                                    invalid={!!errors.status}
                                    className='form-control bg-dark text-white border-0 font-weight-bold'
                                    type='select'
                                >
                                    <option value="">Pilih Status</option>
                                    <option value="Aktif">Aktif</option>
                                    <option value="Dijual">Dijual</option>
                                    <option value="Rusak">Rusak</option>
                                    <option value="Dibuang">Dibuang</option>
                                </Input>
                                <FormFeedback>{!!errors.status}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label for="purchase_price" className='font-weight-bold text-white'>Harga Perolehan</Label>
                                <NumericFormat
                                    thousandSeparator="."
                                    decimalSeparator=','
                                    decimalScale={2}
                                    fixedDecimalScale
                                    value={data?.purchase_price}
                                    prefix='Rp '
                                    onValueChange={(values) => setData('purchase_price', values.value)}
                                    customInput={Input}
                                    disabled={processing}
                                    className={`form-control bg-dark text-white border-0 font-weight-bold ${errors.purchase_price ? 'is-invalid' : ''}`}
                                    placeholder="Rp 30.000.000,00"
                                />
                                <FormFeedback>{errors.purchase_price}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup className='justify-content-between'>
                                <Label for="purchase_date" className='font-weght-bold text-white'>Purchase Date</Label>
                                <InputGroup className='input-group-alternative'>
                                    <Input
                                        id="purchase_date"
                                        name='purchase_date'
                                        value={data?.purchase_date || moment()}
                                        onChange={e=>setData('purchase_date',e.target.value)}
                                        disabled={processing}
                                        invalid={!!errors.purchase_date}
                                        className='form-control bg-dark text-white border-0 font-weight-bold'
                                        type='date'
                                    />
                                    <FormFeedback>{!!errors.purchase_date}</FormFeedback>

                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label for="usefull_live_years" className='font-weight-bold' >Usefull Live Years</Label>
                                <Input
                                    id='usefull_live_years'
                                    name='usefull_live_years'
                                    value={data?.usefull_live_years}
                                    disabled={processing}
                                    invalid={!!errors.usefull_live_years}
                                    className='form-control bg-dark text-white border-0 font-wegiht-bold'
                                    placeholder='Usefull live years'
                                    type='number'
                                    min={0}
                                    onChange={e=>setData('usefull_live_years', e.target.value)}
                                />
                                <FormFeedback>{!!errors.usefull_live_years}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label for="salvage_value" className='font-weight-bold'>Salvage Value</Label>
                                <NumericFormat
                                    thousandSeparator="."
                                    decimalSeparator=','
                                    decimalScale={2}
                                    fixedDecimalScale
                                    value={data.salvage_value}
                                    customInput={Input}
                                    disabled={processing}
                                    prefix='Rp '
                                    className={`form-control bg-dark text-white border-0 ${errors.salvage_value ? 'is-invalid' : ''}`}
                                />
                                <FormFeedback>{!!errors.salvage_value}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label for="accumulated_depreciation" className='font-weight-bold'>Accumulative Depreciation</Label>
                                <NumericFormat
                                    thousandSeparator="."
                                    decimalSeparator=','
                                    decimalScale={2}
                                    fixedDecimalScale
                                    value={data.accumulated_depreciation}
                                    customInput={Input}
                                    disabled={processing}
                                    prefix='Rp '
                                    className={`form-control bg-dark text-white border-0 ${errors.accumulated_depreciation ? 'is-invalid' : ''}`}
                                />
                                <FormFeedback>{!!errors.accumulated_depreciation}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label for="current_book_value" className='font-weight-bold'>Current Book Value</Label>
                                <NumericFormat
                                    thousandSeparator="."
                                    decimalSeparator=','
                                    decimalScale={2}
                                    fixedDecimalScale
                                    value={data.current_book_value}
                                    customInput={Input}
                                    disabled={processing}
                                    prefix='Rp '
                                    className={`form-control bg-dark text-white border-0 ${errors.current_book_value ? 'is-invalid' : ''}`}
                                />
                                <FormFeedback>{!!errors.current_book_value}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup>
                                <Label for="depreciation_method" className='font-weight-bold text-white'>Depreciation Method</Label>
                                <Input
                                    id="depreciation_method"
                                    name='depreciation_method'
                                    value={data?.depreciation_method}
                                    disabled={processing}
                                    invalid={!!errors.depreciation_method}
                                    className='form-control bg-dark text-white border-0 font-weight-bold'
                                    placeholder='Depreciation method'
                                    type='textarea'
                                    rows='2'
                                    onChange={e=>setData('depreciation_method', e.target.value)}
                                />
                                <FormFeedback>{!!errors.depreciation_method}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup>
                                <Label for="description" className='font-weight-bold text-white'>Description</Label>
                                <Input
                                    id="description"
                                    name='description'
                                    value={data?.description}
                                    disabled={processing}
                                    invalid={!!errors.description}
                                    className='form-control bg-dark text-white border-0 font-weight-bold'
                                    placeholder='Description'
                                    type='textarea'
                                    rows='3'
                                    onChange={e=>setData('description', e.target.value)}
                                />
                                <FormFeedback>{!!errors.description}</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                </div>

                <div className='modal-footer bg-dark px-4 d-flex justify-content-between'>
                    <Button color='light' onClick={toggleModal} disabled={processing}>
                        <i className='fa-solid fa-xmark mr-1'/>Batal
                    </Button>
                    <Button color='primary' type='submit' disabled={processing}>
                        {processing ? (
                            <>
                                <i className='fa fa-spinner fa-spin mr-1'></i> Menyimpan ...
                            </>
                        ): (
                            <>
                                <i className='fa-regular fa-floppy-disk'></i> Simpan
                            </>
                        )}
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}

export default TambahAset
