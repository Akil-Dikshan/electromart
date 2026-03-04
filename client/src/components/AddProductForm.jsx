import { useState, useRef } from 'react'
import { useAuth } from '@clerk/clerk-react'

function AddProductForm({ onSuccess }) {
    const { getToken } = useAuth()
    const [imageFiles, setImageFiles] = useState([])          // Array of File objects
    const [imagePreviews, setImagePreviews] = useState([])    // Array of preview URLs
    const [uploading, setUploading] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const fileInputRef = useRef()

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
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files)
        if (!files.length) return
        const newFiles = [...imageFiles, ...files]
        const newPreviews = [...imagePreviews, ...files.map(f => URL.createObjectURL(f))]
        setImageFiles(newFiles)
        setImagePreviews(newPreviews)
        // Reset input so the same file can be re-added if needed
        e.target.value = ''
    }

    const handleRemoveImage = (index) => {
        setImageFiles(imageFiles.filter((_, i) => i !== index))
        setImagePreviews(imagePreviews.filter((_, i) => i !== index))
    }

    const uploadAll = async (token) => {
        const urls = []
        for (const file of imageFiles) {
            const formData = new FormData()
            formData.append('image', file)
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            })
            const data = await res.json()
            urls.push(data.url)
        }
        return urls
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const token = await getToken()
            let images = []

            if (imageFiles.length > 0) {
                setUploading(true)
                const urls = await uploadAll(token)
                setUploading(false)
                images = urls.map(url => ({ url, alt: form.name }))
            }

            const productData = {
                ...form,
                price: Number(form.price),
                originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
                stock: Number(form.stock),
                images,
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(productData),
            })

            const data = await response.json()
            if (data.success) onSuccess()

        } catch (error) {
            console.error('Failed to add product:', error)
        } finally {
            setSubmitting(false)
            setUploading(false)
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-[20px] font-bold text-[#2B3445] mb-8">Add New Product</h2>

            <form onSubmit={handleSubmit}>

                {/* Image Upload */}
                <div className="mb-6">
                    <label className="block text-[14px] font-medium text-[#7D879C] mb-2">
                        Product Images
                    </label>

                    {/* Image Previews Grid */}
                    {imagePreviews.length > 0 && (
                        <div className="flex flex-wrap gap-3 mb-3">
                            {imagePreviews.map((src, i) => (
                                <div key={i} className="relative group">
                                    <div className="bg-[#F6F9FC] p-2 rounded-md border border-gray-100 w-[80px] h-[80px] flex items-center justify-center">
                                        <img src={src} alt={`preview-${i}`} className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(i)}
                                        className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow"
                                    >
                                        ×
                                    </button>
                                    {i === 0 && (
                                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#2B3445] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                                            MAIN
                                        </span>
                                    )}
                                </div>
                            ))}
                            {/* Add More tile */}
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-[80px] h-[80px] border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-[#7D879C] hover:border-[#2B3445] hover:text-[#2B3445] transition-colors cursor-pointer"
                            >
                                <span className="text-2xl leading-none mb-1">+</span>
                                <span className="text-[10px] font-semibold">Add</span>
                            </button>
                        </div>
                    )}

                    {/* Upload button when no images yet */}
                    {imagePreviews.length === 0 && (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#2B3445] transition-colors group"
                        >
                            <div className="text-4xl text-gray-300 group-hover:text-[#2B3445] transition-colors">🖼️</div>
                            <p className="text-[15px] font-semibold text-[#2B3445]">Click to upload images</p>
                            <p className="text-[13px] text-[#7D879C]">PNG, JPG, WEBP — you can select multiple</p>
                        </div>
                    )}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    {imagePreviews.length > 0 && (
                        <p className="text-[12px] text-[#7D879C] mt-1.5">{imagePreviews.length} image{imagePreviews.length > 1 ? 's' : ''} selected — first image is the main display image</p>
                    )}
                </div>

                {/* Name */}
                <div className="mb-6">
                    <label className="block text-[14px] font-medium text-[#7D879C] mb-2">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#F6F9FC] border border-transparent focus:border-gray-300 rounded-md px-4 py-2.5 text-[14px] text-[#2B3445] outline-none transition-colors"
                        placeholder="e.g. Samsung Galaxy S24 Ultra"
                    />
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="block text-[14px] font-medium text-[#7D879C] mb-2">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full bg-[#F6F9FC] border border-transparent focus:border-gray-300 rounded-md px-4 py-2.5 text-[14px] text-[#2B3445] outline-none transition-colors resize-none"
                        placeholder="Detailed product facts..."
                    />
                </div>

                {/* Price and Original Price */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-[14px] font-medium text-[#7D879C] mb-2">
                            Price (Rs.)
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            required
                            min="0"
                            className="w-full bg-[#F6F9FC] border border-transparent focus:border-gray-300 rounded-md px-4 py-2.5 text-[14px] text-[#2B3445] outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-[14px] font-medium text-[#7D879C] mb-2">
                            Original Price (Rs.) — optional
                        </label>
                        <input
                            type="number"
                            name="originalPrice"
                            value={form.originalPrice}
                            onChange={handleChange}
                            min="0"
                            className="w-full bg-[#F6F9FC] border border-transparent focus:border-gray-300 rounded-md px-4 py-2.5 text-[14px] text-[#2B3445] outline-none transition-colors"
                        />
                    </div>
                </div>

                {/* Category and Brand */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-[14px] font-medium text-[#7D879C] mb-2">
                            Category
                        </label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full bg-[#F6F9FC] border border-transparent focus:border-gray-300 rounded-md px-4 py-2.5 text-[14px] text-[#2B3445] outline-none transition-colors"
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
                        <label className="block text-[14px] font-medium text-[#7D879C] mb-2">
                            Brand
                        </label>
                        <input
                            type="text"
                            name="brand"
                            value={form.brand}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#F6F9FC] border border-transparent focus:border-gray-300 rounded-md px-4 py-2.5 text-[14px] text-[#2B3445] outline-none transition-colors"
                            placeholder="e.g. Samsung"
                        />
                    </div>
                </div>

                {/* Stock */}
                <div className="mb-6">
                    <label className="block text-[14px] font-medium text-[#7D879C] mb-2">
                        Stock
                    </label>
                    <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        required
                        min="0"
                        className="w-full bg-[#F6F9FC] border border-transparent focus:border-gray-300 rounded-md px-4 py-2.5 text-[14px] text-[#2B3445] outline-none transition-colors"
                    />
                </div>

                {/* Checkboxes */}
                <div className="flex gap-8 mb-8 mt-2">
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-[20px] h-[20px] border border-gray-300 rounded-[4px] group-hover:border-[#2B3445] transition-colors">
                            <input
                                type="checkbox"
                                name="isFeatured"
                                checked={form.isFeatured}
                                onChange={handleChange}
                                className="opacity-0 absolute inset-0 cursor-pointer"
                            />
                            {form.isFeatured && (
                                <div className="w-[12px] h-[12px] bg-[#2B3445] rounded-[2px]" />
                            )}
                        </div>
                        <span className="text-[15px] font-medium text-[#4B566B] group-hover:text-[#2B3445] transition-colors">Featured Product</span>
                    </label>
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-[20px] h-[20px] border border-gray-300 rounded-[4px] group-hover:border-[#2B3445] transition-colors">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={form.isActive}
                                onChange={handleChange}
                                className="opacity-0 absolute inset-0 cursor-pointer"
                            />
                            {form.isActive && (
                                <div className="w-[12px] h-[12px] bg-[#2B3445] rounded-[2px]" />
                            )}
                        </div>
                        <span className="text-[15px] font-medium text-[#4B566B] group-hover:text-[#2B3445] transition-colors">Active</span>
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#2B3445] text-white py-3.5 rounded-full hover:bg-[#191D28] transition-colors font-bold text-[15px] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-4"
                >
                    {uploading ? 'Uploading Images...' : submitting ? 'Adding Product...' : 'Add Product'}
                </button>

            </form>
        </div>
    )
}

export default AddProductForm