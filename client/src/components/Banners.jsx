import React from 'react';

const Banners = () => {
    return (
        <section className="bg-white w-full py-10">
            <div className="container mx-auto px-6 lg:px-10 max-w-[1600px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Latest Tech Collection Banner */}
                    <div className="relative rounded-xl overflow-hidden bg-[#FDF0C2] h-[340px] flex items-center">
                        {/* Image anchored to the right */}
                        <div className="absolute right-0 top-0 h-full w-[55%]">
                            <img
                                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop"
                                alt="Latest Tech Collection"
                                className="w-full h-full object-cover object-left"
                            />
                        </div>

                        {/* Text on left over the solid background */}
                        <div className="relative z-10 px-10 w-[50%]">
                            <h3 className="text-[#2B3445] text-2xl font-bold mb-3">Latest Tech Collection</h3>
                            <p className="text-[#2B3445] text-[13px] font-medium leading-relaxed mb-8 opacity-80 max-w-[220px]">
                                Discover the newest smartphones, laptops, gaming gear, and smart devices at unbeatable prices.
                            </p>
                            <button className="bg-[#191D28] text-white px-8 py-3 rounded-md text-[13px] font-semibold hover:bg-black transition-colors shadow-sm">
                                Shop Now
                            </button>
                        </div>
                    </div>

                    {/* Smart Deals & Essentials Banner */}
                    <div className="relative rounded-xl overflow-hidden bg-[#D8E3EC] h-[340px] flex items-center">
                        {/* Image anchored to the right */}
                        <div className="absolute right-0 top-0 h-full w-[55%]">
                            <img
                                src="https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=1000&auto=format&fit=crop"
                                alt="Smart Deals & Essentials"
                                className="w-full h-full object-cover object-left"
                            />
                        </div>

                        {/* Text on left over the solid background */}
                        <div className="relative z-10 px-10 w-[50%]">
                            <h3 className="text-[#2B3445] text-2xl font-bold mb-3">Smart Deals & Essentials</h3>
                            <p className="text-[#2B3445] text-[13px] font-medium leading-relaxed mb-8 opacity-80 max-w-[220px]">
                                Save up to 40% on headphones, accessories, home gadgets, and everyday tech must-haves.
                            </p>
                            <button className="bg-[#191D28] text-white px-8 py-3 rounded-md text-[13px] font-semibold hover:bg-black transition-colors shadow-sm">
                                Shop Now
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Banners;
