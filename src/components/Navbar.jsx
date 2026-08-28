import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Search, ShoppingCart, User, LogOut } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/categories', label: 'Categories' },
  { to: '/brands', label: 'Brands' },
  { to: '/offers', label: 'Offers' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { cartCount } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function submitSearch(e) {
    e.preventDefault()
    setSearchOpen(false)
    setOpen(false)
    navigate(query.trim() ? `/products?q=${encodeURIComponent(query.trim())}` : '/products')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-base-950/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-display text-xl font-700 tracking-tight text-white">
          Laptop<span className="text-gradient">Hub</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `focus-ring rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-white/60 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  {l.label}
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-brand-gradient" />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
            className="focus-ring rounded-full p-2 text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            <Search size={19} />
          </button>

          <Link
            to="/cart"
            aria-label="Cart"
            className="focus-ring relative rounded-full p-2 text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            <ShoppingCart size={19} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-brand-gradient px-1 text-[10px] font-bold leading-none text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <button
              onClick={logout}
              aria-label="Log out"
              className="focus-ring hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white sm:flex"
            >
              <LogOut size={17} />
              <span className="hidden md:inline">Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              aria-label="Login"
              className="focus-ring hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white sm:flex"
            >
              <User size={17} />
              <span className="hidden md:inline">Login</span>
            </Link>
          )}

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="focus-ring rounded-full p-2 text-white/70 transition hover:bg-white/5 hover:text-white lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-white/5 bg-base-950/95 px-4 py-3 sm:px-6 lg:px-8">
          <form onSubmit={submitSearch} className="mx-auto flex max-w-7xl gap-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search laptops, brands, specs…"
              className="focus-ring w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-white/40 outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-brand-gradient px-4 py-2 text-sm font-medium text-white"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {open && (
        <nav className="border-t border-white/5 bg-base-950 px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `focus-ring rounded-md px-3 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-white/5 text-white' : 'text-white/60'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            {user ? (
              <button
                onClick={() => {
                  logout()
                  setOpen(false)
                }}
                className="focus-ring rounded-md px-3 py-2.5 text-left text-sm font-medium text-white/60"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className="focus-ring rounded-md px-3 py-2.5 text-sm font-medium text-white/60"
              >
                Login
              </NavLink>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
