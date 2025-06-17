import Modal from '@/Components/Modal'
import { router, useForm } from '@inertiajs/react'
import React from 'react'
import { Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const KonfirmasiHapus = ({isOpen, toggle, item}) => {
    const {processing, delete:destroy} = useForm()

    const handleDelete = () => {
        destroy(route('asset.delete', item.id), {
            onSuccess: () => {
                toggle()
                router.reload({only: ['assets']})
            },
            onError:(err) => {
                console.log( `❌ gagal hapus : ${err}`)
            }
        })
    }
    return (
        <Modal isOpen={isOpen} toggle={toggle} centered>
            <ModalHeader className='d-flex justify-content-between align-items-center'>
                <span>Konfirmasi Hapus</span>
                <button
                    type='button'
                    className='btn-close btn btn-sm btn-outline-light'
                    onClick={toggle}
                    aria-label='Close'
                >
                    <i className='fa-solid fa-xmark'></i>
                </button>
            </ModalHeader>
            <ModalBody>
                Apakah yakin ingin menghapus asset <strong>{item?.asset_name}</strong>?
            </ModalBody>
            <ModalFooter>
                <Button color='secondary' onClick={toggle} disabled={processing}>
                    Batal
                </Button>
                <Button color='danger' onClick={handleDelete} disabled={processing}>
                    {
                        processing? (
                            <><i className='fa fa-spinner fa-spin mr-1'></i> Menghapus...</>
                        ): (
                            <><i className='fa fa-trash mr-1'></i> Hapus</>
                        )
                    }
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default KonfirmasiHapus
