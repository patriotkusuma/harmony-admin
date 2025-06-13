import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Alert, Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <>
            <Form  onSubmit={submit}>
                <Row>
                    {
                        recentlySuccessful && (

                        <Col sm='12'>
                            <Alert color="success">
                                <strong>Success!</strong> Data tersimpan!
                            </Alert>
                        </Col>
                        )
                    }
                    <Col lg="6">
                        <FormGroup>
                            <Label
                                className='form-control-label'
                                htmlFor='input-fullname'
                            >
                                Fullname
                            </Label>
                            <Input
                                className='form-control-alternative'
                                defaultValue={data.name}
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                id='input-fullname'
                                placeholder='Full Name'
                                type='text'
                                autoFocus
                                required
                                autoComplete='name'
                                name='name'
                                invalid={errors.name && true}
                            />

                            <FormFeedback>
                                {errors.name}
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup>
                            <Label
                                className='form-control-label'
                                htmlFor='input-email'
                            >
                                Email
                            </Label>
                            <Input
                                className='form-control-alternative'
                                defaultValue={data.email}
                                value={data.email}
                                onChange={(e)=> setData('email',e.target.value)}
                                required
                                autoComplete='email'
                                id='input-email'
                                name='email'
                                placeholder='Full Name'
                                type='email'
                                invalid={errors.email && true}
                            />
                            <FormFeedback>
                                {errors.email}
                            </FormFeedback>
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
