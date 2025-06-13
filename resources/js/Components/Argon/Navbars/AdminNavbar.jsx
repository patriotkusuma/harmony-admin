import { Link, router, useForm, usePage } from '@inertiajs/react'
import React from 'react'
import { Button, Container, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, InputGroup, InputGroupText, Media, Nav, Navbar, NavbarToggler, UncontrolledDropdown } from 'reactstrap'

const AdminNavbar = ({user, header, toggleCollapse, collapseOpen}) => {
    const { get, post} = useForm();
    const {cabangs} = usePage().props

    const logout = (e) => {
        e.preventDefault();
        route(post('logout'));
    }

    const changeActiveCabang = (id) => {
        router.post('cabang-active',{
            'id' : id
        })
    }
  return (
    <>
        <Navbar className="navbar-top navbar-dark " expand="md" id="navbar-main">
            {/* <Button
                hidden={!collapseOpen}
                onClick={toggleCollapse}
            >
                <i class="fa-solid fa-bars"></i>
            </Button> */}
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {header}
          </Link>

          {user.role !== 'pegawai' &&(

          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto ">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                {/* <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon> */}
                <Input
                    placeholder="Search" type="select"
                    className='form-control form-control-alternative form-select'
                    defaultValue={ cabangs !== null && cabangs.active.id_outlet}
                    onChange={(e) => changeActiveCabang(e.target.value)}
                >
                    {'data' in cabangs && cabangs.data.map((cabang, index) => (
                        <option className='bg-default' value={cabang.id} selected={'active' in cabangs && cabangs.active.id_outlet === cabang.id ?true : false}>{cabang.nama}</option>
                    ))}
                </Input>
              </InputGroup>
            </FormGroup>
          </Form>
          ) }

          <Nav className="align-items-center d-none d-md-flex pt-0 mt--3" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src="/assets/img/theme/team-4-800x800.jpg"
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {user.name}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem href={route('profile.edit')} tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={logout}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
      </Navbar>
    </>
  )
}

export default AdminNavbar
