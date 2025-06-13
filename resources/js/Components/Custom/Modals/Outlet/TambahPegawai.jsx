import React from 'react'
import PropTypes from 'prop-types'
import { Button, Col, FormGroup, Input, Label, Modal, Row } from 'reactstrap'
import { useForm } from '@inertiajs/react'

const TambahPegawai = props => {
    const {isOpen, outlet, toggleModal, pegawais, jabatans} = props

    const {data, setData, post} = useForm({
        id_outlet: 'id' in outlet ? outlet.id : '',
        id_jabatan: '',
        id_pegawai: '',
        keterangan: ''
    })

    const submit = () => {
        post(route('pegawai-outlet.store'), {
            onSuccess: toggleModal()
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
                    Tambah Pegawai di Outlet
                </h2>
            </div>

            <div className='modal-body bg-secondary'>
                <Row>
                    <Col md="6">
                        <FormGroup>
                            <Label className='form-control-label'>Pilih Pegawai</Label>
                            <Input
                                autoFocus={true}
                                className='form-control form-control-alternative form-select'
                                name='id_pegawai'
                                type='select'
                                onChange={(e)=>setData('id_pegawai', e.target.value)}
                            >
                                {pegawais !==null && pegawais.map((pegawai, index) => (
                                    <option key={index} value={pegawai.id}>{pegawai.nama}</option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                            <Label className='form-control-label'>Pilih Jabatan di Outlet</Label>
                            <Input
                                className='form-control form-control-alternative form-select'
                                name='id_jabatan'
                                type='select'
                                onChange={(e)=>setData('id_jabatan', e.target.value)}
                            >
                                {jabatans !== null && jabatans.map((jabatans, index) => (
                                    <option key={index} value={jabatans.id}>{jabatans.nama_jabatan}</option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md="12">
                        <FormGroup>
                            <Label className='form-control-label'>Keterangan</Label>
                            <Input
                                className='form-control-alternative'
                                type='textarea'
                                rows="3"
                                onChange={(e) => setData('keterangan', e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </div>

            <div className='modal-footer'>
                <Button
                    className='mr-auto'
                    color='link'
                    data-dismiss="modal"
                    type='button'
                    onClick={toggleModal}
                >
                    Close
                </Button>
                <Button
                    color='primary'
                    size='md'
                    type='button'
                    onClick={submit}
                >
                    <i className='fa-regular fa-floppy-disk mr-1'></i>
                    Simpan
                </Button>
            </div>

        </Modal>
    )
}

TambahPegawai.propTypes = {
    isOpen: PropTypes.bool,
    outlet: PropTypes.object,
    toggleModal: PropTypes.func,
    pegawais: PropTypes.object,
    jabatans: PropTypes.jabatan
}

export default TambahPegawai
