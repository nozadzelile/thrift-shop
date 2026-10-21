
import { useState } from 'react'
import { Link } from 'react-router-dom'
import transportIcon from '../images/transport.png'

export default function ItemCard({ item }) {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="min-w-0 text-inherit">
      <Link to={`/item/${item.id}`} className="block text-inherit no-underline">
        <img
          src={item.image}
          alt={item.title}
          className="mb-2 aspect-[4/5] w-full rounded object-cover"
        />
      </Link>

      <div className="my-[5px] flex items-start justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-lg font-semibold text-[#222]">
            €{Number(item.price).toFixed(2)}
          </span>

          <span className="mt-[5px] flex items-center gap-[5px] text-sm leading-[1.35] text-[rgb(151,71,255,0.6)]">
            <img
              src={transportIcon}
              alt=""
              className="h-[18px] w-[18px] shrink-0 object-contain"
              style={{
                filter:
                  'brightness(0) saturate(100%) invert(38%) sepia(96%) saturate(2218%) hue-rotate(243deg) brightness(101%) contrast(101%)',
              }}
            />
            You will pay 6.10 €
          </span>
        </div>

        <button
          type="button"
          className={`grid h-7 w-7 shrink-0 cursor-pointer place-items-center border-0 bg-transparent p-0 transition-colors ${
            isFavorite ? 'text-[#ed4956]' : 'text-[#26222b]'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={isFavorite}
          onClick={handleFavorite}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={`h-[21px] w-[21px] transition-transform duration-150 hover:scale-110 ${
              isFavorite ? 'fill-current' : 'fill-none'
            }`}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
          </svg>
        </button>
      </div>

      <Link
        to={`/item/${item.id}`}
        className="text-inherit no-underline"
      >
        <p className="text-sm font-medium">{item.title}</p>
        <p className="my-[7px] text-[15px] text-[#777]">
          {item.size}
        </p>
      </Link>

      <div className="flex items-center gap-3">
        <Link
          to={`/seller/${encodeURIComponent(item.seller.name)}`}
          className="flex min-w-0 items-center gap-3 text-inherit no-underline hover:text-[#9747FF]"
        >
          <img
            src={item.seller.image}
            alt={item.seller.name}
            className="h-9 w-9 shrink-0 rounded-full object-cover"
          />

          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium text-gray-800">
              {item.seller.name}
            </span>

            <span className="truncate text-xs text-gray-500">
              {item.seller.location}
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}