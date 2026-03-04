import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ProductFilters = ({ products, filters, setFilters }) => {
    // Extract unique categories and brands
    const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
    const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];

    // Find min and max prices from data (fallback if empty)
    const minPossiblePrice = products.length > 0 ? Math.floor(Math.min(...products.map(p => p.price))) : 0;
    const maxPossiblePrice = products.length > 0 ? Math.ceil(Math.max(...products.map(p => p.price))) : 1000;

    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [isPriceOpen, setIsPriceOpen] = useState(true);
    const [isBrandOpen, setIsBrandOpen] = useState(true);

    // Initialize price range if not set
    useEffect(() => {
        if (products.length > 0 && filters.priceRange[1] === Infinity) {
            setFilters(prev => ({ ...prev, priceRange: [minPossiblePrice, maxPossiblePrice] }));
        }
    }, [products, minPossiblePrice, maxPossiblePrice]);


    const handleCategoryChange = (val) => {
        setFilters(prev => {
            const current = prev.categories || [];
            if (current.includes(val)) {
                return { ...prev, categories: current.filter(c => c !== val) };
            } else {
                return { ...prev, categories: [...current, val] };
            }
        });
    };

    const handleBrandChange = (val) => {
        setFilters(prev => {
            const current = prev.brands || [];
            if (current.includes(val)) {
                return { ...prev, brands: current.filter(b => b !== val) };
            } else {
                return { ...prev, brands: [...current, val] };
            }
        });
    };

    const handlePriceChange = (index, value) => {
        const num = parseInt(value) || 0;
        setFilters(prev => {
            const newRange = [...prev.priceRange];
            newRange[index] = num;
            return { ...prev, priceRange: newRange };
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-6">

            {/* Categories */}
            {categories.length > 0 && (
                <div className="border-b border-gray-100 pb-5">
                    <button
                        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                        className="flex justify-between items-center w-full focus:outline-none cursor-pointer"
                    >
                        <h3 className="text-[16px] font-bold text-[#2B3445]">Categories</h3>
                        {isCategoryOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                    </button>

                    {isCategoryOpen && (
                        <div className="mt-4 space-y-2.5">
                            {categories.map(cat => (
                                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center justify-center w-[18px] h-[18px] border border-gray-300 rounded-[4px] group-hover:border-[#D23F57] transition-colors">
                                        <input
                                            type="checkbox"
                                            className="opacity-0 absolute inset-0 cursor-pointer"
                                            checked={(filters.categories || []).includes(cat)}
                                            onChange={() => handleCategoryChange(cat)}
                                        />
                                        {(filters.categories || []).includes(cat) && (
                                            <div className="w-[10px] h-[10px] bg-[#D23F57] rounded-[2px]" />
                                        )}
                                    </div>
                                    <span className="text-[15px] text-[#7D879C] group-hover:text-[#2B3445] transition-colors">{cat}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Price Range */}
            <div className="border-b border-gray-100 pb-5">
                <button
                    onClick={() => setIsPriceOpen(!isPriceOpen)}
                    className="flex justify-between items-center w-full focus:outline-none cursor-pointer"
                >
                    <h3 className="text-[16px] font-bold text-[#2B3445]">Price Range</h3>
                    {isPriceOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                </button>

                {isPriceOpen && (
                    <div className="mt-4 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex-1">
                                <label className="text-[12px] text-gray-400 font-medium mb-1 block">Min</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                                    <input
                                        type="number"
                                        value={filters.priceRange[0]}
                                        onChange={(e) => handlePriceChange(0, e.target.value)}
                                        className="w-full bg-[#F6F9FC] border border-transparent focus:border-gray-300 rounded-md py-2 pl-7 pr-3 text-[14px] text-[#2B3445] outline-none transition-colors"
                                    />
                                </div>
                            </div>
                            <span className="text-gray-300 mt-5">-</span>
                            <div className="flex-1">
                                <label className="text-[12px] text-gray-400 font-medium mb-1 block">Max</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                                    <input
                                        type="number"
                                        value={filters.priceRange[1] === Infinity ? maxPossiblePrice : filters.priceRange[1]}
                                        onChange={(e) => handlePriceChange(1, e.target.value)}
                                        className="w-full bg-[#F6F9FC] border border-transparent focus:border-gray-300 rounded-md py-2 pl-7 pr-3 text-[14px] text-[#2B3445] outline-none transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Brands */}
            {brands.length > 0 && (
                <div>
                    <button
                        onClick={() => setIsBrandOpen(!isBrandOpen)}
                        className="flex justify-between items-center w-full focus:outline-none cursor-pointer"
                    >
                        <h3 className="text-[16px] font-bold text-[#2B3445]">Brands</h3>
                        {isBrandOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                    </button>

                    {isBrandOpen && (
                        <div className="mt-4 space-y-2.5">
                            {brands.map(brand => (
                                <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center justify-center w-[18px] h-[18px] border border-gray-300 rounded-[4px] group-hover:border-[#D23F57] transition-colors">
                                        <input
                                            type="checkbox"
                                            className="opacity-0 absolute inset-0 cursor-pointer"
                                            checked={(filters.brands || []).includes(brand)}
                                            onChange={() => handleBrandChange(brand)}
                                        />
                                        {(filters.brands || []).includes(brand) && (
                                            <div className="w-[10px] h-[10px] bg-[#D23F57] rounded-[2px]" />
                                        )}
                                    </div>
                                    <span className="text-[15px] text-[#7D879C] group-hover:text-[#2B3445] transition-colors">{brand}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductFilters;
