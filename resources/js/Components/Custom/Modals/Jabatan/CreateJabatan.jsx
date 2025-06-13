import React from 'react'
import PropTypes from 'prop-types'
import { Button, Col, FormFeedback, FormGroup, Input, Label, Modal, Row } from 'reactstrap'
import { useForm } from '@inertiajs/react'

const CreateJabatan = props => {
    const {isOpen, toggleModal, filteredData} = props
    const {data, setData, post, patch,errors} = useForm({
        'id': filteredData !== null ? filteredData.id : '',
        'nama_jabatan': filteredData !== null ? filteredData.nama_jabatan : '',
        'keterangan': filteredData !== null ? filteredData.keterangan : '',
    })

    const submit = (e) => {
        e.preventDefault()
        if(filteredData === null){

            post(route('jabatan.store'), {
                onSuccess: toggleModal()
            });
        }else{
            patch(route('jabatan.update', filteredData.id), {
                onSuccess: toggleModal()
            })
        }

        setData({
            "id": "",
            "nama_jabatan":"",
            "keterangan":""
        })
    }

    return (
        <Modal
            autoFocus={false}
            className='modal-dialog-centered modal-md'
            isOpen={isOpen}
            toggle={toggleModal}
        >
            <div className='modal-header'>
                <h2 className='modal-title'>
                    Tambah Jabatan
                </h2>
            </div>
            <div className='modal-body bg-secondary' >
                <FormGroup>
                    <Label className='form-control-label'>Nama Jabatan</Label>
                    <Input
                        autoFocus={true}
                        className='form-control-alternative'
                        name='nama_jabatan'
                        id='nama_jabatan'
                        defaultValue={filteredData ? filteredData.nama_jabatan : ''}
                        type='text'
                        onChange={(e) => setData('nama_jabatan', e.target.value)}
                        placeholder='Nama Jabatan'
                        invalid={errors.nama_jabatan}
                    />
                    <FormFeedback>
                        {errors.nama_jabatan}
                    </FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label className='form-control-label'>Keterangan</Label>
                    <Input
                        className='form-control-alternative'
                        name='Keterangan'
                        id='Keterangan'
                        type='textarea'
                        defaultValue={filteredData ? filteredData.keterangan : ''}
                        rows={4}
                        onChange={(e) => setData('keterangan', e.target.value)}
                        placeholder='Nama Jabatan'
                        invalid={errors.keterangan}
                    />
                    <FormFeedback>
                        {errors.keterangan}
                    </FormFeedback>
                </FormGroup>
            </div>

            <div className='modal-footer bg-secondary'>

                <Button
                    className='mr-auto'
                    color='danger'
                    onClick={toggleModal}
                >

                    Batal
                </Button>
                <Button
                    color='primary'
                    onClick={submit}
                    disabled={!data.nama_jabatan}
                >
                    <i className='fa fa-save mr-1'></i>
                    Simpan
                </Button>

            </div>

        </Modal>
    )
}

CreateJabatan.propTypes = {
    isOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
    filteredData: PropTypes.object
}

export default CreateJabatan
