import { AdminFooter } from "@/Components/Argon/Footers/AdminFooter";
import AuthFooter from "@/Components/Argon/Footers/AuthFooter";
import AdminNavbar from "@/Components/Argon/Navbars/AdminNavbar";
import AuthNavbar from "@/Components/Argon/Navbars/AuthNavbar";
import SidebarPesanan from "@/Components/Argon/Sidebars/SidebarPesanan";
import React, { useRef } from "react";
import { Container, Row } from "reactstrap";

const PesananLayout = ({ auth, header, children }) => {
    const mainContent = useRef();

    return (
        <>
            <div className="main-content bg-gradient-info" ref={mainContent}>
                <AuthNavbar />
                <div className="header bg-gradient-info py-7 py-lg"></div>
                <div className="mt--7 mx-5 pb--5">
                    {/* <Row className="justify-content-center"> */}
                    {children}

                    {/* </Row> */}
                </div>
                <AuthFooter />
            </div>
            {/* <SidebarPesanan

        />
         <div className='main-content'>
            <AdminNavbar
                header={header}
                user={user}
                />
                {children}

            <AdminFooter/>
        </div> */}
        </>
    );
};

export default PesananLayout;
