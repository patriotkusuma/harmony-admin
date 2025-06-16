import React, { useEffect, useState } from 'react'
import { Button, Card, CardHeader, Col, Row, Table } from 'reactstrap'

const AssetTable = ({onFilterChange, filter,assets,children, toggleTambah}) => {
    const [searchTerm, setSearchTerm] = useState(filter.search || '')

    useEffect(()=>{
        const timeout = setTimeout(()=> {
            if(searchTerm !== filter.search){
                onFilterChange({search:searchTerm, page:1})
            }
        }, 700)

        return () => clearTimeout(timeout)
    }, [searchTerm])
    return (
    <>
        <Card>
            <CardHeader>
                <div className='d-flex flex-row justify-content-between'>
                    <h3 className='mb-0'>Daftar Kepemilikan Aset</h3>
                    {/* {user.role === "admin" && ( */}
                        <Button
                            color='primary'
                            size='md'
                            // onClick={()=>toggleTambah()}
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
                                // value={filter.per_page ||10}
                                // onChange={handlePerPageChange}

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
                        <th scope="col">Nama Aset</th>
                        <th scope="col">Tanggal Beli</th>
                        <th scope="col">Value</th>
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

export default AssetTable
