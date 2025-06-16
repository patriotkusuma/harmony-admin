import React, { useEffect, useState } from 'react'
import GuestLayout from '@/Layouts/GuestLayout'
import { Alert, Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, FormGroup, FormText, Input, InputGroup, InputGroupText, Row } from 'reactstrap'
import { Link, useForm } from '@inertiajs/react'

export default function Login({status, canResetPassword}) {
    const [showPassword, setShowPassword] = useState(false);
    const {data, setData, post, processing, errors, reset} = useForm({
        email: '',
        password: '',
        remember:false,
    });

    const togglePassword = () => {
        setShowPassword(data => !data);
    }
    useEffect(()=>{
        return () =>{
            reset('password');
        }
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    }
  return (
    <>
        <GuestLayout>
            <Col lg="5" md="7" >
                <Card className='bg-default shadow border-0'>
                    <CardHeader className='bg-transparent pb-5'>
                        {status &&
                        <Alert color="warning">
                            <span className="alert-inner--icon">
                                <i className="ni ni-like-2" />
                            </span>{" "}
                            <span className="alert-inner--text">
                                <strong>Warning!</strong>
                                {status}
                            </span>
                        </Alert>

                        }

                        <div className='text-muted text-center mt-2 mb-3'>
                            <small>Sign in with</small>
                        </div>
                        {/*
                        <div className='btn-wrapper text-center'>
                            <Button
                                className='btn-neutral btn-icon'
                                color='default'
                                href='#pablo'
                                onClick={(e) => e.preventDefault()}
                            >
                                <span className='btn-inner--icon'>
                                    <img
                                        alt='...'
                                        src='/assets/img/icons/common/github.svg'
                                    />
                                </span>
                                <span className='btn-inner--text'>Github</span>
                            </Button>
                            <Button
                                className='btn-neutral btn-icon'
                                color='default'
                                href='#pablo'
                                onClick={(e) => e.preventDefault()}
                            >
                                <span className='btn-inner--icon'>
                                    <img
                                        alt='...'
                                        src='/assets/img/icons/common/google.svg'
                                    />
                                </span>
                                <span className='btn-inner--text'>Google</span>
                            </Button>
                        </div> */}
                    </CardHeader>
                    <CardBody className='text-center text-muted mb-4'>
                        {/* <div>
                            <small>sign in with credentials</small>
                        </div> */}

                        <Form role='form' onSubmit={submit}>
                            <FormGroup className='mb-3'>
                                <InputGroup className='input-group-alternative bg-dark'>
                                    <InputGroupText
                                        className='bg-dark text-white'
                                    >
                                        <i className='ni ni-email-83'/>
                                    </InputGroupText>
                                    <Input
                                        id='email'
                                        name='email'
                                        value={data.email}
                                        autoFocus
                                        placeholder={errors.email ? errors.email : 'Email'}
                                        type='email'
                                        autoComplete='username'
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={`bg-dark text-white ${errors.email ? 'is-invalid' : ''}`}
                                        valid={errors.email && true}
                                    />

                                </InputGroup>
                                {errors.email &&

                                    <small className='d-flex justify-content-start text-danger form-text '>
                                        {errors.email}
                                    </small>
                                }
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className='input-group-alternative'>
                                    <InputGroupText
                                        className='bg-dark text-white'
                                    >
                                        <i className='ni ni-lock-circle-open'/>
                                    </InputGroupText>
                                    <Input
                                        id='password'
                                        name='password'
                                        value={data.password}
                                        placeholder='Password'
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete='new-password'
                                        onChange={(e) => setData('password', e.target.value)}
                                        className={`bg-dark text-white ${errors.password ? 'is-invalid' : ''}`}
                                        invalid = {errors.password && true}
                                    />
                                    <Button
                                        className='bg-transparent shadow text-muted'
                                        onClick={togglePassword}
                                    >
                                        <i className="fa-regular fa-eye"></i>
                                    </Button>
                                </InputGroup>
                                {errors.password &&
                                    <small className='d-flex justify-content-start text-danger form-text text-danger'>
                                        {errors.password}
                                    </small>
                                }
                            </FormGroup>
                            <div className='custom-control custom-control-alternative custom-checkbox'>
                                <input
                                    className='custom-control-input'
                                    id='customCheckLogin'
                                    type='checkbox'
                                    name='remember'
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <label
                                    className='custom-control-label'
                                    htmlFor='customCheckLogin'
                                >
                                    <span className='text-muted'>Remember me</span>
                                </label>
                            </div>
                            <div className='text-center'>
                                <Button className='my-4' color='primary' disabled={processing} type='submit'>
                                    Sign in
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
                <Row className="mt-3">
                    <Col xs="6">
                        {canResetPassword && (
                            <Link
                                className='text-light'
                                href={route('password.request')}
                            >
                                <small>Forgot Password?</small>
                            </Link>

                        )}

                    </Col>
                    <Col className='text-right' xs="6">
                        {/* <Link
                            className='text-light'
                            href={route('register')}
                        >
                            <small>Create new account</small>
                        </Link> */}
                    </Col>
                </Row>
            </Col>
        </GuestLayout>
    </>
  )
}
