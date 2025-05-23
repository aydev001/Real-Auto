import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'motion/react'
import { btnData } from "../services/const";
import { useLocation } from "react-router";
import { openModalAlert, setSelectItemId } from "../store/actionSlice/actionSlice";

const Models = () => {
  const { models } = useSelector(state => state.models)
  
  const { pathname } = useLocation()
  const selectBtnData = btnData.find(item => item.path === pathname)

  const dispatch = useDispatch()
  const handleUpdate = useCallback((id) => {
    dispatch(setSelectItemId(id))
    dispatch(openModalAlert("update-model"))
  }, [])

  const handleDelete = useCallback((id) => {
    dispatch(setSelectItemId(id))
    dispatch(openModalAlert("delete-model"))
  }, [])
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
            {selectBtnData.icon()}
          </div>
          <h4 className="font-medium">{selectBtnData.title}</h4>
        </div>
        <div>
          <button onClick={() => dispatch(openModalAlert("create-model"))} className="px-[10px] py-[4px] border-[1px] rounded-sm duration-100 bg-orange-600 border-orange-600 border-opacity-20 font-semibold text-[14px] hover:bg-orange-500 active:scale-95 active:bg-orange-600">
            + Add model
          </button>
        </div>
      </div>
      <hr className="mt-[4px] mb-[7px]" />
      <table className="table-data">
        <thead>
          <tr>
            <th className="text-center w-[40px]">#</th>
            <th className="text-center">
              Name
            </th>
            <th className="text-center">
              Brand
            </th>
            <th className="text-center w-[150px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {models.map((model, index) => (
            <tr
              key={model.id}
            >
              <td className="text-center w-[40px]">{index + 1}</td>
              <td>
                {model?.name}
              </td>
              <td className="text-center">
                {model?.brand_title}
              </td>
              <td className="text-center">
                <div className="w-full flex justify-between items-center gap-2">
                  <button onClick={() => handleUpdate(model?.id)} className="btn-update">
                    <AiFillEdit />
                  </button>
                  <button onClick={() => handleDelete(model?.id)} className="btn-delete">
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

export default Models
