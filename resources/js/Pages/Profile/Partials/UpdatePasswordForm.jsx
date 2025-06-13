import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Button, Col, Form, FormFeedback, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const [passwordShow, setPasswordShow] = useState(false);

    const togglePassword = () => {
        setPasswordShow(data =>!data);
    }

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
       <>
        <Form role='form' onSubmit={updatePassword}>
            <Row>
                <Col lg="6">
                    <FormGroup>
                        <Label
                            className='form-control-label'
                            htmlFor='current_password'
                        >
                            Current Password
                        </Label>
                        <Input
                            id='current_password'
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            type='password'
                            autoComplete='current-password'
                            className='form-control-alternative'
                            invalid={errors.current_password && true}
                            placeholder='Your current password'
                        />
                        <FormFeedback>
                            {errors.current_password}
                        </FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col lg="6">
                    <FormGroup>
                        <Label
                            className='form-control-label'
                            htmlFor='password'
                        >
                            New Password
                        </Label>

                        <InputGroup className='input-group-alternative'>
                             <Input
                                id='password'
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type={passwordShow ? 'text' : 'password'}
                                autoComplete='new-password'
                                name='password'
                                // className='form-control-alternative'
                                invalid={errors.password && true}
                                placeholder='Your New Password'
                            />

                                <Button
                                    className='bg-transparent shadow'
                                    onMouseOver={className="text-primary"}
                                    onClick={togglePassword}
                                >
                                    <i className="fa-regular fa-eye"></i>
                                </Button>

                        </InputGroup>
                        {errors.password &&
                            <small className='d-flex justify-content-start text-danger form-text'>
                                {errors.password}
                            </small>
                        }
                    </FormGroup>
                </Col>
                <Col lg="6">
                    <FormGroup>
                        <Label
                            className='form-control-label'
                            htmlFor='password-confirmation'
                        >
                            Password Confirmation
                        </Label>

                        <InputGroup className='input-group-alternative'>
                            <Input
                                id='password-confirmation'
                                ref={passwordInput}
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                type={passwordShow ? 'text' : 'password'}
                                autoComplete='new-password'
                                className='form-control-alternative'
                                invalid={errors.password_confirmation && true}
                                placeholder='Your Password Confirmation'
                                name='password_confirmation'
                            />

                            <Button
                                className='bg-transparent shadow'
                                onMouseOver={className="text-primary"}
                                onClick={togglePassword}
                            >
                                <i className="fa-regular fa-eye"></i>
                            </Button>
                        </InputGroup>

                        {errors.password_confirmation &&
                            <small className='d-flex justify-content-start text-danger form-text'>
                                {errors.password_confirmation}
                            </small>
                        }
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col lg='6' >

                    <Button
                        color='primary'
                        size='sm'
                        type='submit'
                        disabled={processing}
                    >
                        Save
                    </Button>
                </Col>
            </Row>
        </Form>
       </>
    );
}
