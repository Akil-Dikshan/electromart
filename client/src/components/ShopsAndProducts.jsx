import React from 'react';
import ProductCard from './ProductCard';
import { Keyboard, ShoppingBag, Globe, Smartphone } from 'lucide-react';

const shops = [
    { id: 1, name: 'Keyboard Kiosk', icon: Keyboard, iconBg: 'bg-[#2B3445]', iconColor: 'text-white' },
    { id: 2, name: 'Anytime Buys', icon: ShoppingBag, iconBg: 'bg-[#2B3445]', iconColor: 'text-white' },
    { id: 3, name: 'Word Wide Wishes', icon: Globe, iconBg: 'bg-[#2B3445]', iconColor: 'text-white' },
    { id: 4, name: 'Cybershop', icon: Smartphone, iconBg: 'bg-[#2B3445]', iconColor: 'text-white' },
];

const ShopsAndProducts = ({ products = [] }) => {
    return (
        <section className="bg-white w-full py-12">
            <div className="container mx-auto px-6 lg:px-10 max-w-[1600px]">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Sidebar: Shops */}
                    <div className="w-full lg:w-[280px] shrink-0">
                        <div className="bg-[#FAFAFA] rounded-2xl p-7 flex flex-col border border-gray-100/60 shadow-sm h-full max-h-[500px]">
                            <h3 className="text-[#1F2937] font-medium text-[17px] mb-5 tracking-wide">Shops</h3>

                            <div className="flex flex-col gap-3.5 mb-8">
                                {shops.map((shop) => {
                                    const Icon = shop.icon;
                                    return (
                                        <button
                                            key={shop.id}
                                            className="flex items-center gap-3.5 w-full bg-[#EBEBEB] hover:bg-[#E2E2E2] transition-colors rounded-xl px-4 py-3 text-left group"
                                        >
                                            <span className={`w-8 h-8 rounded-full ${shop.iconBg} flex items-center justify-center shrink-0`}>
                                                <Icon className={`w-4 h-4 ${shop.iconColor}`} />
                                            </span>
                                            <span className="text-[#2B3445] text-[15px] font-medium">
                                                {shop.name}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-auto">
                                <button className="w-full bg-white text-[#2B3445] py-3.5 rounded-xl text-[14px] font-medium hover:bg-gray-50 transition-colors shadow-sm">
                                    View All Shops
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Area: Products Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ShopsAndProducts;
