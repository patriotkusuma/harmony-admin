import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useForm, router } from '@inertiajs/react';

const KonfirmasiHapus = ({ isOpen, toggle, item }) => {
    const { processing, delete: destroy } = useForm();

    const handleDelete = () => {
        destroy(route('account.destroy', item.id), {
            onSuccess: () => {
                toggle(); // tutup modal
                router.reload({ only: ['accounts'] }); // reload data
            },
            onError: (err) => {
                console.error('❌ Gagal hapus:', err);
            },
        });
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered>
            <ModalHeader className="d-flex justify-content-between align-items-center">
                <span>Konfirmasi Hapus</span>
                <button
                    type="button"
                    className="btn-close btn btn-sm btn-outline-light"
                    onClick={toggle}
                    aria-label="Close"
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </ModalHeader>
            <ModalBody>
                Apakah kamu yakin ingin menghapus akun <strong>{item?.account_name}</strong>?
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle} disabled={processing}>
                    Batal
                </Button>
                <Button color="danger" onClick={handleDelete} disabled={processing}>
                    {processing ? (
                        <><i className="fa fa-spinner fa-spin mr-1"></i> Menghapus...</>
                    ) : (
                        <><i className="fa fa-trash mr-1"></i> Hapus</>
                    )}
                </Button>
            </ModalFooter>
        </Modal>
    );
};

KonfirmasiHapus.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    item: PropTypes.object, // item yang akan dihapus
};

export default KonfirmasiHapus;
