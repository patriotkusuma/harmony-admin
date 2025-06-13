import React, { useState } from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Header from "@/Components/Argon/Headers/Header";
import { Button, Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import OutletHeader from "./OutletHeader";
import OutletTable from "@/Components/Custom/Tables/OutletTable";
import TambahOutlet from "@/Components/Custom/Modals/Outlet/TambahOutlet";

const Index = (props) => {
    const { auth, outlets } = props;
    const [tambahModalOpen, setTambahModalOpen] = useState(false);
    const {get} = useForm();


    const toggleTambahModal = ()=>{
        get(route('outlet.create'))
    }
    return (
        <AdminLayout user={auth.user} header="Daftar Outlet">
            <Head title="Daftar Outlet" />

            <OutletHeader />

            <Container fluid className="mt--7 min-vh-100">
                <OutletTable
                    outlets={outlets}
                    toggleModal={toggleTambahModal}
                    user={auth.user}
                >
                    {outlets !== 'undefined' && 'data' in outlets && outlets.data.map((outlet, index) => (
                        <tr>
                            <th>
                                {((outlets.current_page - 2) * outlets.per_page + index + outlets.per_page +1)}
                            </th>
                            <td>
                                <h4 className="d-flex flex-column">
                                    <span className="text-sm font-weight-light">{outlet.nickname}</span>
                                    <strong>{outlet.nama}</strong>

                                </h4>
                            </td>
                            <td>
                                <a href={`https://maps.google.com/?q=${outlet.latitude},${outlet.longitude}`} target="_blank">Disini</a>
                            </td>
                            <td>
                                <a>{outlet.telpon}</a>
                            </td>
                            <td>
                                {outlet.status}
                            </td>
                            <td>
                                {outlet.keterangan}
                            </td>
                            <td>
                                <Button
                                    color="warning"
                                    size="sm"
                                    href={route('outlet.show', outlet.id)}
                                    tag={Link}
                                >
                                    <i className="fas fa-eye mr-1"></i>
                                    Detail
                                </Button>
                            </td>
                        </tr>
                    ))}
                </OutletTable>
            </Container>
        </AdminLayout>
    );
};

Index.propTypes = {};

export default Index;
