import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser, useClerk } from '@clerk/clerk-react';

const CartDrawer = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity, cartTotal, cartCount } = useCart();
    const { isSignedIn } = useUser();
    const clerk = useClerk();

    const handleCheckout = () => {
        onClose();
        if (!isSignedIn) {
            clerk.openSignIn({ redirectUrl: '/checkout' });
        } else {
            navigate('/checkout');
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={onClose}
            ></div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-[380px] bg-white z-[110] shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-[16px] font-bold text-[#2B3445]">Your Cart ({cartCount})</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-800 transition-colors cursor-pointer">
                        <X className="w-[18px] h-[18px]" />
                    </button>
                </div>

                {/* Cart Items (Scrollable) */}
                <div className="flex-1 overflow-y-auto px-6 py-2 flex flex-col">
                    {cart.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-4">
                            <ShoppingBag className="w-12 h-12" />
                            <p>Your cart is empty.</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item._id} className="flex gap-4 py-5 border-b border-gray-100 border-dashed last:border-0">
                                {/* Image */}
                                <div className="w-[85px] h-[85px] bg-[#F6F9FC] rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                                    <img src={item.images?.[0]?.url || 'https://via.placeholder.com/85'} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-sm" />
                                </div>

                                {/* Details */}
                                <div className="flex-1 flex flex-col justify-center">
                                    <h3 className="text-[14px] font-medium text-[#2B3445] leading-tight line-clamp-2 mb-1">{item.name}</h3>
                                    <p className="text-[13px] font-semibold text-[#2B3445]">Rs. {item.price.toFixed(2)}</p>

                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center border border-gray-200 rounded-sm">
                                            <button
                                                onClick={() => decreaseQuantity(item._id)}
                                                className="px-2 py-1 text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors bg-white cursor-pointer"
                                            >
                                                <Minus className="w-[12px] h-[12px]" strokeWidth={3} />
                                            </button>
                                            <span className="text-[12px] font-bold text-[#2B3445] px-2 min-w-[20px] text-center border-l border-r border-gray-200 bg-white leading-5">{item.quantity}</span>
                                            <button
                                                onClick={() => increaseQuantity(item._id)}
                                                className="px-2 py-1 text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors bg-white cursor-pointer"
                                            >
                                                <Plus className="w-[12px] h-[12px]" strokeWidth={3} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="text-gray-400 hover:text-[#D23F57] transition-colors p-1 cursor-pointer"
                                        >
                                            <Trash2 className="w-[16px] h-[16px]" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-gray-100 flex flex-col gap-3 bg-white mt-auto shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[#2B3445] font-semibold">Subtotal:</span>
                        <span className="text-[#2B3445] font-bold text-lg">Rs. {cartTotal.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        disabled={cart.length === 0}
                        className="w-full bg-[#111827] hover:bg-black disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-[14px] rounded-md text-[14px] transition-colors cursor-pointer"
                    >
                        Proceed To Checkout
                    </button>
                    <button
                        onClick={() => { onClose(); navigate('/cart'); }}
                        className="w-full bg-white hover:bg-gray-50 text-[#111827] border border-gray-200 font-bold py-[14px] rounded-md text-[14px] transition-colors shadow-sm cursor-pointer"
                    >
                        View Cart
                    </button>
                </div>
            </div>
        </>
    );
};

export default CartDrawer;
