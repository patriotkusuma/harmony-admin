import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupText,
    Label,
    Modal,
    Row,
} from "reactstrap";
import { useForm } from "@inertiajs/react";

const ChangePassword = (props) => {
    const { isOpen, toggleModal, filteredData } = props;
    const [passwordCheck, setPasswordCheck] = useState(false);

    const {
        data,
        setData,
        errors,
        reset,
        patch,
        put,
        processing,
        recentlySuccessful,
    } = useForm({
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {

        put(route("pegawai-password.update", filteredData.id), {
            preserveScroll: true,
            onSuccess: (success) => {
                reset();
                toggleModal();
            },
            onError: (errors) => {},
        });
    };

    return (
        <Modal
            className="modal-dialog-centered"
            toggle={toggleModal}
            isOpen={isOpen}
        >
            <div className="modal-header">
                <h2 className="modal-title" id="modal-title-default">
                    Ganti Password Pegawai
                </h2>
                <button
                    aria-label="close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={toggleModal}
                >
                    <span aria-hidden={true}>
                        <i className="fa-solid fa-xmark"></i>
                    </span>
                </button>
            </div>

            <div className="modal-body">
                <Form role="form" onSubmit={submit}>
                    <Row>
                        <Col sm="6">
                            <FormGroup>
                                <Label className="form-control-label">
                                    Password
                                    <span className="text-light">(*)</span>
                                </Label>
                                <InputGroup className="input-group-alternative">
                                    <Input
                                        className="form-control-alternative"
                                        id="password"
                                        name="password"
                                        placeholder="password"
                                        type={
                                            passwordCheck == true
                                                ? "text"
                                                : "password"
                                        }
                                        autoFocus
                                        defaultValue={
                                            data != null ? data.password : ""
                                        }
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        invalid={errors.password && true}
                                    />
                                    <InputGroupText
                                        onClick={() => {
                                            setPasswordCheck(!passwordCheck);
                                        }}
                                        role="button"
                                    >
                                        <i className="fa-regular fa-eye"></i>
                                    </InputGroupText>
                                </InputGroup>

                                {errors.password && (
                                    <small
                                        style={{ color: "#fb6340" }}
                                        className="text-sm justify-content-start"
                                    >
                                        {errors.password}
                                    </small>
                                )}
                            </FormGroup>
                        </Col>

                        <Col sm="6">
                            <FormGroup>
                                <Label className="form-control-label">
                                    Password Confirmation
                                    <span className="text-light">(*)</span>
                                </Label>
                                <InputGroup className="input-group-alternative">
                                    <Input
                                        className="form-control-alternative"
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        placeholder="Password Confirmation"
                                        type={
                                            passwordCheck == true
                                                ? "text"
                                                : "password"
                                        }
                                        autoFocus
                                        defaultValue={
                                            data != null
                                                ? data.password_confirmation
                                                : ""
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        invalid={
                                            errors.password_confirmation && true
                                        }
                                    />
                                    <InputGroupText
                                        onClick={() =>
                                            setPasswordCheck(!passwordCheck)
                                        }
                                        role="button"
                                    >
                                        <i className="fa-regular fa-eye"></i>
                                    </InputGroupText>
                                </InputGroup>

                                {errors.password_confirmation && (
                                    <small
                                        style={{ color: "#fb6340" }}
                                        className="text-sm justify-content-start"
                                    >
                                        {errors.password_confirmation}
                                    </small>
                                )}
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
                <div className="d-flex justify-content-between">
                    <Button
                        color="primary"
                        type="submit"
                        disabled={processing}
                        onClick={submit}
                    >
                        <i className="fa-regular fa-floppy-disk"></i>
                        <span>Save changes</span>
                    </Button>
                    <Button
                        className="ml-auto"
                        color="link"
                        data-dismiss="modal"
                        type="button"
                        onClick={toggleModal}
                    >
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

ChangePassword.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    filteredData: PropTypes.any,
};

export default ChangePassword;
