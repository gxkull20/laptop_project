import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden border-b border-white/5">
      <img
        src="/images/hero-bg.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-base-950 via-base-950/70 to-base-950/30" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
            New arrivals dropping weekly
          </span>
          <h1 className="mt-6 font-display text-4xl font-700 leading-tight text-white sm:text-5xl lg:text-6xl">
            Find Your <span className="text-gradient">Perfect Laptop</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/60 sm:text-lg">
            Power. Performance. Innovation. Explore the latest laptops for work, study, gaming, and creativity.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="focus-ring rounded-lg bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:opacity-90"
            >
              Shop Now
            </Link>
            <Link
              to="/categories"
              className="focus-ring rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
