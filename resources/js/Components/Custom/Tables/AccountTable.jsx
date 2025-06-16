import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, CardHeader, Col, Input, Row, Table } from 'reactstrap'
import Pagination from '../Pagination/Pagination'

const AccountTable = props => {
    const {
        toggleTambah,
        accounts,
        user,
        children,
        filter,
        onFilterChange,
        totalAccounts,

    } = props
    const [searchTerm, setSearchTerm] = useState(filter.search || '')

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchTerm !== filter.search) {
                onFilterChange({ search: searchTerm, page:1 });
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timeout);
    }, [searchTerm]);


    const handlePerPageChange = (e) => {
        onFilterChange({per_page:e.target.value, page:1})
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <div className='d-flex flex-row justify-content-between'>
                        <h3 className='mb-0'>Daftar Account (Akun Akuntansi)</h3>
                        {/* {user.role === "admin" && ( */}
                            <Button
                                color='primary'
                                size='md'
                                onClick={()=>toggleTambah()}
                            >
                                <i className='fa-solid fa-file-circle-plus mr-2'></i>
                                Tambah Baru
                            </Button>
                        {/* )} */}
                    </div>
                    <div className='mt-3 justify align-items-center'>
                        <Row>
                            <Col md="4" xs="12" className='w-100'>
                                <select
                                    className="form-control-alternative form-control form-select-sm mr-3 w-50"
                                    id='per_page'
                                    name='per_page'
                                    value={filter.per_page ||10}
                                    onChange={handlePerPageChange}

                                >
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                </select>
                            </Col>
                            <Col md="4" xs="12" className='w-100'>
                                <select
                                    className="form-control-alternative form-control form-select-sm mr-3 w-50"
                                    id='account_type'
                                    name='account_type'
                                    value={filter.account_type || ''}
                                    onChange={(e) => onFilterChange({ account_type: e.target.value, page:1 })}

                                >
                                    <option value="">Pilih Tipe</option>
                                    <option value="Assets">Assets</option>
                                    <option value="Liability">Liability</option>
                                    <option value="Equity">Equity</option>
                                    <option value="Revenue">Revenue</option>
                                    <option value="Expense">Expense</option>
                                </select>
                            </Col>
                            <Col md="4" xs="12" className='w-100'>
                                <Input
                                    className="form-control-alternative form-control form-select-sm mr-3 w-50"
                                    id='search'
                                    name='search'
                                    value={filter.search || ''}
                                    onChange={(e)=>{setSearchTerm(e.target.value)}}
                                    type='text'
                                    placeholder='Search'

                                />
                            </Col>

                        </Row>
                    </div>
                </CardHeader>
                <Table className='align-items-center table-flush' responsive>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Akun</th>
                            <th scope="col">Type</th>
                            <th scope="col">Initial Balance</th>
                            <th scope="col">Current Balance</th>
                            <th scope="col">Keterangan</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>{children}</tbody>
                </Table>
                <Pagination
                    currentPage={accounts.current_page}
                    rowPerPage={accounts.per_page}
                    totalPosts={accounts.total}
                    nextPage={() => onFilterChange({ page: accounts.current_page + 1 })}
                    previousPage={() => onFilterChange({ page: accounts.current_page - 1 })}
                    onPageChange={(page) => onFilterChange({ page })}
                    siblingCount={1}
                />
            </Card>
        </>
    )
}


export default AccountTable
