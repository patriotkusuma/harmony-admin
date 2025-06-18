import React, { useEffect, useState } from 'react'
import { Button, Card, CardHeader, Col, Input, Row } from 'reactstrap'

const SupplierTable = (props) => {
    const {toggleAdd, suppliers, user, children, filter, onFilterChange} = props
    const [searchTerm, setSearchTerm] = useState(null)

    useEffect(()=> {
        const timeout = setTimeout(()=>{
            if(searchTerm !== filter.search){
                onFilterChange({search: searchTerm, page: 1})
            }
        })
    })

    const handlePerPageChange = (e) => {
        onFilterChange({per_page:e.target.value, page: 1})
    }


    return (
        <>
            <Card>
                <CardHeader>
                    <div className='d-flex flex-row justify-content-between'>
                        <h3 className='mb-0'>Management Supplier</h3>
                        {
                            user.role !== 'pegawai' && (
                                <Button
                                    color='primary'
                                    size='md'
                                    onClick={toggleAdd}
                                >
                                    <i className='fa-solid fa-file-circle-plus mr-2'></i>
                                    Tambah Supplier
                                </Button>
                            )
                        }
                    </div>
                    <div className='mt-3 justify-center align-items-center'>
                        <Row>
                            <Col md="2" xs="12" className='w-100'>
                                <select
                                    className='form-control form-control-alternative form-select mr-3 w-100'
                                    id='per_page'
                                    name='per_page'
                                    value={filter?.per_page || 0}
                                    onChange={handlePerPageChange}
                                >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>

                                </select>
                            </Col>
                            <Col md="10" xs="12"className='w-100 d-flex justify-content-end gap-2 flex-wrap'>
                                <div style={{width:'25%'}}>
                                    <select
                                        className='form-control form-control-alternative form-select mr-3 w-100'
                                        id='supplier_type'
                                        name='supplier_type'
                                        value={filter?.supplier_type || ''}
                                        onChange={(e) => {onFilterChange({supplier_type: e.target.value, page: 1})}}
                                    >
                                        <option value="">Supplier Type</option>
                                        <option value="Online Marketplace">Online Marketplace</option>
                                        <option value="Toko Fisik Retail">Toko Fisik Retail</option>
                                        <option value="Distributor">Distributor</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                </div>
                            {/* </Col> */}
                            {/* <Col md="3" xs="12" className='w-100 d-flex justify-self-end me-auto'> */}
                                <div style={{width: '25%'}}>

                                    <Input
                                        className='form-control form-control-alternative mr-3 w-100'
                                        id='search'
                                        name='search'
                                        value={filter?.search || ''}
                                        onChange={(e) => {onFilterChange({search: e.target.value, page: 1})}}
                                        type='text'
                                        placeholder='Search...'
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </CardHeader>
            </Card>
        </>
    )
}

export default SupplierTable
