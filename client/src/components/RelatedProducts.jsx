import React from 'react';
import ProductCard from './ProductCard';

const RelatedProducts = ({ products = [] }) => {
    if (!products || products.length === 0) return null;

    return (
        <section className="mt-4 w-full">
            <h3 className="text-[20px] font-bold text-[#2B3445] mb-8">Related Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(prod => (
                    <ProductCard key={prod._id} product={prod} />
                ))}
            </div>
        </section>
    );
};

export default RelatedProducts;
