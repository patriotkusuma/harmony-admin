import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, Table } from 'reactstrap'

const JabatanTable = props => {
    const {children} = props
    return (
        <>
            <Card>
                <CardHeader>
                    <div className='d-flex flex-row justify-content-between'>
                        <h3 className='mb-0'>Daftar Outlet</h3>
                    </div>
                </CardHeader>
                <Table className='align-items-center table-flush' responsive>
                    <thead className='thead-light'>
                        <tr>
                            <th scope='col'>No</th>
                            <th scope='col'>Nama Jabatan</th>
                            <th scope='col'>Keterangan</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </Table>
            </Card>
        </>
    )
}

JabatanTable.propTypes = {}

export default JabatanTable
