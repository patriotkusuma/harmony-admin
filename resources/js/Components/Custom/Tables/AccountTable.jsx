import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card, CardHeader, Col, Row, Table } from 'reactstrap'

const AccountTable = props => {
    const {toggleTambah, accounts,user, children} = props
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
                    <div className='mt-3 justify-content-between align-items-center'>
                        <Row>
                            <Col md="3" xs="12" className='w-100'>
                                <select
                                    className="form-control-alternative form-control form-select-sm mr-3 w-50"
                                >
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                </select>
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
            </Card>
        </>
    )
}


export default AccountTable
