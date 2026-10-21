
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function HomeHero() {
  return (
    <section className="bg-[#FFFFFF]">
      <div className="mx-auto grid min-h-[100px] max-w-[1400px] items-center gap-8 px-6 py-10 sm:px-10 md:min-h-[440px] md:grid-cols-2 md:gap-12 lg:px-16 mb-5">

        <div className="max-w-xl py-4 md:py-8">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-[#9747FF]">
            A more thoughtful way to shop
          </p>

          <h1 className="font-serif text-4xl font-normal leading-[1.15] tracking-tight text-[#29251f] sm:text-5xl lg:text-6xl">
            Good things
            <br />
            deserve
            <br />
            <span className="italic text-[#9747FF]">another story.</span>
          </h1>

          <p className="mt-6 max-w-md text-sm leading-7 text-[#77716a] sm:text-base">
            Discover pre-loved pieces with character.
            Sell what you no longer wear and find something
            you'll love for years to come.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              to="/sell"
              className="inline-flex items-center gap-3 rounded-lg bg-[#9747FF] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#7e35df]"
            >
              Sell an item
              <ArrowUpRight size={17} strokeWidth={1.7} />
            </Link>

            <Link
              to="/"
              className="border-b border-[#b9b0a5] pb-1 text-sm text-[#514a41] transition hover:border-[#9747FF] hover:text-[#9747FF]"
            >
              Explore collection
            </Link>
          </div>

          <div className="mt-9 flex items-center gap-3 text-xs tracking-wide text-[#8a8379]">
            <span className="h-px w-8 bg-[#c7b9d8]" />
            PRE-LOVED. RE-IMAGINED.
          </div>
        </div>

        <div className="relative h-[260px] overflow-hidden sm:h-[320px] md:h-[360px] lg:h-[390px]">
          <img
            src="https://plus.unsplash.com/premium_photo-1661456268709-bac8e7f21e51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
            alt="Timeless fashion and personal style"
            className="h-full w-full object-cover object-center"
          />

          <div className="absolute bottom-4 left-4 bg-[#f8f6f2]/95 px-4 py-3 sm:bottom-6 sm:left-6">
            <p className="font-serif text-lg text-[#29251f]">
              Style lives on.
            </p>
            <p className="mt-1 text-xs text-[#77716a]">
              Find your next favourite.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}