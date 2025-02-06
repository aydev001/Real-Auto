import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { BsPersonSquare } from "react-icons/bs";
import { CgLogIn } from "react-icons/cg";
import { BsPersonCircle } from "react-icons/bs";
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from "motion/react";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../store/userSlice/userSlice";
import { succsessToast } from "../../services/toastService";
import { useNavigate } from "react-router";

const ProfileButton = ({ userData }) => {
    const [isActive, setIsActive] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleClickOutside = (event) => {
        if (!event.target.closest(".menu")) {
            setIsActive(false); // Menyu tashqarisiga bosilganda yopish
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const logoutProfile = useCallback(() => {
        localStorage.removeItem("authToken");
        dispatch(fetchUserProfile());
        setIsActive(false);
        succsessToast("You have successfully logged out.");
    }, [dispatch]);

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    }
    return (
        <div className="relative menu">
            <button onClick={() => setIsActive(prev => !prev)} className="btn btn-primary flex justify-center items-center gap-1">
                <span className="text-[16px]">
                    <FaUserCircle />
                </span>
                <span>
                    {userData.isAdmin ? "Admin" : "Profile"}
                </span>
            </button>
            {
                isActive &&
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: [0, 1], scale: 1 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 0.2, ease: "easeInOut", delay: 0.1 }}
                    className="absolute menu flex flex-col gap-1 bg-white p-[7px] text-gray-600 rounded-sm border-[1px] top-[40px] shadow-md z-[5] min-w-[150px] right-[-12px]">
                    <button onClick={() => {
                        setIsActive(false)
                        navigate("/profile")
                    }} className="text-[14px] font-medium flex p-[5px] rounded-sm hover:bg-slate-100 justify-start items-center gap-1 active:scale-95">
                        <span>
                            <BsPersonCircle />
                        </span>
                        <span className="min-w-max">
                            {truncateText(userData.userName, 12)}
                        </span>
                    </button>
                    {
                        userData.isAdmin &&
                        <div>
                            <hr className="mb-[3px]" />
                            <button onClick={() => {
                                setIsActive(false)
                                navigate("/admin")
                            }} className="flex justify-start hover:bg-slate-100 p-[5px] rounded-sm items-center gap-1 text-blue-600 w-full hover:text-blue-700 active:scale-95">
                                <MdOutlineAdminPanelSettings />
                                <span className="text-[14px] font-medium">
                                    Dashboard
                                </span>
                            </button>
                        </div>
                    }
                    <hr />
                    <button onClick={() => logoutProfile()} className="flex justify-start hover:bg-slate-100 p-[5px] rounded-sm items-center gap-1 text-red-500 w-full hover:text-red-600 active:scale-95">
                        <CgLogIn />
                        <span className="text-[14px] font-medium">
                            Logout
                        </span>
                    </button>
                </motion.div>
            }
        </div>
    )
}

export default ProfileButton
