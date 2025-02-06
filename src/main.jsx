import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router";
import NotFount from './pages/NotFount.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import App from "./App.jsx"
import Categories from './pages/Categories.jsx';
import Brands from './pages/Brands.jsx';
import Models from './pages/Models.jsx';
import Cities from './pages/Cities.jsx';
import Locations from './pages/Locations.jsx';
import Cars from './pages/Cars.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>} >
            <Route index element={<Categories />} />
            <Route path='/brands' element={<Brands/>} />
            <Route path='/models' element={<Models/>} />
            <Route path='/cities' element={<Cities/>} />
            <Route path='/locations' element={<Locations/>} />
            <Route path='/cars' element={<Cars/>} />
            <Route path='*' element={<NotFount />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
