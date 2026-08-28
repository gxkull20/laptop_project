import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="section mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-6xl font-700 text-gradient">404</p>
      <h1 className="mt-4 font-display text-2xl font-700 text-white">Page not found</h1>
      <p className="mt-2 text-sm text-white/50">The page you're looking for doesn't exist or was moved.</p>
      <Link to="/" className="focus-ring mt-6 rounded-lg bg-brand-gradient px-6 py-3 text-sm font-semibold text-white">
        Back to Home
      </Link>
    </div>
  )
}
