import React, { useState } from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/Layouts/AdminLayout";
import { Alert, Card, Container, Row, UncontrolledAlert } from "reactstrap";
import MyTable from "@/Components/Custom/Tables/MyTable";
import { Head } from "@inertiajs/react";

const JenisCuci = (props) => {
    const { auth, pakets, flash } = props;
    const { alertOpen, setAlertOpen } = useState();

    return (
        <AdminLayout header="Paket Laundry" user={auth.user}>
            <Head title="Paket Laundry" />
            <header className="bg-gradient-info pb-8 pt-5 pt-md-8">
                <Container fluid>
                    <Alert
                        color="success"
                        isOpen={flash.success != null ? true : false}

                    >
                        <strong>Success!</strong>{" "}
                        {flash.success != null && flash.success}
                    </Alert>
                    <Row>
                        <div className="col">
                            <MyTable data={pakets} tableHead="Paket Laundry" />
                        </div>
                    </Row>
                </Container>
            </header>
        </AdminLayout>
    );
};

JenisCuci.propTypes = {};

export default JenisCuci;
