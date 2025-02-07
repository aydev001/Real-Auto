import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'


const Content = ({ children }) => {
  const { selectCategoryId } = useSelector(state => state.actions)
  const scrollCont = useRef()
  const { pathname } = useLocation()
  useEffect(() => {
    scrollCont.current.scrollTop = 0
  }, [selectCategoryId, pathname])
  return (
    <div ref={scrollCont} className='border-[1px] py-[3px] px-[5px] border-zinc-700 bg-neutral-800 text-white flex-1 rounded-md relative min-h-[calc(100vh-75px)] max-h-[calc(100vh-75px)] shadow-sm overflow-y-auto overflow-x-hidden mt-[5px]'>
      {children}
    </div>
  )
}

export default Content