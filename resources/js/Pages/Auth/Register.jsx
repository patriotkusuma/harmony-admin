import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, InputGroup, InputGroupText, Row } from 'reactstrap';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Col lg="5" md="7">
                <Card className='bg-secondary shadow border-0'>
                    <CardHeader className='bg-transparent pb-5'>
                        <div className="text-muted text-center mt-2 mb-3">
                            <small>Create an account</small>
                        </div>
                    </CardHeader>
                    <CardBody className='text-center text-muted mb-4'>
                        <div>
                            <small>Or sign in with credentials</small>
                        </div>
                        <Form role='form' onSubmit={submit}>
                            <FormGroup>
                                <InputGroup className='input-group-alternative mb-3'>
                                    <InputGroupText>
                                        <i className="ni ni-hat-3"></i>
                                    </InputGroupText>
                                    <Input
                                        id='name'
                                        name='name'
                                        value={data.name}
                                        autoComplete='name'
                                        autoFocus={true}
                                        placeholder='Full Name'
                                        type='text'
                                        onChange={(e)=>setData('name', e.target.value)}
                                    />
                                </InputGroup>
                                {errors.name &&
                                    <small className='d-flex justify-content-start text-danger form-text'>
                                        {errors.name}
                                    </small>
                                }
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className='input-group-alternative mb-3'>
                                    <InputGroupText>
                                        <i className="ni ni-email-83"></i>
                                    </InputGroupText>
                                    <Input
                                        id='email'
                                        name='email'
                                        value={data.email}
                                        autoComplete='email'
                                        placeholder='Email'
                                        type='email'
                                        onChange={(e)=>setData('email', e.target.value)}
                                    />
                                </InputGroup>
                                {errors.email &&
                                    <small className='d-flex justify-content-start text-danger form-text'>
                                        {errors.email}
                                    </small>
                                }
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className='input-group-alternative mb-3'>
                                    <InputGroupText>
                                        <i className="ni ni-lock-circle-open"></i>
                                    </InputGroupText>
                                    <Input
                                        id='password'
                                        name='password'
                                        value={data.password}
                                        autoComplete='password'
                                        placeholder='Password'
                                        type='password'
                                        onChange={(e)=>setData('password', e.target.value)}
                                    />
                                </InputGroup>
                                {errors.password &&
                                    <small className='d-flex justify-content-start text-danger form-text'>
                                        {errors.password}
                                    </small>
                                }
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className='input-group-alternative mb-3'>
                                    <InputGroupText>
                                        <i className="ni ni-lock-circle-open"></i>
                                    </InputGroupText>
                                    <Input
                                        id='password_confirmation'
                                        name='password_confirmation'
                                        value={data.password_confirmation}
                                        autoComplete='password_confirmation'
                                        placeholder='Password_confirmation'
                                        type='password_confirmation'
                                        onChange={(e)=>setData('password_confirmation', e.target.value)}
                                    />
                                </InputGroup>
                                {errors.password_confirmation &&
                                    <small className='d-flex justify-content-start text-danger form-text'>
                                        {errors.password_confirmation}
                                    </small>
                                }
                            </FormGroup>
                            <Row className="my-4">
                                <Col xs="12">
                                    <div className="custom-control custom-control-alternative custom-checkbox">
                                        <input
                                            className="custom-control-input"
                                            id="customCheckRegister"
                                            type="checkbox"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="customCheckRegister"
                                        >
                                            <span className="text-muted">
                                                I agree with the{" "}
                                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                Privacy Policy
                                                </a>
                                            </span>
                                        </label>
                                    </div>
                                </Col>
                            </Row>
                            <div className="text-center">
                                <Button className='mt-4' color='primary' type='submit'>
                                    Create Account
                                    <i className='fa-solid fa-paper-plane'></i>
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
                <Row className='mt-3'>
                    <Col xs="6">
                        <Link
                            className='text-light'
                            href={route('login')}
                        >
                            <small>Already Have Account ?</small>
                        </Link>
                    </Col>
                </Row>
            </Col>
        </GuestLayout>
    );
}
