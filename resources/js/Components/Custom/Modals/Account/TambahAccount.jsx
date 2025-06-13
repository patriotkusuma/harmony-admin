import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useForm } from '@inertiajs/react'
import { Form, FormFeedback, FormGroup, Input, Label, Modal } from 'reactstrap'
import { NumericFormat } from 'react-number-format'

const TambahAccount = props => {
    const {isModalOpen, filteredData, toggleModal} = props
    const {data, setData, get,patch, processing, post, errors, reset} = useForm({
        id: '',
        account_name: '',
        account_type: '',
        initial_balance: '',
        current_balance: '',
        description:  '',
    })

    useEffect(()=>{
        if(filteredData!=null){
            setData({
                id: filteredData.id,
                account_name: filteredData.account_name,
                account_name: filteredData.account_type,
                initial_balance: filteredData.initial_balance? parseFloat(filteredData.initial_balance).toFixed(2): '',
                current_balance: filteredData.initial_balance? parseFloat(filteredData.initial_balance).toFixed(2): '',
                description: filteredData.description
            })
        }else{
            reset()
        }
    }, [isModalOpen, filteredData])

    const submit = (e) => {
        e.preventDefault()
        if(filteredData === null){
            post(route(route().current()), {
                onSuccess: ()=> {
                    toggleModal()
                    reset()
                },
                onError: (err)=>{
                    console.log("submit error ", err)
                }
            })

        }else{
            patch(route('account.update', data.id), {
                preserveState: true,
                replace:true,
                preserveScroll:true,
                onSuccess:()=>{
                    toggleModal()
                    reset()
                },
                onError:(err)=>{
                    console.log('edit error :', err)
                }
            })
        }
    }

    return (
        <Modal
            className='modal-dialog-centered modal-lg'
            toggle={toggleModal}
            isOpen={isModalOpen}
        >
            <div className='modal-header'>
                <h2 className='modal-title' id='modal-title-default'>
                    {filteredData === null ? 'Tambah' : 'Edit'} Data Account
                </h2>
                <button
                    aria-label='close'
                    className='close'
                    data-dismiss='modal'
                    type='button'
                    onClick={toggleModal}
                >
                    <span aria-hidden={true}>
                        <i className="fa-solid fa-xmark"></i>
                    </span>
                </button>
            </div>
            <div className='modal-body'>
                <Form role='form' onSubmit={submit}>
                    <FormGroup>
                        <Label className='form-control-label' htmlFor='account_name'>
                            Account Name
                        </Label>
                        <Input
                            className='form-control-alternative'
                            id='account_name'
                            name='account_name'
                            placeholder='Account Name'
                            type='text'
                            autoFocus
                            value={data.account_name}
                            onChange={(e)=>setData('account_name', e.target.value)}
                            invalid={!!errors.account_name}
                        />
                        <FormFeedback>
                            {errors.account_names}
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label className='form-control-label' htmlFor='account_type'>
                            Account Name
                        </Label>
                        <Input
                            className='form-control-alternative'
                            id='account_type'
                            name='account_type'
                            placeholder='Account Name'
                            type='select'
                            autoFocus
                            value={data.account_type}
                            onChange={(e)=>setData('account_type', e.target.value)}
                            invalid={!!errors.account_type}
                        >
                            <option value={"Assets"}>Assets</option>
                            <option value={"Liability"}>Liability</option>
                            <option value={"Equity"}>Equity</option>
                            <option value={"Revenue"}>Revenue</option>
                            <option value={"Expense"}>Expense</option>
                        </Input>
                        <FormFeedback>
                            {errors.account_type}
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label className='form-control-label' htmlFor='initial_balance'>
                            Initial Balance
                        </Label>
                        <NumericFormat
                            className={`form-control form-control-alternative ${errors.initial_balance? 'is-invalid' : ''}`}
                            id='initial_balance'
                            name='initial_balance'
                            placeholder='Initial Balance'
                            type='select'
                            autoFocus
                            value={data.initial_balance}
                            onChange={(e)=>setData('initial_balance', e.target.value)}
                            prefix=' '
                            customInput={Input}
                        />

                    </FormGroup>
                </Form>
            </div>

        </Modal>
    )
}

TambahAccount.propTypes = {}

export default TambahAccount
