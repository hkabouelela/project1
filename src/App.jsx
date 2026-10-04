
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header/header'
import { Home } from './pages/Home/home'
import { Product } from './pages/product/product'
import { Categories } from './pages/categories/categories'
import { ProductDetails } from './pages/productDetails/productDetails'
import { Footer } from './components/Header/footer/footer'
import { Login } from './pages/login/login'
import { ToastContainer } from 'react-toastify'

function App() {
const location=useLocation();

  return (
    <>
 <ToastContainer />
{location.pathname !=='/' && <Header />}

     <Routes>
<Route path='/home' element={<Home />} />
<Route path='/products' element={<Product />} />
<Route path='/categories' element={<Categories />} />
<Route path='/product/:id' element={<ProductDetails />} />
<Route path='/' element={<Login />} />

</Routes>
<Footer />




    </>
  )
}

export default App
