import React from 'react'
import { Badge } from 'reactstrap'

const AssetStatusBadge = ({status}) => {
    const statusConfig = {
        Aktif: {
            color: 'success',
            icon: 'fa-solid fa-circle-check',
            label: 'Aktif'
        },
        Dijual: {
            color: 'primary',
            icon: 'fa-solid fa-bag',
            label: 'Dijual'
        },
        Rusak: {
            color: 'warning',
            icon: 'fa-solid fa-triangle-exclamation',
            label: 'Rusak'
        },
        Dibuang: {
            color: 'danger',
            icon: 'fa-solid fa-trash-can',
            label: 'Dibuang'
        }
    }

    const config = statusConfig[status] || {
        color: 'secondary',
        icon: 'fa-solid fa-question',
        label: status || 'Tidak Diketahui'
    }


    return (
        <Badge
            color={config.color}
            className='d-inline-flex align-items-center gap-1 px-3 py-2 fs-6 rounded-pill text-white'
            style={{fontSize: '0.95rem', fontWeight: '500'}}
        >
            <i className={`${config.icon} mr-2`} style={{fontSize: '1rem'}}></i>
            {config.label}

        </Badge>
    )
}

export default AssetStatusBadge
