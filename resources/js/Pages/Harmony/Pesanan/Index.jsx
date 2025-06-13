import Header from "@/Components/Argon/Headers/Header";
import AddComma from "@/Components/Custom/Services/AddComma";
import CustomTable from "@/Components/Custom/Tables/CustomTable";
import AdminLayout from "@/Layouts/AdminLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import ReactToPrint, {ComponentToPrint} from "react-to-print";
import PesananLayout from "@/Layouts/PesananLayout";
import { Head, router, useForm } from "@inertiajs/react";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardImg,
    CardImgOverlay,
    CardText,
    CardTitle,
    Col,
    Container,
    FormGroup,
    Input,
    Media,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
} from "reactstrap";
import RecieptPrint from "@/Components/Print/RecieptPrint";

const Index = (props) => {
    const { auth, pesanans, pakets, flash, cartItems, subTotal, categoryPakets , estimasiSelesai, searchData} =
        props;
    const [isOpen, setIsOpen] = useState(false);
    const [isLunas, setIsLunas] = useState(false);


    const [dataChart, setDataChart] = useState({
        quantity: "",
    });

    let componentRef = useRef();

    const kode_pesan = "HRMN" + "-" + moment().unix();

    const {get,  data, setData, post } = useForm({
        idJenisCuci: "",
        kodePesan: kode_pesan,
        // kode_pesan: 'HRMN' + '-' + moment().unix() + '-' + (Math.floor(Math.random()*90000)+10000),
        nama: "",
        telpon: "",
        statusPembayaran: isLunas == true ? "Lunas" : "Belum Lunas",
    });

    // console.log(cartItems[2]);
    // console.log(Object.keys(cartItems).find(key=>cartItems[key] == '2'));
    const addCart = (value) => {
        // setData("idJenisCuci", value.id);
        // post(route("cart.store", value.id));
        router.post(route("cart.store", value.id), {
            idJenisCuci: value.id,
        });
    };

    const updateCart = (value, id) => {
        router.patch(route("cart.update", id), {
            qty: value,
        });
    };

    const removeOneCart = (value) => {
        router.delete(route("cart.destroy", value.id), {
            searchData: value,
        });
    };

    const clearCart = () => {
        post(route("cart.clear"));
    };

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleUserKeyPress = useCallback((event) => {
        const { key, keyCode } = event;
        if (keyCode === 113) {
            setIsOpen(true);
        }
        if(keyCode === 114){
            return false;
        }
        // if(keyCode === 13){
        //     alert('dkjfkdj');
        // }
    }, []);

    const bayar = () => {
        post(route("pesanan.store"));
    }


    const cariPaket = (value) => {
        get(route('pesanan.index', {
            searchData: value,
        }));
    }

    useEffect(() => {
        window.addEventListener("keydown", handleUserKeyPress);

        if(flash.success != null ){
            window.location.reload(false);
        }
    }, [handleUserKeyPress, flash]);



    return (
        <>
            <PesananLayout user={auth.user} header={"Pesanan"}>
                <Row className="justify-content-center">
                    <Col md="8 ">
                        <Card>
                            <CardHeader title="Ini adalah judul">
                                <CardTitle tag={"h3"}>
                                    <Row>
                                        <Col md="7">
                                            Daftar Paket Laundry
                                        </Col>
                                        <Col md="5">
                                            <Input
                                                name="nama"
                                                id="nama"
                                                autoFocus={true}
                                                onChange={(e) => {cariPaket(e.target.value)}}
                                                placeholder="Cari Paket Cuci"
                                                defaultValue={searchData != null ? searchData : '' }
                                            />

                                        </Col>
                                    </Row>
                                </CardTitle>
                            </CardHeader>
                            <CardBody className="bg-secondary">
                                <div className="overflow-scroll">
                                    {categoryPakets.map((category, index) => {
                                        return (
                                            <>
                                                <h3 className="heading-medium text-muted">
                                                    {category.nama + " " + category.durasi + " " + category.tipe_durasi}
                                                </h3>
                                                <Row className="mb-3">
                                                    {category.paket_cuci !=
                                                        null &&
                                                        category.paket_cuci.map(
                                                            (paket, paketIndex) => {
                                                                return (
                                                                    <>
                                                                        <Col md="3 mt-2">
                                                                            <Card
                                                                                className={`w-100 ${
                                                                                    Object.keys(
                                                                                        cartItems
                                                                                    )
                                                                                        .length >
                                                                                        0 &&
                                                                                    cartItems[
                                                                                        paket.id
                                                                                    ] !=
                                                                                        null &&
                                                                                    // cartItems[
                                                                                    //     paket.id
                                                                                    // ]
                                                                                    //     .id ==
                                                                                    //     paket.id &&
                                                                                    "border border-primary border-5"
                                                                                } `}
                                                                            >
                                                                                {/* <Media> */}

                                                                                <CardImg
                                                                                    src={
                                                                                        paket.gambar
                                                                                    }
                                                                                />
                                                                                {Object.keys(
                                                                                    cartItems
                                                                                )
                                                                                    .length !=
                                                                                    0 &&
                                                                                    cartItems[
                                                                                        paket.id
                                                                                    ] !=
                                                                                        null &&
                                                                                    // cartItems[
                                                                                    //     index +
                                                                                    //         1
                                                                                    // ]
                                                                                    //     .id ==
                                                                                    //     paket.id &&
                                                                                     (
                                                                                        <CardImgOverlay className="p-2">
                                                                                            <CardText tag="h2">
                                                                                                <i class="fa-solid fa-circle-check"></i>
                                                                                            </CardText>
                                                                                        </CardImgOverlay>
                                                                                    )}
                                                                                <CardBody className="p-0">
                                                                                    <CardTitle
                                                                                        tag="h"
                                                                                        className="pt-0 pb-2 px-2 m-0 justify-content-center d-flex flex-column"
                                                                                    >
                                                                                        <strong>
                                                                                            {
                                                                                                paket.nama
                                                                                            }
                                                                                        </strong>
                                                                                        {paket.keterangan != null &&  (
                                                                                            <span>
                                                                                                ({paket.keterangan})
                                                                                            </span>
                                                                                        )}


                                                                                        <span>
                                                                                            <AddComma
                                                                                                value={
                                                                                                    paket.harga
                                                                                                }
                                                                                                tag={
                                                                                                    "h5"
                                                                                                }
                                                                                            />
                                                                                        </span>
                                                                                    </CardTitle>
                                                                                </CardBody>
                                                                                <Button
                                                                                    onClick={() => {
                                                                                        addCart(
                                                                                            paket
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    Tambah
                                                                                </Button>
                                                                                {/* </Media> */}
                                                                            </Card>
                                                                        </Col>
                                                                    </>
                                                                );
                                                            }
                                                        )}
                                                </Row>
                                            </>
                                        );
                                    })}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>

                    {/* Right */}
                    <Col md="4">
                        <div className="sticky-top ">
                            <Card className="mb-2">
                                <CardHeader className="pb-0">
                                    <CardTitle
                                        tag="h2"
                                        className="d-flex justify-content-between"
                                    >
                                        <span>Cart</span>
                                        <Button
                                            color="danger"
                                            size="sm"
                                            onClick={clearCart}
                                        >
                                            X
                                        </Button>
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    {cartItems != null &&
                                        Object.keys(cartItems).map(
                                            (key, index) => {
                                                return (
                                                    <>
                                                        <Row className="bg-info mb-2 rounded align-items-center">
                                                            <Col md="7">
                                                                <div className="d-flex align-items-center">
                                                                    <CardImg
                                                                        className="rounded-lg p-2"
                                                                        style={{
                                                                            width: "80px",
                                                                        }}
                                                                        src={
                                                                            cartItems[
                                                                                key
                                                                            ]
                                                                                .attributes
                                                                                .image
                                                                        }
                                                                    />
                                                                    <CardText></CardText>
                                                                    <h4 className="d-flex flex-column w-full text-dark">
                                                                        <span className="text-default">
                                                                            {cartItems[key].attributes.category_paket}
                                                                        </span>
                                                                        <span>
                                                                            {
                                                                                cartItems[
                                                                                    key
                                                                                ]
                                                                                    .name
                                                                            }
                                                                        </span>
                                                                        <span className="font-weight-light">
                                                                            {
                                                                                cartItems[
                                                                                    key
                                                                                ]
                                                                                    .quantity
                                                                            }{" "}
                                                                            x
                                                                                {
                                                                                    " Rp " +
                                                                                    cartItems[
                                                                                        key
                                                                                    ]
                                                                                        .price
                                                                                }

                                                                        </span>
                                                                    </h4>
                                                                </div>
                                                            </Col>
                                                            <Col md="5">
                                                                <div className="d-flex align-items-center">
                                                                    {/* <Button
                                                            color="default"
                                                            size="sm"
                                                        >
                                                            <i class="fa-solid fa-minus"></i>
                                                        </Button> */}
                                                                    <Input
                                                                        autoFocus={true}
                                                                        className="w-100"
                                                                        // defaultValue={
                                                                        //     cartItems[key]
                                                                        //         .quantity
                                                                        // }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            updateCart(
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                                cartItems[
                                                                                    key
                                                                                ]
                                                                                    .id
                                                                            )
                                                                        }
                                                                        defaultValue={
                                                                            cartItems[
                                                                                key
                                                                            ]
                                                                                .quantity
                                                                        }
                                                                    />
                                                                    <Button
                                                                        color="danger"
                                                                        size="sm"
                                                                        className="ml-2"
                                                                        type="button"
                                                                        // disabled
                                                                        onClick={() =>
                                                                            removeOneCart(
                                                                                cartItems[
                                                                                    key
                                                                                ]
                                                                            )
                                                                        }
                                                                    >
                                                                        <i class="fa-solid fa-xmark"></i>
                                                                    </Button>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </>
                                                );
                                            }
                                        )}
                                </CardBody>
                                <CardFooter className="py-2">
                                    <CardTitle
                                        tag="h3"
                                        className="d-flex justify-content-between"
                                    >
                                        <span>Sub Total</span>
                                        <span>
                                            <AddComma value={ subTotal} />
                                        </span>
                                    </CardTitle>
                                </CardFooter>
                            </Card>
                            <Card className="mb-2">
                                <CardHeader className="pb-2 ">
                                    <Row className="d-flex align-items-center justify-content-between">
                                        <Col xs="8">
                                            <h3 className="mb-0">Identitas</h3>
                                        </Col>
                                        <Col className="text-right" xs="4">
                                            <Button
                                                color="primary"
                                                size="sm"
                                                onClick={() => {
                                                    setIsOpen(true);
                                                }}
                                            >
                                                <i class="fa-solid fa-pen-to-square"></i>
                                                <span>Edit</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col md="5">
                                            <h4>Kode Pesan</h4>
                                        </Col>
                                        <Col md="7" className="text-right">
                                            <h4>{data ? data.kodePesan : ""}</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <h4>Nama</h4>
                                        </Col>
                                        <Col md="6" className="text-right">
                                            <h4>{data ? data.nama : ""}</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <h4>No Wa</h4>
                                        </Col>
                                        <Col md="6" className="text-right">
                                            <h4>{data ? data.telpon : ""}</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="5">
                                            <h4>Tanggal Masuk</h4>
                                        </Col>
                                        <Col md="7" className="text-right">
                                            <h4>
                                                {moment().format(
                                                    "HH:mm, DD MMMM YYYY"
                                                )}
                                            </h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="5">
                                            <h4>Tanggal Selesai</h4>
                                        </Col>
                                        <Col md="7" className="text-right">
                                            <h4>
                                                {moment(estimasiSelesai).format('HH:mm, DD MMMM YYYY')}
                                            </h4>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            <Row className="mb-2">
                                <Col>
                                    <Button
                                        className="w-100"
                                        color={isLunas == false ? "success" : 'white'}
                                        onClick={()=> {
                                            setData('statusPembayaran', "Belum Lunas")
                                            setIsLunas(false)
                                        }}
                                    >
                                        Belum Lunas
                                    </Button>
                                </Col>
                                <Col>
                                    <Button className="w-100"
                                        color={isLunas == true ? "success" : 'white'}
                                        onClick={()=> {
                                            setData('statusPembayaran', "Lunas")
                                            setIsLunas(true)
                                        }}
                                    >
                                        Lunas
                                    </Button>
                                </Col>
                            </Row>
                            <Button className="w-100" color="default" onClick={bayar}>
                                <Row className="d-flex justify-content-between">
                                    <Col md="4 text-left">
                                        <span>Bayar</span>
                                        <i class="fa-solid fa-arrow-right"></i>
                                    </Col>
                                    <Col md="8 text-right">
                                        <AddComma value={subTotal} />
                                    </Col>
                                </Row>
                            </Button>

                            {/* <RecieptPrint/> */}
                            {/* <ComponentToPrint /> */}
                        </div>
                    </Col>
                </Row>
            </PesananLayout>

            <Modal isOpen={isOpen} toggle={toggleModal} autoFocus={false}>
                <ModalHeader>Identitas Customer</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <label className="form-label">Nama</label>
                                <Input
                                    className="form-control-alternative"
                                    name="nama"
                                    id="nama"
                                    autoFocus={isOpen == true ? true : false}
                                    value={data ? data.nama : ""}
                                    onChange={(e) =>
                                        setData("nama", e.target.value)
                                    }
                                />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label className="form-label">No Wa</label>
                                <Input
                                    className="form-control-alternative"
                                    name="telpon"
                                    id="telpon"
                                    onChange={(e) =>
                                        setData("telpon", e.target.value)
                                    }
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter className="d-flex justify-content-between">
                    <Button color="secondary" onClick={toggleModal}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={toggleModal}>
                        Do Something
                    </Button>
                </ModalFooter>
            </Modal>
        </>
        // <AdminLayout
        //     user={auth.user}
        //     header="Daftar Pesanan"
        // >
        //     <Head  title='Daftar Pesanan'/>
        //     <Header>
        //         <Col lg="6" xl="3">

        //         </Col>
        //     </Header>

        //     <Container className='mt--7' fluid>
        //         <Row>
        //             <div className="col">
        //                 <CustomTable
        //                     data={pesanans}
        //                     headData={headRow}
        //                     tableHead='Dana Keluar'
        //                 >

        //                 </CustomTable>
        //             </div>
        //         </Row>
        //     </Container>

        // </AdminLayout>
    );
};

export default Index;
