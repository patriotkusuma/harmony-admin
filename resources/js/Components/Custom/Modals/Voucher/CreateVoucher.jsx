import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'reactstrap'
import VoucherInForm from '../../Forms/Voucher/VoucherInForm'
import { useForm } from '@inertiajs/react'

const CreateVoucher = props => {
    const {isOpen, toggleModal} = props

    const {post, errors} = useForm()

    const ref = useRef()



    return (
        <Modal
            className='modal-dialog-centered modal-lg '
            isOpen={isOpen}
            toggle={toggleModal}
            scrollable={true}
        >
            <div className='modal-header d-flex align-items-center'>
                <h4 className='modal-title' id="modal-title-default">
                    Buat Voucher
                </h4>
                <Button
                    size='sm'
                    onClick={toggleModal}
                >
                    X
                </Button>
            </div>

            <div className='modal-body'>
                <VoucherInForm ref={ref} toggleModal={toggleModal}/>
            </div>
            <div className='modal-footer'>
                <Button
                    color='secondary'
                    className='mr-auto'
                    onClick={toggleModal}
                >
                    Batal
                </Button>
                <Button
                    className='ml-auto'
                    color='primary'
                    onClick={()=>{
                        ref.current?.handleSubmit()
                    }}
                >
                    <i className='fa fa-floppy-disk mr-1'></i>
                    Simpan
                </Button>
            </div>
        </Modal>
    )
}

CreateVoucher.propTypes = {
    isOpen: PropTypes.bool,
    toggleModal: PropTypes.func
}

export default CreateVoucher
