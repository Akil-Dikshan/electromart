import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../api/products'
import AddProductForm from '../components/AddProductForm'
import { useUser, useAuth } from '@clerk/clerk-react'

function AdminPage() {
    const { user, isLoaded } = useUser()
    const { getToken } = useAuth()
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('products')

    const ADMIN_USER_ID = import.meta.env.VITE_ADMIN_USER_ID
    useEffect(() => {
        if (isLoaded && user?.id !== ADMIN_USER_ID) {
            navigate('/')
        }
    }, [isLoaded, user])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts()
                setProducts(data.products)
                setLoading(false)
            } catch (error) {
                console.error(error)
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])
    const handleDelete = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return
        try {
            const token = await getToken()
            await fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            })
            setProducts(products.filter(p => p._id !== productId))
        } catch (error) {
            console.error('Failed to delete product:', error)
        }
    }
    if (!isLoaded || loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500">Loading...</p>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
                    <p className="text-gray-500">Welcome, {user?.firstName}</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`px-6 py-2 rounded-md font-semibold transition-colors ${activeTab === 'products'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        All Products
                    </button>
                    <button
                        onClick={() => setActiveTab('add')}
                        className={`px-6 py-2 rounded-md font-semibold transition-colors ${activeTab === 'add'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Add Product
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'products' && (
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Product</th>
                                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Category</th>
                                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Price</th>
                                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Stock</th>
                                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Status</th>
                                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map(product => (
                                    <tr key={product._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={product.images[0]?.url}
                                                    alt={product.name}
                                                    className="w-12 h-12 object-cover rounded-md"
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-900">{product.name}</p>
                                                    <p className="text-sm text-gray-500">{product.brand}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 capitalize">{product.category}</td>
                                        <td className="px-6 py-4 text-gray-600">${product.price}</td>
                                        <td className="px-6 py-4 text-gray-600">{product.stock}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.isActive
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}>
                                                {product.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="text-red-500 hover:text-red-700 text-sm font-medium"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'add' && (
                    <AddProductForm onSuccess={() => {
                        setActiveTab('products')
                        getProducts().then(data => setProducts(data.products))
                    }} />
                )}

            </div>
        </div>
    )
}

export default AdminPage