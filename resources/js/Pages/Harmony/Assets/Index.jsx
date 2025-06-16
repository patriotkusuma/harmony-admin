import Header from '@/Components/Argon/Headers/Header'
import AssetTable from '@/Components/Custom/Tables/AssetTable'
import AdminLayout from '@/Layouts/AdminLayout'
import { Head, router } from '@inertiajs/react'
import React, { useState } from 'react'
import { Container } from 'reactstrap'
import moment from 'moment'
import TambahAset from '@/Components/Custom/Modals/Asset/TambahAset'

const Index = (props) => {
    const {auth, assets, filter:initialFilter={}} = props
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editedData, setEditedData] = useState(null)
    const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false)
    const [selectedDelete, setSelectedDelete] = useState(null)
    const [filter, setFilter] = useState({
        'asset_name': initialFilter?.asset_name || '',
        'start_date': initialFilter?.start_date || '',
        'end_date': initialFilter?.end_date || '',
        'per_page':  initialFilter?.per_page ||10,
        'page': initialFilter?.page || 1
    })

    const openModal = (selectedData = null) => {
        setEditedData(selectedData)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setEditedData(null)
        setIsModalOpen(false)
    }

    const openDeleteModal = (selectedData) => {
        setSelectedDelete(selectedData)
        setIsDeletedModalOpen(true)
    }

    const closeDeleteModal = () => {
        setSelectedDelete(null)
        setIsDeletedModalOpen(false)
    }

    const handleFilterChange = (newValues) => {
        const newFilter = { ...filter, ...newValues}
        setFilter(newFilter)
        router.get(route('asset.index'),newFilter, {
            preserveState:true,
            preserveScroll:true
        })
    }
  return (
    <AdminLayout user={auth.user} header={"Aset Tetap"}>
        <Head title="Daftar Kepemilikan Aset" />
        <Header />
        <Container fluid className='mt--2 min-vh-100'>
            <AssetTable
                assets={assets}
                filter={filter}
                onFilterChange={handleFilterChange}
                toggleTambah={openModal}
            >
                {assets?.data && assets.data.map((asset, index) => (
                    <tr key={index}>
                        <th scope='row' style={{maxWidth:'35px'}}>
                            {(assets.current_page -1 ) * assets.per_page + index + assets.per_page + 1}
                        </th>
                        <td style={{
                            maxWidth: '480px',
                            whiteSpace: 'normal',
                            wordBreak: 'break-word',
                        }} title={asset.asset_name}>
                            {asset.asset_name}
                        </td>
                        <td>{moment(asset.purchase_date, 'DD MMMM YYYY')}</td>
                        <td><AddComma value={asset?.purchase_price || 0} /></td>
                    </tr>
                ))}
            </AssetTable>
        </Container>

        <TambahAset
            isModalOpen={isModalOpen}
            selectedData={editedData}
            toggleModal={closeModal}
            key={editedData?.id || Math.random()}
        />
    </AdminLayout>
  )
}

export default Index
