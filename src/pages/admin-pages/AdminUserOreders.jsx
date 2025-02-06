import { AiOutlineClear } from "react-icons/ai";
import { RiHistoryFill } from "react-icons/ri";
import { MdHistory } from "react-icons/md";
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import { Link, useParams } from "react-router";
import { IoMdArrowBack } from "react-icons/io";
import { BsCheck2All } from "react-icons/bs";


const AdminUserOrders = () => {
    const { users, allOrders } = useSelector(state => state.users)
    const { id } = useParams()
    const selectUser = users.find(item => item._id == id)
    const orders = allOrders.filter(item => item.userId === id)

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: [0, 1], y: [10, -5, 0] }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
                className='flex justify-between items-center gap-[2px] flex-col border-b-[1px] p-[7px]'>
                {
                    selectUser?.isActive ?
                        <div className='flex-1 text-[14px] border-[1px] rounded-sm py-[5px] flex-col w-full px-[10px] bg-green-100 border-green-200 font-medium flex justify-center items-center'>
                            <div className="flex justify-center items-center gap-1">
                                <div>Account: </div>
                                <div className="text-green-600 font-semibold flex justify-start items-center gap-1">
                                    <span>Verified</span>
                                    <span className="text-[18px]"><BsCheck2All /></span>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='flex-1 text-[14px] border-[1px] rounded-sm py-[5px] flex-col w-full px-[10px] bg-red-100 border-red-200 font-medium flex justify-center items-center'>
                            <div className="flex justify-center items-center gap-1">
                                <div>Account: </div>
                                <div className="text-red-500 font-semibold">
                                    Not verified !
                                </div>
                            </div>
                        </div>

                }
                <div className='flex-1 text-[14px] font-medium flex justify-start items-center gap-1'>
                    <span>User name: </span>
                    <span className='font-semibold'>{selectUser?.userName}</span>
                </div>
                <div className='flex-1 text-[14px] font-medium flex justify-start items-center gap-1'>
                    <span>Email: </span>
                    <span className='font-semibold'>{selectUser?.email}</span>
                </div>
            </motion.div>
            {orders?.length > 0 ?
                (<motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: [0, 1], y: [10, -5, 0] }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 0.6, ease: "easeInOut", delay: 0.3 }}
                    className="px-[7px] pb-[7px]">
                    <div className="flex justify-between items-center my-[5px] flex-row-reverse">
                        <h1 className="font-semibold flex justify-start items-center gap-1">
                            <span className="flex justify-center items-center text-[18px]"><MdHistory /></span>
                            <span>Order history</span>
                        </h1>
                        <Link to={-1}>
                            <button className="px-[10px] py-[4px] font-medium text-[14px] bg-slate-100 rounded-sm text-slate-700 active:scale-95 hover:bg-slate-200 flex justify-center items-center gap-1">
                                <div>
                                    <IoMdArrowBack />
                                </div>
                                <div>
                                    Back
                                </div>
                            </button>
                        </Link>
                    </div>
                    <div className="flex flex-col-reverse gap-[5px]">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-slate-50 border-[1px] shadow-sm rounded-sm p-[10px] group">
                                <div className="mb-1 flex justify-between items-center">
                                    <p className="text-[14px] font-medium text-gray-600">
                                        Created at: <span className="text-gray-800 font-semibold">{new Date(order.createdAt).toLocaleString("uz-UZ", { hour12: false })}</span><span className="bg-green-500 text-white font-semibold text-[12px] rounded-sm px-[5px] py-[2px] ml-[5px] hidden group-last:inline">new</span>
                                    </p>
                                    <p className="text-[14px] bg-orange-400 px-[5px] rounded-sm font-semibold text-white">
                                        $ {Number(order.products.map(item => item.price * item.quantity).reduce((acc, cur) => acc + cur, 0)).toLocaleString()}
                                    </p>
                                </div>
                                <hr className="mb-[5px]" />
                                <div className="space-y-2">
                                    {order.products.map((product) => (
                                        <div
                                            key={product._id}
                                            className="flex items-center justify-between border-b pb-2 last:pb-0 last:border-none"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <div className="w-[60px] h-[60px] border-[1px] rounded-sm bg-white flex items-center justify-center text-sm text-gray-500">
                                                    <img src={product.image} alt={product.title} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-[14px]">{product.name}</p>
                                                    <p className="font-medium text-[12px] text-gray-600">
                                                        <span>Price: </span><span className="text-gray-800 font-semibold">$ {Number(product.price).toLocaleString()}</span>
                                                    </p>
                                                    <p className="text-[12px] font-medium text-gray-600">
                                                        Quantity: <span className="text-gray-800 font-semibold">{product.quantity}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex justify-end flex-col items-center">
                                                <div className="text-[14px] font-medium min-w-max">
                                                    Total price
                                                </div>
                                                <p className="font-semibold text-[14px] text-gray-800">
                                                    $ {Number(product.price * product.quantity).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>)
                :
                (<motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: [0, 1], y: [30, -10, 0] }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
                    className="flex justify-center items-center flex-col text-gray-500 min-h-[calc(100vh-200px)]">
                    <div className="text-[30px]">
                        <RiHistoryFill />
                    </div>
                    <div className="text-[14px] font-medium">
                        User order history is empty
                    </div>
                    <Link to={-1}>
                        <button className="px-[10px] py-[5px] font-medium mt-[10px] text-[14px] bg-slate-100 rounded-sm text-slate-700 active:scale-95 hover:bg-slate-200 flex justify-center items-center gap-1">
                            <div>
                                <IoMdArrowBack />
                            </div>
                            <div>
                                Back
                            </div>
                        </button>
                    </Link>
                </motion.div>)}
        </>
    )
}

export default AdminUserOrders
