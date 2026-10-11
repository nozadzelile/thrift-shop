
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, Send, HandCoins } from "lucide-react";

export default function Messages() {
  const location = useLocation();
  const navigate = useNavigate();

  const item = location.state?.item;
  const [message, setMessage] = useState("");
  const [offer, setOffer] = useState("");
  const [showOffer, setShowOffer] = useState(
    location.state?.openOffer ?? false
  );
  const [chatMessages, setChatMessages] = useState([]);

  if (!item) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-10">
        <h1 className="text-2xl font-semibold">Your messages</h1>
        <p className="mt-3 text-sm text-gray-500">
          Open an item and select Message to start a conversation.
        </p>
        <Link to="/" className="mt-5 inline-block text-[#9747FF]">
          Browse items
        </Link>
      </main>
    );
  }

  const sendMessage = () => {
    if (!message.trim()) return;

    setChatMessages((previous) => [
      ...previous,
      { type: "text", text: message.trim() },
    ]);
    setMessage("");
  };

  const sendOffer = () => {
    const amount = Number(offer);

    if (!amount || amount <= 0 || amount >= item.price) return;

    setChatMessages((previous) => [
      ...previous,
      { type: "offer", amount },
    ]);
    setOffer("");
    setShowOffer(false);
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-5 flex items-center gap-2 text-sm text-gray-500 hover:text-[#9747FF]"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="grid min-h-[650px] overflow-hidden rounded-xl border border-[#e5e5e5] bg-white md:grid-cols-[300px_1fr]">
  
        <aside className="border-b border-[#e5e5e5] p-5 md:border-b-0 md:border-r">
          <h1 className="mb-5 text-xl font-semibold">Messages</h1>

          <div className="flex items-center gap-3 rounded-lg bg-[#f8f5ff] p-3">
            <img
              src={item.seller.image}
              alt={item.seller.name}
              className="h-11 w-11 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="truncate font-medium">{item.seller.name}</p>
              <p className="text-xs text-gray-500">
                About: {item.title}
              </p>
            </div>
          </div>
        </aside>

        <section className="flex min-w-0 flex-col">
          <header className="flex items-center gap-3 border-b border-[#e5e5e5] p-4">
            <img
              src={item.seller.image}
              alt={item.seller.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold">{item.seller.name}</h2>
              <p className="text-xs text-gray-500">
                {item.seller.location}
              </p>
            </div>
          </header>

          <div className="flex items-center gap-3 border-b border-[#e5e5e5] bg-gray-50 p-4">
          <Link
          to={`/item/${item.id}`}
          className="flex min-w-0 flex-1 items-center gap-3">
            <img
              src={item.image}
              alt={item.title}
              className="h-16 w-14 rounded-md object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{item.title}</p>
              <p className="mt-1 text-sm text-gray-500">
                Listed for €{item.price.toFixed(2)}
              </p>
            </div>
            </Link>
            <button
              type="button"
              onClick={() => setShowOffer((current) => !current)}
              className="flex shrink-0 items-right gap-2 rounded-lg border border-[#9747FF] px-3 py-2 text-sm text-[#9747FF] hover:bg-[#f8f5ff]"
            >
              <HandCoins size={16} />
              Make an offer
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-white p-5">
           

            {chatMessages.map((chatMessage, index) => (
              <div
                key={index}
                className="max-w-[85%] self-end rounded-xl rounded-br-sm bg-[#f1e8ff] p-3 text-sm"
              >
                {chatMessage.type === "text" ? (
                  chatMessage.text
                ) : (
                  <div className="min-w-[190px]">
                    <p className="font-medium text-[#9747FF]">
                      Offer sent
                    </p>
                    <p className="my-2 text-2xl font-semibold">
                      €{chatMessage.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Listed price: €{item.price.toFixed(2)}
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      Waiting for the seller's response
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

         
          {showOffer && (
            <div className="border-t border-[#e5e5e5] bg-[#fcfaff] p-4">
              <h3 className="mb-3 font-medium">Make an offer</h3>

              <div className="mb-4 grid grid-cols-3 gap-2">
                {[2, 5, 10].map((discount) => {
                  const price = Math.max(item.price - discount, 0);

                  return (
                    <button
                      key={discount}
                      type="button"
                      onClick={() => setOffer(price.toFixed(2))}
                      className="rounded-lg border border-[#e5e5e5] bg-white px-2 py-3 text-sm hover:border-[#9747FF] hover:text-[#9747FF]"
                    >
                      <span className="block font-medium">
                        €{price.toFixed(2)}
                      </span>
                      <span className="mt-1 block text-xs text-gray-500">
                        €{discount.toFixed(2)} off
                      </span>
                    </button>
                  );
                })}
              </div>

              <label
                htmlFor="offer-amount"
                className="mb-2 block text-sm text-gray-600"
              >
                Your offer (€)
              </label>

              <div className="flex gap-2">
                <input
                  id="offer-amount"
                  type="number"
                  min="0.01"
                  max={item.price - 0.01}
                  step="0.01"
                  value={offer}
                  onChange={(event) => setOffer(event.target.value)}
                  placeholder="Enter amount"
                  className="min-w-0 flex-1 rounded-lg border border-[#e5e5e5] px-3 py-3 outline-none focus:border-[#9747FF]"
                />
                <button
                  type="button"
                  onClick={sendOffer}
                  disabled={
                    !Number(offer) ||
                    Number(offer) <= 0 ||
                    Number(offer) >= item.price
                  }
                  className="rounded-lg bg-[#9747FF] px-4 py-3 text-sm font-medium text-white hover:bg-[#8338e8] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Send offer
                </button>
              </div>

              <p className="mt-2 text-xs text-gray-500">
                The seller can accept, decline, or make a counteroffer.
              </p>
            </div>
          )}

          
          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2 border-t border-[#e5e5e5] p-4"
          >
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write a message..."
              className="min-w-0 flex-1 rounded-full border border-[#e5e5e5] px-4 py-3 text-sm outline-none focus:border-[#9747FF]"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#9747FF] text-white hover:bg-[#8338e8] disabled:opacity-40"
            >
              <Send size={18} />
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}