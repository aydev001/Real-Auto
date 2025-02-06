import { BiSearch } from "react-icons/bi"; 
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setSelectCategory } from "../../store/actionSlice/actionSlice";

const SearchInput = () => {

    return (
        <div className='relative border-[2px] rounded-full overflow-hidden border-zinc-600'>
            <input
                type="text"
                placeholder='Search'
                className='px-[18px] py-[5px] pr-[40px] font-medium bg-zinc-700 outline-none text-[14px]'
            />
            <div className="absolute top-[2px] right-[2px] bottom-[2px] rounded-full hover:bg-zinc-800 active:scale-95 cursor-pointer w-[30px] flex justify-center items-center">
                <BiSearch />
            </div>
        </div>
    );
}

export default SearchInput;
