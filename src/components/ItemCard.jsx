import { useState } from 'react'
import { Link } from 'react-router-dom'
import transportIcon from '../images/transport.png'

export default function ItemCard({ item }) {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavorite = (e) => {
    e.preventDefault()
    setIsFavorite(!isFavorite)
  }

  return (
    <Link to={`/item/${item.id}`} className="item-card">
      <img src={item.image} alt={item.title} className="item-image" />
      <div className="item-bottom">
        <div className="item-price-info">
          <span className="price">€{item.price.toFixed(2)}</span>
          <span className="payment-note">
            <img src={transportIcon} alt="" className="transport-icon" />
            You will pay 6.10 €
          </span>
        </div>
        <button
          type="button"
          className={`favorite-btn${isFavorite ? ' favorite-active' : ''}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={isFavorite}
          onClick={handleFavorite}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
          </svg>
        </button>
      </div>
      <p className="item-title">{item.title}</p>
      <p className="item-meta">{item.size}</p>
      <div className="seller">
        <img
          src={item.seller.image}
          alt={item.seller.name}
          className="profile-pic"
        />
        <span>{item.seller.name}</span>
      </div>
    </Link>
  )
}
