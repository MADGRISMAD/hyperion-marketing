export function Button({ children, className = '', ...props }) {
    return (
      <button
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors 
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
          disabled:opacity-50 disabled:pointer-events-none ring-offset-background 
          bg-green-500 hover:bg-green-600 text-black px-4 py-2 ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
  