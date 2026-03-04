import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProducts } from '../api/products'
import ProductCard from '../components/ProductCard'
import ProductFilters from '../components/ProductFilters'

function ProductsPage() {
    const [searchParams] = useSearchParams()
    const categoryParam = searchParams.get('category')
    const searchParam = searchParams.get('search') || ''

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filters, setFilters] = useState({
        categories: categoryParam ? [categoryParam] : [],
        brands: [],
        priceRange: [0, Infinity]
    });

    // Sync category filter with URL param
    useEffect(() => {
        setFilters(prev => ({
            ...prev,
            categories: categoryParam ? [categoryParam] : []
        }))
    }, [categoryParam])

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

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchCategory = filters.categories.length === 0 || filters.categories.includes(p.category);
            const matchBrand = filters.brands.length === 0 || filters.brands.includes(p.brand);
            const matchPrice = p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];
            const q = searchParam.toLowerCase();
            const matchSearch = !q || [p.name, p.brand, p.category, p.description]
                .some(field => field?.toLowerCase().includes(q));
            return matchCategory && matchBrand && matchPrice && matchSearch;
        });
    }, [products, filters, searchParam])

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
        <div className="min-h-screen bg-[#F6F9FC]">
            <div className="container mx-auto px-6 lg:px-10 max-w-[1600px] py-8">

                <h1 className="text-3xl font-bold text-[#2B3445] mb-8">
                    {searchParam
                        ? <>Results for <span className="text-[#D23F57]">"{searchParam}"</span></>
                        : categoryParam
                            ? <span className="capitalize">{categoryParam}</span>
                            : 'All Products'
                    }
                </h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className="w-full lg:w-1/4 flex-shrink-0">
                        <ProductFilters products={products} filters={filters} setFilters={setFilters} />
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                                <p className="text-xl text-[#2B3445] font-semibold mb-2">No products found</p>
                                <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                                <button
                                    onClick={() => setFilters({ categories: [], brands: [], priceRange: [0, Infinity] })}
                                    className="mt-6 bg-[#D23F57] text-white px-6 py-2.5 rounded-md hover:bg-[#b03549] transition-colors font-medium cursor-pointer"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product._id} product={product} large={true} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductsPage