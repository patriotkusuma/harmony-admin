import React, { useEffect, useState } from 'react'
import GuestLayout from '@/Layouts/GuestLayout'
import { Alert, Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, FormGroup, FormText, Input, InputGroup, InputGroupText, Row } from 'reactstrap'
import { Link, useForm } from '@inertiajs/react'

export default function Welcome({status, canResetPassword}) {
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
        <GuestLayout >
            <Col lg="5" md="7" >
                <Card className='bg-secondary shadow border-0'>
                    <CardBody className='text-center text-muted mb-4'>
                        <div>
                            <small>Or sign in with credentials</small>
                        </div>


                    </CardBody>
                </Card>

            </Col>
        </GuestLayout>
    </>
  )
}
