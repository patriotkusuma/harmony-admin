import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Alert, Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, InputGroup, InputGroupText, Row } from 'reactstrap';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Col lg="5" md="7">
                <Card className='bg-secondary shadow border-0'>
                    <CardBody>
                        <div className='text-muted text-center mt-2 mb-3'>
                            <strong>Forgot Password</strong>
                        </div>
                        <div className="mb-4 text-sm text-muted">
                            Forgot your password? No problem. Just let us know your email address and we will email you a password
                            reset link that will allow you to choose a new one.
                        </div>
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
                        <Form role='form' onSubmit={submit}>
                            <FormGroup className='mb-3'>
                                <InputGroup className='input-group-alternative'>
                                    <InputGroupText>
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
                                        className={errors.email ? 'is-invalid' : ''}
                                        valid={errors.email && true}
                                    />

                                </InputGroup>
                                {errors.email &&

                                    <small className='d-flex justify-content-start text-danger form-text '>
                                        {errors.email}
                                    </small>
                                }
                                <div className='text-center'>
                                    <Button className='my-4' color='primary' disabled={processing} type='submit'>
                                        Send email reset link

                                    </Button>
                                </div>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
                <Row className="mt-3">
                    <Col xs="6">

                        <Link
                            className='text-light'
                            href={route('login')}
                        >
                            <small>Already registered?</small>
                        </Link>


                    </Col>
                    <Col className='text-right' xs="6">
                        <Link
                            className='text-light'
                            href={route('register')}
                        >
                            <small>Create new account</small>
                        </Link>
                    </Col>
                </Row>
            </Col>
        </GuestLayout>
    );
}
