
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, ArrowRight } from 'lucide-react'
import { items } from '../data/items'

const initialOrders = [
  {
    id: 'VUV-1001',
    itemId: items[0]?.id,
    status: 'In progress',
    date: 'October 18, 2026',
    delivery: 'Preparing your order',
  },
  {
    id: 'VUV-1002',
    itemId: items[1]?.id,
    status: 'Shipped',
    date: 'October 16, 2026',
    delivery: 'On its way to you',
  },
  {
    id: 'VUV-1003',
    itemId: items[2]?.id,
    status: 'Delivered',
    date: 'October 10, 2026',
    delivery: 'Order delivered',
  },
  {
    id: 'VUV-1004',
    itemId: items[3]?.id,
    status: 'Cancelled',
    date: 'October 8, 2026',
    delivery: 'This order was cancelled',
  },
]

const tabs = [
  'All orders',
  'In progress',
  'Shipped',
  'Delivered',
  'Cancelled',
]

const statusStyles = {
  'In progress': 'bg-amber-50 text-amber-700',
  Shipped: 'bg-blue-50 text-blue-700',
  Delivered: 'bg-green-50 text-green-700',
  Cancelled: 'bg-red-50 text-red-600',
}

export default function MyOrders() {
  const [activeTab, setActiveTab] = useState('All orders')

  const orders = initialOrders
    .map((order) => ({
      ...order,
      item: items.find((item) => item.id === order.itemId),
    }))
    .filter((order) => order.item)

  const filteredOrders =
    activeTab === 'All orders'
      ? orders
      : orders.filter((order) => order.status === activeTab)

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            My orders
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Keep track of your purchases and deliveries.
          </p>
        </div>

        <div className="mb-6 flex gap-6 overflow-x-auto border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 border-b-2 pb-3 text-sm transition ${
                activeTab === tab
                  ? 'border-[#9747FF] font-semibold text-[#9747FF]'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {filteredOrders.length > 0 ? (
          <div className="flex flex-col gap-5">
            {filteredOrders.map((order) => (
              <article
                key={order.id}
                className="rounded-lg border border-gray-100 bg-white p-5 sm:p-6"
              >
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Order #{order.id}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Ordered on {order.date}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-medium ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link
                    to={`/item/${order.item.id}`}
                    className="flex min-w-0 flex-1 items-center gap-4"
                  >
                    <img
                      src={order.item.image}
                      alt={order.item.title}
                      className="h-28 w-24 shrink-0 rounded-md object-cover"
                    />

                    <div className="min-w-0">
                      <h2 className="font-medium text-gray-900">
                        {order.item.title}
                      </h2>
                      <p className="mt-2 text-lg font-semibold text-gray-900">
                        €{Number(order.item.price).toFixed(2)}
                      </p>
                      <p className="mt-2 text-sm text-gray-500">
                        {order.delivery}
                      </p>
                    </div>
                  </Link>

                  <Link
                    to={`/item/${order.item.id}`}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-[#9747FF] hover:text-[#9747FF]"
                  >
                    View item
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white px-5 text-center">
            <Package size={36} className="mb-4 text-gray-300" />
            <h2 className="font-semibold text-gray-900">
              No {activeTab.toLowerCase()} yet
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Your orders in this category will appear here.
            </p>
            <Link
              to="/"
              className="mt-5 rounded-md bg-[#9747FF] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#8338ec]"
            >
              Explore items
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}