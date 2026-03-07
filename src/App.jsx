import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Collection from './pages/Collection'
import DesignStudio from './pages/DesignStudio'
import Cart from './pages/Cart'
import Contacts from './pages/Contacts'
import AdminLogin from './pages/AdminLogin'
import './App.css'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/admin/collection" element={<Collection adminMode />} />
        <Route path="/design-studio" element={<DesignStudio />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </Layout>
  )
}

export default App
