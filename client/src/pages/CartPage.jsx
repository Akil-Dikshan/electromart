import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'


function CartPage() {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity, cartTotal, clearCart } = useCart()

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-2xl text-gray-500">Your cart is empty</p>
                <Link
                    to="/products"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-8">
        
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Shopping Cart
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map(item => (
                            <div key={item._id} className="bg-white rounded-lg shadow-sm p-4 flex items-start gap-4">
                
                                {/* Product Image */}
                                <img
                                    src={item.images[0]?.url}
                                    alt={item.images[0]?.alt}
                                    className="w-24 h-24 object-cover rounded-md"
                                />

                                {/* Product Info */}
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">{item.brand}</p>
                                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                    <p className="text-blue-600 font-bold">${item.price}</p>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex flex-col items-end justify-between">
                  
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-red-500 hover:text-red-700 text-sm"
                                    >
                                        Remove
                                    </button>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => decreaseQuantity(item._id)}
                                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-semibold">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => increaseQuantity(item._id)}
                                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
                                        >
                                            +
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Order Summary
                        </h2>

                        <div className="space-y-2 mb-4">
                            {cart.map(item => (
                                <div key={item._id} className="flex justify-between text-sm text-gray-600">
                                    <span>{item.name} x{item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 mb-6">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <Link
                            to="/checkout"
                            className="block w-full text-center bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold mb-3"
                        >
                            Proceed to Checkout
                        </Link>

                        <button
                            onClick={clearCart}
                            className="w-full text-center text-red-500 hover:text-red-700 text-sm transition-colors"
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

