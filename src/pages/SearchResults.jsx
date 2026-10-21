
import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { items } from '../data/items'
import ItemCard from '../components/ItemCard'

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('q') || '')

  useEffect(() => {
    setSearch(searchParams.get('q') || '')
  }, [searchParams])
  
  const [category, setCategory] = useState('')
  const [size, setSize] = useState('')
  const [condition, setCondition] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sort, setSort] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    'Tops',
    'Trousers',
    'Jeans',
    'Dresses',
    'Outerwear',
    'Shoes',
    'Bags',
    'Accessories',
  ]

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'One Size']

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase()

    const result = items.filter((item) => {
      const matchesSearch =
        !query ||
        [item.title, item.brand, item.category, item.description]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query))

      const matchesCategory =
        !category || item.category === category

      const matchesSize =
        !size ||
        (item.size || '')
          .toLowerCase()
          .split(/[/,\s]+/)
          .includes(size.toLowerCase()) ||
        (item.size || '').toLowerCase().includes(size.toLowerCase())

      const matchesCondition =
        !condition || item.condition === condition

      const price = Number(item.price)

      const matchesMin =
        minPrice === '' || price >= Number(minPrice)

      const matchesMax =
        maxPrice === '' || price <= Number(maxPrice)

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSize &&
        matchesCondition &&
        matchesMin &&
        matchesMax
      )
    })

    return result.sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price
      if (sort === 'price-high') return b.price - a.price

      if (sort === 'newest') {
        return (
          new Date(b.uploadedAt || 0).getTime() -
          new Date(a.uploadedAt || 0).getTime()
        )
      }

      return 0
    })
  }, [search, category, size, condition, minPrice, maxPrice, sort])

  const clearFilters = () => {
    setCategory('')
    setSize('')
    setCondition('')
    setMinPrice('')
    setMaxPrice('')
    setSort('newest')
  }

  const handleSearch = (e) => {
    e.preventDefault()

    if (search.trim()) {
      setSearchParams({ q: search.trim() })
    } else {
      setSearchParams({})
    }
  }

  const inputClass =
    'w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#9747FF] focus:ring-1 focus:ring-[#9747FF]'

  const labelClass = 'mb-2 block text-sm font-medium text-gray-800'

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 sm:px-8 lg:px-[40px]">
      <div className="mx-auto max-w-[1400px]">

        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Discover items
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Find something special from the Vuvuli community.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="mb-8 flex gap-2"
        >
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clothes, brands, shoes..."
              className={`${inputClass} h-12 pl-11`}
            />
          </div>

          <button
            type="submit"
            className="rounded-md bg-[#9747FF] px-6 text-sm font-medium text-white transition hover:bg-[#8338ec]"
          >
            Search
          </button>
        </form>

        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="mb-5 flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium lg:hidden"
        >
          <SlidersHorizontal size={17} />
          Filters
        </button>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[230px_1fr]">

          <aside
            className={`${showFilters ? 'block' : 'hidden'} rounded-lg border border-gray-100 bg-white p-5 lg:sticky lg:top-6 lg:block`}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-semibold">Filters</h2>
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs text-[#9747FF] hover:underline"
              >
                Clear all
              </button>
            </div>

            <div className="mb-6">
              <label htmlFor="category" className={labelClass}>
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
              >
                <option value="">All categories</option>
                {categories.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="size" className={labelClass}>
                Size
              </label>
              <select
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className={inputClass}
              >
                <option value="">All sizes</option>
                {sizes.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="condition" className={labelClass}>
                Condition
              </label>
              <select
                id="condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className={inputClass}
              >
                <option value="">All conditions</option>
                <option value="New with tags">New with tags</option>
                <option value="New without tags">New without tags</option>
                <option value="Very good">Very good</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>

            <div>
              <p className={labelClass}>Price range (€)</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  placeholder="Min"
                  aria-label="Minimum price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className={inputClass}
                />
                <span className="text-gray-400">–</span>
                <input
                  type="number"
                  min="0"
                  placeholder="Max"
                  aria-label="Maximum price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </aside>

          <section className="min-w-0">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-semibold text-gray-900">
                  {search.trim()
                    ? `Results for "${search.trim()}"`
                    : 'All items'}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {filteredItems.length}{' '}
                  {filteredItems.length === 1 ? 'item' : 'items'} found
                </p>
              </div>

              <div className="flex items-center gap-3">
                <label
                  htmlFor="sort"
                  className="shrink-0 text-sm text-gray-500"
                >
                  Sort by
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#9747FF]"
                >
                  <option value="newest">Newest first</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                </select>
              </div>
            </div>

            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 xl:grid-cols-4">
                {filteredItems.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white px-5 text-center">
                <Search size={32} className="mb-4 text-gray-300" />
                <h3 className="font-semibold text-gray-900">
                  No items found
                </h3>
                <p className="mt-2 max-w-sm text-sm text-gray-500">
                  Try another search or adjust your filters to discover more items.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch('')
                    setSearchParams({})
                    clearFilters()
                  }}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9747FF] hover:underline"
                >
                  <X size={15} />
                  Clear search and filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}