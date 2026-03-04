import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, large = false }) => {
    const { addToCart } = useCart();

    // Fallback image handling
    const imageUrl = product.images && product.images.length > 0
        ? product.images[0].url
        : 'https://via.placeholder.com/260';

    return (
        <div className={`group relative bg-[#fafafa] rounded-xl flex flex-col justify-between h-[490px] transition-shadow hover:shadow-lg duration-300 block ${large ? 'w-full max-w-[370px] mx-auto p-4' : 'p-6'}`}>
            {/* Discount Badge - can be derived from originalPrice if you want later */}
            <div className="absolute top-4 left-4 bg-[#E2E8F0] text-[#2B3445] text-[10px] font-bold px-2 py-1 rounded-full shadow-sm z-10 block">
                Sale
            </div>

            {/* Image Container */}
            <Link to={`/products/${product._id}`} className={`relative w-full flex-grow flex items-center justify-center overflow-hidden cursor-pointer block ${large ? 'mt-2 mb-4' : 'mt-8 mb-6'}`}>
                <img
                    src={imageUrl}
                    alt={product.name}
                    className={`${large ? 'w-full h-[320px] px-2' : 'max-h-[260px] max-w-[85%]'} object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply`}
                />

                {/* Hover Action Buttons */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 px-2 pb-2">
                    <button
                        onClick={(e) => {
                            e.preventDefault(); // prevent navigation
                            addToCart(product);
                        }}
                        className="flex-1 bg-[#191D28] text-white py-3 rounded-md text-[14px] font-semibold hover:bg-black transition-colors shadow-sm cursor-pointer"
                    >
                        Add To Cart
                    </button>
                    <button className="flex-1 bg-white text-[#2B3445] py-3 rounded-md text-[14px] font-semibold hover:bg-gray-50 transition-colors shadow-sm border border-gray-200 cursor-pointer">
                        Quick View
                    </button>
                </div>
            </Link>

            {/* Product Details */}
            <div className="text-center mt-auto flex flex-col items-center pb-4">
                <span className="text-[12px] text-gray-400 font-medium mb-2 uppercase tracking-widest">
                    {product.brand || 'Brand'}
                </span>
                <Link to={`/products/${product._id}`} className="text-[#2B3445] font-semibold text-[16px] mb-2.5 truncate w-full px-2 hover:text-blue-600 transition-colors block cursor-pointer">
                    {product.name}
                </Link>
                <div className="flex items-center gap-2">
                    <span className="text-[#2B3445] font-bold text-[18px]">
                        Rs. {product.price ? product.price.toFixed(2) : '0.00'}
                    </span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                            Rs. {product.originalPrice.toFixed(2)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
