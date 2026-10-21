
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, Star, MessageCircle, UserRoundPlus, UserRoundCheck } from 'lucide-react'
import { items } from '../data/items'

export default function SellerProfile() {
  const { sellerName } = useParams()
  const navigate = useNavigate()

  const sellerItems = items.filter(
    (item) => item.seller.name === sellerName
  )

  const seller = sellerItems[0]?.seller

  const [isFollowing, setIsFollowing] = useState(() => {
    const saved = JSON.parse(
      localStorage.getItem('vuvuli-following') || '[]'
    )
    return saved.includes(sellerName)
  })

  if (!seller) {
    return (
      <main className="mx-auto max-w-5xl px-5 py-10">
        <h1 className="text-2xl font-semibold">Seller not found</h1>
        <Link to="/" className="mt-4 inline-block text-[#9747FF]">
          Browse items
        </Link>
      </main>
    )
  }

  function toggleFollow() {
    const saved = JSON.parse(
      localStorage.getItem('vuvuli-following') || '[]'
    )

    const updated = isFollowing
      ? saved.filter((name) => name !== sellerName)
      : [...new Set([...saved, sellerName])]

    localStorage.setItem('vuvuli-following', JSON.stringify(updated))
    setIsFollowing(!isFollowing)
  }

  function messageSeller() {
    navigate('/messages', {
      state: { item: sellerItems[0] },
    })
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-8">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#9747FF]"
      >
        <ArrowLeft size={18} />
        Back to items
      </Link>

      <section className="rounded-2xl border border-gray-200 p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <img
            src={seller.image}
            alt={seller.name}
            className="h-24 w-24 rounded-full object-cover"
          />

          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-semibold text-gray-900">
              {seller.name}
            </h1>

            <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
              <MapPin size={16} />
              {seller.location || 'Location not provided'}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              {seller.rating != null && (
                <span className="flex items-center gap-1 font-medium text-gray-800">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  {seller.rating}
                </span>
              )}

              <span className="text-gray-500">
                ({seller.reviews ?? 0} reviews)
              </span>

              <span className="text-gray-300">•</span>

              <span className="text-gray-500">
                {sellerItems.length} {sellerItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>

          <div className="flex gap-3 sm:flex-col">
            <button
              type="button"
              onClick={toggleFollow}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition sm:flex-none ${
                isFollowing
                  ? 'border-[#9747FF] bg-purple-50 text-[#9747FF]'
                  : 'border-[#9747FF] bg-[#9747FF] text-white hover:bg-[#8338e8]'
              }`}
            >
              {isFollowing ? (
                <UserRoundCheck size={17} />
              ) : (
                <UserRoundPlus size={17} />
              )}
              {isFollowing ? 'Following' : 'Follow'}
            </button>

            <button
              type="button"
              onClick={messageSeller}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:flex-none"
            >
              <MessageCircle size={17} />
              Message
            </button>
          </div>
        </div>
      </section>
      
      <section className="relative left-1/2 mt-10 w-screen max-w-[1400px] -translate-x-1/2 px-5">        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Items from {seller.name}
          </h2>
          <span className="text-sm text-gray-500">
            {sellerItems.length} items
          </span>
        </div>

        {sellerItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {sellerItems.map((item) => (
              <Link
                key={item.id}
                to={`/item/${item.id}`}
                className="group min-w-0"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="aspect-[4/5] w-full rounded-xl bg-gray-100 object-cover transition group-hover:opacity-90"
                />

                <div className="mt-3">
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    €{Number(item.price).toFixed(2)}
                  </p>
                   <h3 className="truncate text-sm font-medium text-gray-900">
                    {item.title}
                  </h3>
                  {item.size && (
                    <p className="mt-1 text-xs text-gray-500">
                      Size {item.size}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            This seller hasn't listed any items yet.
          </p>
        )}
      </section>
    </main>
  )
}