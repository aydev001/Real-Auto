import { FcDataConfiguration } from "react-icons/fc"; 
import { AiOutlineCodeSandbox } from "react-icons/ai"; 
import { SiDash } from "react-icons/si";
import React from 'react'
import { btnData } from "../services/const";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../store/actionSlice/actionSlice";
import { motion } from "motion/react";

const Sidebar = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handdleClick = (path) => {
        navigate(path)
        dispatch(toggleSidebar())
    }
    return (
        <motion.div
            initial={{ opacity: window.innerWidth>=768? 0 : 1, y: 10 }}
            whileInView={{ opacity: 1, y: window.innerWidth >=768? [10, -5, 0]  : [0]}}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
        >
            <div className="flex justify-center items-center font-bold text-gray-100 gap-1">
                <div>
                    Dashboard
                </div>
            </div>
            <hr className="my-[5px]" />
            <div className="flex flex-col gap-1">
                {btnData.map(item => (
                    <button onClick={() => handdleClick(item.path)} key={item.id} className={`${item.path === pathname ? "bg-zinc-900 border-orange-500 text-orange-500 hover:bg-zinc-900 border-opacity-25" : "bg-neutral-700 text-gray-300 hover:bg-zinc-800 hover:border-zinc-700 border-zinc-600"} duration-200 py-[5px] px-[15px] border-[1px]  active:scale-95 rounded-sm shadow-sm w-full flex justify-start font-semibold items-center gap-1 text-[14px]`}>
                        <div className="text-[16px] flex justify-center items-center">
                            {item.icon()}
                        </div>
                        <div>{item.title}</div>
                    </button>
                ))}
            </div>
        </motion.div>
    )
}

export default Sidebar
