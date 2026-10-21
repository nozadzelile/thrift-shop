import {
  User,
  ChevronRight,
  Wallet,
  ShoppingBag,
  Package,
} from 'lucide-react'
import BalancePanel from "../components/BalancePanel";
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Account() {
  const [profile, setProfile] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem('vuvuli-profile')) || {}
  } catch {
    return {}
  }
})

useEffect(() => {
  const updateProfile = () => {
    try {
      setProfile(
        JSON.parse(localStorage.getItem('vuvuli-profile')) || {}
      )
    } catch {
      setProfile({})
    }
  }

  window.addEventListener('focus', updateProfile)

  return () => window.removeEventListener('focus', updateProfile)
}, [])


return (
  <main className="min-h-[calc(100vh-150px)] bg-[#fafafa] px-[30px] pt-10 pb-[60px]">
    <div className="mx-auto max-w-[1200px]">
      <h1 className="mb-[25px] text-[28px] font-semibold">
        My Account
      </h1>

      <div className="grid grid-cols-1 items-start gap-[25px] lg:grid-cols-[500px_1fr]">

        <aside className="flex flex-col gap-5">

          <div className="flex items-center gap-4 rounded-[4px] bg-white p-6">
            {profile.image ? (
              <img
                src={profile.image}
                alt="Profile"
                className="h-16 w-16 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#f3eaff] text-[#9747FF]">
                <User size={28} />
              </div>
            )}

            <div className="min-w-0">
              <h2 className="font-semibold">
                {profile.name || 'Your name'}
              </h2>
              <p className="text-sm text-gray-500">
                {profile.location || 'Add your location'}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Member since October 2026
              </p>
            </div>
          </div>

          <div className="rounded-[4px] bg-white p-6">
            <h2 className="mb-5 text-lg font-semibold">
              Personal information
            </h2>

            <div className="flex flex-col">
              <div className="border-b border-[#eeeeee] py-[17px]">
                <span className="block text-xs text-[#888]">Name</span>
                <strong className="break-words text-sm font-medium text-[#222]">
                  {profile.name || 'Your name'}
                </strong>
              </div>

              <div className="border-b border-[#eeeeee] py-[17px]">
                <span className="block text-xs text-[#888]">Email</span>
                <strong className="break-words text-sm font-medium text-[#222]">
                  lile@example.com
                </strong>
              </div>

              <div className="border-b border-[#eeeeee] py-[17px]">
                <span className="block text-xs text-[#888]">
                  Phone number
                </span>
                <strong className="break-words text-sm font-medium text-[#222]">
                  +34 600 000 000
                </strong>
              </div>

              <div className="py-[17px]">
                <span className="block text-xs text-[#888]">Region</span>
                <strong className="break-words text-sm font-medium text-[#222]">
                  {profile.location || 'Spain'}
                </strong>
              </div>
            </div>

            <div className="mt-6 flex flex-col">
              <Link
                to="/edit-profile"
                className="flex items-center justify-between border-b border-gray-100 py-4 text-sm text-gray-700 transition hover:text-[#9747FF]"
              >
                <span>Edit Profile</span>
                <ChevronRight size={19} />
              </Link>

              <button
                type="button"
                className="flex items-center justify-between border-b border-gray-100 py-4 text-left text-sm text-gray-700 transition hover:text-[#9747FF]"
              >
                <span>Payments</span>
                <ChevronRight size={19} />
              </button>

              <button
                type="button"
                className="flex items-center justify-between border-b border-gray-100 py-4 text-left text-sm text-gray-700 transition hover:text-[#9747FF]"
              >
                <span>Password</span>
                <ChevronRight size={19} />
              </button>

              <button
                type="button"
                className="flex items-center justify-between py-4 text-left text-sm text-gray-700 transition hover:text-[#9747FF]"
              >
                <span>Settings</span>
                <ChevronRight size={19} />
              </button>
            </div>
          </div>
        </aside>

        <section className="flex flex-col gap-5">
          <div className="rounded-[4px] bg-white p-6">
            <BalancePanel />
          </div>
        </section>

      </div>
    </div>
  </main>
)
}