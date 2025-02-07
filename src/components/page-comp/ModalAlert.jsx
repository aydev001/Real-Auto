import React from 'react'
import { CgClose } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { closeModalAlert } from '../../store/actionSlice/actionSlice'
import { motion } from 'motion/react'
import Login from '../modal-cont/Login'
import CreateCategory from '../modal-cont/category-modal/CreateCategory'

const ModalAlert = () => {
    const { modalContent, isModalAlert } = useSelector(state => state.actions)
    const dispatch = useDispatch()
    return (
        <div className={`${isModalAlert ? "flex" : "hidden"} overlay fixed z-20 top-0 bg-black bg-opacity-50 backdrop-blur-[2px] py-[20px] left-0 right-0 bottom-0  justify-center overflow-y-auto`}>
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                whileInView={{ opacity: [0, 1], y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
                className='w-[450px] z-30 bg-neutral-800 border-neutral-700 text-white h-max p-[15px] mx-[10px] my-auto rounded-md shadow-md border-[1px]'>
                <div className='flex justify-between items-center'>
                    <div className='text-[16px] font-semibold'>
                        {
                            modalContent === "login" && "Login"
                        }
                        {
                            modalContent === "create-category" && "Create category"
                        }
                    </div>
                    <button onClick={() => dispatch(closeModalAlert())} className=" hover:bg-neutral-700 active:scale-95 bg-neutral-800 text-gray-100 w-[25px] h-[25px] text-[18px] rounded-sm flex justify-center items-center">
                        <CgClose />
                    </button>
                </div>
                <hr className='my-[5px]' />
                <div>
                    {
                        modalContent === "login" && <Login />
                    }
                    {
                        modalContent === "create-category" && <CreateCategory/>
                    }
                </div>
            </motion.div>
        </div>
    )
}

export default ModalAlert
