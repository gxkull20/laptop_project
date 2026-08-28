export default function EmptyState({ title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-base-900/40 px-6 py-16 text-center">
      <h3 className="font-display text-lg font-600 text-white">{title}</h3>
      {message && <p className="mt-2 max-w-sm text-sm text-white/50">{message}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
