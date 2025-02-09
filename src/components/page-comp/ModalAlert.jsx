import React from 'react'
import { CgClose } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { closeModalAlert } from '../../store/actionSlice/actionSlice'
import { motion } from 'motion/react'
import Login from '../modal-cont/Login'
import CreateCategory from '../modal-cont/category-modal/CreateCategory'
import UpdateCategory from '../modal-cont/category-modal/UpdateCategory'
import DeleteCategory from '../modal-cont/category-modal/DeleteCategory'
import CreateBrand from '../modal-cont/brand-modal/CreateBrand'
import UpdateBrand from '../modal-cont/brand-modal/UpdateBrand'
import DeleteBrand from '../modal-cont/brand-modal/DeleteBrand'
import CreateModel from '../modal-cont/model-modal/CreateModel'
import UpdateModel from '../modal-cont/model-modal/UpdateModel'
import DeleteModel from '../modal-cont/model-modal/DeleteModel'
import CreateCity from '../modal-cont/city-modal/CreateCity'
import UpdateCity from '../modal-cont/city-modal/UpdateCity'
import DeleteCity from '../modal-cont/city-modal/DeleteCity'
import CreateLocation from '../modal-cont/locationModal/CreateLocation'
import UpdateLocation from '../modal-cont/locationModal/UpdateLocation'
import DeleteLocation from '../modal-cont/locationModal/DeleteLocation'
import CreateCar from '../modal-cont/car-modal/CreateCar'
import UpdateCar from '../modal-cont/car-modal/UpdateCar'
import DeleteCar from '../modal-cont/car-modal/DeleteCar'

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
                className={`${modalContent === "create-car" || modalContent === "update-car"? "w-[90%] lg:w-[70%]" : "w-[450px] mx-[5%]"} z-30 bg-neutral-800 border-neutral-700 text-white h-max p-[15px] my-auto rounded-md shadow-md border-[1px]`}>
                <div className='flex justify-between items-center'>
                    <div className='text-[16px] font-semibold'>
                        {
                            modalContent === "create-category" && "Create category"
                        }
                        {
                            modalContent === "update-category" && "Update category"
                        }
                        {
                            modalContent === "delete-category" && "Delete category"
                        }

                        {
                            modalContent === "create-brand" && "Create brand"
                        }
                        {
                            modalContent === "update-brand" && "Update brand"
                        }
                        {
                            modalContent === "delete-brand" && "Delete brand"
                        }

                        {
                            modalContent === "create-model" && "Create model"
                        }
                        {
                            modalContent === "update-model" && "Update model"
                        }
                        {
                            modalContent === "delete-model" && "Delete model"
                        }

                        {
                            modalContent === "create-city" && "Create city"
                        }
                        {
                            modalContent === "update-city" && "Update city"
                        }
                        {
                            modalContent === "delete-city" && "Delete city"
                        }

                        {
                            modalContent === "create-location" && "Create location"
                        }
                        {
                            modalContent === "update-location" && "Update location"
                        }
                        {
                            modalContent === "delete-location" && "Delete location"
                        }

                        {
                            modalContent === "create-car" && "Create car"
                        }
                        {
                            modalContent === "update-car" && "Update car"
                        }
                        {
                            modalContent === "delete-car" && "Delete car"
                        }
                    </div>
                    <button onClick={() => dispatch(closeModalAlert())} className=" hover:bg-neutral-700 active:scale-95 bg-neutral-800 text-gray-100 w-[25px] h-[25px] text-[18px] rounded-sm flex justify-center items-center">
                        <CgClose />
                    </button>
                </div>
                <hr className='my-[5px]' />
                <div>
                    {
                        modalContent === "create-category" && <CreateCategory />
                    }
                    {
                        modalContent === "update-category" && <UpdateCategory />
                    }
                    {
                        modalContent === "delete-category" && <DeleteCategory />
                    }

                    {
                        modalContent === "create-brand" && <CreateBrand />
                    }
                    {
                        modalContent === "update-brand" && <UpdateBrand />
                    }
                    {
                        modalContent === "delete-brand" && <DeleteBrand />
                    }

                    {
                        modalContent === "create-model" && <CreateModel />
                    }
                    {
                        modalContent === "update-model" && <UpdateModel />
                    }
                    {
                        modalContent === "delete-model" && <DeleteModel />
                    }

                    {
                        modalContent === "create-city" && <CreateCity />
                    }
                    {
                        modalContent === "update-city" && <UpdateCity />
                    }
                    {
                        modalContent === "delete-city" && <DeleteCity />
                    }

                    {
                        modalContent === "create-location" && <CreateLocation />
                    }
                    {
                        modalContent === "update-location" && <UpdateLocation />
                    }
                    {
                        modalContent === "delete-location" && <DeleteLocation />
                    }

                    {
                        modalContent === "create-car" && <CreateCar/>
                    }
                    {
                        modalContent === "update-car" && <UpdateCar/>
                    }
                    {
                        modalContent === "delete-car" && <DeleteCar/>
                    }
                </div>
            </motion.div>
        </div>
    )
}

export default ModalAlert
