import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Settings } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const Hero = () => {
    const paginationRef = useRef(null);

    const slides = [
        {
            id: 1,
            title: "50% Off For Your\nFirst Shopping",
            subtitle: "Get Free Shipping on all orders over $99.00",
            buttonText: "Shop Now",
            // We will use a placeholder or image tag here
            imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop", // speaker-like
        },
        {
            id: 2,
            title: "50% Off For Your\nFirst Shopping",
            subtitle: "Get Free Shipping on all orders over $99.00",
            buttonText: "Shop Now",
            imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop", // earbuds-like
        }
    ];

    return (
        <div className="bg-white w-full relative">
            <div className="container mx-auto px-6 lg:px-10 max-w-[1600px] pt-4 pb-12 relative">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={50}
                    slidesPerView={1}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{
                        clickable: true,
                        el: '.custom-pagination',
                        bulletClass: 'swiper-custom-bullet',
                        bulletActiveClass: 'swiper-custom-bullet-active',
                    }}
                    className="w-full h-auto rounded-xl"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="flex flex-col md:flex-row items-center justify-between py-12 md:py-20 px-8 md:px-16 w-full min-h-[480px]">
                                {/* Left Text */}
                                <div className="w-full md:w-1/2 flex flex-col items-start z-10 text-left space-y-6">
                                    <h1 className="text-[48px] md:text-[56px] font-extrabold text-[#2B3445] leading-[1.15] whitespace-pre-line tracking-tight">
                                        {slide.title}
                                    </h1>
                                    <p className="text-[16px] text-[#2B3445] md:text-lg opacity-80 mt-2 mb-6">
                                        {slide.subtitle}
                                    </p>
                                    <button className="bg-[#191D28] hover:bg-[#2B3445] transition-colors text-white font-semibold py-3 px-8 rounded-md text-[15px]">
                                        {slide.buttonText}
                                    </button>
                                </div>

                                {/* Right Image */}
                                <div className="w-full md:w-1/2 flex justify-end mt-10 md:mt-0 relative h-64 md:h-[400px]">
                                    <img
                                        src={slide.imageUrl}
                                        alt="Product"
                                        className="object-contain h-full max-h-[400px] absolute right-0 bottom-0"
                                        style={{
                                            // using mix-blend-multiply to remove white backgrounds if any, making it look transparent
                                            mixBlendMode: 'darken'
                                        }}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Pagination */}
                <div className="custom-pagination flex justify-center mt-8 gap-2"></div>
            </div>

            {/* Settings Floating Button */}
            <div className="fixed right-6 bottom-6 bg-[#191D28] p-3.5 rounded-xl shadow-lg cursor-pointer hover:bg-black transition-colors z-50">
                <Settings className="w-6 h-6 text-white" />
            </div>

            <style jsx="true">{`
        .swiper-custom-bullet {
          width: 8px;
          height: 8px;
          background: #E5E7EB;
          border-radius: 50%;
          display: inline-block;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .swiper-custom-bullet-active {
          width: 24px;
          border-radius: 4px;
          background: #2B3445 !important;
        }
      `}</style>
        </div>
    );
};

export default Hero;
