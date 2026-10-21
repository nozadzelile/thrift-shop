
import { useState } from 'react'
import { Upload, X } from 'lucide-react'

export default function SellItem() {
  const [photos, setPhotos] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [size, setSize] = useState('')
  const [condition, setCondition] = useState('')
  const [color, setColor] = useState('')
  const [price, setPrice] = useState('')

  const handlePhotoChange = (e) => {
    const selectedPhotos = Array.from(e.target.files || [])
    const remainingSlots = 5 - photos.length
    const newPhotos = selectedPhotos.slice(0, remainingSlots)

    setPhotos((currentPhotos) => [...currentPhotos, ...newPhotos])
    e.target.value = ''
  }

  const removePhoto = (indexToRemove) => {
    setPhotos((currentPhotos) =>
      currentPhotos.filter((_, index) => index !== indexToRemove)
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Your item form is ready! We will connect publishing next.')
  }

  const inputClass =
    'w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#9747FF] focus:ring-1 focus:ring-[#9747FF]'

  const labelClass = 'mb-2 block text-sm font-medium text-gray-800'

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Sell an item
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Give your pre-loved items a new home.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.1fr_1fr]">
            {/* Left column: Photos */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-2 text-lg font-semibold">Photos</h2>
              <p className="mb-5 text-sm text-gray-500">
                Add up to 5 photos of your item.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {photos.map((photo, index) => (
                  <div
                    key={`${photo.name}-${index}`}
                    className="relative aspect-[4/5] overflow-hidden rounded-md border border-gray-200"
                  >
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Item photo ${index + 1}`}
                      className="h-full w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      aria-label="Remove photo"
                      className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white text-gray-700 shadow hover:text-red-500"
                    >
                      <X size={16} />
                    </button>

                    {index === 0 && (
                      <span className="absolute bottom-0 left-0 w-full bg-black/60 px-2 py-1 text-center text-xs text-white">
                        Cover photo
                      </span>
                    )}
                  </div>
                ))}

                {photos.length < 5 && (
                  <label className="flex aspect-[4/5] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-500 transition hover:border-[#9747FF] hover:text-[#9747FF]">
                    <Upload size={26} strokeWidth={1.5} />
                    <span className="mt-2 text-sm font-medium">
                      Add photos
                    </span>
                    <span className="mt-1 text-xs">
                      {photos.length}/5 uploaded
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <p className="mt-4 text-xs leading-5 text-gray-500">
                Use clear, well-lit photos. Show the front, back, and any
                details or imperfections.
              </p>
            </section>

            {/* Right column: Item details */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-semibold">Item details</h2>

              <div className="mb-5">
                <label htmlFor="item-title" className={labelClass}>
                  Title *
                </label>
                <input
                  id="item-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Vintage denim jacket"
                  className={inputClass}
                  required
                />
              </div>

              <div className="mb-5">
                <label htmlFor="item-description" className={labelClass}>
                  Description *
                </label>
                <textarea
                  id="item-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your item, its fit, and any imperfections..."
                  rows={4}
                  className={`${inputClass} resize-y`}
                  required
                />
              </div>

              <div className="mb-5">
                <label htmlFor="item-category" className={labelClass}>
                  Category *
                </label>
                <select
                  id="item-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={inputClass}
                  required
                >
                  <option value="">Choose a category</option>
                  <option value="Tops">Tops</option>
                  <option value="Trousers">Trousers</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Dresses">Dresses</option>
                  <option value="Outerwear">Outerwear</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Bags">Bags</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-5">
                <label htmlFor="item-brand" className={labelClass}>
                  Brand
                </label>
                <input
                  id="item-brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. Levi's"
                  className={inputClass}
                />
              </div>

              <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="item-size" className={labelClass}>
                    Size
                  </label>
                  <select
                    id="item-size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Choose size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="One Size">One Size</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="item-condition" className={labelClass}>
                    Condition *
                  </label>
                  <select
                    id="item-condition"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className={inputClass}
                    required
                  >
                    <option value="">Choose condition</option>
                    <option value="New with tags">New with tags</option>
                    <option value="New without tags">New without tags</option>
                    <option value="Very good">Very good</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="item-color" className={labelClass}>
                  Color
                </label>
                <input
                  id="item-color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="e.g. Blue"
                  className={inputClass}
                />
              </div>

              <div className="border-t border-gray-200 pt-6">
                <label htmlFor="item-price" className={labelClass}>
                  Price (€) *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    €
                  </span>
                  <input
                    id="item-price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className={`${inputClass} pl-9`}
                    required
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Choose a fair price for your item.
                </p>
              </div>

              <button
                type="submit"
                className="mt-7 w-full rounded-md bg-[#9747FF] px-5 py-3 font-medium text-white transition hover:bg-[#8338ec]"
              >
                Publish item
              </button>
            </section>
          </div>
        </form>
      </div>
    </main>
  )
}