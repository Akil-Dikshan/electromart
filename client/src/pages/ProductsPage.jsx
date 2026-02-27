import { useState, useEffect } from 'react'
import { getProducts } from '../api/products'
import ProductCard from '../components/ProductCard'

function ProductsPage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts()
                setProducts(data.products)
                setLoading(false)
            } catch (error) {
                setError('Failed to load products')
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])
    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500 text-lg">Loading products...</p>
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

                {/* Header */}
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    All Products
                </h1>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default ProductsPage