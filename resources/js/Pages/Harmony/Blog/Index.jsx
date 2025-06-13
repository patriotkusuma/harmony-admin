import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Alert, Button, Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import { Link, useForm } from "@inertiajs/react";
import CustomTable from "@/Components/Custom/Tables/CustomTable";
import moment from "moment";
import ModalDelete from "@/Components/Custom/Modals/ModalDelete";

const headRow = ["No", "Judul","tanggal", "Status", "Action"];

function Index(props) {
    const { auth, blogs } = props;
    const [openDelete, setOpenDelete] = useState(false);
    const [filtered, setFiltered] = useState(null);

    const {delete:destroy} = useForm();

    const confirmDelete = (blog) => {
        setOpenDelete(true)
        setFiltered({
            nama: blog.title,
            ...blog
        })
    }

    const handleModal = () => {
        setOpenDelete(!openDelete)
    }

    const submit = () => {
        destroy(route('blog.delete', filtered.id));
    }
    return (
        <AdminLayout user={auth.user} header="Blog">
            <header className="bg-gradient-info pb-8 pt-5 pt-md-8">
                <Container fluid>
                    <Link
                        className="btn btn-secondary btn-sm"
                        href={route("blog.create")}
                    >
                        <i className="fa-solid fa-pen-to-square"></i>
                        Create Post
                    </Link>
                </Container>
            </header>

            <Container className="mt--7" fluid>
                <Row>
                    <Col>
                        <Card className="bg-secondary shadow" >
                            <CardBody>


                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                    {headRow.map((th, index) => {
                                        return (
                                            <th scope="col" key={index}>
                                                {th}
                                            </th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {blogs != null && blogs.map((blog, index) => {
                                    return (
                                        <tr>
                                            <th scope="col" key={index}>
                                                {index+1}
                                            </th>
                                            <td>
                                                {blog.title}
                                            </td>
                                            <td>
                                                {moment(blog.created_at).format('DD MMMM YYYY')}
                                            </td>
                                            <td>
                                                {blog.status}
                                            </td>
                                            <td>
                                               <div className="d-flex">
                                                    <a
                                                        className="btn btn-sm btn-default"
                                                        href={`https://harmonylaundrys.com/blog/${blog.slug}`}
                                                        target="_blank"
                                                    >
                                                        View
                                                    </a>
                                                    <Button
                                                        color="warning"
                                                        size="sm"
                                                        href={route('blog.edit', blog.id)}
                                                        tag={Link}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        color="danger"
                                                        size="sm"
                                                        onClick={()=>(confirmDelete(blog))}

                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>

                        </Table>
                        </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
           <ModalDelete
            deleteData={filtered}
            deleteRoute="blog.destroy"
            isOpen={openDelete}
            toggleModal={handleModal}
            />
        </AdminLayout>
    );
}

export default Index;
