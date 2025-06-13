import Header from '@/Components/Argon/Headers/Header'
import React from 'react'
import { Button, Container } from 'reactstrap'

const JabatanHeader = (props) => {
    const {toggleModal, user} = props
  return (
    <Header>
        <Container>

            {user.role === "admin" && (
                <Button
                    color='primary'
                    size='md'
                    onClick={toggleModal}
                    >
                    <i className='fa fa-plus mr-1'></i>
                    Tambah Jabatan
                </Button>
            )}
        </Container>
    </Header>
  )
}

export default JabatanHeader
