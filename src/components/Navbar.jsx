import { Link } from 'react-router-dom'
import { Heart, Bell } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import CategoriesMenu from './CategoriesMenu'
import NavbarDropdown from './NavbarDropDown'

export default function Navbar() {
  const { user, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">

<div className="navbar-inner">

  <Link to="/" className="logo shrink-0">
    Vuvuli
  </Link>


  <div className="navbar-search">
    <input
      type="text"
      placeholder="Search for items..."
      className="min-w-0 flex-1 rounded-sm border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
    />

    <button
      type="button"
      className="shrink-0 rounded bg-[#9747FF] px-5 py-2.5 text-sm text-white hover:bg-[#8135e6]"
    >
      Search
    </button>
  </div>

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
      <div className="account-menu">
        <Link to="/account" className="account-button">
          {user.name}
        </Link>
        <button
          type="button"
          className="account-menu-signout"
          onClick={signOut}
        >
          Sign out
        </button>
      </div>
    ) : (
      <Link to="/login" className="account-button">
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