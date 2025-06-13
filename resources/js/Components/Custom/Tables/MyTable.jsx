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

const MyTable = (props) => {
    const { tableHead, data } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [filtered, setFiltered] = useState();
    const [searchData, setSearchData] = useState();
    // const [rowPerPage, setRowPerPage] = useState();
    // const [currentPage, setCurrentPage] = useState(1);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [editOpen, setEditOpen]=useState(false);

    const currentPage = useRef(1);
    const rowPerPage = useRef(10);

    const { get } = useForm();

    const refreshData = () => {
        get(
            route(route().current(), {
                page: currentPage.current,
                searchData: searchData ? searchData : '',
                rowPerPage: rowPerPage.current,
            }),
            {
                preserveState: true,
                preserveScroll: true,
                replace: true
            }
        )
    }

    const toggleModal = () => {
        setIsOpen(isOpen != isOpen);
    };

    useEffect(() => {
        if(searchData != null){
            refreshData();
        }
    }, [searchData])

    const addData = () => {
        setIsAdd(true);
        setFiltered(null);
        setIsOpen(true);
    };

    const editData = (value) => {
        console.log(value);
        get(route('jenis-cuci.edit',value.id));
    };

    const deleteData = (value) => {
        setFiltered(value);
        setDeleteOpen(true);
    };

    const deleteToggle = () => {
        setDeleteOpen(deleteOpen != deleteOpen);
        refreshData();
    };

    const pageChange = (pageNumber) => {
        currentPage.current = pageNumber;
        refreshData();
    };

    const previousPage = () => {
        if (currentPage != 1) {
            currentPage.current = (currentPage.current - 1);
            refreshData();
        }
    };

    const nextPage = () => {
        if (currentPage !== Math.ceil(data.total / rowPerPage)) {
            currentPage.current = (currentPage.current + 1);
            refreshData();
        }
    };

    return (
        <>
            <Card>
                <CardHeader className="d-flex flex-column justify-content-between">
                    <h3 className="mb-0">{tableHead}</h3>
                    <div className="mt-3 justify-content-between align-items-center">
                        <Row>
                            <Col className="order-xs-2" xs="12" lg="6">
                                <select
                                    value={rowPerPage.current}
                                    onChange={(e) =>
                                        {
                                            currentPage.current = 1;
                                            rowPerPage.current = e.target.value;
                                            refreshData();
                                        }
                                        // setRowPerPage(e.target.value)
                                    }
                                    className="form-control-alternative form-control form-select-sm mr-3 w-25"
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                </select>
                            </Col>
                            <Col className="order-xs-1" xs="12" lg="3">
                                <Form className="justify-content-between ">
                                    <InputGroup className="input-group-alternative">
                                        <Input
                                            id="search"
                                            name="search"
                                            type="text"
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
                        </Row>
                    </div>
                </CardHeader>
                <Table className="align-items-center  table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Jenis Cuci</th>
                            <th scope="col">Harga</th>
                            <th scope="col">Tipe</th>
                            <th scope="col">Keterangan</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.length == 0 ? (
                            <tr>
                                <td
                                    className="justify-content-center d-flex"
                                    colspan={6}
                                >
                                    {" "}
                                    Data tidak ada.
                                </td>
                            </tr>
                        ) : (
                            data.data.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">
                                            {(data.current_page - 2) *
                                                data.per_page +
                                                index +
                                                data.per_page +
                                                1}
                                        </th>
                                        <td>
                                            <Media className="align-items-center">
                                                <a
                                                    className="avatar rounded-circle mr-3"
                                                    href={value.gambar}
                                                    target="_blank"
                                                >
                                                    <img
                                                        className="object-fit-cover"
                                                        alt="..."
                                                        src={value.gambar}
                                                    />
                                                </a>
                                                <Media>
                                                    <strong className="mb-0 text-sm">
                                                        {value.nama}
                                                    </strong>
                                                </Media>
                                            </Media>
                                        </td>
                                        <td>
                                            <span className="mb-0 text-sm">
                                                {value.harga}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="mb-0 text-sm">
                                                {value.tipe}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="mb-0 text-sm">
                                                {value.keterangan}
                                            </span>
                                        </td>
                                        <td>
                                            <Button
                                                color="warning"
                                                size="sm"
                                                onClick={() => editData(value)}
                                            >
                                                <i class="fa-solid fa-pen-to-square mr-2"></i>
                                                Edit
                                            </Button>
                                            <Button
                                                color="danger"
                                                size="sm"
                                                onClick={() =>
                                                    deleteData(value)
                                                }
                                            >
                                                <i class="fa-solid fa-trash-can mr-2"></i>
                                                Hapus
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
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

            <ModalJenis
                isOpen={isOpen}
                toggleModal={toggleModal}
                filteredData={filtered}
                isAdd = {isAdd}
            />

            <ModalDelete
                isOpen={deleteOpen}
                toggleModal={deleteToggle}
                deleteData={filtered}
                deleteRoute="jenis-cuci.destroy"
            />
        </>
    );
};

MyTable.propTypes = {
    tableHead: PropTypes.string.isRequired,
    data: PropTypes.array,
};

export default MyTable;
