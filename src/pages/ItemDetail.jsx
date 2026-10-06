import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { items } from '../data/items'
import transportIcon from '../images/transport.png'
import { Star, Heart, Eye } from 'lucide-react'

const initialTime = Date.now()

function formatUploadTime(uploadedAt, now) {
  const elapsedSeconds = Math.max(
    0,
    Math.floor((now - new Date(uploadedAt).getTime()) / 1000),
  )

  if (elapsedSeconds < 60) return 'Uploaded just now'
  if (elapsedSeconds < 3600) {
    const minutes = Math.floor(elapsedSeconds / 60)
    return `Uploaded ${minutes} minute${minutes === 1 ? '' : 's'} ago`
  }
  if (elapsedSeconds < 86400) {
    const hours = Math.floor(elapsedSeconds / 3600)
    return `Uploaded ${hours} hour${hours === 1 ? '' : 's'} ago`
  }

  const days = Math.floor(elapsedSeconds / 86400)
  return `Uploaded ${days} day${days === 1 ? '' : 's'} ago`
}

export default function ItemDetail() {
  const { id } = useParams()
  const item = items.find((item) => item.id === Number(id))
  const [now, setNow] = useState(initialTime)

  useEffect(() => {
    const updateTime = () => setNow(Date.now())
    updateTime()
    const timer = setInterval(updateTime, 60_000)
    return () => clearInterval(timer)
  }, [])

  if (!item) {
    return (
      <main className="container">
        <h1>Item not found</h1>
        <Link to="/">← Back to home</Link>
      </main>
    )
  }

  const sellerItems = items.filter(
    (sellerItem) =>
      sellerItem.seller.name === item.seller.name &&
      sellerItem.id !== item.id,
  )
  const similarItems = items
    .filter((similarItem) => similarItem.id !== item.id)
    .sort(
      (first, second) =>
        Number(second.category === item.category) -
        Number(first.category === item.category),
    )
  const rating = item.seller.rating

  return (
    <main className="container">
      <Link to="/" className="back-link">← Back</Link>

      <div className="detail">
        <img src={item.image} alt={item.title} className="detail-image" />

        <div className="detail-info">
          <h1>{item.title}</h1>
          <p className="detail-price">€{item.price.toFixed(2)}</p>
          <p className="payment-note detail-payment-note">
            <img src={transportIcon} alt="" className="transport-icon" />
            You will pay 6.10 €
          </p>

          <p className="detail-description">{item.description}</p>

          <ul className="detail-specs">
            <li><span>Brand</span> {item.brand}</li>
            <li><span>Size</span> {item.size}</li>
            <li><span>Color</span>{item.color}</li>
            <li><span>Category</span> {item.category}</li>
          </ul>

          <div className="seller detail-seller">
            <img src={item.seller.image} alt={item.seller.name} className="profile-pic" />
            <div>
              <span className="seller-label">Sold by</span>
              <span>{item.seller.name}</span>
            </div>
            
            <div className="seller-rating">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star}
                  className={star <= rating ? "star-filled" : "star-empty"}
                  />
                  ))}
                  </div>
                  
                  <span className="review-count">
                    {item.seller.reviews} reviews
                    </span>
                    </div>
          </div>

          <button className="buy-button">
            Buy now
          </button>
          <button className="buy-button">
            Make an offer
          </button>
          <div className="item-stats">
            <div className="stats-row">
              <div className="item-stat">
                <Heart className="stat-icon" />
                <span>{item.saves}</span>
                <span className="stat-label">saves</span>
              </div>
              
              <div className="item-stat">
                <Eye className="stat-icon" />
                <span>{item.views}</span>
                <span className="stat-label">views</span>
              </div>
            </div>
            <div className="uploaded-stat">
              {formatUploadTime(item.uploadedAt, now)}
            </div>
          </div>
        </div>
      </div>

      {sellerItems.length > 0 && ( <section className="seller-items-container"> 
        <div className="seller-items-header"> 
          <h2>More from {item.seller.name}</h2> 
          <Link to="/" className="view-seller-link"> View all → </Link> 
        </div> 
          <div className="seller-items-grid"> 
            {sellerItems.map((sellerItem) => ( 
              <Link to={`/item/${sellerItem.id}`} className="seller-item-card" key={sellerItem.id} > 
          <img 
            src={sellerItem.image} 
            alt={sellerItem.title} 
            className="seller-item-image" 
            /> 
          <div className="seller-item-info"> 
            <h3>{sellerItem.title}</h3> 
          <p className="seller-item-size"> {sellerItem.size} </p> 
          <p className="seller-item-price"> €{sellerItem.price.toFixed(2)} </p> 
          </div> 
          </Link> 
          ))} 
          </div> 
          </section> 
        )} 

      {similarItems.length > 0 && (
        <section className="seller-items-container similar-items-container">
          <div className="seller-items-header">
            <h2>Similar items</h2>
          </div>
          <div className="seller-items-grid">
            {similarItems.map((similarItem) => (
              <Link
                to={`/item/${similarItem.id}`}
                className="seller-item-card"
                key={similarItem.id}
              >
                <img
                  src={similarItem.image}
                  alt={similarItem.title}
                  className="seller-item-image"
                />
                <div className="seller-item-info">
                  <h3>{similarItem.title}</h3>
                  <p className="seller-item-size">{similarItem.size}</p>
                  <p className="seller-item-price">
                    €{similarItem.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
        </main> 
        )
}
