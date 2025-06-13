import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Card,
    CardFooter,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupText,
    Media,
    PaginationItem,
    PaginationLink,
    Row,
    Table,
} from "reactstrap";
import ModalJenis from "../Modals/ModalJenis";
import { NumericFormat } from "react-number-format";
import { Link, useForm } from "@inertiajs/react";
import Pagination from "../Pagination/Pagination";
import ModalDelete from "../Modals/ModalDelete";
import moment from "moment";

const CustomTable = (props) => {
    const { tableHead, data, headData, children, toggleModal, addData, isAdd } =
        props;
    const [isOpen, setIsOpen] = useState(false);
    const [filtered, setFiltered] = useState();
    const [searchData, setSearchData] = useState();
    // const [rowPerPage, setRowPerPage] = useState();
    const rowPerPage = useRef(10);
    // const [currentPage, setCurrentPage] = useState(1);
    const currentPage = useRef(1);
    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();
    // const dateFrom = useRef(new Date());
    const [deleteOpen, setDeleteOpen] = useState(false);

    const { get } = useForm();

    const changedFilter = () => {
        get(
            route(route().current(), {
                page: currentPage.current,
                searchData: searchData ? searchData : "",
                rowPerPage: rowPerPage.current,
                dateFrom: dateFrom ? dateFrom : null,
                dateTo: dateTo ? dateTo : null,
            }),
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                // only: ["data"],
            }
        );
    };

    useEffect(() => {
        if (searchData != null) {
            changedFilter();
        }
        if(dateFrom != null){
            changedFilter();
        }
        if(dateTo != null){
            changedFilter();
        }
    }, [searchData, dateFrom, dateTo]);

    const editData = (value) => {
        setFiltered(value);
        setIsOpen(true);
    };

    const deleteData = (value) => {
        setFiltered(value);
        setDeleteOpen(true);
    };

    const deleteToggle = () => {
        setDeleteOpen(deleteOpen != deleteOpen);
    };

    const pageChange = (pageNumber) => {
        // setCurrentPage(pageNumber);
        currentPage.current = pageNumber;
        changedFilter();
    };

    const previousPage = () => {
        if (currentPage != 1) {
            currentPage.current = currentPage.current - 1;
            changedFilter();
            // setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage !== Math.ceil(data.total / rowPerPage)) {
            // setCurrentPage(currentPage + 1);
            currentPage.current = currentPage.current + 1;
            changedFilter();
        }
    };


    return (
        <>
            <Card>
                <CardHeader className="d-flex flex-column justify-content-between">
                    <h3 className="mb-0">{tableHead}</h3>
                    <div className="mt-3 justify-content-between align-items-center">
                        <Row>
                            <Col className="order-xs-2" xs="12" lg="3">
                                <select
                                    value={rowPerPage.current}
                                    onChange={(e) =>
                                        // setRowPerPage(e.target.value)
                                        {
                                            currentPage.current = 1;
                                            rowPerPage.current = e.target.value;
                                            changedFilter();
                                        }
                                    }
                                    className="form-control-alternative form-control form-select-sm mr-3 w-50"
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                </select>
                            </Col>
                            <Col className="order-xs-2" xs="12" lg="6">
                                <Row>
                                    <Col lg="6">
                                        <Form className="justify-content-between ">
                                            <InputGroup className="input-group-alternative">
                                                <Input
                                                    id="dateFrom"
                                                    name="dateFrom"
                                                    type="date"
                                                    value={
                                                        dateFrom
                                                            ? dateFrom
                                                            : ""
                                                    }
                                                    onChange={(e) =>
                                                        setDateFrom(e.target.value)
                                                    }
                                                    placeholder="Cari disini"
                                                />
                                            </InputGroup>
                                        </Form>
                                    </Col>
                                    <Col lg="6">
                                        <Form className="justify-content-between ">
                                            <InputGroup className="input-group-alternative">
                                                <Input
                                                    id="dateTo"
                                                    name="dateTo"
                                                    type="date"
                                                    min={dateFrom ? dateFrom : ''}
                                                    value={
                                                        dateTo
                                                            ? dateTo
                                                            : ""
                                                    }
                                                    onChange={(e) =>
                                                        setDateTo(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Cari disini"
                                                />
                                            </InputGroup>
                                        </Form>
                                    </Col>
                                </Row>
                            </Col>

                            <Col className="order-xs-1" xs="12" lg="3">
                                <Form className="justify-content-between ">
                                    <InputGroup className="input-group-alternative">
                                        <Input
                                            id="search"
                                            name="search"
                                            type="search"
                                            value={searchData ? searchData : ""}
                                            onChange={(e) =>
                                                setSearchData(e.target.value)
                                            }
                                            placeholder="Cari disini"
                                        />
                                        <Button
                                            className="shadow-none border-none text-muted bg-transparent"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                        </Button>
                                    </InputGroup>
                                </Form>
                            </Col>
                            {isAdd == true && (
                                <Col
                                    className="order-xs-3 justify-content-end d-flex"
                                    xs="12"
                                    lg="3"
                                >
                                    <Button
                                        color="primary"
                                        size="md"
                                        onClick={addData}
                                    >
                                        <i className="fa-solid fa-file-circle-plus mr-2"></i>
                                        Tambah Data
                                    </Button>
                                </Col>
                            )}
                        </Row>
                    </div>
                </CardHeader>
                <Table className="align-items-center  table-flush " responsive>
                    <thead className="thead-light">
                        <tr>
                            {headData.map((th, index) => {
                                return (
                                    <th scope="col" key={index}>
                                        {th}
                                    </th>
                                );
                        })}
                        </tr>
                    </thead>
                    <tbody>{children}</tbody>
                </Table>
                <CardFooter className="py-4">
                    <nav aria-label="....">
                        <Pagination
                            currentPage={currentPage.current}
                            rowPerPage={data.per_page}
                            totalPosts={data.total}
                            onPageChange={pageChange}
                            previousPage={previousPage}
                            nextPage={nextPage}
                            lastPage={data.last_page}
                        />
                    </nav>
                </CardFooter>
            </Card>
        </>
    );
};

CustomTable.propTypes = {
    tableHead: PropTypes.string.isRequired,
    data: PropTypes.array,
    headData: PropTypes.array.isRequired,
    toggleModal: PropTypes.func,
    addData: PropTypes.func,
    isAdd: PropTypes.bool,
};

export default CustomTable;
