import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import AdminLayout from '@/Layouts/AdminLayout'
import { Head } from '@inertiajs/react'
import { Button, Container } from 'reactstrap'
import VoucherHeader from './VoucherHeader'
import CreateVoucher from '@/Components/Custom/Modals/Voucher/CreateVoucher'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import CustomTable from '@/Components/Custom/Tables/CustomTable'
import moment from 'moment'
import 'moment/locale/id'
moment.locale('id')

const headRow = [
    'No',
    'Voucher',
    'Kode',
    'Tanggal',
    'Status',
    'Action'
]

const Index = props => {
    const {auth, flash, vouchers} = props
    const [isCreate, setIsCreate] = useState(false)

    const toggleCreate = () => {
        setIsCreate(!isCreate)
    }

    useEffect(()=>{
        if(flash.success != null){
            toast(flash.success)
        }
    }, [flash])

    const statusChecker = (status) => {
        switch (status) {
            case 'active':

                return(
                    <h5 className='px-0 py-2 bg-default rounded-lg text-white text-center'>
                        {status}
                        <i className='fa fa-check ml-1'></i>
                    </h5>
                )

            default:
                break;
        }
    }
    return (
        <AdminLayout user={auth.user} header="Voucher">
            <Head title='Voucher'/>

            <VoucherHeader
                toggleCreate={toggleCreate}
            />

            <Container fluid className='mt--7 min-vh-100'>
                <CustomTable
                    data={vouchers}
                    tableHead='Voucher'
                    headData={headRow}
                >
                    {vouchers?.data?.map((voucher, index)=> (
                        <tr key={index}>
                            <th scope='row' style={{maxWidth:'35px'}}>
                                {(vouchers.current_page - 2) * vouchers.per_page + index + vouchers.per_page + 1}
                            </th>
                            <td className='h4'>
                                {voucher.nama}
                            </td>
                            <td>{voucher.kode_voucher}</td>
                            <td className='d-flex flex-column'>
                                <h4>
                                    {moment(voucher.start_time).format('DD MMMM YYYY')}
                                </h4>
                                <h4>{moment(voucher.end_time).format('DD MMMM YYYY')}</h4>
                            </td>

                            <td>
                                {statusChecker(voucher.status)}
                            </td>
                            <td>
                                <Button
                                    color='secondary'
                                    size='sm'
                                >
                                    <i className='fa fa-eye mr-1'></i>
                                    Detail
                                </Button>
                                <Button
                                    color='warning'
                                    size='sm'
                                >
                                    <i className='fas fa-edit mr-1'></i>
                                    Edit
                                </Button>
                            </td>
                        </tr>
                    ))}
                </CustomTable>
            </Container>

            <CreateVoucher
                isOpen={isCreate}
                toggleModal={toggleCreate}
            />
            <ToastContainer/>
        </AdminLayout>
    )
}

Index.propTypes = {}

export default Index
