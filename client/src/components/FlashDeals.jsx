import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const FlashDeals = ({ products = [] }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <section className="bg-white w-full py-12">
            <div className="container mx-auto px-6 lg:px-10 max-w-[1600px]">
                {/* Header Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-[28px] font-bold text-[#2B3445]">Flash Deals</h2>

                    {/* Custom Navigation */}
                    <div className="flex gap-2">
                        <button
                            ref={prevRef}
                            className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-500 hover:bg-[#191D28] hover:text-white hover:border-[#191D28] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            ref={nextRef}
                            className="w-8 h-8 flex items-center justify-center rounded-md bg-[#191D28] border border-[#191D28] text-white hover:bg-black transition-colors cursor-pointer"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Carousel */}
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    slidesPerView={1}
                    spaceBetween={16}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 24 },
                        1024: { slidesPerView: 3, spaceBetween: 24 },
                        1280: { slidesPerView: 4, spaceBetween: 30 },
                        1536: { slidesPerView: 4, spaceBetween: 36 },
                    }}
                    className="w-full pb-4"
                >
                    {products.map((product) => (
                        <SwiperSlide key={product._id}>
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default FlashDeals;
