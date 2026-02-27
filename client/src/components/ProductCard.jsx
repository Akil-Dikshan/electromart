import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      
      {/* Product Image */}
      <img
        src={product.images[0]?.url}
        alt={product.images[0]?.alt}
        className="w-full h-48 object-cover"
      />

      {/* Product Info */}
      <div className="p-4">
        
        {/* Brand */}
        <p className="text-sm text-gray-500 mb-1">{product.brand}</p>

        {/* Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Button */}
        <Link
          to={`/products/${product._id}`}
          className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>

      </div>
    </div>
  )
}

export default ProductCard