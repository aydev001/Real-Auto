import { AiFillEdit } from "react-icons/ai"; 
import { FaTrash } from "react-icons/fa"; 
import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'motion/react'

const Brands = () => {
  const { brands } = useSelector(state => state.brands)
  console.log(brands)
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: [0, 1], y: [10, -5, 0] }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
      className="p-[7px] overflow-x-auto">
      <table className="w-full rounded-sm overflow-hidden text-[12px] md:text-[14px]">
        <thead className="border-[1px] border-zinc-600">
          <tr className="bg-zinc-700 text-neutral-300">
            <th className="py-1 px-2 text-center border-r border-zinc-500 w-[40px]">#</th>
            <th className="py-1 px-2 text-center border-r border-zinc-500">
              Title
            </th>
            <th className="py-1 px-2 text-center border-r border-zinc-500 w-[150px]">
              Image
            </th>
            <th className="py-1 px-2 text-center w-[150px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="border-[1px] border-zinc-600">
          {brands.map((brand, index) => (
            <tr
              key={brand.id}
              className="border-t border-zinc-600 duration-100 bg-zinc-800 hover:bg-gray-800 cursor-pointer"
            >
              <td className="py-2 font-medium text-center px-2 border-r border-zinc-600 w-[40px]">{index + 1}</td>
              <td className="py-2 font-medium px-2 border-r border-zinc-600 ">
                {brand?.title}
              </td>
              <td className="py-2 font-medium px-2 border-r border-zinc-600 text-center">
                <img className='w-full h-[50px] rounded-sm object-cover border-[1px] border-zinc-700' src={`https://realauto.limsa.uz/api/uploads/images/${brand?.image_src}`} alt={"brand-image"} />
              </td>
              <td className="py-2 font-medium px-2 text-center border-r border-zinc-600">
                <div className="w-full flex justify-between items-center gap-2">
                  <button className="py-[5px] px-[10px] border-[1px] border-blue-500 text-[14px] rounded-sm bg-opacity-0 hover:bg-opacity-10 duration-100 bg-blue-600 text-blue-500 active:scale-95 active:bg-opacity-0 hover:bg-blue-400 flex-1 flex justify-center items-center">
                    <AiFillEdit />
                  </button>
                  <button className="py-[5px] px-[10px] border-[1px] border-red-500 text-[14px] rounded-sm bg-opacity-0 hover:bg-opacity-10 duration-100 bg-red-600 text-red-500 active:scale-95 active:bg-opacity-0 hover:bg-red-400 flex-1 flex justify-center items-center">
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}

export default Brands
