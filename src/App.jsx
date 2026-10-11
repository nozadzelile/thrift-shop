import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ItemDetail from './pages/ItemDetail'
import SignIn from './pages/SignIn'
import Account from './pages/Account'
import MakeOffer from "./pages/MakeOffer";
import Messages from './pages/Messages'
import BuyNow from "./pages/BuyNow";
import Favorites from './pages/Favorites'
import Notifications from './pages/Notifications'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/account" element={<Account />} />
        <Route path="/make-offer" element={<MakeOffer />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/buy-now" element={<BuyNow />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </>
  )
}