import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const NewArrivals = ({ products = [] }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <section className="bg-white w-full py-12 pb-24 relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-10 max-w-[1600px] relative">
                {/* Header */}
                <h2 className="text-[28px] font-bold text-[#2B3445] mb-8">New Arrivals</h2>

                {/* Carousel Wrapper to contain relative nav buttons */}
                <div className="relative">
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

                    {/* Absolute Navigation Buttons overlaying the carousel edge */}
                    <button
                        ref={prevRef}
                        className="absolute top-1/2 -translate-y-1/2 -left-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-[#9CA3AF] text-white hover:bg-[#2B3445] transition-colors disabled:opacity-0 shadow-sm cursor-pointer"
                    >
                        <ChevronLeft className="w-4 h-4 ml-[-2px]" />
                    </button>
                    <button
                        ref={nextRef}
                        className="absolute top-1/2 -translate-y-1/2 -right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-[#191D28] text-white hover:bg-black transition-colors disabled:opacity-0 shadow-sm cursor-pointer"
                    >
                        <ChevronRight className="w-4 h-4 mr-[-2px]" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NewArrivals;
