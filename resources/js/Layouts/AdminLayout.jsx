import { AdminFooter } from '@/Components/Argon/Footers/AdminFooter';
import Header from '@/Components/Argon/Headers/Header'
import AdminNavbar from '@/Components/Argon/Navbars/AdminNavbar';
import Sidebar from '@/Components/Argon/Sidebars/Sidebar'
import { Head } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react'

export default function AdminLayout({user, header, children}) {
    const mainContent = useRef(null);
    const [collapseOpen, setCollapseOpen] = useState();

    const toggleCollapse = () => {
        setCollapseOpen(!collapseOpen);
    }


  return (
    <>
        <Head >
            <title>{header}</title>
            <link rel='icon' type='image/svg+xml' href='/assets/img/brand/logoku.svg'/>
        </Head>
        <Sidebar
            toggleCollapse={toggleCollapse}
            collapseOpen={collapseOpen}

            logo={{
                innerLink: route('dashboard'),
                imgSrc: '/assets/img/brand/harmony-blue.png',
                imgAlt: '...'
            }}
        />

        <div className='main-content' ref={mainContent}>
            <AdminNavbar
                collapseOpen={collapseOpen}
                toggleCollapse={toggleCollapse}
                header={header}
                user={user}
                />
                {children}

            <AdminFooter/>
        </div>

    </>
  )
}
