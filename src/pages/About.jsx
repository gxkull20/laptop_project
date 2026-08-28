const stats = [
  { label: 'Happy Customers', value: '48,000+' },
  { label: 'Products Available', value: '320+' },
  { label: 'Brands', value: '15+' },
  { label: 'Years of Experience', value: '9' },
]

export default function About() {
  return (
    <div className="section mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-700 text-white sm:text-4xl">About LaptopHub</h1>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-base-800/60 p-6">
          <h2 className="font-display text-lg font-600 text-white">Our Story</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            LaptopHub started as a small local repair shop that noticed the same problem over and over:
            people were overpaying for laptops they didn't need, and under-buying the ones they did. We
            built a store around honest specs and straight answers.
          </p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-base-800/60 p-6">
          <h2 className="font-display text-lg font-600 text-white">Our Mission</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Match every customer with the right machine for what they actually do — gaming, coursework,
            client work, or creative production — without upselling specs that won't get used.
          </p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-base-800/60 p-6">
          <h2 className="font-display text-lg font-600 text-white">Our Vision</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            To be the most trusted place online to buy a laptop — where the specs, prices, and reviews
            are exactly what they claim to be.
          </p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-base-800/60 p-6">
          <h2 className="font-display text-lg font-600 text-white">Why Choose Us</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li>• Transparent pricing, no hidden fees</li>
            <li>• Verified specs on every listing</li>
            <li>• Real support from people who use these machines</li>
            <li>• Easy returns within 30 days</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-6 rounded-2xl border border-white/8 bg-base-800/60 p-8 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-2xl font-700 text-gradient sm:text-3xl">{s.value}</div>
            <div className="mt-1 text-xs text-white/50">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
