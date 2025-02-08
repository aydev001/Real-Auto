import React, { useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../../api/axiosInstance'
import { closeModalAlert } from '../../../store/actionSlice/actionSlice'
import { errorToast, succsessToast } from '../../../services/toastService'
import { fetchCities } from '../../../store/citiySlice/citySlice'

const DeleteCity = () => {
    const { selectItemId } = useSelector(state => state.actions)
    const dispatch = useDispatch()
    const [pending, setPending] = useState()

    const handleDeleteCateg = async (id) => {
        try {
            setPending(true)
            const res = await axiosInstance.delete(`/cities/${id}`)
            setPending(false)
            dispatch(fetchCities())
            dispatch(closeModalAlert())
            succsessToast("City was successfully deleted")
        } catch (error) {
            setPending(false)
            dispatch(closeModalAlert())
            errorToast("City deleted error")
        }
    }
    return (
        <div>
            <p className='text-[14px] font-medium'>Are you sure you want to delete this city ?</p>
            <div className='flex justify-end gap-[5px] mt-[10px]'>
                <button onClick={() => {
                    dispatch(closeModalAlert())
                }} className="text-[12px] font-semibold flex justify-center  gap-1 items-center px-[10px] py-[4px] rounded-sm border-[1px] border-blue-500 bg-blue-500 hover:bg-blue-600 hover:shadow-sm duration-75 active:scale-95 text-white">
                    <div>
                        Cancel
                    </div>
                </button>
                <button disabled={pending} onClick={() => handleDeleteCateg(selectItemId)} className={`${pending ? "cursor-wait" : "cursor-pointer"} text-[12px] font-semibold flex justify-center  gap-1 items-center px-[10px] py-[4px] rounded-sm border-[1px] border-red-500 bg-red-500 hover:bg-red-600 hover:shadow-sm duration-75 active:scale-95 text-white`}>
                    <div className={`${pending ? "animate-spin" : "animate-none"} flex justify-center items-center text-[14px]`}>
                        {pending ? <CgSpinner /> : <FaTrash />}
                    </div>
                    <div>
                        Yes
                    </div>
                </button>
            </div>
        </div>
    )
}

export default DeleteCity