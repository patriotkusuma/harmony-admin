import React from 'react'
import PropTypes from 'prop-types'
import { Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { useForm } from '@inertiajs/react'

const OutletInfForm = props => {
    const {data, setData, post, errors, submit} = props



  return (
    <Form onSubmit={submit}>
        <Row>
            <Col md="6">
                <FormGroup>
                    <Label
                        className='form-control-label'
                        htmlFor='input-fullname'
                    >
                        Nama Outlet
                    </Label>
                    <Input
                        className='form-control-alternative'
                        id='input-fullname'
                        placeholder='Nama Outlet'
                        onChange={e=>setData('nama', e.target.value)}
                        type='text'
                        autoFocus
                        required
                        invalid={errors.nama && true}
                    />

                    <FormFeedback>
                        {errors.nama}
                    </FormFeedback>
                </FormGroup>
            </Col>
            <Col md="6">
                <FormGroup>
                    <Label
                        className='form-control-label'
                        htmlFor='input-nickname'
                    >
                        Nama Unik
                    </Label>
                    <Input
                        className='form-control-alternative'
                        id='input-nickname'
                        placeholder='Ex: HarmonyOutlet1'
                        type='text'
                        required
                        onChange={e=>setData('nickname',e.target.value)}
                        invalid={errors.nickname && true}
                    />

                    <FormFeedback>
                        {errors.nickname}
                    </FormFeedback>
                </FormGroup>
            </Col>
            <Col md="6">
                <FormGroup>
                    <Label
                        className='form-control-label'
                        htmlFor='input-latitude'
                    >
                        Latitude
                    </Label>
                    <Input
                        className='form-control-alternative'
                        id='input-latitude'
                        placeholder='Ex: -7.750316426109168'
                        type='text'
                        required
                        onChange={e=>setData('latitude',e.target.value)}
                        invalid={errors.latitude && true}
                    />

                    <FormFeedback>
                        {errors.latitude}
                    </FormFeedback>
                </FormGroup>
            </Col>
            <Col md="6">
                <FormGroup>
                    <Label
                        className='form-control-label'
                        htmlFor='input-longitude'
                    >
                        Longitude
                    </Label>
                    <Input
                        className='form-control-alternative'
                        id='input-longitude'
                        placeholder='Ex: 110.41166751772727'
                        type='text'
                        required
                        onChange={e=>setData('longitude', e.target.value)}
                        invalid={errors.longitude && true}
                    />

                    <FormFeedback>
                        {errors.longitude}
                    </FormFeedback>
                </FormGroup>
            </Col>
            <Col md="6">
                <FormGroup>
                    <Label
                        className='form-control-label'
                        htmlFor='input-telpon'
                    >
                        Telpon
                    </Label>
                    <Input
                        className='form-control-alternative'
                        id='input-telpon'
                        placeholder='Ex: 0812345678'
                        type='text'
                        required
                        onChange={e=>setData('telpon',e.target.value)}
                        invalid={errors.telpon && true}
                    />

                    <FormFeedback>
                        {errors.telpon}
                    </FormFeedback>
                </FormGroup>
            </Col>
            <Col md="12">
                <FormGroup>
                    <Label
                        className='form-control-label'
                        htmlFor='input-alamat'
                    >
                        Alamat
                    </Label>
                    <Input
                        className='form-control-alternative'
                        id='input-alamat'
                        placeholder='Ex: Gempol, Karangasem, CondongCatur'
                        type='textarea'
                        rows="3"
                        required
                        onChange={e=>setData('alamat',e.target.value)}
                        invalid={errors.alamat && true}
                    />

                    <FormFeedback>
                        {errors.alamat}
                    </FormFeedback>
                </FormGroup>
            </Col>
            <Col md="12">
                <FormGroup>
                    <Label
                        className='form-control-label'
                        htmlFor='input-kode-qris'
                    >
                        Kode Qris
                    </Label>
                    <Input
                        className='form-control-alternative'
                        id='input-kode-qris'
                        placeholder='Ex: Gempol, Karangasem, CondongCatur'
                        type='textarea'
                        rows="3"
                        required
                        onChange={e=>setData('kode_qris',e.target.value)}
                        invalid={errors.kode_qris && true}
                    />

                    <FormFeedback>
                        {errors.kode_qris}
                    </FormFeedback>
                </FormGroup>
            </Col>

        </Row>
    </Form>
  )
}

OutletInfForm.propTypes = {
    data:PropTypes.object,
    setData:PropTypes.func,
    post: PropTypes.func,
    errors:PropTypes.any,
    submit: PropTypes.func
}

export default OutletInfForm
