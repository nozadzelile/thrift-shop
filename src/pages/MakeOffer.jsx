import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function MakeOffer() {
  const location = useLocation();
  const navigate = useNavigate();

  const item = location.state?.item;

  const [offer, setOffer] = useState("");

  if (!item) {
    return (
      <div className="mx-auto w-full max-w-[900px] px-5 py-10">
        <h1 className="text-2xl font-semibold">
          Item not found
        </h1>

        <Link
          to="/"
          className="mt-4 inline-block text-sm text-[#9747FF]"
        >
          Go back home
        </Link>
      </div>
    );
  }

  const offerAmount = Number(offer);

  const savings =
    offerAmount > 0
      ? Math.max(item.price - offerAmount, 0)
      : 0;

  return (
    <main className="mx-auto w-full max-w-[400px] px-5 py-10">

      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 cursor-pointer border-0 bg-transparent p-0 text-sm text-[#666] hover:text-[#9747FF] mt-0"
      >
        ← Back
      </button>

      <h1 className="mb-2 text-3xl font-semibold text-center">
        Make an offer
      </h1>

      {/* Item */}
      <div className="flex gap-5 rounded-lg border border-[#e5e5e5] p-5">
        <img
          src={item.image}
          alt={item.title}
          className="h-[120px] w-[96px] rounded-lg object-cover"
        />

        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-medium">
            {item.title}
          </h2>

          <p className="mt-2 text-sm text-[#777]">
            Listed for €{item.price.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-1">
        <div className="rounded-xl border border-[#eee7f7] bg-[#fbf9ff] p-4">
          <p className="mb-3 text-sm font-semibold text-[#332941] text-center">
            Quick offers
          </p>

          <div className="flex gap-2" role="group" aria-label="Choose a quick offer">
            {[2, 5, 10].map((discount) => {
              const offerPrice = Math.max(item.price - discount, 0);
              const offerValue = offerPrice.toFixed(2);
              const isSelected = offer === offerValue;

              return (
                <button
                  key={discount}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setOffer(offerValue)}
                  className={`flex-1 cursor-pointer rounded-lg border px-2 py-3 text-center transition-colors duration-200 ${
                    isSelected
                      ? 'border-[#9747FF] bg-white text-[#7134c3] shadow-sm'
                      : 'border-[#eee7f7] bg-white text-[#40384a] hover:border-[#c8a8ef]'
                  }`}
                >
                  <span className="block text-sm font-semibold">
                    €{offerValue}
                  </span>

                  <span className="mt-1 block text-xs text-[#777]">
                    −€{discount.toFixed(2)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Offer amount */}
      <div className="mt-4">
        <label
          htmlFor="offer"
          className="mb-3 block text-sm font-medium"
        >
          Your offer
        </label>

        <div className="flex items-center rounded-lg border border-[#dcdcdc] px-4 focus-within:border-[#9747FF]">
          <span className="text-lg text-[#555]">
            €
          </span>

          <input
            id="offer"
            type="number"
            min="0"
            step="0.01"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            placeholder="0.00"
            className="w-full border-0 bg-transparent px-3 py-4 text-lg outline-none"
          />
        </div>

        {offerAmount > 0 && offerAmount < item.price && (
          <p className="mt-3 text-sm text-[#777]">
            You save €{savings.toFixed(2)}
          </p>
        )}
      </div>

      {/* Information */}
      <div className="mt-1 rounded-lg bg-[#f8f8f8] p-5">
        <p className="text-sm leading-6 text-[#666]">
          Your offer will be sent directly to the seller.
          They can accept, decline, or make a counteroffer.
        </p>
      </div>

      {/* Make offer */}
      <button
        type="button"
        disabled={!offerAmount || offerAmount >= item.price}
        className="mt-3 w-full rounded-lg bg-[#9747FF] px-5 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#8338e8] disabled:cursor-not-allowed disabled:opacity-70"
      >
        Make an offer
      </button>

      {/* Cancel */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mt-2 w-full cursor-pointer border-0 bg-transparent py-3 text-sm text-[#666] hover:text-[#9747FF]"
      >
        Cancel
      </button>

    </main>
  );
}