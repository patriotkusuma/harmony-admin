import React, { forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Col, Form, FormFeedback, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap'
import { useForm } from '@inertiajs/react'
import moment from 'moment'
import ReactDatetimeClass from 'react-datetime'

const VoucherInForm =forwardRef((props,ref) => {
    const {toggleModal} = props
    const {data, setData,post, errors} = useForm({
        'nama': '',
        'kode_voucher': '',
        'jenis': '',
        'nilai': '',
        'kuota': '',
        'start_time': '',
        'end_time': '',
        'status': ''
    })

    const handleSubmit = () => {
        console.log(data)
        post(route('voucher.store'), {
            onSuccess: toggleModal()
        })
    }

    useImperativeHandle(ref, ()=>{
        return {
            handleSubmit
        }
    })

    const updatedNamaVoucher  = (value) => {
        let date = moment()
        // let kode = "HRM-" + value.replace(/\s/g, '') +"-" + date.unix()

        let nama = value
        value = value + date.unix()
        let kode = generateVoucher(15,value)
        setData('kode_voucher', kode)
        setData('nama',nama)
    }

    const generateVoucher = (length =12, value="voucher") => {
        let chartset =  value.replace(/\s/g,'').toUpperCase()
        let randomText = '';
        for (let i = 0; i < length; i++){
            let randomIndex = Math.floor(Math.random() * chartset.length)
            randomText += chartset[randomIndex]
        }

        return randomText
    }

    return (
        <Form>
            <FormGroup>
                <Label className='form-control-label'>Nama Voucher</Label>
                <Input
                    className='form-control-alternative'
                    type='text'
                    placeholder='Nama Voucher'
                    required
                    invalid={errors.nama && true}
                    // defaultValue={data.nama && data.nama}
                    onChange={(e)=>{
                        // setData('nama', e.target.value)
                        updatedNamaVoucher( e.target.value)
                    }}

                />
                <FormFeedback>
                    {errors.nama}
                </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label className='form-control-label'>Kode Voucher</Label>
                <Input
                    className='form-control-alternative'
                    type='text'
                    placeholder='Kode Voucher'
                    required
                    invalid={errors.kode_voucher && true}
                    defaultValue={data.kode_voucher && data.kode_voucher}
                    // onChange={(e)=>setData('nama', e.target.value)}

                />
                <FormFeedback>
                    {errors.kode_voucher}
                </FormFeedback>
            </FormGroup>
            <Row >
                <Col md="6" className='my-2'>
                    <InputGroup className='input-group-alternative'>
                        <Label className='form-control-label'>Tanggal Mulai</Label>
                        <InputGroup className='input-group-alternative'>
                            <InputGroupText>
                                <i className="ni ni-calendar-grid-58" />
                            </InputGroupText>
                            <ReactDatetimeClass
                                inputProps={{
                                    placeholder:"Tanggal Mulai",
                                }}
                                onChange={e=>setData('start_time',e._d)}
                                timeFormat={false}
                                closeOnSelect={true}
                                closeOnClickOutside={true}
                                className=''
                                renderDay={(props, currentDate, selecteDate) => {
                                    let classes = props.className
                                    if(data.start_time && data.end_time && data.start_time + "" === currentDate._d +""){
                                        classes +=" start-date"
                                    }else if(data.start_time && data.end_time && new Date(data.start_time + "") < new Date(currentDate._d + "") && new Date(data.end_time + "") > new Date(currentDate._d + "")){
                                        classes +=" middle-date"
                                    }else if(data.end_time && data.end_time + "" === currentDate._d + ""){
                                        classes +=" end-date"
                                    }
                                    return(
                                        <td {...props} className={classes}>
                                            {currentDate.date()}
                                        </td>
                                    )
                                }}


                            />
                            <FormFeedback>
                                {errors.start_time}
                            </FormFeedback>

                        </InputGroup>

                    </InputGroup>

                </Col>
                <Col md="6" className='my-2'>
                    <InputGroup className='input-group-alternative'>
                        <Label className='form-control-label'>Tanggal Selesai</Label>
                        <InputGroup className='input-group-alternative'>
                            <InputGroupText>
                                <i className="ni ni-calendar-grid-58" />
                            </InputGroupText>
                            <ReactDatetimeClass

                                inputProps={{
                                    placeholder:"Tanggal Selesai",
                                }}
                                isValidDate={(current)=>{
                                    return current.isAfter(data.start_time)
                                }}
                                onChange={e=>setData('end_time',e._d)}
                                timeFormat={false}
                                closeOnSelect={true}
                                closeOnClickOutside={true}
                                className=''
                                renderDay={(props, currentDate, selecteDate) => {
                                    let classes = props.className
                                    if(data.start_time && data.end_time && data.start_time + "" === currentDate._d +""){
                                        classes +=" start-date"
                                    }else if(data.start_time && data.end_time && new Date(data.start_time + "") < new Date(currentDate._d + "") && new Date(data.end_time + "") > new Date(currentDate._d + "")){
                                        classes +=" middle-date"
                                    }else if(data.end_time && data.end_time + "" === currentDate._d + ""){
                                        classes +=" end-date"
                                    }else if(data.start_time && new Date(data.start_time + "") < new Date(currentDate._d + "")){
                                        classes += " disabled"
                                    }
                                    return(
                                        <td {...props} className={classes}>
                                            {currentDate.date()}
                                        </td>
                                    )
                                }}
                            />


                        </InputGroup>

                    </InputGroup>
                </Col>
                <Col md="6">

                    <FormGroup>
                        <Label className='form-control-label'>Jenis Voucher</Label>
                        <Input
                            className='form-control form-select form-control-alternative'
                            type='select'
                            placeholder='Kode Voucher'
                            required
                            invalid={errors.jenis && true}
                            defaultValue={data.jenis && data.jenis}
                            onChange={(e)=>setData('jenis', e.target.value)}

                        >
                            <option>Pilih Jenis</option>
                            <option value="nominal" >Nominal</option>
                            <option value="persen" >Persen %</option>
                            {/* <option>Gift</option> */}
                        </Input>
                        <FormFeedback>
                            {errors.jenis}
                        </FormFeedback>
                    </FormGroup>

                    <FormGroup>
                        <Label className='form-control-label'>Nilai</Label>
                        <Input
                            className='form-control-alternative'
                            type='number'
                            placeholder='Ex: 0'
                            required
                            min={0}
                            invalid={errors.nilai && true}
                            defaultValue={data.nilai && data.nilai}
                            onChange={(e)=>setData('nilai', e.target.value)}

                        />
                        <FormFeedback>
                            {errors.nilai}
                        </FormFeedback>
                    </FormGroup>


                </Col>
                <Col md="6" >

                    <FormGroup>
                        <Label className='form-control-label'>Kuota</Label>
                        <Input
                            className='form-control-alternative'
                            type='text'
                            required
                            placeholder='0'
                            defaultValue={data.kuota && data.kuota}
                            onChange={(e) => setData('kuota', e.target.value)}
                            invalid={errors.kuota}
                        />
                        <FormFeedback>
                            {errors.kuota}
                        </FormFeedback>
                    </FormGroup>

                    <FormGroup>
                        <Label className='form-control-label'>Status</Label>
                        <Input
                            className='form-control form-select form-control-alternative'
                            type='select'
                            placeholder='Kode Voucher'
                            required
                            invalid={errors.status && true}
                            defaultValue={data.status && data.status}
                            onChange={(e)=>setData('status', e.target.value)}

                        >
                            <option>Pilih Status</option>
                            <option value='active'>Aktif</option>
                            <option value='inactive'>Tidak Aktif</option>
                        </Input>
                        <FormFeedback>
                            {errors.status}
                        </FormFeedback>
                    </FormGroup>


                </Col>

                <Col md="12" className='mt-2'>
                    <FormGroup>
                        <Label className='form-control-label'>Keterangan</Label>
                        <Input
                            className='form-control form-control-alternative'
                            type='textarea'
                            rows={4}
                            placeholder='Kode Voucher'
                            required
                            invalid={errors.keterangan && true}
                            defaultValue={data.keterangan && data.keterangan}
                            // onChange={(e)=>setData('nama', e.target.value)}

                        />
                        <FormFeedback>
                            {errors.keterangan}
                        </FormFeedback>
                    </FormGroup>
                </Col>
            </Row>

        </Form>
    )
})

VoucherInForm.propTypes = {
    toggleModal: PropTypes.func,
}

export default VoucherInForm
