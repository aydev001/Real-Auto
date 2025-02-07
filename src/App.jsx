import { TbReload } from "react-icons/tb";
import React, { useEffect } from 'react'
import Header from './components/Header'
import Content from './components/Content'
import { Outlet} from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from './store/categorySlice/categorySlice'
import { Player } from '@lottiefiles/react-lottie-player'
import Loading from "./assets/loading.json"
import Error from "./assets/empty-product.json"
import ModalAlert from "./components/page-comp/ModalAlert";
import { ToastContainer } from 'react-toastify';
import Sidebar from "./components/Sidebar";
import { toggleSidebar } from "./store/actionSlice/actionSlice";
import { IoIosArrowForward } from "react-icons/io";
import { fetchBrands } from "./store/brandSlice/brandSlice";
import { fetchModels } from "./store/modelSlice/modelSlice";
import { fetchCities } from "./store/citiySlice/citySlice";
import { fetchLocations } from "./store/locationSlice/locationSlice";
import { fetchCars } from "./store/carSlice/carSlice";

const App = () => {
  const dispatch = useDispatch()
  const { loading: catLoading, error: catError } = useSelector(state => state.categories)
  const { loading: brandLoading, error: brandError } = useSelector(state => state.brands)
  const { loading: modelLoading, error: modelError } = useSelector(state => state.models)
  const { loading: cityLoading, error: cityError } = useSelector(state => state.cities)
  const { loading: locationLoading, error: locationError } = useSelector(state => state.locations)
  const { loading: carLoading, error: carError } = useSelector(state => state.cars)
  const { isSidebar } = useSelector(state => state.actions)

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchBrands())
    dispatch(fetchModels())
    dispatch(fetchCities())
    dispatch(fetchLocations())
    dispatch(fetchCars())
  }, [dispatch])
  return (
    <div className='p-[5px] font-mont bg-zinc-600 min-h-[100vh]'>
      <Header />
      <div className="flex gap-[5px] relative">
        <div className={`absolute ${isSidebar ? "left-[0px]" : "left-[-224px]"} duration-300 w-[220px] border-[1px] border-zinc-700 shadow-sm rounded-md p-[10px] top-[5px] bottom-[0px] z-20 bg-neutral-800  md:relative md:top-[5px] md:bottom-0 md:mb-[5px] md:left-0`}>
          <Sidebar />
          <button onClick={() => dispatch(toggleSidebar())} className="h-[40px] w-[25px] bg-orange-500 text-white rounded-sm text-[20px] flex md:hidden justify-center items-center hover:bg-orange-600 bg-opacity-70 active:scale-95 absolute top-[50%] translate-y-[-50%] right-[-30px]">
            <div className={`${isSidebar ? "rotate-[180deg]" : "rotate-[0]"} duration-300`}>
              <IoIosArrowForward />
            </div>
          </button>
        </div>
        <Content>
          {catLoading && brandLoading && modelLoading && cityLoading && locationLoading && carLoading?
            <div className='min-h-[calc(100vh-150px)] flex justify-center items-center flex-col'>
              <div className='max-w-[100px] flex justify-center items-center flex-col'>
                <Player
                  src={Loading}
                  loop
                  autoplay
                />
                <div className="text-[16px] font-semibold text-orange-500">Loading</div>
              </div>
            </div>
            :
            catError || brandError || modelError || cityError || locationError || carError?
              <div className='flex justify-center items-center flex-col min-h-[calc(100vh-100px)]'>
                <div className='max-w-[200px] opacity-50'>
                  <Player
                    src={Error}
                    loop
                    autoplay
                    className="max-h-[230px]"
                  />
                </div>
                <div className='mb-[10px] text-center text-gray-300'>
                  There was an error retrieving information, please reload the page.
                </div>
                <button onClick={() => window.location.href = "/"} className="flex justify-center items-center gap-1 px-[10px] py-[5px] bg-zinc-600 hover:bg-zinc-700 active:bg-zinc-700 rounded-sm text-[12px] font-medium">
                  <span className="text-[18px]">
                    <TbReload />
                  </span>
                  <span>Reload the page</span>
                </button>
              </div>
              :
              <Outlet />
          }
        </Content>
      </div>
      <ModalAlert />
      <ToastContainer />
    </div>
  )
}

export default App
