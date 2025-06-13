import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'reactstrap'

const TambahOutlet = props => {
    const {isOpen, toggleModal} = props;
  return (
    <Modal
        className='modal-dialog-centered modal-lg'
        isOpen={isOpen}
        toggle={toggleModal}
    >
        <div className='modal-header'>
            <h2 className='modal-title'>
                Tambah Outlet
            </h2>
        </div>
    </Modal>
  )
}

TambahOutlet.propTypes = {
    isOpen: PropTypes.bool,
    toggleModal: PropTypes.func,

}

export default TambahOutlet
