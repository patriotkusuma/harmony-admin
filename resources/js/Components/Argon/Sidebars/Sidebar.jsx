import React, { useState } from "react";
import PropTypes from "prop-types";
import { BsBagCheck } from "react-icons/bs";
import { BiSolidDiscount } from "react-icons/bi";
import {
    Button,
    Col,
    Collapse,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    Input,
    InputGroup,
    InputGroupText,
    Media,
    Nav,
    NavItem,
    NavLink,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Row,
    UncontrolledCollapse,
    UncontrolledDropdown,
} from "reactstrap";
import { Link, router, useForm, usePage } from "@inertiajs/react";

const Sidebar = (props) => {
    // const [collapseOpen, setCollapseOpen] = useState();
    // const { bgColor, logo } = props;
    const {cabangs} = usePage().props
    const { bgColor, logo, toggleCollapse, collapseOpen } = props;
    const { auth } = usePage().props;
    const { url } = usePage();

    const { post } = useForm();

    const changeActiveCabang = (id) => {
        router.post('cabang-active',{
            'id' : id
        })
    }


    // console.log(route().startsWith('kontrakan.'))

    // const toggleCollapse = () => {
    //     setCollapseOpen((data) => !data);
    // };

    const logout = (e) => {
        router.post('logout', {
            id: auth.user.id
        })
    };

    return (
        <Navbar
            className="navbar-vertical fixed-left navbar-light bg-white"
            expand="md"
            id="sidenav-main"
        >
            <Container fluid>
                {/* Toggler */}
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleCollapse}
                >
                    <span className="navbar-toggler-icon" />
                </button>

                {/* Brand */}
                {logo && (
                    <NavbarBrand className="pt-0">
                        <img
                            alt={logo.imgAlt}
                            className="navbar-brand-img"
                            src={logo.imgSrc}
                        />
                    </NavbarBrand>
                )}
                {/* User */}
                <Nav className="align-items-center d-md-none">
                    <UncontrolledDropdown nav>
                        <DropdownToggle nav className="nav-link-icon">
                            <i className="ni ni-bell-55"></i>
                        </DropdownToggle>
                        <DropdownMenu
                            aria-labelledby="navbar-default_dropdown_1"
                            className="dropdown-menu-arrow"
                            right
                        >
                            <DropdownItem>Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
                            <DropdownItem devider />
                            <DropdownItem>Something else here</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav>
                        <DropdownToggle nav>
                            <Media className="align-items-center">
                                <span className="avatar avatar-sm rounded-circle">
                                    <img
                                        alt="..."
                                        src="/assets/img/theme/team-1-800x800.jpg"
                                    />
                                </span>
                            </Media>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                                className="noti-title"
                                header
                                tag="div"
                            >
                                <h6 className="text-overflow m-0">Welcome !</h6>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile">
                                <i className="ni ni-single-02" />
                                <span>My profile</span>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile">
                                <i className="ni ni-settings-gear-65" />
                                <span>Settings</span>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile">
                                <i className="ni ni-calendar-grid-58" />
                                <span>Activity</span>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile">
                                <i className="ni ni-support-16" />
                                <span>Support</span>
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem href="#pablo" onClick={logout}>
                                <i className="ni ni-user-run" />
                                <span>Logout</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                {/* Collapse */}
                <Collapse navbar isOpen={collapseOpen}>
                    {/* Collapse header */}
                    <div className="navbar-collapse-header d-md-none">
                        <Row>
                            {logo ? (
                                <Col className="collapse-brand" xs="6">
                                    {logo.innerLink ? (
                                        <Link to={logo.innerLink}>
                                            <img
                                                alt={logo.imgAlt}
                                                src={logo.imgSrc}
                                            />
                                        </Link>
                                    ) : (
                                        <a href={logo.outterLink}>
                                            <img
                                                alt={logo.imgAlt}
                                                src={logo.imgSrc}
                                            />
                                        </a>
                                    )}
                                </Col>
                            ) : null}
                            <Col className="collapse-close" xs="6">
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    onClick={toggleCollapse}
                                >
                                    <span />
                                    <span />
                                </button>
                            </Col>
                        </Row>
                    </div>
                    {/* Form */}
                    {auth.user.role !== "pegawai" &&(

                        <Form className="mt-4 mb-3 d-md-none">
                            <InputGroup className="input-group-rounded input-group-merge">
                                <Input
                                    className="form-control form-control-rounded form-control-prepended"
                                    type="select"
                                    onChange={(e) => changeActiveCabang(e.target.value)}
                                >
                                    {'data' in cabangs && cabangs.data.map((cabang, index) => (
                                        <option className='bg-default' value={cabang.id} key={index}>{cabang.nama}</option>
                                    ))}
                                </Input>
                                {/* <InputGroupText>
                                    <span className="fa fa-search" />
                                    </InputGroupText> */}
                            </InputGroup>
                        </Form>
                    )}
                    {/* Navigation */}
                    <Nav navbar>
                        <NavItem>
                            <NavLink
                                href={route("dashboard")}
                                tag={Link}
                                active={route().current() === "dashboard"}
                                className={
                                    route().current() === "dashboard"
                                        ? "bg-teal text-default"
                                        : ""
                                }
                            >
                                <i className="ni ni-tv-2 text-primary"></i>
                                Dashboard
                            </NavLink>
                        </NavItem>
                        {auth.user.role == "admin" && (
                            <>
                                <NavItem>
                                    <NavLink
                                        href={route("pegawai.index")}
                                        tag={Link}
                                        active={
                                            route().current() ===
                                            "pegawai.index"
                                        }
                                        className={
                                            route().current() ===
                                            "pegawai.index"
                                                ? "bg-teal text-default"
                                                : ""
                                        }
                                    >
                                        <i className="ni ni-tv-2 text-primary"></i>
                                        Pegawai
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink
                                        href={route("sumber-dana.index")}
                                        tag={Link}
                                        active={
                                            route().current() ===
                                            "sumber-dana.index"
                                        }
                                        className={
                                            route().current() ===
                                            "sumber-dana.index"
                                                ? "bg-teal text-default"
                                                : ""
                                        }
                                    >
                                        <i className="fa-solid fa-hand-holding-dollar text-primary"></i>
                                        Sumber Dana
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        href={route("dana-keluar.index")}
                                        tag={Link}
                                        active={
                                            route().current() ===
                                            "dana-keluar.index"
                                        }
                                        className={
                                            route().current() ===
                                            "dana-keluar.index"
                                                ? "bg-teal text-default"
                                                : ""
                                        }
                                    >
                                        <i className="ni ni-tv-2 text-primary"></i>
                                        Dana Keluar
                                    </NavLink>
                                </NavItem>

                                {/* <NavItem>
                                    <NavLink
                                        href="#"
                                        id="toggler"
                                        // tag={Button}
                                        tag="a"
                                    >
                                        <i class="fa-solid fa-warehouse text-primary"></i>

                                        <span>Inventory Management</span>
                                        <i class="fa-solid fa-angle-down"></i>
                                    </NavLink>
                                    <UncontrolledCollapse toggler="#toggler">
                                        <NavLink
                                            href={route("customers.index")}
                                            tag={Link}
                                            className={
                                                route().current() ===
                                                "customers.index"
                                                    ? "bg-teal text-default"
                                                    : "text-muted"
                                            }
                                        >
                                            <i className="ni ni-tv-2 text-primary"></i>
                                            Customer
                                        </NavLink>
                                    </UncontrolledCollapse>
                                    <UncontrolledCollapse
                                        toggler="#toggler"
                                        defaultOpen
                                    >
                                        <NavLink
                                            href={route(
                                                "belanja-kebutuhan.index"
                                            )}
                                            tag={Link}
                                            className={
                                                route().current() ===
                                                "belanja-kebutuhan.index"
                                                    ? "bg-teal text-default"
                                                    : "text-muted"
                                            }
                                        >
                                            <i className="fa-solid fa-cart-shopping text-primary"></i>
                                            Belanja Kebutuhan
                                        </NavLink>
                                        <NavLink
                                            href={route("inventory.index"
                                            )}
                                            tag={Link}
                                            className={
                                                route().current() ===
                                                "inventory.index"
                                                    ? "bg-teal text-default"
                                                    : "text-muted"
                                            }
                                        >
                                            <i className="fa-solid fa-dolly text-primary"></i>
                                            Gudang
                                        </NavLink>
                                    </UncontrolledCollapse>
                                </NavItem> */}

                                <NavItem>
                                    <NavLink
                                        href={route("customers.index")}
                                        tag={Link}
                                        className={
                                            route().current() === "customers.index"
                                                ? "bg-teal text-default"
                                                : "text-muted"
                                        }
                                    >
                                        <i class="fa-solid fa-user-group text-primary"></i>
                                        {/* <i className="ni ni-tv-2 text-primary"></i> */}
                                        Customer
                                    </NavLink>
                                    <hr className="my-3" />
                                </NavItem>


                            </>
                        )}

                        {auth.user.role !== "pegawai" && (
                            <>
                                <NavItem>
                                    <NavLink
                                        href={route(
                                            "belanja-kebutuhan.index"
                                        )}
                                        tag={Link}
                                        className={
                                            route().current() ===
                                            "belanja-kebutuhan.index"
                                                ? "bg-teal text-default"
                                                : "text-muted"
                                        }
                                    >
                                        <i className="fa-solid fa-cart-shopping text-primary"></i>
                                        Belanja Kebutuhan
                                    </NavLink>

                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        href={route(
                                            "outlet.index"
                                        )}
                                        tag={Link}
                                        className={
                                            route().current() ===
                                            "outlet.index"
                                                ? "bg-teal text-default"
                                                : "text-muted"
                                        }
                                    >
                                        <i className="fas fa-store text-primary"></i>
                                        Outlet
                                    </NavLink>

                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        href={route(
                                            "voucher.index"
                                        )}
                                        tag={Link}
                                        className={
                                            route().current() ===
                                            "voucher.index"
                                                ? "bg-teal text-default"
                                                : "text-muted"
                                        }
                                    >
                                        {/* <i class="fas fa-percent"></i> */}
                                        {/* <i className=""> */}
                                        <i className="d-flex align-items-center">

                                            <BiSolidDiscount size={20}  className="text-primary"
                                            // style={{lineHeight:'1.5rem', minWidth:"2.25rem"}}
                                            />
                                        </i>
                                        {/* </i> */}
                                        Voucher
                                    </NavLink>

                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        href={route(
                                            "jabatan.index"
                                        )}
                                        tag={Link}
                                        className={
                                            route().current() ===
                                            "jabatan.index"
                                                ? "bg-teal text-default"
                                                : "text-muted"
                                        }
                                    >
                                        <i className="fab fa-black-tie text-primary"></i>
                                        Jabatan
                                    </NavLink>

                                </NavItem>
                            </>
                        )}



                        <h6 className="navbar-heading text-muted">Laundry</h6>
                        {auth.user.role!="pegawai" && (
                            <>
                                <NavItem>
                                        <NavLink
                                            href={route("jenis-cuci.index")}
                                            tag={Link}
                                            active={route().current("jenis-cuci.*")}
                                            className={
                                                route().current("jenis-cuci.*")
                                                    ? "bg-teal text-default"
                                                    : ""
                                            }
                                        >
                                            <i class="fa-solid fa-suitcase text-primary "></i>
                                            {/* <i className="ni ni-tv-2 text-primary"></i> */}
                                            Paket Laundry
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            href={route("category-paket.index")}
                                            tag={Link}
                                            active={route().current("category-paket.*")}
                                            className={
                                                route().current("category-paket.*")
                                                    ? "bg-teal text-default"
                                                    : ""
                                            }
                                        >
                                            <i class="fa-solid fa-list text-primary"></i>
                                            {/* <i className="ni ni-tv-2 text-primary"></i> */}
                                            Category Paket
                                        </NavLink>
                                </NavItem>

                            </>
                        )}


                        <NavItem>
                            <NavLink
                                href={route("pesanan.all")}
                                tag={Link}
                                active={
                                    route().current() === "pesanan.all" && true
                                }
                                className={
                                    route().current() === "pesanan.all"
                                        ? "bg-teal text-default"
                                        : ""
                                }
                            >
                                <i class="fa-solid fa-clock-rotate-left text-primary"></i>
                                {/* <i class="fa-solid fa-bag-shopping text-primary"></i> */}
                                Riwayat Pesanan
                            </NavLink>
                        </NavItem>
                        {/* <NavItem>
                            <NavLink
                                href={route("pesanan.index")}
                                tag={Link}
                                active={
                                    route().current() === "pesanan.index" &&
                                    true
                                }
                                className={
                                    route().current() === "pesanan.index"
                                        ? "bg-teal text-default"
                                        : ""
                                }
                            >
                                <i class="fa-solid fa-bag-shopping text-primary"></i>
                                Daftar Pesanan
                            </NavLink>
                        </NavItem> */}
                    </Nav>
                    {/* Devider */}
                    <hr className="my-3" />
                    {/* <Nav className="mb-md-3" navbar>
                    <NavItem>
                            <NavLink
                                href={route('blog.index')}
                                tag={Link}
                                active={route().current('blog.*')}
                                className={route().current('blog.*')?
                                    'bg-teal text-default' :''
                                }
                            >
                                <i className="fa-brands fa-blogger text-default"></i>
                                Blog
                            </NavLink>
                        </NavItem>
                    </Nav> */}


                    {/* Heading */}
                    {/* Accounting */}
                    <h6 className="navbar-heading text-muted">Accounting</h6>
                    <Nav className="mb-md-3" navbar>
                        {auth.user.role == "admin" || auth.user.role == "owner" && (
                            <>

                                <NavItem>
                                    <NavLink
                                        href={route("account.index")}
                                        tag={Link}
                                        active={route().current("account.*")}
                                        className={
                                            route().current("account.*")
                                            ? "bg-teal text-default"
                                            : ""
                                        }
                                        >
                                        <i class="fas fa-book-open text-primary"></i>
                                        Account
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        href={route("asset.index")}
                                        tag={Link}
                                        active={route().current("asset.*")}
                                        className={
                                            route().current("asset.*")
                                            ? "bg-teal text-default"
                                            : ""
                                        }
                                        >
                                        <i class="fa-solid fa-building-columns text-primary"></i>

                                        Assets
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        href={route("supplier.index")}
                                        tag={Link}
                                        active={route().current("supplier.*")}
                                        className={
                                            route().current("supplier.*")
                                            ? "bg-teal text-default"
                                            : ""
                                        }
                                        >
                                        <i class="fas fa-truck text-primary"></i>

                                        Supplier
                                    </NavLink>
                                </NavItem>

                            </>
                        )}
                    </Nav>
                    <h6 className="navbar-heading text-muted">Lainnya</h6>


                    <Nav className="mb-md-3" navbar>
                        {auth.user.role == "admin" && (
                            <>

                                <NavItem>
                                    <NavLink
                                        href={route("kontrakan.index")}
                                        tag={Link}
                                        active={route().current("kontrakan.*")}
                                        className={
                                            route().current("kontrakan.*")
                                            ? "bg-teal text-default"
                                            : ""
                                        }
                                        >
                                        <i class="fa-solid fa-shop text-primary"></i>
                                        Kontrakan
                                    </NavLink>
                                </NavItem>

                            </>
                        )}
                        <NavItem>
                            <NavLink
                                href={route('blog.index')}
                                tag={Link}
                                active={route().current('blog.*')}
                                className={route().current('blog.*')?
                                    'bg-teal text-default' :''
                                }
                            >
                                <i className="fa-brands fa-blogger"></i>
                                Blog
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
};

Sidebar.propTypes = {
    logo: PropTypes.shape({
        innerLink: PropTypes.string,
        outterLink: PropTypes.string,
        imgSrc: PropTypes.string.isRequired,
        imgAlt: PropTypes.string.isRequired,
    }),
    collapseOpen: PropTypes.bool,
    toggleCollapse: PropTypes.func,
};

export default Sidebar;
