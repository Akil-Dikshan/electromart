import React from 'react';
import ProductCard from './ProductCard';

const JustForYou = ({ products = [] }) => {
    return (
        <section className="bg-white w-full pb-12">
            <div className="container mx-auto px-6 lg:px-10 max-w-[1600px]">
                {/* Header */}
                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-[28px] font-bold text-[#2B3445]">Just for you</h2>
                    <a href="#" className="flex items-center text-[#2B3445] text-sm font-medium hover:underline hover:text-black transition-colors mb-2">
                        Show More <span className="ml-1 text-[16px] leading-none mb-0.5">&rarr;</span>
                    </a>
                </div>

                {/* 4-column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                    {products.map((product) => (
                        <div key={product._id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JustForYou;
