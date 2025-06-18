import { useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import { data } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap'

const ServiceJenisCuci = ({jenisCuci, accounts}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedEdit, setSelectedEdit] = useState(null)
    const [selectedDelete, setSelectedDelete] = useState(null)
    const [isModalDeleteOpen, setIsModalDeleteOpen]= useState(false)
    const {data,setData, get, post, patch, delete:destroy, processing, errors, reset} = useForm({
        id: selectedEdit?.id || '',
        uuid_jenis_cuci: jenisCuci?.uuid_jenis_cuci || '',
        id_revenue_account: selectedEdit?.id_revenue_account || '',
        description: selectedEdit?.description ||'',
    })

    const openModal = (selectedData = null)=> {
        setSelectedEdit(selectedData)
        if(selectedData){
            setData({
                'id': selectedData?.id || '',
                'id_revenue_account': selectedData?.id_revenue_account || '',
                'uuid_jenis_cuci': selectedData?.uuid_jenis_cuci || '',
                'description' : selectedData?.description || ''
            })
        }
        setIsModalOpen(true)
    }

    const closeModal = ()=> {
        setSelectedEdit(null)
        setIsModalOpen(false)
        reset()
    }

    const openDeleteModal = (selectedDelete ) =>{
        setSelectedDelete(selectedDelete)
        setIsModalDeleteOpen(true)
    }

    const closeDeleteModal = () =>{
        setSelectedDelete(null)
        setIsModalDeleteOpen(false)
    }

    const onSuccess = () => {
        closeModal();
        reset()
    }

    const onError = (err) => {
        console.error("❌ Submit error:", err);
    }
    const handleDelete = () =>{
        destroy(route('serice-revenue-account.delete', data.id))
    }
    const submit =(e) => {
        e.preventDefault()


        if(selectedEdit)
        {
            patch(route('service-revenue-account.update', data.id),{onSuccess:closeModal} )
        }else{
            post(route('service-revenue-account.store'), {onSuccess:onSuccess})
        }
    }

  return (
    <>
        <Card className='card-profile shadow mt-2'>
            <CardHeader className='bg-white border-0'>
                <Row className='align-items-center'>
                    <Col md="6">
                        <h3 className='mb-0'>
                            Jenis Cuci Account
                        </h3>
                    </Col>
                    <Col className='text-right' md="6">
                        <Button
                            color='primary'
                            onClick={()=>openModal(null)}
                            size='sm'
                        >
                            <i className='fa-solid fa-file-circle-plus mr-2'></i>
                            Tambah Data
                        </Button>

                    </Col>
                </Row>
            </CardHeader>
            <Table className='align-items-center table-flush' responsive>
                <thead className='thead-light'>
                    <tr>
                        <th scope='col'>No</th>
                        <th scope='col'>Nama Akun</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {jenisCuci?.service_revenue_account?.map((service, index)=> (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{service?.account?.account_name || ''}</td>
                            <td>
                                <Button color='warning' size='sm' onClick={()=> openModal(service)}>
                                    <i className='fas fa-edit' mr-1 ></i>
                                    Edit
                                </Button>
                                <Button
                                    color='danger'
                                    size='sm'
                                    onClick={()=>openDeleteModal(service)}
                                >
                                    <i className='fas fa-trash-alt mr-1'></i>
                                    Hapus
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Card>

        <Modal
            className='modal-dialog-centered modal-default modal-lg'
            toggle={closeModal}
            isOpen={isModalOpen}
        >
            <Form role='form' onSubmit={submit}>
                <div className='modal-header'>
                    <h2 className='modal-title'>{selectedEdit? 'Edit' : 'Tambah'} Account</h2>
                    <button className='close' type='button' onClick={closeModal}>
                        <span aria-hidden="true"><i className='fa-solid fa-xmark'></i></span>
                    </button>
                </div>
                <div className='modal-body bg-default text-white px-4 py-3'>
                    <div className='mb-4'>
                        <h5 className='text-info font-weight-bold mb-3'>
                            <i className='fa-solid fa-circle-plus mr-2'>
                                Akun Terhubung
                            </i>
                        </h5>
                    </div>

                    <FormGroup>
                        <Label for="id_revenue_account" className="font-weight-bold text-white">Nama Akun</Label>
                        <Input
                            id="id_revenue_account"
                            name="id_revenue_account"
                            value={data?.id_revenue_account || ''}
                            onChange={e=>setData('id_revenue_account',e.target.value )}
                            type="select"
                            className='form-control form-control-alternative form-select bg-dark text-white'
                            invalid={errors.id_revenue_account}
                        >
                            <option value="">Pilih Akun</option>
                            {accounts?.map((account, index) => {
                                return(
                                    <option key={index} value={account.id}>{account.account_name}</option>
                                )
                            })}
                        </Input>
                        <FormFeedback>{errors.id_revenue_account}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for='description' className='font-weight-bold tex-white'>Description</Label>
                        <Input
                            id='description'
                            name='description'
                            value={data?.description || ''}
                            onChange={e=>setData('description', e.target.value)}
                            type='textarea'
                            rows={3}
                            invalid={errors.description}
                            className='bg-dark text-white border-0'
                            placeholder='description'
                        />
                        <FormFeedback>{errors.description}</FormFeedback>
                    </FormGroup>
                </div>

                <div className="modal-footer bg-dark px-4 d-flex justify-content-between">
                    <Button color="light" onClick={closeModal} disabled={processing}>
                        <i className="fa-solid fa-xmark mr-1" /> Batal
                    </Button>
                    <Button color="primary" type="submit" disabled={processing}>
                        {processing ? (
                            <>
                                <i className="fa fa-spinner fa-spin mr-1"></i> Menyimpan...
                            </>
                        ) : (
                            <>
                                <i className="fa-regular fa-floppy-disk mr-1" /> Simpan
                            </>
                        )}
                    </Button>
                </div>
            </Form>
        </Modal>


        <Modal isOpen={isModalDeleteOpen} toggle={close} centered>
            <ModalHeader className="d-flex justify-content-between align-items-center">
                <span>Konfirmasi Hapus</span>
                <button
                    type="button"
                    className="btn-close btn btn-sm btn-outline-light"
                    onClick={closeDeleteModal}
                    aria-label="Close"
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </ModalHeader>
            <ModalBody>
                Apakah kamu yakin ingin menghapus akun <strong>{selectedDelete?.account?.account_name || ''}</strong>?
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={closeDeleteModal} disabled={processing}>
                    Batal
                </Button>
                <Button color="danger" onClick={handleDelete} disabled={processing}>
                    {processing ? (
                        <><i className="fa fa-spinner fa-spin mr-1"></i> Menghapus...</>
                    ) : (
                        <><i className="fa fa-trash mr-1"></i> Hapus</>
                    )}
                </Button>
            </ModalFooter>
        </Modal>
    </>
  )
}

export default ServiceJenisCuci
