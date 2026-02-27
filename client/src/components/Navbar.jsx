import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <Link to="/" className="text-2xl font-bold text-blue-400">
          ElectroMart
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link to="/products" className="hover:text-blue-400 transition-colors">
            Products
          </Link>
        </div>

      </div>
    </nav>
  )
}

export default Navbar