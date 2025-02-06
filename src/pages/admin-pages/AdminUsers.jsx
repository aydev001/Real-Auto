import { CgCloseR } from "react-icons/cg";
import { MdClose } from "react-icons/md";
import { ImCheckboxUnchecked } from "react-icons/im";
import { FaCheckSquare } from "react-icons/fa";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { RiCloseFill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FaExchangeAlt } from "react-icons/fa"; // Arrow icon
import { motion } from "motion/react";


const AdminUsers = () => {

  const { users } = useSelector((state) => state.users);


  // Adminlarni birinchi joylashtiramiz
  const sortedUsers = [...users].sort((a, b) => b.isAdmin - a.isAdmin);
  const navigate = useNavigate();

  // Mobil ekranda Username yoki Email ni almashtirish uchun state
  const [showEmail, setShowEmail] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: [0, 1], y: [10, -5, 0] }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
      className="p-[7px] overflow-x-auto">
      <table className="w-full rounded-sm overflow-hidden text-[12px] md:text-[14px]">
        <thead className="border-[1px] border-blue-200">
          <tr className="bg-blue-100 text-gray-700">
            <th className="py-1 px-2 text-center border-r border-gray-300 w-[40px]">#</th>
            <th className="py-1 px-2 text-left border-r border-gray-300 hidden sm:table-cell">
              Username
            </th>
            <th className="py-1 px-2 text-left border-r border-gray-300 hidden sm:table-cell">
              Email
            </th>
            {/* Mobil versiya: Username / Email o'zgarishi */}
            <th className="py-1 px-2 text-left border-r border-gray-300 sm:hidden">
              <button
                onClick={() => setShowEmail(!showEmail)}
                className="flex items-center gap-2"
              >
                {showEmail ? "Email" : "Username"} <FaExchangeAlt />
              </button>
            </th>
            <th className="py-1 px-2 text-center border-r border-gray-300">Active</th>
            <th className="py-1 px-2 text-center">Admin</th>
          </tr>
        </thead>
        <tbody className="border-[1px] border-blue-200">
          {sortedUsers.map((user, index) => (
            <tr
              key={user.email}
              onClick={() => user._id && navigate(`/admin/users/${user._id}`)}
              className="border-t border-gray-300 hover:bg-gray-50 cursor-pointer"
            >
              <td className="py-1 font-medium text-center px-2 border-r border-gray-300 w-[40px]">{index + 1}</td>
              {/* Desktop versiya */}
              <td className="py-1 font-medium px-2 border-r border-gray-300 hidden sm:table-cell">
                {user.userName}
              </td>
              <td className="py-1 font-medium px-2 border-r border-gray-300 hidden sm:table-cell">
                {user.email}
              </td>
              {/* Mobil versiya */}
              <td className="py-1 font-medium px-2 border-r border-gray-300 sm:hidden">
                {showEmail ? user.email : user.userName}
              </td>
              <td className="py-1 font-medium px-2 text-center border-r border-gray-300">
                {user.isActive ?
                  <div className="text-green-500 flex justify-center items-center text-[16px]">
                    <FaCheckSquare />
                  </div>
                  :
                  <div className="text-red-500 flex justify-center items-center text-[16px]">
                    <CgCloseR />
                  </div>}
              </td>
              <td className="py-1 font-medium px-2 text-center">
                {user.isAdmin ?
                  <div className="text-green-500 flex justify-center items-center text-[16px]">
                    <FaCheckSquare />
                  </div>
                  :
                  <div className="text-red-500 flex justify-center items-center text-[16px]">
                    <CgCloseR />
                  </div>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default AdminUsers;
