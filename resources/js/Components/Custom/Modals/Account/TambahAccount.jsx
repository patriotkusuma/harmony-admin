import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm, router } from '@inertiajs/react';
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Modal, Row } from 'reactstrap';
import { NumericFormat } from 'react-number-format';

const TambahAccount = ({ isModalOpen, filteredData, toggleModal }) => {
    const { data, setData, patch, processing, post, errors } = useForm({
        id: filteredData?.id || '',
        account_name: filteredData?.account_name || '',
        account_type: filteredData?.account_type || '',
        initial_balance:
            filteredData?.initial_balance != null
                ? parseFloat(filteredData.initial_balance).toFixed(2)
                : '',
        current_balance:
            filteredData?.current_balance != null
                ? parseFloat(filteredData.current_balance).toFixed(2)
                : '',
        description: filteredData?.description || '',
    });

    const submit = (e) => {
        e.preventDefault();

        const initial = parseFloat(data.initial_balance.replace(/\./g, '').replace(',', '.')) || 0;
        const current = parseFloat(data.current_balance.replace(/\./g, '').replace(',', '.')) || 0;

        setData({
            ...data,
            initial_balance: initial,
            current_balance: current,
        });

        const onSuccess = () => {
            toggleModal();
            router.reload({ only: ['accounts'] });
        };

        const onError = (err) => {
            console.error("❌ Submit error:", err);
        };

        if (filteredData) {
            patch(route('account.update', data.id), { onSuccess, onError });
        } else {
            post(route('account.store'), { onSuccess, onError });
        }
    };

    return (
        <Modal
            className='modal-dialog-centered modal-default  modal-lg'
            toggle={toggleModal}
            isOpen={isModalOpen}
        >
            <Form role='form' onSubmit={submit}>
                <div className='modal-header'>
                    <h2 className='modal-title'>{filteredData ? 'Edit' : 'Tambah'} Data Account</h2>
                    <button className='close' type='button' onClick={toggleModal}>
                        <span aria-hidden="true"><i className="fa-solid fa-xmark" /></span>
                    </button>
                </div>
                <div className="modal-body bg-default text-white px-4 py-3">
                    <div className="mb-4">
                        <h5 className="text-info font-weight-bold mb-3">
                            <i className="fa-solid fa-circle-plus mr-2" />
                            Informasi Akun
                        </h5>
                    </div>

                    <FormGroup>
                        <Label for="account_name" className="font-weight-bold text-white">Nama Akun</Label>
                        <Input
                            id="account_name"
                            name="account_name"
                            value={data.account_name}
                            onChange={e => setData('account_name', e.target.value)}
                            disabled={processing}
                            invalid={!!errors.account_name}
                            className="form-control bg-dark text-white border-0 font-weight-bold"
                            placeholder="Masukkan nama akun..."
                        />
                        <FormFeedback>{errors.account_name}</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                        <Label for="account_type" className="font-weight-bold text-white">Jenis Akun</Label>
                        <Input
                            type="select"
                            id="account_type"
                            name="account_type"
                            value={data.account_type}
                            onChange={e => setData('account_type', e.target.value)}
                            disabled={processing}
                            invalid={!!errors.account_type}
                            className="form-control bg-dark text-white border-0 font-weight-bold"
                        >
                            <option value="">Pilih Jenis Akun</option>
                            <option value="Assets">Assets</option>
                            <option value="Liability">Liability</option>
                            <option value="Equity">Equity</option>
                            <option value="Revenue">Revenue</option>
                            <option value="Expense">Expense</option>
                        </Input>
                        <FormFeedback>{errors.account_type}</FormFeedback>
                    </FormGroup>

                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label className="font-weight-bold text-white">Saldo Awal</Label>
                                <NumericFormat
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    decimalScale={2}
                                    fixedDecimalScale
                                    value={data.initial_balance}
                                    prefix="Rp "
                                    onValueChange={(values) => setData('initial_balance', values.value)}
                                    customInput={Input}
                                    disabled={processing}
                                    className={`form-control bg-dark text-white border-0 font-weight-bold ${errors.initial_balance ? 'is-invalid' : ''}`}
                                />
                                <FormFeedback>{errors.initial_balance}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label className="font-weight-bold text-white">Saldo Saat Ini</Label>
                                <NumericFormat
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    decimalScale={2}
                                    fixedDecimalScale
                                    value={data.current_balance}
                                    prefix="Rp "
                                    onValueChange={(values) => setData('current_balance', values.value)}
                                    customInput={Input}
                                    disabled={processing}
                                    className={`form-control bg-dark text-white border-0 font-weight-bold ${errors.current_balance ? 'is-invalid' : ''}`}
                                />
                                <FormFeedback>{errors.current_balance}</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup>
                        <Label for="description" className="font-weight-bold text-white">Deskripsi</Label>
                        <Input
                            type="textarea"
                            id="description"
                            name="description"
                            rows="3"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            disabled={processing}
                            invalid={!!errors.description}
                            className="form-control bg-dark text-white border-0 font-weight-bold"
                            placeholder="Tuliskan deskripsi akun..."
                        />
                        <FormFeedback>{errors.description}</FormFeedback>
                    </FormGroup>
                </div>

                <div className="modal-footer bg-dark px-4 d-flex justify-content-between">
                    <Button color="light" onClick={toggleModal} disabled={processing}>
                        <i className="fa-solid fa-xmark mr-1" /> Batal
                    </Button>
                    <Button color="primary" type="submit" disabled={processing}>
                        {processing ? (
                            <>
                                <i className="fa fa-spinner fa-spin mr-1"></i> Menyimpan...
                            </>
                        ) : (
                            <>
                                <i className="fa-regular fa-floppy-disk mr-1" /> Simpan
                            </>
                        )}
                    </Button>
                </div>



            </Form>
        </Modal>
    );
};

TambahAccount.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    filteredData: PropTypes.object,
    toggleModal: PropTypes.func.isRequired,
};

export default TambahAccount;
