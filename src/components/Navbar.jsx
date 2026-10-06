import { Link } from 'react-router-dom'
import { Search, ChevronDown, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
    
    const { user, signOut } = useAuth()
    
    return (
    <header className="navbar">

      {/* Main navbar */}
      <div className="navbar-inner">

        {/* Logo */}
        <Link to="/" className="logo">
          Vuvuli
        </Link>

        {/* Search */}
        <div className="search-form">
          <input
            type="text"
            placeholder="Search for items..."
          />

          <button className="search-button">
            Search
          </button>
        </div>

        {/* Right side */}
        <div className="navbar-actions">

          {/* Language */}
          <div className="navbar-select-wrap">
            <select className="navbar-select" defaultValue="EN">
              <option value="EN">EN</option>
              <option value="Geo">GEO</option>
            </select>

            <ChevronDown className="navbar-select-arrow" />
          </div>

          {/* Currency */}
          <div className="navbar-select-wrap currency-select-wrap">
            <select className="navbar-select" defaultValue="₾">
                <option value="₾">₾</option>
              <option value="€">€</option>
              <option value="$">$</option>
            </select>

            <ChevronDown className="navbar-select-arrow" />
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

      {/* Category navigation */}
      <nav className="category-nav">

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
