import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductInfo = ({ product }) => {
    const { addToCart } = useCart();

    if (!product) return null;

    const mainImage = product.images?.[0]?.url || 'https://via.placeholder.com/400';

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start">

            {/* Left: Product Images */}
            <div className="flex flex-col gap-6 w-full items-center">
                <div className="bg-[#F6F9FC] w-full flex items-center justify-center p-12 rounded-lg">
                    <img
                        src={mainImage}
                        alt={product.name}
                        className="w-full max-w-[400px] h-auto object-contain drop-shadow-md mix-blend-multiply"
                    />
                </div>

                {/* Thumbnails */}
                {product.images && product.images.length > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-2">
                        {product.images.map((img, idx) => (
                            <button key={img.url || idx} className="w-[50px] h-[50px] bg-white rounded-[8px] border border-[rgba(0,0,0,0.08)] hover:border-[#2B3445] transition-colors p-2 flex items-center justify-center shadow-sm opacity-60 hover:opacity-100">
                                <img src={img.url} alt={`thumb ${idx}`} className="w-full h-full object-contain mix-blend-multiply" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Right: Product Details */}
            <div className="flex flex-col pt-0 lg:pt-2">
                <h1 className="text-[30px] font-bold text-[#2B3445] mb-2 leading-tight tracking-[0.01em]">{product.name}</h1>

                <p className="text-[14px] text-[#AEB4BE] mb-1">
                    Brand: <strong className="text-[#373F50] font-bold font-sans">{product.brand || 'Generic'}</strong>
                </p>
                <p className="text-[14px] text-[#AEB4BE] mb-5">
                    Product Code: <strong className="text-[#373F50] font-bold font-sans">{product._id?.slice(-6).toUpperCase() || 'N/A'}</strong>
                </p>

                <p className="flex items-end gap-3 mb-4 text-[#2B3445] text-[25px] font-bold leading-none">
                    Rs. {product.price.toFixed(2)}
                    {product.originalPrice && (
                        <span className="text-[16px] text-[#7D879C] line-through font-normal pb-[2px]">
                            Rs. {product.originalPrice.toFixed(2)}
                        </span>
                    )}
                </p>

                <div className="mb-6">
                    {product.stock > 0 ? (
                        <p className="text-[14px] text-green-600 font-sans font-medium">In Stock ({product.stock} available)</p>
                    ) : (
                        <p className="text-[14px] text-red-600 font-sans font-medium">Out of Stock</p>
                    )}
                </div>

                <button
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className="bg-[#0F3460] disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-[#0a2342] text-white font-bold py-2.5 px-6 rounded-[8px] w-max transition-colors text-[14px] tracking-wide shadow-sm cursor-pointer"
                >
                    Add To Cart
                </button>

                <p className="mt-8 text-[14px] text-[#AEB4BE] font-sans">
                    Sold By:
                    <span className="ml-1 text-[#373F50]">
                        <strong className="font-bold">ElectroMart Official</strong>
                    </span>
                </p>

            </div>
        </div>
    );
};

export default ProductInfo;
