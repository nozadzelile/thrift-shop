import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { items } from '../data/items'
import transportIcon from '../images/transport.png'
import {
  Heart,
  Eye,
  Share2,
  Star,
  MessageCircle,
  MapPin,
  Truck,
  Clock,
  ShieldCheck,
  CircleCheck,
} from "lucide-react"

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
  const navigate = useNavigate();

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
      <Link to="/" className="back-link">
        ← Back
      </Link>

      <div className="detail">
        <img
          src={item.image}
          alt={item.title}
          className="aspect-[4/5] w-full rounded-lg object-cover"
        />
        <div className="flex flex-col">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-[60%_40%] md:divide-x md:divide-[#e5e5e5]">            
            <div className="detail-info">
          <h1 className='text-[30px]'>{item.title}</h1>

          <p className="my-[2px] mt-2 text-[28px] font-bold">
            €{item.price.toFixed(2)}
          </p>

          <p className="payment-note mb-4 flex items-center gap-[5px]">
            <img
              src={transportIcon}
              alt=""
              className="h-[18px] w-[18px] shrink-0 object-contain"
            />
            You will pay 6.10 €
          </p>

          <button
          type="button"
          onClick={() => navigate("/buy-now", { state: { item } })}
          className="buy-button w-[150px] rounded-lg bg-[#9747FF] px-3.5 py-2 text-sm text-white cursor-pointe mr-[8px]">
            Buy now
          </button>
          
         <button
         type="button"
         onClick={() =>
          navigate("/messages", {
            state: { item, openOffer: true,
              
             },
          })
        }
        
        className="cursor-pointer w-[150px] rounded-lg border border-[#9747FF] px-3.5 py-2 text-sm text-[#FFFFFF] bg-[#9747FF]"
        >Make an offer
        </button>
        </div>

        <div className="sellers-details-column ml-15">
          <div className="seller detail-seller">
            <div className="seller-row">
             <img
               src={item.seller.image}
               alt={item.seller.name}
               className="profile-pic"
             />

        <div className="seller-details">
         <Link
         to={`/seller/${encodeURIComponent(item.seller.name)}`}
         className="hover:text-[#9747FF]"
         >
          {item.seller.name}
        </Link>
         
        </div>

        <div className="seller-rating">
         <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={
              star <= rating ? 'star-filled' : 'star-empty'
            }
          />
        ))}
         </div>

          <span className="review-count">
            {item.seller.reviews} reviews
          </span>
        </div>

        <div className="item-location">
          <MapPin className="location-icon" />
          <span className="location-label">
            {item.seller.location}
          </span>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate("/messages", {
              state: { item },
            })
          }
          className="seller-message-button w-[150px] rounded-lg bg-[#9747FF] px-3.5 py-2 text-sm text-white cursor-pointer"
        >
          <MessageCircle size={16} aria-hidden="true" />
          Message
        </button>
      </div>
      </div>
   </div>
   </div>


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

              <button
              
              type="button"
              className="m-0 flex cursor-pointer items-center gap-[5px] border-none bg-transparent p-0 text-[13px] text-[#666] transition-colors duration-200 hover:text-[#9747FF]"
              onClick={() => {
                navigator.share?.({
                 title: item.title,
                 text: `Check out ${item.title}`,
                 url: window.location.href,
               })
             }}
           >
            
            <Share2
            className="h-4 w-4"
            strokeWidth={1.8}
            />
            <span>Share</span>
            </button>

              <div className="uploaded-stat mr-5 mb-3">
              {formatUploadTime(item.uploadedAt, now)}
              </div>
            </div>

      <p className="mb-[26px] border-t-2 border-[#e5e5e5] pt-[7px] leading-[1.5] mt-4">
        {item.description}
      </p>

      <ul className="mb-4 list-none p-0">
        <li className="border-b border-[#eee] py-2"><span className="inline-block w-[100px] text-[#777]">
          Brand</span> {item.brand}</li>
        <li className="border-b border-[#eee] py-2"><span className="inline-block w-[100px] text-[#777]">
          Size</span> {item.size}</li>
        <li className="border-b border-[#eee] py-2"><span className="inline-block w-[100px] text-[#777]">
          Color</span> {item.color}</li>
        <li className="border-b border-[#eee] py-2"><span className="inline-block w-[100px] text-[#777]">
          Category</span> {item.category}</li>
        <li className="border-b border-[#eee] py-2"><span className="inline-block w-[100px] text-[#777]">
          Condition</span> {item.condition}</li>
      </ul>
        <div className="detail-section">
          <h3>Measurements</h3>
          
          {Object.entries(item.measurements).map(([name, value]) => (
            <div className="measurement-row flex items-center justify-between gap-18 py-2" key={name}>
              <span className="measurement-name">{name}</span>
              <span className="measurement-value whitespace-nowrap">{value}</span>
              </div>
            ))}
            </div>
      </div>
    </div>
    </div>


      {sellerItems.length > 0 && (
        <div className="mt-[50px] rounded-lg border-[#e5e5e5] p-[20px]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="m-0 !mb-5 text-[22px]">More from {item.seller.name}</h2>
            <Link className="text-sm text-inherit no-underline">
              View all →
            </Link>
          </div>

          <div className="seller-items-grid">
            {sellerItems.map((sellerItem) => (
              <Link
                to={`/item/${sellerItem.id}`}
                className="seller-item-card"
                key={sellerItem.id}
              >
                <img
                  src={sellerItem.image}
                  alt={sellerItem.title}
                  className="seller-item-image"
                />

                <div className="seller-item-info">
                  <p className="seller-item-price">
                    €{sellerItem.price.toFixed(2)}
                  </p>
                  <h3>{sellerItem.title}</h3>

                  <p className="seller-item-size">
                    {sellerItem.size}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-[40px] rounded-lg border border-[#e5e5e5] p-[35px] bg-[#FFF]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:divide-x">
          
          <div>
            <h2 className="m-0 !mb-5 text-[18px] font-semibold">
              Shipping & Delivery
            </h2>

          <div className="flex flex-col gap-4 text-sm text-[#666]">
            <div className="flex items-center gap-3">
              <Truck
                size={18}
                className="shrink-0 text-[#9747FF]"
              />
              <span>Delivery available</span>
            </div>

            <div className="flex items-center gap-3">
              <Clock
                size={18}
                className="shrink-0 text-[#9747FF]"
              />
              <span>Usually ships within 2–3 days</span>
            </div>

           <div className="flex items-center gap-3">
             <MapPin
               size={18}
               className="shrink-0 text-[#9747FF]"
             />
             <span>Ships from {item.seller.location}</span>
           </div>
        </div>
      </div>

        <div>
          <h2 className="m-0 !mb-5 text-[18px] font-semibold">
                Buyer protection
          </h2>

          <div className="flex flex-col gap-4 text-sm text-[#666]">
            <div className="flex items-center gap-3">
              <ShieldCheck
                size={18}
                className="shrink-0 text-[#9747FF]"
              />
              <span>Secure payment</span>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck
                size={18}
                className="shrink-0 text-[#9747FF]"
              />
              <span>Buyer protection included</span>
            </div>

            <div className="flex items-center gap-3">
              <CircleCheck
                size={18}
                className="shrink-0 text-[#9747FF]"
              />
              <span>Refund if the item isn't as described</span>
            </div>
          </div>
        </div>
      </div>
    </div>

      {similarItems.length > 0 && (
        <section className="rounded-lg border-[#e5e5e5] p-[25px]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="!mb-5 text-[22px]">Similar items</h2>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
            {similarItems.map((similarItem) => (
              <Link
                to={`/item/${similarItem.id}`}
                className="block text-inherit no-underline"
                key={similarItem.id}
              >
                <img
                  src={similarItem.image}
                  alt={similarItem.title}
                  className="aspect-[4/5] w-full rounded-lg object-cover"
                />

                <div className="pt-2.5">
                  <p className="seller-item-price">
                    €{similarItem.price.toFixed(2)}
                </p>
                  <h3>{similarItem.title}</h3>
                  <p className="seller-item-size">
                    {similarItem.size}
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