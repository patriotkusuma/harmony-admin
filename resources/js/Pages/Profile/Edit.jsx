import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UpdateProfileInformationFormv2 from "./Partials/UpdateProfileInformationFormv2";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import UserHeader from "@/Components/Argon/Headers/UserHeader";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CloseButton,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
} from "reactstrap";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AdminLayout header={auth.user.name} user={auth.user}>
            <Head title="Profile" />

            {/* <UserHeader user={auth.user}/> */}

            <header className="bg-gradient-default pb-8 pt-5 pt-md-8">
                <Container className="mt-6" fluid>
                    <Row>
                        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                            <Card className="card-profile shadow">
                                <Row className="justify-content-center">
                                    <Col className="order-lg-2" lg="3">
                                        <div className="card-profile-image">
                                            <a
                                                href="#pablo"
                                                onClick={(e) =>
                                                    e.preventDefault()
                                                }
                                            >
                                                <img
                                                    alt="..."
                                                    className="rounded-circle"
                                                    src="/assets/img/theme/team-4-800x800.jpg"
                                                />
                                            </a>
                                        </div>
                                    </Col>
                                </Row>
                                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                    <div className="d-flex justify-content-between">
                                        <Button
                                            className="mr-4"
                                            color="info"
                                            href="#palo"
                                            onClick={(e) => preventDefault()}
                                            size="sm"
                                        >
                                            Connect
                                        </Button>
                                        <Button
                                            className="mr-4"
                                            color="default"
                                            href="#palo"
                                            onClick={(e) => preventDefault()}
                                            size="sm"
                                        >
                                            Message
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardBody className="pt-0 pt-md-4">
                                    <Row>
                                        <div className="col">
                                            <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                                <div>
                                                    <div className="heading">
                                                        22
                                                    </div>
                                                    <div className="description">
                                                        Friends
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="heading">
                                                        10
                                                    </span>
                                                    <span className="description">
                                                        Photos
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="heading">
                                                        89
                                                    </span>
                                                    <span className="description">
                                                        Comments
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                    <div className="text-center">
                                        <h3>
                                            {auth.user.name}
                                            <span className="font-weight-light"></span>
                                        </h3>
                                        <div className="h5 font-weight-300">
                                            <i className="ni location_pin mr-2" />
                                            {auth.user.email}
                                        </div>
                                        <div className="h5 mt-4">
                                            <i className="ni business_briefcase-24 mr-2" />
                                            Solution Manager - Creative Tim
                                            Officer
                                        </div>
                                        <div>
                                            <i className="ni education_hat mr-2" />
                                            University of Computer Science
                                        </div>
                                        <hr className="my-4" />
                                        <p>
                                            Ryan — the name taken by
                                            Melbourne-raised, Brooklyn-based
                                            Nick Murphy — writes, performs and
                                            records all of his own music.
                                        </p>
                                        <a
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            Show more
                                        </a>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="order-xl-1" xl="8">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">My Account</h3>
                                        </Col>
                                        <Col className="text-right" xs="4">
                                            <Button
                                                color="primary"
                                                href="#pablo"
                                                onClick={(e) =>
                                                    preventDefault()
                                                }
                                                size="sm"
                                            >
                                                Settings
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    {/* <Form> */}
                                    <h6 className="heading-small text-muted mb-4">
                                        User Information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <UpdateProfileInformationForm
                                            mustVerifyEmail={mustVerifyEmail}
                                            status={status}
                                        />
                                    </div>
                                    <hr className="my-4" />
                                    <h6 className="heading-small text-muted mb-4">
                                        Update Password
                                    </h6>
                                    <div className="pl-lg-4">
                                        <UpdatePasswordForm />
                                    </div>
                                    {/* </Form> */}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </header>
        </AdminLayout>
    );
}
