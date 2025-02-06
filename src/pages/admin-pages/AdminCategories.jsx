import React from 'react'
import { useSelector } from 'react-redux'
import AdminCategoryCard from "../../components/admin-comp/AdminCategoryCard";

const AdminCategories = () => {
  const { categories } = useSelector(state => state.categories)
  return (
    <div className='text-gray-700 p-[7px]'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-[5px]'>
        {categories.map(item => (
          <AdminCategoryCard key={item.id} item={item}/>
        ))}
      </div>
    </div>
  )
}

export default AdminCategories
