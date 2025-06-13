import React from 'react'

const AddComma = ({value, tag}) => {
    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");


    return (
        <>
                {`Rp ${addCommas(removeNonNumeric(value != null ? value : 0))}`}
        </>
    )
}

export default AddComma
