import AdminLayout from '@/Layouts/AdminLayout'
import { Head, router } from '@inertiajs/react'
import React, { useState } from 'react'
import { Container } from 'reactstrap'
import SupplierHeader from './SupplierHeader'
const Index = (props) => {
    const {auth, suppliers, filters:initialFilter={}} = props
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(null)
    const [selectedDelete, setSelectedDelete] = useState(null)
    const [filters, setFilters] = useState({
        search: initialFilter?.search || '',
        supplier_type: initialFilter?.supplier_type || '',
        per_page: initialFilter?.per_page || '',
        page: initialFilter?.page || '',
    })

    const openModal = (selectedData = null) => {
        setSelectedData(selectedData)
        setIsModalOpen(true)

    }
    const closeModal = () => {
        setSelectedData(null)
        setIsModalOpen(false)
    }

    const openDeleteModal = (selectedData) => {
        setSelectedDelete(selectedData)
        setIsDeleteModalOpen(true)
    }

    const closeDeleteModal = ()=> {
        setSelectedDelete(null)
        setIsDeleteModalOpen(false)
    }

    const handleFilterChange = (newValue) => {
        const newFilter = {...filters, ...newValue}
        setFilters(newFilter)

        router.get(route('supplier.index'), newFilter, {
            preserveState: true,
            preserveScroll:true
        })
    }
    return (
        <AdminLayout user={auth.user} header={"Management Supplier"}>
            <Head title='Management Supplier' />
            <SupplierHeader />
            <Container fluid className='mt--7 min-vh-100'>

            </Container>

        </AdminLayout>
    )
}

export default Index
