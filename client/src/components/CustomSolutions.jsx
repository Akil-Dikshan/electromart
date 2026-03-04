import React from 'react';
import { ChevronRight } from 'lucide-react';

const solutions = [
    {
        id: 1,
        title: 'Accessories',
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop',
        className: 'lg:col-span-1 lg:row-span-2 min-h-[400px] lg:min-h-full'
    },
    {
        id: 2,
        title: 'Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop', // headphones
        className: 'h-[300px] lg:h-[420px]'
    },
    {
        id: 3,
        title: 'Turntables',
        image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop',
        className: 'h-[300px] lg:h-[420px]'
    },
    {
        id: 4,
        title: 'Speakers',
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop', // speaker
        className: 'h-[300px] lg:h-[420px]'
    },
    {
        id: 5,
        title: 'Earphones',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop', // earphones
        className: 'h-[300px] lg:h-[420px]'
    }
];

const CustomSolutions = () => {
    return (
        <section className="bg-white w-full py-12">
            <div className="container mx-auto px-6 lg:px-10 max-w-[1600px]">
                {/* Section Header */}
                <h2 className="text-[28px] font-bold text-[#2B3445] mb-8">
                    Custom solutions for your needs
                </h2>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[30px]">
                    {solutions.map((solution) => (
                        <div
                            key={solution.id}
                            className={`group relative rounded-xl overflow-hidden cursor-pointer ${solution.className}`}
                        >
                            {/* Image with zoom effect */}
                            <div className="absolute inset-0 bg-gray-200">
                                <img
                                    src={solution.image}
                                    alt={solution.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                />
                                {/* Subtle dark gradient overlay for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
                            </div>

                            {/* Card Content Overlay */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <div className="flex justify-between items-end">
                                    <h3 className="text-white font-bold text-[18px]">
                                        {solution.title}
                                    </h3>
                                    <button className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-[#2B3445] opacity-90 group-hover:opacity-100 shadow-sm transition-opacity">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomSolutions;
