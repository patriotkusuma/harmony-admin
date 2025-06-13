import AdminLayout from '@/Layouts/AdminLayout'
import { Head, useForm } from '@inertiajs/react'
import { Container } from 'reactstrap'
import React from 'react'
import AccountTable from '@/Components/Custom/Tables/AccountTable'
import AccountHeader from './AccountHeader'

const Index = (props) => {
    const {auth, accounts} = props
    const {get} = useForm()

    const toggleTambahModal = () => {
        get(route('account.create'))
    }

  return (
    <AdminLayout user={auth.user} header={"Daftar Account"}>
        <Head title="Daftar Account"/>
        <AccountHeader/>
        <Container fluid className='mt--7 min-vh-100'>
            <AccountTable
                accounts={accounts}
                user={auth.user}
                toggleCreate={toggleTambahModal}
            >

            </AccountTable>

        </Container>
    </AdminLayout>
  )
}

export default Index
