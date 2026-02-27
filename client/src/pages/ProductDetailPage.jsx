import Navbar from '@/components/Navbar'
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../api/products'


function ProductDetailPage() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id)
        setProduct(data.product)
        setLoading(false)
      } catch (error) {
        setError('Failed to load product')
        setLoading(false)
      }
    }

    fetchProduct()
    }, [id])
    if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500 text-lg">Loading product...</p>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500 text-lg">{error}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Product Image */}
            <div>
              <img
                src={product.images[0]?.url}
                alt={product.images[0]?.alt}
                className="w-full rounded-lg object-cover"
              />
            </div>

            {/* Product Info */}
            <div>
              <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Stock */}
              <p className="text-sm text-gray-500 mb-6">
                {product.stock > 0 ? (
                  <span className="text-green-600">
                    In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </p>

              {/* Add to Cart Button */}
              <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors text-lg font-semibold">
                Add to Cart
              </button>

            </div>
          </div>

          {/* Specifications */}
          {product.specifications && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
