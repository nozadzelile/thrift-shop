import { ChevronRight } from "lucide-react";
import "./BalancePanel.css";
import { useState } from "react";

const CUR = "₾";
const IMG = "https://placehold.co/200x200/e8dcc4/8a7a5a?text=%F0%9F%A7%A5";

const DEFAULT_SOLD = [
  {
    id: 1,
    title: "Fluffy vintage jacket",
    price: "80.00",
    status: "Sold on 12.20.2024",
    image: IMG,
  },
  {
    id: 2,
    title: "Leather shoulder bag",
    price: "120.00",
    status: "Sold on 12.18.2024",
    image: IMG,
  },
  {
    id: 3,
    title: "Vintage denim jacket",
    price: "65.00",
    status: "Sold on 12.15.2024",
    image: IMG,
  },
  {
    id: 4,
    title: "Classic wool coat",
    price: "+180.00",
    paid: true,
    status: "Paid on 12.12.2024",
    image: IMG,
  },
];

const DEFAULT_PURCHASED = [
  {
    id: 1,
    title: "Vintage leather belt",
    price: "45.00",
    status: "Delivered on 12.19.2024",
    image: IMG,
  },
  {
    id: 2,
    title: "Retro suede boots",
    price: "90.00",
    status: "Delivered on 12.16.2024",
    image: IMG,
  },
  {
    id: 3,
    title: "Minimal wool sweater",
    price: "55.00",
    status: "Delivered on 12.14.2024",
    image: IMG,
  },
];

const DEFAULT_ORDERS = [
  {
    id: 1,
    title: "Woven tote bag",
    price: "40.00",
    status: "Shipping today",
    image: IMG,
  },
  {
    id: 2,
    title: "Statement trench coat",
    price: "150.00",
    status: "In transit",
    image: IMG,
  },
];

const TransferIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 11V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8" />
    <path d="M3 9.5h18" />
    <path d="M6.5 14h2.5" />
    <path d="M17 21l4-4-4-4" />
    <path d="M21 17h-6" />
  </svg>
);

export default function BalancePanel({
  selling = "200.00",
  earned = "1200.00",
  inProgress = "+200.00",
  sold = DEFAULT_SOLD,
  onTransfer,
  onItemClick,
  onTabChange,
}) {
  const [activeTab, setActiveTab] = useState("balance");

  return (
    <>
      <div className="bp-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === "balance"}
          className={`bp-tab ${activeTab === "balance" ? "is-active" : ""}`}
          type="button"
          onClick={() => setActiveTab("balance")}
        >
          Your balance
        </button>

        <button
          role="tab"
          aria-selected={activeTab === "purchased"}
          className={`bp-tab ${activeTab === "purchased" ? "is-active" : ""}`}
          type="button"
          onClick={() => setActiveTab("purchased")}
        >
          You purchased
        </button>

        <button
          role="tab"
          aria-selected={activeTab === "orders"}
          className={`bp-tab ${activeTab === "orders" ? "is-active" : ""}`}
          type="button"
          onClick={() => setActiveTab("orders")}
        >
          Orders in progress
        </button>
      </div>

      {activeTab === "balance" && (
        <>
          <div className="bp-stats">
            <div className="bp-stat">
              <span className="bp-label">currently selling</span>
              <strong>
                {selling} {CUR}
              </strong>
            </div>

            <div className="bp-stat">
              <span className="bp-label">you've earned</span>
              <strong className="bp-earned">
                {earned} {CUR}
              </strong>
            </div>

            <div className="bp-stat">
              <span className="bp-label">in progress</span>
              <strong>
                {inProgress} {CUR}
              </strong>
            </div>
          </div>

          <button type="button" className="bp-transfer" onClick={onTransfer}>
            <TransferIcon />
            Transfer your earnings
          </button>

          <h3 className="bp-section">Sold items</h3>

          <div className="bp-list">
            {sold.map((item) => (
              <button
                key={item.id}
                type="button"
                className="bp-item"
                onClick={() => onItemClick?.(item)}
              >
                <img className="bp-img" src={item.image} alt={item.title} />

                <div className="bp-body">
                  <span className="bp-title">{item.title}</span>

                  <span className={`bp-price ${item.paid ? "bp-paid" : ""}`}>
                    {item.price}
                    {CUR}
                  </span>

                  <span className="bp-status">{item.status}</span>
                </div>

                <ChevronRight size={22} strokeWidth={2} className="bp-chev" />
              </button>
            ))}
          </div>

          <div className="bp-more-wrapper">
            <button
              type="button"
              className="bp-more"
              onClick={() => onTabChange?.("sold")}
            >
              More items...
              <ChevronRight size={17} />
            </button>
          </div>
        </>
      )}

      {activeTab === "purchased" && (
        <>
          <h3 className="bp-section bp-purchased-title">Your purchases</h3>

          <div className="bp-list">
            {DEFAULT_PURCHASED.map((item) => (
              <button
                key={item.id}
                type="button"
                className="bp-item"
                onClick={() => onItemClick?.(item)}
              >
                <img className="bp-img" src={item.image} alt={item.title} />

                <div className="bp-body">
                  <span className="bp-title">{item.title}</span>
                  <span className="bp-price">
                    {item.price}
                    {CUR}
                  </span>
                  <span className="bp-status">{item.status}</span>
                </div>

                <ChevronRight size={22} strokeWidth={2} className="bp-chev" />
              </button>
            ))}
          </div>

          <div className="bp-more-wrapper">
            <button type="button" className="bp-more">
              More items...
              <ChevronRight size={17} />
            </button>
          </div>
        </>
      )}

      {activeTab === "orders" && (
        <>
          <h3 className="bp-section">Orders in progress</h3>

          <div className="bp-list">
            {DEFAULT_ORDERS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="bp-item"
                onClick={() => onItemClick?.(item)}
              >
                <img className="bp-img" src={item.image} alt={item.title} />

                <div className="bp-body">
                  <span className="bp-title">{item.title}</span>
                  <span className="bp-price">
                    {item.price}
                    {CUR}
                  </span>
                  <span className="bp-status">{item.status}</span>
                </div>

                <ChevronRight size={22} strokeWidth={2} className="bp-chev" />
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}