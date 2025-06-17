import AdminLayout from '@/Layouts/AdminLayout'
import { router } from '@inertiajs/react'
import React, { useState } from 'react'
import { TRUE } from 'sass'

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

    openDeleteModal = (selectedData) => {
        setSelectedDelete(selectedData)
        setIsDeleteModalOpen(true)
    }

    closeDeleteModal = ()=> {
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
        <AdminLayout>

        </AdminLayout>
    )
}

export default Index
