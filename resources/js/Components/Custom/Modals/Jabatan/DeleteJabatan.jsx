import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'reactstrap'
import { useForm } from '@inertiajs/react'

const DeleteJabatan = props => {
    const {isOpen, toggleModal, deletedData} = props

    const {delete:destroy} = useForm()

    const submit = (e)=>{
        destroy(route('jabatan.destroy', deletedData.id),
        {
            preserveState:true,
            preserveScroll:true,
            replace:true,
            onSuccess: toggleModal()
        })
    }
    return (
        <>
            <Modal
                className='modal-dialog-centered'
                toggle={toggleModal}
                isOpen={isOpen}
            >
                <div className='modal-header bg-secondary d-flex justify-content-between align-items-center'>
                    <h4 className='modal-title' id='modal-title-default'>
                        Hapus Data
                    </h4>
                    <Button
                        size='sm'
                        data-dismiss='modal'
                        onClick={toggleModal}
                    >
                        <i className='fa-solid fa-xmark'></i>
                    </Button>
                </div>
                <div className='modal-body'>
                    <h4 className='font-weight-light'>
                        Apakah anda yakin menghapus data {deletedData != null && (
                            <strong className='font-weight-bold'>{deletedData.nama_jabatan}</strong>
                        )} ?
                    </h4>
                </div>
                <div className='modal-footer'>
                    <Button
                        color='danger'
                        type='submit'
                        onClick={submit}
                        size='sm'
                    >
                        <i className='fa-regular fa-trash-can mr-1'></i>
                        Ya, Hapus Data
                    </Button>
                    <Button
                        className='ml-auto'
                        color='link'
                        type="button"
                        size='sm'
                        onClick={toggleModal}
                    >
                        Close
                    </Button>
                </div>

            </Modal>
        </>
    )
}

export default DeleteJabatan
