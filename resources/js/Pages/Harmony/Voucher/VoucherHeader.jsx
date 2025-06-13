import React from 'react'
import PropTypes from 'prop-types'
import Header from '@/Components/Argon/Headers/Header'
import { Button, Col, Container } from 'reactstrap'

const VoucherHeader = props => {
    const {toggleCreate} = props
    return (
        <Header>
            <Container >
                <Button
                    color='primary'
                    onClick={toggleCreate}
                >
                    <i className='fa fa-plus mr-1'></i>
                    Buat Voucher Baru
                </Button>
            </Container>
        </Header>
    )
}

VoucherHeader.propTypes = {
    toggleCreate: PropTypes.func
}

export default VoucherHeader
