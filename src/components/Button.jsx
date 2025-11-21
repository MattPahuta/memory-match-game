function Button({ children, handleClick }) {
  return (
    <button type="button" className="bg-blue-800 text-zinc-50 font-bold rounded-full px-5 py-3 shadow-xs cursor-pointer hover:bg-amber-400 hover:text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 transition" onClick={handleClick}>
      {children}
    </button>
  )
}

export default Button;