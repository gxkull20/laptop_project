export default function LoadingSpinner({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-white/50">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-accent-blue" />
      <p className="text-sm">{label}</p>
    </div>
  )
}
