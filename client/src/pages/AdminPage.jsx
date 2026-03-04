import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../api/products'
import AddProductForm from '../components/AddProductForm'
import { useUser, useAuth } from '@clerk/clerk-react'

const CATEGORIES = ['smartphones', 'laptops', 'tablets', 'audio', 'cameras', 'gaming', 'accessories', 'televisions']

function EditModal({ product, onClose, onSave }) {
    const { getToken } = useAuth()
    const [form, setForm] = useState({
        category: product.category,
        price: product.price,
        stock: product.stock,
    })
    // Existing images from backend
    const [existingImages, setExistingImages] = useState(product.images || [])
    // New image files to upload
    const [newImageFiles, setNewImageFiles] = useState([])
    const [newImagePreviews, setNewImagePreviews] = useState([])
    const [saving, setSaving] = useState(false)
    const fileInputRef = useRef()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files)
        if (!files.length) return
        setNewImageFiles(prev => [...prev, ...files])
        setNewImagePreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))])
        e.target.value = ''
    }

    const handleRemoveExisting = (index) => {
        setExistingImages(existingImages.filter((_, i) => i !== index))
    }

    const handleRemoveNew = (index) => {
        setNewImageFiles(newImageFiles.filter((_, i) => i !== index))
        setNewImagePreviews(newImagePreviews.filter((_, i) => i !== index))
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const token = await getToken()

            // Upload new images
            const uploadedUrls = []
            for (const file of newImageFiles) {
                const formData = new FormData()
                formData.append('image', file)
                const uploadRes = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData,
                })
                const uploadData = await uploadRes.json()
                uploadedUrls.push({ url: uploadData.url, alt: product.name })
            }

            const allImages = [
                ...existingImages,
                ...uploadedUrls,
            ]

            const body = {
                category: form.category,
                price: Number(form.price),
                stock: Number(form.stock),
                images: allImages,
            }

            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${product._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(body),
            })
            const data = await res.json()
            if (data.success) {
                onSave(data.product)
                onClose()
            }
        } catch (err) {
            console.error('Failed to update product:', err)
        } finally {
            setSaving(false)
        }
    }

    const totalImages = existingImages.length + newImagePreviews.length

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#7D879C] hover:text-[#2B3445] text-2xl leading-none cursor-pointer"
                >
                    &times;
                </button>

                <h2 className="text-[18px] font-bold text-[#2B3445] mb-1">Edit Product</h2>
                <p className="text-[13px] text-[#7D879C] mb-6">{product.name}</p>

                {/* Images */}
                <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#7D879C] mb-2 uppercase tracking-wide">
                        Product Images <span className="normal-case font-normal text-[12px]">({totalImages} total)</span>
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {/* Existing images */}
                        {existingImages.map((img, i) => (
                            <div key={`ex-${i}`} className="relative group">
                                <div className="bg-[#F6F9FC] p-2 rounded-md border border-gray-100 w-[72px] h-[72px] flex items-center justify-center">
                                    <img src={img.url} alt={img.alt} className="w-full h-full object-contain mix-blend-multiply" />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveExisting(i)}
                                    className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow"
                                >
                                    ×
                                </button>
                                {i === 0 && existingImages.length > 0 && (
                                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#2B3445] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                                        MAIN
                                    </span>
                                )}
                            </div>
                        ))}

                        {/* New image previews */}
                        {newImagePreviews.map((src, i) => (
                            <div key={`new-${i}`} className="relative group">
                                <div className="bg-[#F6F9FC] p-2 rounded-md border-2 border-dashed border-blue-300 w-[72px] h-[72px] flex items-center justify-center">
                                    <img src={src} alt="new" className="w-full h-full object-contain mix-blend-multiply" />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveNew(i)}
                                    className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow"
                                >
                                    ×
                                </button>
                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                                    NEW
                                </span>
                            </div>
                        ))}

                        {/* Add more button */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-[72px] h-[72px] border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-[#7D879C] hover:border-[#2B3445] hover:text-[#2B3445] transition-colors cursor-pointer"
                        >
                            <span className="text-2xl leading-none">+</span>
                            <span className="text-[9px] font-semibold mt-0.5">Add</span>
                        </button>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    {newImageFiles.length > 0 && (
                        <p className="text-[12px] text-blue-500 mt-2">{newImageFiles.length} new image{newImageFiles.length > 1 ? 's' : ''} will be uploaded</p>
                    )}
                </div>

                {/* Category */}
                <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#7D879C] mb-2 uppercase tracking-wide">Category</label>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full bg-[#F6F9FC] border border-transparent focus:border-gray-300 rounded-md px-4 py-2.5 text-[14px] text-[#2B3445] outline-none transition-colors"
                    >
                        {CATEGORIES.map(c => (
                            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                        ))}
                    </select>
                </div>

                {/* Price & Stock */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-[13px] font-semibold text-[#7D879C] mb-2 uppercase tracking-wide">Price (Rs.)</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            min="0"
                            onChange={handleChange}
                            className="w-full bg-[#F6F9FC] border border-transparent focus:border-gray-300 rounded-md px-4 py-2.5 text-[14px] text-[#2B3445] outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-[13px] font-semibold text-[#7D879C] mb-2 uppercase tracking-wide">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={form.stock}
                            min="0"
                            onChange={handleChange}
                            className="w-full bg-[#F6F9FC] border border-transparent focus:border-gray-300 rounded-md px-4 py-2.5 text-[14px] text-[#2B3445] outline-none transition-colors"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 rounded-full font-semibold text-[14px] border border-gray-200 text-[#7D879C] hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex-1 py-2.5 rounded-full font-bold text-[14px] bg-[#2B3445] text-white hover:bg-[#191D28] transition-colors cursor-pointer disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    )
}


function AdminPage() {
    const { user, isLoaded } = useUser()
    const { getToken } = useAuth()
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('products')
    const [editingProduct, setEditingProduct] = useState(null)

    const ADMIN_USER_ID = import.meta.env.VITE_ADMIN_USER_ID

    useEffect(() => {
        if (isLoaded && user?.id !== ADMIN_USER_ID) {
            navigate('/')
        }
    }, [isLoaded, user])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = await getToken()
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/admin/all`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                const data = await res.json()
                setProducts(data.products)
                setLoading(false)
            } catch (error) {
                console.error(error)
                setLoading(false)
            }
        }
        if (isLoaded) fetchProducts()
    }, [isLoaded])

    const handleToggleActive = async (product) => {
        const action = product.isActive ? 'deactivate' : 'activate'
        if (!window.confirm(`Are you sure you want to ${action} "${product.name}"?`)) return
        try {
            const token = await getToken()
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${product._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ isActive: !product.isActive }),
            })
            const data = await res.json()
            if (data.success) {
                setProducts(products.map(p => p._id === product._id ? { ...p, isActive: !p.isActive } : p))
            }
        } catch (error) {
            console.error('Failed to toggle product status:', error)
        }
    }

    const handleDelete = async (productId) => {
        if (!window.confirm('Permanently delete this product? This cannot be undone.')) return
        try {
            const token = await getToken()
            await fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            })
            setProducts(products.filter(p => p._id !== productId))
        } catch (error) {
            console.error('Failed to delete product:', error)
        }
    }

    const handleSaveEdit = (updatedProduct) => {
        setProducts(products.map(p => p._id === updatedProduct._id ? updatedProduct : p))
    }

    if (!isLoaded || loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#F6F9FC]">
            <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-[#2B3445] border-t-transparent rounded-full animate-spin" />
                <p className="text-[#7D879C] text-[14px]">Loading admin panel...</p>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-[#F6F9FC]">
            {editingProduct && (
                <EditModal
                    product={editingProduct}
                    onClose={() => setEditingProduct(null)}
                    onSave={handleSaveEdit}
                />
            )}

            <div className="container mx-auto px-6 lg:px-10 max-w-[1600px] py-10">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-[28px] font-bold text-[#2B3445]">Admin Panel</h1>
                        <p className="text-[#7D879C] text-[14px] mt-0.5">{products.length} products total</p>
                    </div>
                    <p className="text-[#7D879C]">Welcome, {user?.firstName}</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`px-8 py-2.5 rounded-full font-semibold text-[15px] transition-colors shadow-sm ${activeTab === 'products'
                            ? 'bg-[#2B3445] text-white hover:bg-[#191D28]'
                            : 'bg-white text-[#7D879C] hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        All Products
                    </button>
                    <button
                        onClick={() => setActiveTab('add')}
                        className={`px-8 py-2.5 rounded-full font-semibold text-[15px] transition-colors shadow-sm ${activeTab === 'add'
                            ? 'bg-[#2B3445] text-white hover:bg-[#191D28]'
                            : 'bg-white text-[#7D879C] hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        Add Product
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'products' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-[#F6F9FC] border-b border-gray-100">
                                <tr>
                                    <th className="text-left px-6 py-4 text-[13px] font-semibold text-[#7D879C] uppercase tracking-wide">Product</th>
                                    <th className="text-left px-6 py-4 text-[13px] font-semibold text-[#7D879C] uppercase tracking-wide">Category</th>
                                    <th className="text-left px-6 py-4 text-[13px] font-semibold text-[#7D879C] uppercase tracking-wide">Price</th>
                                    <th className="text-left px-6 py-4 text-[13px] font-semibold text-[#7D879C] uppercase tracking-wide">Stock</th>
                                    <th className="text-left px-6 py-4 text-[13px] font-semibold text-[#7D879C] uppercase tracking-wide">Status</th>
                                    <th className="text-left px-6 py-4 text-[13px] font-semibold text-[#7D879C] uppercase tracking-wide">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map(product => (
                                    <tr key={product._id} className={`hover:bg-gray-50/50 transition-colors ${!product.isActive ? 'opacity-60' : ''}`}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-[#F6F9FC] p-2 rounded-md flex-shrink-0">
                                                    <img
                                                        src={product.images[0]?.url}
                                                        alt={product.name}
                                                        className="w-12 h-12 object-contain mix-blend-multiply"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-[#2B3445] text-[15px] leading-tight">{product.name}</p>
                                                    <p className="text-[12px] text-[#7D879C] uppercase tracking-wider mt-0.5">{product.brand}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-[#4B566B] capitalize text-[14px]">{product.category}</td>
                                        <td className="px-6 py-4 text-[#2B3445] font-semibold text-[14px]">Rs. {product.price.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-[#4B566B] font-medium text-[14px]">{product.stock}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide ${product.isActive
                                                ? 'bg-[#E8F6EA] text-[#33D067]'
                                                : 'bg-[#F3F4F6] text-[#9CA3AF]'
                                                }`}>
                                                {product.isActive ? 'ACTIVE' : 'INACTIVE'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {/* Edit */}
                                                <button
                                                    onClick={() => setEditingProduct(product)}
                                                    className="text-[13px] font-bold bg-[#F6F9FC] hover:bg-[#E8ECF2] text-[#2B3445] px-4 py-2 rounded-md transition-colors cursor-pointer border border-gray-200"
                                                >
                                                    Edit
                                                </button>
                                                {/* Activate / Deactivate */}
                                                <button
                                                    onClick={() => handleToggleActive(product)}
                                                    className={`text-[13px] font-bold px-4 py-2 rounded-md transition-colors cursor-pointer ${product.isActive
                                                        ? 'bg-amber-50 hover:bg-amber-100 text-amber-600 border border-amber-200'
                                                        : 'bg-green-50 hover:bg-green-100 text-green-600 border border-green-200'
                                                        }`}
                                                >
                                                    {product.isActive ? 'Deactivate' : 'Activate'}
                                                </button>
                                                {/* Delete */}
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="text-white text-[13px] font-bold bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors cursor-pointer"
                                                >
                                                    Delete
                                                </button>
                                            </div>
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