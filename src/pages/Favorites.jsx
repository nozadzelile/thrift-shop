
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'
import { items } from '../data/items'

export default function Favorites() {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('vuvuli-favorites') || '[]')
    } catch {
      return []
    }
  })

  const favoriteItems = items.filter((item) =>
    favoriteIds.some((id) => String(id) === String(item.id))
  )

  function removeFavorite(id) {
    const updatedIds = favoriteIds.filter(
      (favoriteId) => String(favoriteId) !== String(id)
    )

    setFavoriteIds(updatedIds)
    localStorage.setItem('vuvuli-favorites', JSON.stringify(updatedIds))
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10">
      {/* Page heading */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <Heart className="text-[#9747FF]" size={28} />
          <h1 className="text-3xl font-bold text-gray-900">
            My Favorites
          </h1>
        </div>

        <p className="text-gray-500">
          Your favorite finds, all in one place.
        </p>
      </div>

      {/* Items count */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <p className="text-sm text-gray-600">
          {favoriteItems.length}{' '}
          {favoriteItems.length === 1 ? 'item' : 'items'} saved
        </p>
      </div>

      {/* Empty state */}
      {favoriteItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-5 rounded-full bg-purple-50 p-5">
            <Heart size={40} className="text-[#9747FF]" />
          </div>

          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            No favorites yet
          </h2>

          <p className="mb-6 max-w-sm text-gray-500">
            When you find something you love, save it here
            and come back to it anytime.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-[#9747FF] px-6 py-3 font-medium text-white transition hover:bg-[#8135e6]"
          >
            Explore items
            <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        /* Favorites grid */
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {favoriteItems.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-md"
            >
              <div className="relative">
                <Link to={`/item/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-56 w-full object-cover"
                  />
                </Link>

                <button
                  type="button"
                  onClick={() => removeFavorite(item.id)}
                  aria-label={`Remove ${item.title} from favorites`}
                  title="Remove from favorites"
                  className="absolute right-3 top-3 rounded-full bg-white p-2 shadow transition hover:bg-purple-50"
                >
                  <Heart
                    size={19}
                    className="fill-[#9747FF] text-[#9747FF]"
                  />
                </button>
              </div>

              <div className="p-4">
                <Link
                  to={`/item/${item.id}`}
                  className="line-clamp-2 font-medium text-gray-900 hover:text-[#9747FF]"
                >
                  {item.title}
                </Link>

                <p className="mt-2 text-lg font-bold text-gray-900">
                  {Number(item.price).toFixed(2)} ₾
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {item.condition}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}