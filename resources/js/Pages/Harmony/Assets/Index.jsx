import Header from '@/Components/Argon/Headers/Header'
import AssetTable from '@/Components/Custom/Tables/AssetTable'
import AdminLayout from '@/Layouts/AdminLayout'
import { Head, router } from '@inertiajs/react'
import React, { useState } from 'react'
import { Button, Container } from 'reactstrap'
import moment from 'moment'
import TambahAset from '@/Components/Custom/Modals/Asset/TambahAset'
import AddComma from '@/Components/Custom/Services/AddComma'
import KonfirmasiHapus from '@/Components/Custom/Modals/Asset/KonfirmasiHapus'
import StatusAssetStyle from './StatusAssetStyle'
import AssetStatusBadge from '@/Components/Custom/Badge/AssetStatusBadge'

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
                toggleTambah={()=>openModal(null)}
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
                            fontWeight: 'bold'
                        }} title={asset.asset_name}>
                            {asset.asset_name}
                        </td>
                        <td>
                            <div>{asset?.outlet?.nama || ''}</div>
                            <span>{asset?.outlet?.alamat || ''}</span>

                        </td>
                        <td>{moment(asset.purchase_date).format('DD MMMM YYYY')}</td>
                        <td><AddComma    value={asset?.purchase_price || 0} /></td>
                        <td><AddComma value={asset?.current_book_value || 0}/></td>
                        <td><AssetStatusBadge status={asset?.status || ''} /></td>
                        <td>
                            <Button color='warning' size='sm' onClick={()=> openModal(asset)}>
                                <i className='fas fa-edit' mr-1 ></i>
                                Edit
                            </Button>
                            <Button
                                color='danger'
                                size='sm'
                                onClick={()=>openDeleteModal(asset)}
                            >
                                <i className='fas fa-trash-alt mr-1'></i>
                                Hapus
                            </Button>
                        </td>
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
        <KonfirmasiHapus
            isOpen={isDeletedModalOpen}
            item={selectedDelete}
            toggle={closeDeleteModal}
            key={selectedDelete?.id || Math.random()}
        />
    </AdminLayout>
  )
}

export default Index
