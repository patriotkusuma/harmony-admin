import AdminLayout from '@/Layouts/AdminLayout'
import { Head } from '@inertiajs/react'
import { Container } from 'reactstrap'
import React from 'react'

const Index = (props) => {
    const {auth, accounts} = props

  return (
    <AdminLayout user={auth.user} header={"Daftar Account"}>
        <Head title="Daftar Account"/>
        <Container fluid className='mt--7 min-vh-100'>

        </Container>
    </AdminLayout>
  )
}

export default Index
