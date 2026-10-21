
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera, UserRound, X } from 'lucide-react'

const PROFILE_KEY = 'vuvuli-profile'

function readProfile() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY)) || {}
  } catch {
    return {}
  }
}

export default function EditProfile() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(() => {
    const saved = readProfile()

    return {
      name: saved.name || '',
      location: saved.location || '',
      bio: saved.bio || '',
      image: saved.image || '',
    }
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    setProfile((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''

    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Please choose an image smaller than 2 MB.')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setProfile((current) => ({
        ...current,
        image: reader.result,
      }))
      setError('')
    }

    reader.onerror = () => {
      setError('Could not load this image. Please try another one.')
    }

    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setProfile((current) => ({
      ...current,
      image: '',
    }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
      navigate('/account')
    } catch {
      setError('Could not save your profile. Try using a smaller photo.')
    }
  }

  const inputClass =
    'w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#9747FF] focus:ring-1 focus:ring-[#9747FF]'

  const labelClass = 'mb-2 block text-sm font-medium text-gray-800'

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/account"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-[#9747FF]"
        >
          <ArrowLeft size={18} />
          Back to account
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Edit profile
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Personalize your profile and let other members get to know you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg bg-white p-6 shadow-sm sm:p-8"
        >
          <section className="border-b border-gray-100 pb-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Profile picture
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Choose a photo that represents you.
            </p>

            <div className="mt-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <div className="relative grid h-28 w-28 shrink-0 place-items-center overflow-hidden rounded-full bg-[#f3eaff] text-[#9747FF]">
                {profile.image ? (
                  <img
                    src={profile.image}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound size={48} strokeWidth={1.2} />
                )}
              </div>

              <div>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#9747FF] px-4 py-2.5 text-sm font-medium text-[#9747FF] transition hover:bg-[#f8f3ff]">
                  <Camera size={17} />
                  Upload photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {profile.image && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="ml-3 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-red-500"
                  >
                    <X size={15} />
                    Remove
                  </button>
                )}

                <p className="mt-3 text-xs text-gray-500">
                  JPG, PNG, or another image format. Maximum 2 MB.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-5 py-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Personal information
            </h2>

            <div>
              <label htmlFor="name" className={labelClass}>
                Full name *
              </label>
              <input
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={inputClass}
                maxLength={60}
                required
              />
            </div>

            <div>
              <label htmlFor="location" className={labelClass}>
                Location
              </label>
              <input
                id="location"
                name="location"
                value={profile.location}
                onChange={handleChange}
                placeholder="e.g. Barcelona, Spain"
                className={inputClass}
                maxLength={100}
              />
            </div>

            <div>
              <label htmlFor="bio" className={labelClass}>
                About me
              </label>
              <textarea
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                placeholder="Tell the Vuvuli community a little about yourself..."
                rows={4}
                maxLength={300}
                className={`${inputClass} resize-y`}
              />
              <p className="mt-1 text-right text-xs text-gray-400">
                {profile.bio.length}/300
              </p>
            </div>
          </section>

          {error && (
            <p role="alert" className="mb-4 text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-100 pt-6 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate('/account')}
              className="rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-md bg-[#9747FF] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#8338ec]"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}