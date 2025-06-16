import { useForm } from '@inertiajs/react'
import React from 'react'
import { NumericFormat } from 'react-number-format'
import { Col, Form, FormFeedback, FormGroup, Input, Label, Modal, Row } from 'reactstrap'
import AsyncSelect  from "react-select/async"

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
    })


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
            patch(route('asset.update', data.id), {onSuccess, onError})
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
                            </FormGroup>
                            <AsyncSelect
                                id='id_outlet'
                                cacheOptions={true}
                                defaultOptions
                                loadOptions={loadOutlets}
                                value={data?.id_outlet || ''}
                                onChange={(selected) => {setData('id_outlet', selected? selected.value : '')}}
                                placeholder="Pilih Outlet"
                                isClearable
                                className='bg-default text-white'
                            />
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
                                />
                                <FormFeedback>{errors.purchase_price}</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
            </Form>
        </Modal>
    )
}

export default TambahAset
