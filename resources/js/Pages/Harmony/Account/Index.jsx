import AdminLayout from '@/Layouts/AdminLayout'
import { Head, router } from '@inertiajs/react'
import { Button, Container } from 'reactstrap'
import React, { useEffect, useState } from 'react'
import AccountTable from '@/Components/Custom/Tables/AccountTable'
import AccountHeader from './AccountHeader'
import TambahAccount from '@/Components/Custom/Modals/Account/TambahAccount'
import AddComma from '@/Components/Custom/Services/AddComma'
import KonfirmasiHapus from '@/Components/Custom/Modals/Account/KonfirmasiHapus'
import AccountTypeBadge from '@/Components/Custom/Modals/Account/AccountTypeBadge'

const Index = (props) => {
    const { auth, accounts, balanceByTypes, filters:initialFilter={} } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredData, setFilteredData] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedDelete, setSelectedDelete] = useState(null)
    const [filters, setFilters] = useState({
        account_type: initialFilter?.account_type || '',
        search: initialFilter?.search || '',
        per_page: initialFilter?.per_page || 10,
        page: initialFilter?.page || 1,
    });

    const openModal = (selectedData = null) => {
        setFilteredData(selectedData);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setFilteredData(null);
        setIsModalOpen(false);
    };

    const openDeleteModal = (selectedData) => {
        setSelectedDelete(selectedData)
        setIsDeleteModalOpen(true)
    }

    const closeDeleteModal = () => {
        setSelectedDelete(null)
        setIsDeleteModalOpen(false)
    }

    const handleFilterChange = (newValues) => {
        const newFilter = {...filters, ...newValues}
        setFilters(newFilter)

        router.get(route('account.index'), newFilter,{
            preserveState: true,
            preserveScroll: true,
        });
    }

   return (
        <AdminLayout user={auth.user} header={"Daftar Account"}>
            <Head title="Daftar Account" />
            <AccountHeader totalBalance={balanceByTypes} />
            <Container fluid className='mt--7 min-vh-100'>
                <AccountTable
                    accounts={accounts}
                    user={auth.user}
                    toggleTambah={() => openModal(null)} // buka tambah
                    filter={filters}
                    onFilterChange={handleFilterChange}
                >
                    {accounts?.data && accounts.data.map((account, index) => (
                        <tr key={index}>
                            <th scope='row' style={{ maxWidth: '35px' }}>
                                {(accounts.current_page - 2) * accounts.per_page + index + accounts.per_page + 1}
                            </th>
                            <td style={{
                                maxWidth: '400px',
                                whiteSpace: 'normal',
                                wordBreak: 'break-word',
                             }} title={account.account_name}>
                                {account.account_name}
                            </td>
                            <td><AccountTypeBadge type={account.account_type} /></td>
                            <td><AddComma value={account.initial_balance} /></td>
                            <td><AddComma value={account.current_balance} /></td>
                            <td className="text-truncate" style={{ maxWidth: '400px',
                                whiteSpace: 'normal',
                                wordBreak: 'break-word', }} title={account.description}>
                                {account.description}
                            </td>
                            <td>
                                {/* <Button color='secondary' size='sm'>
                                    <i className='fa fa-eye mr-1'></i>
                                    Detail
                                </Button> */}
                                <Button color='warning' size='sm' onClick={() => openModal(account)}>
                                    <i className='fas fa-edit mr-1'></i>
                                    Edit
                                </Button>
                                <Button
                                    color='danger'
                                    size='sm'
                                    onClick={() => openDeleteModal(account)}
                                >
                                    <i className='fas fa-trash-alt mr-1'></i> Hapus
                                </Button>
                            </td>
                        </tr>
                    ))}
                </AccountTable>
            </Container>

            <TambahAccount
                key={filteredData?.id || 'new'}
                isModalOpen={isModalOpen}
                toggleModal={closeModal}
                filteredData={filteredData}
            />

            <KonfirmasiHapus
                isOpen={isDeleteModalOpen}
                toggle={closeDeleteModal}
                item={selectedDelete}
            />
        </AdminLayout>
    );
};

export default Index;
