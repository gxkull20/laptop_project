import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-base-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display text-lg font-700 text-white">
              Laptop<span className="text-gradient">Hub</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-white/50">
              Power. Performance. Innovation. Laptops for work, study, gaming, and creativity.
            </p>
            <div className="mt-4 flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="focus-ring rounded-full border border-white/10 p-2 text-white/50 transition hover:border-accent-blue/50 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-600 text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/50">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/products" className="hover:text-white">Products</Link></li>
              <li><Link to="/categories" className="hover:text-white">Categories</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-600 text-white">Customer Support</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/50">
              <li><a href="#" className="hover:text-white">Shipping</a></li>
              <li><a href="#" className="hover:text-white">Returns</a></li>
              <li><a href="#" className="hover:text-white">Warranty</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-600 text-white">Contact</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/50">
              <li>support@laptophub.com</li>
              <li>+1 (555) 019-2837</li>
              <li>221 Circuit Ave, San Francisco, CA</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} LaptopHub. All rights reserved.</p>
          <p>Built with React, Tailwind CSS, and Supabase.</p>
        </div>
      </div>
    </footer>
  )
}
