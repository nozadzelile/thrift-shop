
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Truck, CreditCard } from "lucide-react";

export default function BuyNow() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;

 
const [form, setForm] = useState({
  fullName: "",
  address: "",
  city: "",
  postalCode: "",
  payment: "card",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
});

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOrderPlaced(true);
  };

  if (!item) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <p className="mt-3 text-gray-500">
          Please choose an item before proceeding to checkout.
        </p>
        <Link to="/" className="mt-5 inline-block text-[#9747FF]">
          Browse items
        </Link>
      </main>
    );
  }

  if (orderPlaced) {
    return (
      <main className="mx-auto max-w-xl px-5 py-16 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f1e8ff] text-[#9747FF]">
          <ShieldCheck size={32} />
        </div>
        <h1 className="text-3xl font-semibold">Order placed!</h1>
        <p className="mt-3 text-gray-500">
          This is a demo confirmation. No payment has been processed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-7 rounded-lg bg-[#9747FF] px-6 py-3 text-white hover:bg-[#8338e8]"
        >
          Continue shopping
        </button>
      </main>
    );
  }

  const shipping = 0;
  const total = item.price + shipping;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link
        to={`/item/${item.id}`}
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#9747FF]"
      >
        <ArrowLeft size={18} />
        Back to item
      </Link>

      <h1 className="mb-2 text-3xl font-semibold">Checkout</h1>
      <p className="mb-8 text-sm text-gray-500">
        Complete your details to order this item.
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid gap-8 lg:grid-cols-[1fr_360px]"
      >
        <div className="space-y-6 bg-[#F9FAFD]">
          <section className="rounded-xl border border-gray-200 p-5 sm:p-6">
            <h2 className="mb-5 text-lg font-semibold">Delivery address</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium" htmlFor="fullName">
                  Full name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#9747FF]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium" htmlFor="address">
                  Street address
                </label>
                <input
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  autoComplete="street-address"
                  placeholder="Street and house number"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#9747FF]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  autoComplete="address-level2"
                  placeholder="Your city"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#9747FF]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="postalCode">
                  Postal code
                </label>
                <input
                  id="postalCode"
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  required
                  autoComplete="postal-code"
                  placeholder="Postal code"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#9747FF]"
                />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 p-5 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold">Payment method</h2>

            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={form.payment === "card"}
                onChange={handleChange}
                className="accent-[#9747FF]"
              />
              <CreditCard size={20} className="text-gray-500" />
              <span>
                <span className="block font-medium">Credit or debit card</span>
                <span className="text-sm text-gray-500">
                  Card payment UI placeholder
                </span>
              </span>
            </label>


{form.payment === "card" && (
  <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
    <h3 className="mb-4 font-semibold">Card details</h3>

    <div className="space-y-4">
      <div>
        <label
          htmlFor="cardName"
          className="mb-2 block text-sm font-medium"
        >
          Cardholder name
        </label>
        <input
          id="cardName"
          name="cardName"
          value={form.cardName}
          onChange={handleChange}
          required={form.payment === "card"}
          autoComplete="cc-name"
          placeholder="Name on card"
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#9747FF]"
        />
      </div>

      <div>
        <label
          htmlFor="cardNumber"
          className="mb-2 block text-sm font-medium"
        >
          Card number
        </label>
        <input
          id="cardNumber"
          name="cardNumber"
          type="text"
          inputMode="numeric"
          autoComplete="cc-number"
          maxLength={19}
          value={form.cardNumber}
          onChange={(event) => {
            const value = event.target.value
              .replace(/\D/g, "")
              .slice(0, 16)
              .replace(/(\d{4})(?=\d)/g, "$1 ");
            setForm({ ...form, cardNumber: value });
          }}
          required={form.payment === "card"}
          placeholder="1234 5678 9012 3456"
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#9747FF]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="expiry"
            className="mb-2 block text-sm font-medium"
          >
            Expiry date
          </label>
          <input
            id="expiry"
            name="expiry"
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM/YY"
            maxLength={5}
            value={form.expiry}
            onChange={(event) => {
              const value = event.target.value
                .replace(/\D/g, "")
                .slice(0, 4);
              const formatted =
                value.length > 2
                  ? `${value.slice(0, 2)}/${value.slice(2)}`
                  : value;
              setForm({ ...form, expiry: formatted });
            }}
            required={form.payment === "card"}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#9747FF]"
          />
        </div>

        <div>
          <label
            htmlFor="cvv"
            className="mb-2 block text-sm font-medium"
          >
            CVV
          </label>
          <input
            id="cvv"
            name="cvv"
            type="password"
            inputMode="numeric"
            autoComplete="cc-csc"
            maxLength={4}
            value={form.cvv}
            onChange={(event) =>
              setForm({
                ...form,
                cvv: event.target.value.replace(/\D/g, "").slice(0, 4),
              })
            }
            required={form.payment === "card"}
            placeholder="123"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#9747FF]"
          />
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Demo only. Don't enter real payment details.
      </p>
    </div>
  </div>
)}

            <p className="mt-4 text-xs text-gray-500">
              Demo only: this form does not collect card details or process payments.
            </p>
          </section>
        </div>

        <aside className="h-fit rounded-xl border border-gray-200 p-5 sm:p-6 bg-[#FFF]">
          <h2 className="mb-5 text-lg font-semibold">Order summary</h2>

          <div className="flex gap-4">
            <img
              src={item.image}
              alt={item.title}
              className="h-24 w-20 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-2 text-lg font-semibold">
                €{item.price.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="my-5 border-t border-gray-200" />

          <div className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Item price</span>
              <span>€{item.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Shipping</span>
              <span>Free</span>
            </div>
          </div>

          <div className="my-5 border-t border-gray-200" />

          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>€{total.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-[#9747FF] px-4 py-3 font-medium text-white hover:bg-[#8338e8]"
          >
            Place order
          </button>

          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
            <ShieldCheck size={15} />
            Secure checkout demo
          </p>
        </aside>
      </form>
    </main>
  );
}