import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { HiOutlineShoppingCart } from "react-icons/hi"
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

function Navbar() {
  const { cartCount } = useCart()

  return (
    <nav className="bg-gray-900 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-400">
          ElectroMart
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-blue-400 transition-colors">
            Home
          </Link>

          <Link to="/products" className="hover:text-blue-400 transition-colors">
            Products
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="relative hover:text-blue-400 transition-colors">
            <HiOutlineShoppingCart size={26} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth Buttons */}
          {/*<SignedOut> only renders its children if the user is NOT logged in.*/}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            { /*Shows the user's avatar.*/}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

      </div>
    </nav>
  )
}

export default Navbar