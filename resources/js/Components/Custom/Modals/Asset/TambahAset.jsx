import { useForm } from '@inertiajs/react'
import React from 'react'

const TambahAset = ({isModalOpen, selectedData, toggleModal, }) => {
    const {data, setData, patch, processing, post, errors, reset} = useForm({
        id: selectedData?.id || '',
        id_outlet: selectedData?.id_outlet || '',
        asset_name: selectedData?.asset_name || '',
        purchase_date: selectedData?.purchase_date || '',
        purchase_price: selectedData?.purchase_price != null ? parseFloat(selectedData.purchase_price).toFixed(2) : '',
        depreciation_method: selectedData?.depreciation_method || '',
        usefull_live_years: selectedData?.usefull_live_years != null ? parseInt(selectedData.usefull_live_years) : '',
        savage_value: selectedData?.savage_value != null ? parseFloat(selectedData.savage_value).toFixed(2) : '',
        accumulated_depreciation: selectedData?.accumulated_depreciation != null ? parseFloat(selectedData?.accumulated_depreciation).toFixed(2) : '',
        current_book_value: selectedData?.current_book_value != null ? parseFloat(selectedData?.current_book_value).toFixed(2) : '',
        description: selectedData?.description || '',
    })

    const submit = (e) => {
        e.preventDefault()

        const purchase_price = parseFloat(data.purchase_price.replace(/\./g, '').replace(',', '.')) || 0
        const savage_value = parseFloat(data.savage_value.replace(/\./g, '').replace(',', '.')) || 0
        const accumulated_depreciation = parseFloat(data.accumulated_depreciation.replace(/\./g, '').replace(',', '.')) || 0
        const current_book_value = parseFloat(data.current_book_value.replace(/\./g, '').replace(',', '.')) || 0

        setData({
            ...data,
            purchase_price: purchase_price,
            savage_value: savage_value,
            accumulated_depreciation: accumulated_depreciation,
            current_book_value: current_book_value,
        })

        const onSuccess = () => {
            toggleModal()
            reset()
        }

        const onError = (errors) => {
            console.log(errors)
        }

        if(selectedData){
            patch(route('asset.update', data.id), {onSuccess, onError})
        }else{
            post(route('asset.store'), {onSuccess, onError})
        }

    }


    return (
        <div>AssetModal</div>
    )
}

export default TambahAset
