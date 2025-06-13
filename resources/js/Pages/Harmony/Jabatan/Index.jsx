import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import AdminLayout from '@/Layouts/AdminLayout'
import { Head, useForm } from '@inertiajs/react'
import JabatanHeader from './JabatanHeader'
import { Button, Container } from 'reactstrap'
import CreateJabatan from '@/Components/Custom/Modals/Jabatan/CreateJabatan'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import JabatanTable from '@/Components/Custom/Tables/JabatanTable'
import DeleteJabatan from '@/Components/Custom/Modals/Jabatan/DeleteJabatan'

const Index = props => {
    const {auth, jabatans, flash} = props
    const [createModal, setCreateModal] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const isReload = useRef(0)
    const filteredData = useRef([])
    const deletedData = useRef([])

    const {get} = useForm();

    const toggleModal = () => {
        filteredData.current = null
        setCreateModal(!createModal)
    }

    const toggelDelete = ()=>{
        setIsDelete(!isDelete)

    }

    const toggleToast = (value) => {
        toast.info(value)
    }

    const editData = (value) => {
        filteredData.current = value
        setCreateModal(true)
    }

    useEffect(()=>{
        if(isReload.current===1){
            get(route(route().current()), {
                preserveState: true,
                preserveScroll: true,
                replace: true
            })
        }
        if('success' in flash){
            toast.info(flash.success)
        }
    }, [isReload, flash])


    return (
        <AdminLayout user={auth.user} header={"List Jabatan"}>
            <Head title='List Jabatan'/>
            <JabatanHeader toggleModal={toggleModal} user={auth.user}/>

            <Container fluid className='mt--7 min-vh-100'>
                <JabatanTable
                >
                    {jabatans !== 'undefined' && jabatans.map((jabatan, index) => (
                        <tr key={index}>
                            <th>{index +1}</th>
                            <th>{jabatan.nama_jabatan}</th>
                            <th>{jabatan.keterangan}</th>
                            <th>
                                <Button
                                    color='warning'
                                    size='sm'
                                    onClick={(e) =>{
                                        editData(jabatan)
                                    }}
                                >
                                    <i className='fa-solid fa-pen-to-square mr-1'></i>
                                    Edit
                                </Button>
                                <Button
                                    color='danger'
                                    size='sm'
                                    onClick={(e) => {
                                        deletedData.current = jabatan
                                        toggelDelete()
                                    }}
                                >
                                    <i className='fa-solid fa-trash-can mr-1'></i>
                                    Delete
                                </Button>
                            </th>
                        </tr>
                    ))}
                </JabatanTable>
            </Container>

            <CreateJabatan
                isOpen={createModal}
                toggleModal={toggleModal}
                filteredData={filteredData.current}

            />

            <DeleteJabatan
                isOpen={isDelete}
                toggleModal={toggelDelete}
                deletedData={deletedData.current}
            />

            <ToastContainer limit={3} stacked/>
        </AdminLayout>
    )
}

Index.propTypes = {}

export default Index
