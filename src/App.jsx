import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ItemDetail from './pages/ItemDetail'
import SignIn from './pages/SignIn'
import Account from './pages/Account'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </>
  )
}