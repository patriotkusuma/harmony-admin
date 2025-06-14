import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';

const AccountTypeBadge = ({ type }) => {
    const types = {
        Assets: {
            color: 'success',
            icon: 'fa-solid fa-wallet',
            label: 'Assets',
        },
        Liability: {
            color: 'danger',
            icon: 'fa-solid fa-hand-holding-dollar',
            label: 'Liability',
        },
        Revenue: {
            color: 'primary',
            icon: 'fa-solid fa-chart-line',
            label: 'Revenue',
        },
        Expense: {
            color: 'warning',
            icon: 'fa-solid fa-money-bill-wave',
            label: 'Expense',
        },
        Equity: {
            color: 'info',
            icon: 'fa-solid fa-balance-scale',
            label: 'Equity',
        },
    };

    const config = types[type] || {
        color: 'secondary',
        icon: 'fa-solid fa-question',
        label: type || 'Unknown',
    };

    return (
        <Badge
            color={config.color}
            className="d-inline-flex align-items-center gap-1 px-3 py-2 fs-6 rounded-pill text-white"
            style={{ fontSize: '0.95rem', fontWeight: 500 }}
        >
            <i className={`${config.icon} mr-2`} style={{ fontSize: '1rem' }}></i>
            {config.label}
        </Badge>
    );
};

AccountTypeBadge.propTypes = {
    type: PropTypes.string,
};

export default AccountTypeBadge;
