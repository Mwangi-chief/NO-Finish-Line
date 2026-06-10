import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const close = () => setMenuOpen(false)

  return (
    <header className="bg-[#E52D2F] p-4 text-white flex justify-between items-center sticky top-0 shadow-md z-50">
      <Link to="/" onClick={close}>
        <img src="/nfl-logo-transparent.png" alt="No Finish Line Logo" className="h-16 bg-[#E52D2F] p-2" />
      </Link>

      <button
        className="text-white text-2xl md:hidden focus:outline-none"
        onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen) }}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <div className="nav-item">
          <Link to="/about" className="hover:underline">About</Link>
          <div className="dropdown-menu">
            <Link to="/about#vision" onClick={close}>Vision</Link>
            <Link to="/about#mission" onClick={close}>Mission</Link>
            <Link to="/about#why-mental-health" onClick={close}>Why Mental Health</Link>
            <Link to="/about#history" onClick={close}>History</Link>
          </div>
        </div>
        <div className="nav-item">
          <Link to="/register" className="hover:underline">Register</Link>
          <div className="dropdown-menu">
            <Link to="/register#individualForm" onClick={close}>Individual Registration</Link>
            <Link to="/register#groupForm" onClick={close}>Group Registration</Link>
          </div>
        </div>
        <Link to="/volunteer" className="hover:underline">Volunteer</Link>
        <Link to="/faq" className="hover:underline">FAQ</Link>
        <Link to="/blog" className="hover:underline">Blog</Link>
        <Link to="/shop" className={`hover:underline${location.pathname === '/shop' ? ' font-bold underline' : ''}`}>Shop</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
      </nav>

      {/* Mobile Nav */}
      {menuOpen && (
        <div
          className="absolute top-full right-0 bg-[#E52D2F] text-white w-3/4 max-w-xs p-2 rounded-md z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <Link to="/" className="block py-2" onClick={close}>Home</Link>
          <Link to="/about" className="block py-2" onClick={close}>About</Link>
          <Link to="/register" className="block py-2" onClick={close}>Register</Link>
          <Link to="/volunteer" className="block py-2" onClick={close}>Volunteer</Link>
          <Link to="/faq" className="block py-2" onClick={close}>FAQ</Link>
          <Link to="/blog" className="block py-2" onClick={close}>Blog</Link>
          <Link to="/shop" className="block py-2 font-bold underline" onClick={close}>Shop</Link>
          <Link to="/contact" className="block py-2" onClick={close}>Contact</Link>
        </div>
      )}
    </header>
  )
}
