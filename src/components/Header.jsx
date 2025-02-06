import { CgSpinner } from "react-icons/cg"; 
import React from 'react'
import logo from "../assets/logo.png"
import { Link } from "react-router";
import SearchInput from "./page-comp/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { openModalAlert } from "../store/actionSlice/actionSlice";
import { motion } from "motion/react";
import ProfileButton from "./page-comp/ProfileButton";

const Header = () => {
    const dispatch = useDispatch()
    const { userProfile, loading } = useSelector(state => state.users)

    return (
        <motion.div
            className="border-[1px] border-zinc-800 bg-neutral-800 text-white rounded-lg max-h-[60px] min-h-[60px] flex justify-between items-center gap-1 p-[15px] shadow-sm">
            <Link to={"/"}>
                <img className='h-[30px] sm:h-[35px] object-contain active:scale-95 duration-100' src={logo} alt="logo" />
            </Link>
            <div className="flex justify-end items-center gap-[15px]">
                <div className="hidden sm:block">
                    <SearchInput />
                </div>
                <div>
                    {userProfile ?
                        <ProfileButton userData={userProfile}/>
                        :
                        <button disabled={loading} onClick={() => dispatch(openModalAlert("login"))} className="btn btn-primary flex justify-center items-center">
                            {loading? <span className="animate-spin text-[22px] flex justify-center items-center py-[1px]"><CgSpinner /></span> : <span className="px-[10px]">Login</span>}
                        </button>
                    }

                </div>
            </div>
        </motion.div>
    )
}

export default Header
