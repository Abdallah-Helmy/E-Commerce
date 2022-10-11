import './App.css'
import { ProductsView } from './features/products/ProductsView'
import Header from './components/header/Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom'
import SingleProductView from './features/singleProduct/SingleProductView'
import Cart from './components/cart/Cart'
import Error from './components/Error Page/Error'

function App () {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='*' element={<Error />} />
        <Route path='/E-Commerce' element={<ProductsView />} />
        <Route path='/E-Commerce/:productId' element={<SingleProductView />} />
        <Route path='/E-Commerce/Cart' element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App
