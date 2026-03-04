import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, PhoneCall, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#191D28] text-white pt-16 pb-10">
            <div className="container mx-auto px-6 lg:px-10 max-w-[1600px]">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 xl:gap-8 mb-16">

                    {/* Brand & Contact Info */}
                    <div className="flex flex-col gap-6">
                        {/* Logo */}
                        <a href="#" className="flex items-center gap-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-2xl font-bold tracking-tight">ElectroMart</span>
                        </a>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-[280px]">
                            ElectroMart is your trusted destination for the latest electronics, smart gadgets, and high-performance devices. We deliver quality products at competitive prices with fast shipping and reliable customer support across Sri Lanka.
                        </p>
                        <ul className="flex flex-col gap-3 mt-2">
                            <li className="flex items-start gap-3 text-gray-400 text-sm">
                                <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-white" />
                                No,53/5A First Lane,Madpathala,Galle
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Mail className="w-5 h-5 shrink-0 text-white" />
                                Email: akildikshan02@gmail.com
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <PhoneCall className="w-5 h-5 shrink-0 text-white" />
                                Phone: +94 77 497 1011
                            </li>
                        </ul>
                        <div className="flex gap-4 mt-2">
                            <a href="#" className="w-10 h-10 rounded-full bg-[#2B3445] flex items-center justify-center text-white hover:bg-gray-600 transition-colors">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#2B3445] flex items-center justify-center text-white hover:bg-gray-600 transition-colors">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#2B3445] flex items-center justify-center text-white hover:bg-gray-600 transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#2B3445] flex items-center justify-center text-white hover:bg-gray-600 transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* About Us */}
                    <div className="flex flex-col gap-5">
                        <h4 className="text-lg font-semibold mb-2">About Us</h4>
                        <ul className="flex flex-col gap-4">
                            <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Our Stores</a></li>
                            <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Our Cares</a></li>
                            <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Terms & Conditions</a></li>
                            <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div className="flex flex-col gap-5">
                        <h4 className="text-lg font-semibold mb-2">Customer Care</h4>
                        <ul className="flex flex-col gap-4">
                            <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">How to Buy</a></li>
                            <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Track Your Order</a></li>
                            <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Corporate & Bulk Purchasing</a></li>
                            <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Returns & Refunds</a></li>
                        </ul>
                    </div>

                    {/* Contact Us Newsletter */}
                    <div className="flex flex-col gap-5">
                        <h4 className="text-lg font-semibold mb-2">Stay Connected</h4>
                        <p className="text-gray-400 text-sm leading-relaxed mb-2">
                            Subscribe to our newsletter to get updates on our latest offers!
                        </p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-[#2B3445] text-white placeholder-gray-400 px-4 py-3 rounded-lg border border-transparent focus:border-gray-500 focus:outline-none transition-colors"
                            />
                            <button
                                type="button"
                                className="w-full bg-white text-[#191D28] font-bold px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-200 text-sm">
                        © Copyright 2026 ElectroMart. All Rights Reserved.
                    </p>
                    <p className="text-yellow-200 text-md">
                        Developed by Akil Dikshan
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
