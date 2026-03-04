import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, User, List, ChevronRight, Smartphone, Laptop, Tablet, Headphones, Camera, Gamepad2, Plug, Tv } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import CartDrawer from './CartDrawer';
import { getProducts } from '../api/products';

const CATEGORIES = [
    { label: 'Smartphones', value: 'smartphones', Icon: Smartphone },
    { label: 'Laptops', value: 'laptops', Icon: Laptop },
    { label: 'Tablets', value: 'tablets', Icon: Tablet },
    { label: 'Audio', value: 'audio', Icon: Headphones },
    { label: 'Cameras', value: 'cameras', Icon: Camera },
    { label: 'Gaming', value: 'gaming', Icon: Gamepad2 },
    { label: 'Accessories', value: 'accessories', Icon: Plug },
    { label: 'Televisions', value: 'televisions', Icon: Tv },
];

const Navbar = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { cartCount } = useCart();
    const navigate = useNavigate();

    // Refs
    const cachedProductsRef = useRef(null); // lazy-loaded product cache
    const debounceRef = useRef(null);
    const searchWrapperRef = useRef(null);

    // Close dropdown when clicking outside the search area
    useEffect(() => {
        const handler = (e) => {
            if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
            clearTimeout(debounceRef.current);
        };
    }, []);

    // Fetch all products once, then cache
    const getOrFetchProducts = async () => {
        if (cachedProductsRef.current !== null) return cachedProductsRef.current;
        try {
            const data = await getProducts();
            cachedProductsRef.current = data.products || [];
        } catch {
            cachedProductsRef.current = [];
        }
        return cachedProductsRef.current;
    };

    const handleSearchChange = (e) => {
        const q = e.target.value;
        setSearchQuery(q);
        clearTimeout(debounceRef.current);

        if (q.trim().length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            const products = await getOrFetchProducts();
            const lower = q.toLowerCase().trim();
            const filtered = products
                .filter(p =>
                    p.name?.toLowerCase().includes(lower) ||
                    p.brand?.toLowerCase().includes(lower) ||
                    p.category?.toLowerCase().includes(lower)
                )
                .slice(0, 6);
            setSuggestions(filtered);
            setShowSuggestions(filtered.length > 0);
        }, 150);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const q = searchQuery.trim();
        if (!q) return;
        navigate(`/products?search=${encodeURIComponent(q)}`);
        setShowSuggestions(false);
    };

    const handleSuggestionClick = (product) => {
        navigate(`/products/${product._id}`);
        setSearchQuery('');
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleViewAll = () => {
        navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        setShowSuggestions(false);
    };

    return (
        <header className="w-full bg-white border-b border-gray-100">
            {/* Main Header */}
            <div className="container mx-auto px-6 lg:px-10 max-w-[1600px] py-[22px] flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center cursor-pointer">
                    <div className="text-[#2B3445] mr-2">
                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 2L42 12V32L22 42L2 32V12L22 2Z" stroke="#2B3445" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14 26V20H30V26" stroke="#2B3445" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14 20L18 16H26L30 20" stroke="#2B3445" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="text-[28px] font-bold tracking-tight text-[#2B3445] -ml-2">ElectroMart</span>
                </Link>

                {/* Navigation Links */}
                <nav className="hidden lg:flex space-x-7 text-[15px] font-medium text-[#2B3445]">
                    <Link to="/" className="flex items-center cursor-pointer hover:text-[#D23F57] transition-colors">
                        Home
                    </Link>
                    <Link to="/products" className="flex items-center cursor-pointer hover:text-[#D23F57] transition-colors">
                        Products
                    </Link>
                </nav>

                {/* Right Icons */}
                <div className="flex items-center space-x-6 text-gray-600">
                    {/* Auth Area */}
                    <div className="flex items-center justify-center">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="cursor-pointer bg-[#F3F5F9] p-[10px] rounded-full hover:bg-gray-200 transition">
                                    <User className="w-[20px] h-[20px]" />
                                </button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </div>

                    {/* Cart Icon */}
                    <div
                        className="relative cursor-pointer bg-[#F3F5F9] p-[10px] rounded-full hover:bg-gray-200 transition"
                        onClick={() => setIsCartOpen(true)}
                    >
                        <ShoppingBag className="w-[20px] h-[20px]" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-[#2B3445] text-white text-[11px] w-[20px] h-[20px] flex items-center justify-center rounded-full font-bold">
                                {cartCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Search Bar + Categories Area */}
            <div className="container mx-auto px-6 lg:px-10 max-w-[1600px] pb-[22px] flex items-center justify-between gap-6">

                {/* Categories Dropdown */}
                <div className="relative group flex-shrink-0 z-40">
                    <div className="flex items-center justify-between w-[278px] bg-[#F6F9FC] text-[#2B3445] px-4 py-3 rounded-md cursor-pointer hover:shadow-sm shadow-sm transition">
                        <div className="flex items-center gap-3">
                            <List className="w-5 h-5 text-gray-600" />
                            <span className="text-[14px] font-medium">Categories</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:rotate-90 transition-transform duration-200" />
                    </div>

                    {/* Dropdown */}
                    <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-2 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100 origin-top scale-95 group-hover:scale-100">
                        {CATEGORIES.map(({ label, value, Icon }) => (
                            <Link
                                key={value}
                                to={`/products?category=${value}`}
                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 hover:text-[#D23F57] cursor-pointer text-[#2B3445] transition-colors group/item"
                            >
                                <Icon className="w-[18px] h-[18px] text-gray-500 group-hover/item:text-[#D23F57] transition-colors" />
                                <span className="text-[14px]">{label}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Search Input + Suggestions */}
                <div className="flex-grow relative" ref={searchWrapperRef}>
                    <form
                        onSubmit={handleSearch}
                        className="flex items-center h-[46px] bg-[#F6F9FC] border border-transparent rounded-[24px] focus-within:border-gray-300 focus-within:bg-white transition-all overflow-hidden"
                    >
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                            onKeyDown={(e) => e.key === 'Escape' && setShowSuggestions(false)}
                            placeholder="Searching for..."
                            className="w-full h-full bg-transparent outline-none px-5 text-[14px] text-[#2B3445] placeholder-gray-400"
                        />
                        <button
                            type="submit"
                            className="h-full flex items-center justify-center px-5 border-l border-gray-200 cursor-pointer text-gray-400 hover:text-[#2B3445] transition-colors flex-shrink-0"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                    </form>

                    {/* Suggestions Dropdown */}
                    {showSuggestions && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                            {suggestions.map((product) => (
                                <button
                                    key={product._id}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => handleSuggestionClick(product)}
                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F6F9FC] transition-colors border-b border-gray-50 last:border-0 group/item"
                                >
                                    <img
                                        src={product.images?.[0]?.url}
                                        alt={product.name}
                                        className="w-10 h-10 object-contain rounded-lg bg-[#F6F9FC] p-1 flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0 text-left">
                                        <p className="text-[13px] font-semibold text-[#2B3445] truncate group-hover/item:text-[#D23F57] transition-colors">
                                            {product.name}
                                        </p>
                                        <p className="text-[11px] text-gray-400 mt-0.5">{product.brand}</p>
                                    </div>
                                    <span className="text-[13px] font-bold text-[#D23F57] flex-shrink-0">
                                        Rs. {product.price?.toFixed(2)}
                                    </span>
                                </button>
                            ))}

                            {/* View all results */}
                            <button
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={handleViewAll}
                                className="w-full px-4 py-3 text-[13px] text-center font-semibold text-[#D23F57] hover:bg-red-50 border-t border-gray-100 transition-colors"
                            >
                                View all results for &ldquo;{searchQuery}&rdquo;
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </header>
    );
};

export default Navbar;
