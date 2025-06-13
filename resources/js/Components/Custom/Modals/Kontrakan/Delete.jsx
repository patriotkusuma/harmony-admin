import React from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Modal, Row } from 'reactstrap'
import { useForm } from '@inertiajs/react';

const Delete = (props) => {
    const {isOpen, toggleModal, deleteData} = props;
    const {delete:destroy} = useForm();

    const submit = (e) => {
        // e.preventDefault();
        destroy(route('kontrakan.destroy', deleteData.id),
            {
                preserveScroll:true,
                preserveState:true,
                replace:true,
                onSuccess: ()=>toggleModal()
            }
        );
    }
    return (
        <Modal
            className='modal-dialog-centered'
            toggle={toggleModal}
            isOpen={isOpen}
        >
            <div className="modal-header">
                <h2 className="modal-title" id='modal-title-default'>
                    Hapus Data
                </h2>
                <button
                    aria-label='close'
                    className='close'
                    data-dismiss='modal'
                    type='button'
                    onClick={toggleModal}
                >
                    <span aria-hidden={true}>
                        <i className="fa-solid fa-xmark"></i>
                    </span>
                </button>
            </div>
            <div className="modal-body">
                <Row className='align-items-center'>
                    <Col md="2">
                        <h1 className='text-danger'>
                            <i class="fa-solid fa-triangle-exclamation fa-2xl"></i>
                        </h1>
                    </Col>
                    <Col md="10 justify-content-start">
                        <h3 className=''>
                            Apakah anda yakin menghapus data
                            <Button
                                color='danger'
                                size='sm'
                            >
                                {deleteData != null ? deleteData.no_wa : ''}
                            </Button>
                            <span className=''>?</span>
                        </h3>
                    </Col>
                </Row>

            </div>
            <div className="modal-footer">
                <Button
                    color="danger" type="submit" size='md'
                    onClick={submit}
                >
                    <i className="fa-regular fa-trash-can"></i>
                    <span>
                        Ya, Hapus Data
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
        </Modal>
    )
}

Delete.propTypes = {
    isOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
    deleteData: PropTypes.array,
}

export default Delete
