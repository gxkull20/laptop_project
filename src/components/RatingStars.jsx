import { Star } from 'lucide-react'

export default function RatingStars({ rating = 0, size = 14 }) {
  const rounded = Math.round(Number(rating) * 2) / 2
  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${rating} out of 5`}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={size}
            className={n <= rounded ? 'fill-accent-blue text-accent-blue' : 'text-white/15'}
          />
        ))}
      </div>
      <span className="text-xs text-white/50">{Number(rating).toFixed(1)}</span>
    </div>
  )
}
