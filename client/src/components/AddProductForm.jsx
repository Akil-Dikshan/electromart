import { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'

function AddProductForm({ onSuccess }) {
    const { getToken } = useAuth()
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: 'smartphones',
        brand: '',
        stock: '',
        isFeatured: false,
        isActive: true
    })
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const token = await getToken()
            let imageUrl = ''

            if (imageFile) {
                setUploading(true)
                const formData = new FormData()
                formData.append('image', imageFile)

                const uploadResponse = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/upload`,
                    {
                        method: 'POST',
                        headers: { Authorization: `Bearer ${token}` },
                        body: formData
                    }
                )
                const uploadData = await uploadResponse.json()
                imageUrl = uploadData.url
                setUploading(false)
            }

            const productData = {
                ...form,
                price: Number(form.price),
                originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
                stock: Number(form.stock),
                images: imageUrl ? [{ url: imageUrl, alt: form.name }] : []
            }

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/products`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(productData)
                }
            )

            const data = await response.json()

            if (data.success) {
                onSuccess()
            }

        } catch (error) {
            console.error('Failed to add product:', error)
        } finally {
            setSubmitting(false)
            setUploading(false)
        }
    }
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Product</h2>

            <form onSubmit={handleSubmit}>

                {/* Image Upload */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Image
                    </label>
                    <div className="flex items-center gap-4">
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-24 h-24 object-cover rounded-md"
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>
                </div>

                {/* Name */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Price and Original Price */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price ($)
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            required
                            min="0"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Original Price ($) — optional
                        </label>
                        <input
                            type="number"
                            name="originalPrice"
                            value={form.originalPrice}
                            onChange={handleChange}
                            min="0"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Category and Brand */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="smartphones">Smartphones</option>
                            <option value="laptops">Laptops</option>
                            <option value="tablets">Tablets</option>
                            <option value="audio">Audio</option>
                            <option value="cameras">Cameras</option>
                            <option value="gaming">Gaming</option>
                            <option value="accessories">Accessories</option>
                            <option value="televisions">Televisions</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Brand
                        </label>
                        <input
                            type="text"
                            name="brand"
                            value={form.brand}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Stock */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock
                    </label>
                    <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        required
                        min="0"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Checkboxes */}
                <div className="flex gap-6 mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={form.isFeatured}
                            onChange={handleChange}
                            className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-700">Featured Product</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={form.isActive}
                            onChange={handleChange}
                            className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-700">Active</span>
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {uploading ? 'Uploading Image...' : submitting ? 'Adding Product...' : 'Add Product'}
                </button>

            </form>
        </div>
    )
}

export default AddProductForm