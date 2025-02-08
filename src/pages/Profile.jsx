import { FaUserCircle } from "react-icons/fa";
import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";

const Profile = () => {
    const { userProfile } = useSelector(state => state.users)
    console.log(userProfile)
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: [0, 1], y: [10, -5, 0] }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
            className="p-[7px] overflow-x-auto">
            <div className="flex justify-between items-center gap-1">
                <div className="flex justify-start items-center gap-1 ml-[5px]">
                    <div>
                        <FaUserCircle />
                    </div>
                    <h4 className="font-medium">Profile</h4>
                </div>
            </div>
            <hr className="mt-[4px] mb-[7px]" />
            <table className="table-data">
                <thead>
                    <tr>
                        <th className="text-center w-[40px]">#</th>
                        <th className="text-center">
                            First Name
                        </th>
                        <th className="text-center">
                            Last Name
                        </th>
                        <th className="text-center">
                            Phone number
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center  w-[40px]">1</td>
                        <td className="text-center">
                            {userProfile?.first_name}
                        </td>
                        <td className="text-center">
                            {userProfile?.last_name}
                        </td>
                        <td className="text-center">
                            {userProfile?.phone_number}
                        </td>
                    </tr>
                </tbody>
            </table>
        </motion.div>
    )
}

export default Profile
