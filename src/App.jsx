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
import SellerProfile from './pages/SellerProfile'
import SellItem from './pages/SellItem'
import Signup from './pages/SignUp'
import EditProfile from './pages/EditProfile'
import SearchResults from './pages/SearchResults'
import MyOrders from './pages/MyOrders'

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
        <Route path="/seller/:sellerName" element={<SellerProfile />} />
        <Route path="/sell" element={<SellItem />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/orders" element={<MyOrders />} />
        
      </Routes>
    </>
  )
}