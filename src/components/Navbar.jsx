import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, Bell, UserRound, Plus, Search } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import CategoriesMenu from './CategoriesMenu'
import NavbarDropdown from './NavbarDropDown'

export default function Navbar() {
  const { user, signOut } = useAuth()

  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  
  const handleSearch = (e) => {
    e.preventDefault()

  const query = searchQuery.trim()

  if (query) {
    navigate(`/search?q=${encodeURIComponent(query)}`)
  } else {
    navigate('/search')
  }
}

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">

<div className="navbar-inner">

  <Link to="/" className="logo shrink-0">
    Vuvuli
  </Link>

  <form
  onSubmit={handleSearch}
  className="flex min-w-0 flex-1 items-center"
>
  <input
    type="search"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search for anything..."
    className="h-10 min-w-0 flex-1 rounded-l-md border border-gray-300 px-4 text-sm outline-none focus:border-[#9747FF]"
  />

  <button
    type="submit"
    aria-label="Search"
    className="flex h-10 items-center justify-center gap-2 rounded-r-md bg-[#9747FF] px-4 text-sm text-white transition hover:bg-[#8338ec]"
  >
    <Search size={18} />
    <span className="hidden sm:inline">Search</span>
  </button>
</form>

  <div className="navbar-right">
    <div className="navbar-shortcuts">
      <Link to="/favorites" className="navbar-icon-link">
        <Heart size={22} />
        <span>Favorites</span>
      </Link>

      <Link to="/notifications" className="navbar-icon-link">
        <Bell size={22} />
        <span>Notifications</span>
      </Link>
    </div>

    <div className="navbar-actions">
      <NavbarDropdown
        label="choose language"
        defaultValue="EN"
        options={[
          { value: "EN", name: "English", symbol: "EN" },
          { value: "GEO", name: "ქართული", symbol: "GEO" },
        ]}
      />

      <NavbarDropdown
        label="choose currency"
        defaultValue="GEL"
        options={[
          { value: "GEL", name: "GEL", symbol: "₾" },
          { value: "EUR", name: "EUR", symbol: "€" },
          { value: "USD", name: "USD", symbol: "$" },
        ]}
      />
    </div>


     {user ? (
       <Link
         to="/account"
         title="My account"
         aria-label="My account"
         className="flex h-10 w-10 mr-7 items-center justify-center border rounded-full border-gray-200 text-gray-700 transition hover:border-[#9747FF] hover:bg-purple-50 hover:text-[#9747FF]"
       >
        <UserRound size={21} />
       </Link>
     ) : (
       <Link
         to="/login"
         className="rounded-lg bg-[#9747FF] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#8338e8]"
       >
         Sign in
       </Link>
     )}
  </div>
</div>


      <nav className="category-nav">
        <CategoriesMenu />
        <Link to="/for-you">
          For you
        </Link>

        <Link to="/new">
          New
        </Link>

        <Link to="/swap">
          Swap
        </Link>

        <Link to="/electronics">
          Electronics
        </Link>
      </nav>
    </header>
  )
}