
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell,
  Heart,
  Package,
  Users,
  CheckCheck,
  ShoppingBag,
} from 'lucide-react'

const initialNotifications = [
  {
    id: 1,
    type: 'likes',
    title: 'Someone liked your item',
    message: 'Maria liked your Levi’s 501 Jeans.',
    item: "Levi's 501 Jeans",
    itemId: 1,
    time: '10 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'following',
    title: 'A new item was posted',
    message: 'Sofia, a seller you follow, added a new item.',
    item: 'View Sofia’s latest items',
    itemId: 1,
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    type: 'sold',
    title: 'A favorite item was sold',
    message: 'An item you saved is no longer available.',
    item: "Levi's 501 Jeans",
    itemId: 1,
    time: 'Yesterday',
    read: true,
  },
]

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Likes', value: 'likes' },
  { label: 'Following', value: 'following' },
  { label: 'Favorites sold', value: 'sold' },
]

function getNotificationIcon(type) {
  if (type === 'likes') return <Heart size={20} />
  if (type === 'following') return <Users size={20} />
  return <ShoppingBag size={20} />
}

export default function Notifications() {
  const [notifications, setNotifications] = useState(
    initialNotifications
  )
  const [activeFilter, setActiveFilter] = useState('all')

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length

  const filteredNotifications = notifications.filter(
    (notification) =>
      activeFilter === 'all' ||
      notification.type === activeFilter
  )

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    )
  }

  function markAsRead(id) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-10 sm:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <Bell size={28} className="text-[#9747FF]" />
            <h1 className="text-3xl font-bold text-gray-900">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-[#9747FF]">
                {unreadCount} new
              </span>
            )}
          </div>

          <p className="text-sm text-gray-500">
            Stay updated on your items and the people you follow.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="flex items-center gap-2 text-sm font-medium text-[#9747FF] hover:text-purple-800"
          >
            <CheckCheck size={18} />
            Mark all as read
          </button>
        )}
      </div>

    
      <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-200 pb-5">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setActiveFilter(filter.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeFilter === filter.value
                ? 'bg-[#9747FF] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-[#9747FF]'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

    
      {filteredNotifications.length > 0 ? (
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex gap-4 rounded-xl border border-gray-200 px-5 py-6 transition ${
                !notification.read
                  ? 'bg-purple-50/70'
                  : 'bg-white'
              }`}
            >

              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                  notification.type === 'likes'
                    ? 'bg-pink-100 text-pink-600'
                    : notification.type === 'following'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-purple-100 text-[#9747FF]'
                }`}
              >
                {getNotificationIcon(notification.type)}
              </div>

           
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h2 className="font-semibold text-gray-900">
                    {notification.title}
                  </h2>

                  {!notification.read && (
                    <span
                      className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#9747FF]"
                      title="Unread"
                    />
                  )}
                </div>

                <p className="mt-1 text-sm leading-6 text-gray-600">
                  {notification.message}
                </p>

                <Link
                  to={`/item/${notification.itemId}`}
                  onClick={() => markAsRead(notification.id)}
                  className="mt-2 inline-block text-sm font-medium text-[#9747FF] hover:underline"
                >
                  {notification.item}
                </Link>

                <p className="mt-2 text-xs text-gray-400">
                  {notification.time}
                </p>
              </div>

              {!notification.read && (
                <button
                  type="button"
                  onClick={() => markAsRead(notification.id)}
                  className="shrink-0 self-start text-xs text-gray-500 hover:text-[#9747FF]"
                  aria-label="Mark notification as read"
                  title="Mark as read"
                >
                  <CheckCheck size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-20 text-center">
          <div className="mb-4 rounded-full bg-purple-50 p-5">
            <Package size={36} className="text-[#9747FF]" />
          </div>

          <h2 className="text-xl font-semibold text-gray-900">
            You're all caught up!
          </h2>

          <p className="mt-2 max-w-sm text-sm text-gray-500">
            There are no notifications in this category right now.
          </p>
        </div>
      )}
    </main>
  )
}