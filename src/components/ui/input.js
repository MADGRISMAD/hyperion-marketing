export function Input({ className = '', ...props }) {
    return (
      <input
        className={`w-full rounded-md border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${className}`}
        {...props}
      />
    )
  }
  