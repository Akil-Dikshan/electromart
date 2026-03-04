import { useCart } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import { useUser, useClerk } from '@clerk/clerk-react';


function CartPage() {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity, cartTotal, clearCart } = useCart()
    const { isSignedIn } = useUser();
    const clerk = useClerk();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!isSignedIn) {
            clerk.openSignIn({ redirectUrl: '/checkout' });
        } else {
            navigate('/checkout');
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-2xl text-gray-500">Your cart is empty</p>
                <Link
                    to="/products"
                    className="bg-[#D23F57] text-white px-6 py-2 rounded-md hover:bg-[#b03549] transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="max-w-7xl mx-auto px-6 py-8">

                <h1 className="text-3xl font-bold text-[#2B3445] mb-8">
                    Shopping Cart
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map(item => (
                            <div key={item._id} className="bg-white rounded-lg shadow-sm p-4 flex items-start gap-4 border border-gray-100">

                                {/* Product Image */}
                                <img
                                    src={item.images?.[0]?.url || 'https://via.placeholder.com/150'}
                                    alt={item.name}
                                    className="w-24 h-24 object-contain rounded-md bg-[#F6F9FC] p-2"
                                />

                                {/* Product Info */}
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">{item.brand}</p>
                                    <h3 className="font-semibold text-[#2B3445]">{item.name}</h3>
                                    <p className="text-[#D23F57] font-bold mt-1">Rs. {item.price.toFixed(2)}</p>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex flex-col items-end justify-between h-24">

                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-gray-400 hover:text-[#D23F57] text-sm transition-colors font-medium"
                                    >
                                        Remove
                                    </button>

                                    <div className="flex items-center border border-gray-200 rounded-sm">
                                        <button
                                            onClick={() => decreaseQuantity(item._id)}
                                            className="w-8 h-8 bg-white hover:bg-gray-50 flex items-center justify-center font-bold text-gray-500 transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-semibold border-l border-r border-gray-200 text-[#2B3445]">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => increaseQuantity(item._id)}
                                            className="w-8 h-8 bg-white hover:bg-gray-50 flex items-center justify-center font-bold text-gray-500 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-lg shadow-sm p-6 h-fit border border-gray-100">
                        <h2 className="text-xl font-bold text-[#2B3445] mb-4">
                            Order Summary
                        </h2>

                        <div className="space-y-3 mb-4">
                            {cart.map(item => (
                                <div key={item._id} className="flex justify-between text-sm text-[#7D879C]">
                                    <span className="flex-1 pr-4 line-clamp-1">{item.name} x{item.quantity}</span>
                                    <span className="text-[#2B3445] font-semibold">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-dashed border-gray-200 pt-4 mb-6 mt-6">
                            <div className="flex justify-between font-bold text-lg mb-4">
                                <span className="text-[#7D879C]">Total</span>
                                <span className="text-[#D23F57]">Rs. {cartTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="block w-full text-center bg-[#D23F57] text-white py-3 rounded-md hover:bg-[#b03549] transition-colors font-semibold mb-3 cursor-pointer"
                        >
                            Proceed to Checkout
                        </button>

                        <button
                            onClick={clearCart}
                            className="w-full text-center text-gray-400 hover:text-[#D23F57] text-sm transition-colors font-medium cursor-pointer"
                        >
                            Clear Cart
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )

}
export default CartPage

