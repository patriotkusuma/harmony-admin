import AdminLayout from '@/Layouts/AdminLayout'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Link, useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap'

function Create(props) {
    const {auth, blog} = props
    const [prevImage, setPrevImage] = useState(blog ? blog.thumbnail : null)

    const {get, patch, post, data, setData} = useForm({
        'id' : blog ? blog.id : '',
        'title' : blog ? blog.title: '',
        'slug' : blog ? blog.slug : '',
        'meta_title' : blog ? blog.meta_title : '',
        'meta_desc' :blog?blog.meta_desc: '',
        'thumbnail' :blog? blog.thumbnail : '',
        'content': blog? blog.content : '',
        'status': blog ? blog.status: 'draft',
    })

    const handleSlug  = (val)=>{
        let slug = val.replace(/\s+/g, '-').toLowerCase()

        setData(data=>({...data, title:val}))
        setData(data=>({...data, meta_title:val}))
        setData(data=>({...data, slug:slug}))

    }
    const imageChange = (e) => {
        setData('thumbnail', e.target.files[0])
        setPrevImage(URL.createObjectURL(e.target.files[0]))
    }

    const submit = (e) => {
        e.preventDefault()
        if(data.id == ''){
            post(route('blog.store') )
        }else{
            patch(route('blog.update', data.id))
        }
    }
  return (
    <AdminLayout user={auth.user} header={"Create Post"}>
        <header className='bg-gradient-info pb-8 pt-5 pt-md-8'>
            <Container fluid>
                <Link className='btn btn-sm btn-secondary' href={route('blog.index')}>
                    <i className='fa-solid fa-arrow-left'/>
                    <span>Kembali</span>
                </Link>
                <Button
                    color='primary'
                    size='sm'
                    onClick={submit}
                >
                    <i className='fa-regular fa-floppy-disk ml-2'/>
                    <span>Simpan</span>
                </Button>

            </Container>
        </header>

        <Container className='mt--7' fluid>
            <Row style={{gap: '2rem 0'}}>
                <Col md="6">
                    <Card className='bg-secondary shadow'>
                        <CardHeader className='d-flex justify-content-between items-center'>
                            <h3 className='mb-0 font-weight-bold'>
                                Blog
                            </h3>
                            <FormGroup>
                                <Input
                                    className='form-control form-select form-control-alternate'
                                    type='select'
                                    name='status'
                                    defaultValue={data ? data.status : ''}
                                    onChange={(e)=> {setData('status', e.target.value)}}
                                >
                                    <option value='draft'>Draft</option>
                                    <option value='publish'>Publish</option>
                                </Input>
                            </FormGroup>
                        </CardHeader>
                        <CardBody>
                            <FormGroup>
                                <Label className='form-control-label'>
                                    Judul
                                </Label>
                                <Input
                                    className='form-control form-control-alternate'
                                    type='text'
                                    required
                                    name='title'
                                    defaultValue={data ? data.title : ''}
                                    onChange={(e)=>{
                                        handleSlug(e.target.value)

                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className='form-control-label'>
                                    Slug
                                </Label>
                                <Input
                                    className='form-control form-control-alternate'
                                    type='text'
                                    required
                                    name='judul'
                                    defaultValue={data ? data.slug : ''}
                                    disabled
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className='form-control-label'>
                                    Meta Title
                                </Label>
                                <Input
                                    className='form-control form-control-alternate'
                                    type='text'
                                    required
                                    name='meta_title'
                                    defaultValue={data ? data.meta_title : ''}
                                    disabled
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className='form-control-label'>
                                    Meta Description
                                </Label>
                                <Input
                                    className='form-control form-control-alternate'
                                    type='textarea'
                                    required
                                    name='meta_desc'
                                    defaultValue={data ? data.meta_desc : ''}
                                    onChange={(e) => {setData('meta_desc', e.target.value)}}
                                />
                            </FormGroup>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="6">
                    <Card className='bg-secondary shadow' md="6">
                        <CardHeader className='d-flex justify-content-between'>
                            <h3 className='mb-0 font-weight-bold'>
                                Thumbnail
                            </h3>
                            <Button
                                color='primary'
                                size='sm'
                            >
                                Simpan Tumbnail
                            </Button>
                        </CardHeader>
                        <CardBody>
                            {data.thumbnail != "" &&(
                                <img src={prevImage}  style={{height: '250px', width:'100%', objectFit:'cover'}}/>
                            )}


                            <FormGroup className='mt-3'>
                                <Input
                                    className='form-control forn-control-alternate'
                                    type='file'
                                    onChange={(e) => {imageChange(e)}}


                                />
                            </FormGroup>
                        </CardBody>

                    </Card>
                </Col>

                <Col md="12">
                    <Card className='bg-secondary shadow'>

                    <CKEditor
                        data={blog ? blog.content : ''}
                        editor={ClassicEditor}
                        onChange={(event,editor)=>{
                            setData('content', editor.getData())
                        }}

                        />
                    </Card>
                </Col>
            </Row>

        </Container>

    </AdminLayout>
  )
}

export default Create
