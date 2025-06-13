import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, CardBody, CardHeader, Table } from 'reactstrap'
import { useForm } from '@inertiajs/react'
import TambahPegawai from '@/Components/Custom/Modals/Outlet/TambahPegawai'

function OutletPegawai(props) {
    const {outlet, pegawais, jabatans, children} = props
    const [tmbPgwOpen, setTmbPgwOpen] = useState(false)

    const toggleTambahModal = () => {
        setTmbPgwOpen(!tmbPgwOpen)
    }

    return (
        <Card className='shadow'>
            <CardHeader>
                <div className='d-flex flex-row justify-content-between align-items-center'>
                    <h4>Pegawai</h4>
                    <Button
                        color='primary'
                        size='sm'
                        onClick={toggleTambahModal}
                        >
                        <i className='fa fa-plus mr-1'></i>
                        Tambah
                    </Button>
                </div>
            </CardHeader>
            <Table className='' responsive>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Jabatan</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </Table>

            <TambahPegawai
                isOpen={tmbPgwOpen}
                toggleModal={toggleTambahModal}
                outlet={outlet}
                pegawais={pegawais}
                jabatans={jabatans}
            />
        </Card>
    )
}

OutletPegawai.propTypes = {
    outlet: PropTypes.object,
    pegawais: PropTypes.object,
    jabatans: PropTypes.object
}

export default OutletPegawai
