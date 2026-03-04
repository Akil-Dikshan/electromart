import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
    })

    const [loading, setLoading] = useState(false)

    // For visual simulation of payment details
    const [payment, setPayment] = useState({
        cardName: '',
        cardNo: '',
        expiry: '',
        cvc: ''
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handlePaymentChange = (e) => {
        setPayment({ ...payment, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const order = {
                items: cart.map(item => ({
                    product: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                shippingAddress: form,
                totalAmount: cartTotal
            }

            console.log('Order placed:', order)

            clearCart()
            navigate('/order-success')

        } catch (error) {
            console.error('Order failed:', error)
        } finally {
            setLoading(false)
        }
    }

    // Standard input base styling matching the design
    const inputClasses = "w-full border border-gray-200 rounded-[8px] px-4 py-3 text-[14px] text-gray-700 outline-none focus:border-[#D23F57] transition-colors bg-white font-sans"

    return (
        <div className="bg-[#F6F9FC] min-h-screen py-10 pb-20">
            <div className="container mx-auto px-6 lg:px-10 max-w-[1400px]">

                <h1 className="text-[32px] font-bold text-[#2B3445] mb-8 font-sans tracking-tight">Checkout</h1>

                <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Left Column: Forms */}
                    <div className="w-full lg:w-[68%] flex flex-col gap-8">

                        {/* Shipping Address Section */}
                        <div className="bg-white rounded-[8px] p-6 lg:p-8 shadow-[0_1px_3px_rgba(3,0,71,0.09)]">
                            <div className="flex items-center gap-3 mb-6 tracking-wide">
                                <span className="bg-[#2B3445] text-white w-7 h-7 flex items-center justify-center rounded-full text-[14px] font-bold">1</span>
                                <h2 className="text-[18px] font-bold text-[#2B3445] font-sans">Shipping Address</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                <div>
                                    <label className="block text-[13px] font-medium text-gray-600 mb-1.5 ml-1">First Name</label>
                                    <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required className={inputClasses} placeholder="First Name" />
                                </div>
                                <div>
                                    <label className="block text-[13px] font-medium text-gray-600 mb-1.5 ml-1">Last Name</label>
                                    <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required className={inputClasses} placeholder="Last Name" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                <div>
                                    <label className="block text-[13px] font-medium text-gray-600 mb-1.5 ml-1">Email</label>
                                    <input type="email" name="email" value={form.email} onChange={handleChange} required className={inputClasses} placeholder="Email" />
                                </div>
                                <div>
                                    <label className="block text-[13px] font-medium text-gray-600 mb-1.5 ml-1">Address</label>
                                    <input type="text" name="address" value={form.address} onChange={handleChange} required className={inputClasses} placeholder="Address" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                <div>
                                    <label className="block text-[13px] font-medium text-gray-600 mb-1.5 ml-1">City</label>
                                    <input type="text" name="city" value={form.city} onChange={handleChange} required className={inputClasses} placeholder="City" />
                                </div>
                                <div>
                                    <label className="block text-[13px] font-medium text-gray-600 mb-1.5 ml-1">Zip Code</label>
                                    <input type="text" name="zipCode" value={form.zipCode} onChange={handleChange} required className={inputClasses} placeholder="Zip Code" />
                                </div>
                            </div>
                        </div>

                        {/* Payment Details Section */}
                        <div className="bg-white rounded-[8px] p-6 lg:p-8 shadow-[0_1px_3px_rgba(3,0,71,0.09)]">
                            <div className="flex items-center gap-3 mb-6 tracking-wide">
                                <span className="bg-[#2B3445] text-white w-7 h-7 flex items-center justify-center rounded-full text-[14px] font-bold">2</span>
                                <h2 className="text-[18px] font-bold text-[#2B3445] font-sans">Payment Details</h2>
                            </div>

                            <p className="text-[14px] font-semibold text-[#2B3445] mb-5">Enter Card Information</p>

                            <div className="flex flex-col gap-5 mb-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <input type="text" name="cardName" value={payment.cardName} onChange={handlePaymentChange} required placeholder="Name on Card" className={inputClasses} />
                                    <input type="text" name="cardNo" value={payment.cardNo} onChange={handlePaymentChange} required placeholder="Card No" className={inputClasses} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <input type="text" name="expiry" value={payment.expiry} onChange={handlePaymentChange} required placeholder="Expiry (MM/YY)" className={inputClasses} />
                                    <input type="text" name="cvc" value={payment.cvc} onChange={handlePaymentChange} required placeholder="CVC" className={inputClasses} />
                                </div>
                            </div>

                            {/* Visual Saved Cards Option (Design Only) */}
                            <p className="text-[14px] font-semibold text-[#2B3445] mb-4">Saved Cards</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                                <div className="border border-gray-200 rounded-[8px] p-5 cursor-pointer hover:border-[#D23F57] hover:shadow-sm transition-all flex flex-col justify-between h-[100px]">
                                    <div className="flex -space-x-2 mb-2">
                                        <div className="w-6 h-6 rounded-full bg-[#EB001B] mix-blend-multiply flex-shrink-0"></div>
                                        <div className="w-6 h-6 rounded-full bg-[#F79E1B] mix-blend-multiply flex-shrink-0"></div>
                                    </div>
                                    <div>
                                        <p className="text-[15px] font-semibold text-[#2B3445] tracking-[0.05em]">**** **** **** 5432</p>
                                        <p className="text-[13px] text-[#7D879C] mt-1">John Doe</p>
                                    </div>
                                </div>
                                <div className="border border-gray-200 rounded-[8px] p-5 cursor-pointer hover:border-[#D23F57] hover:shadow-sm transition-all flex flex-col justify-between h-[100px]">
                                    <div className="text-[16px] font-bold text-[#1a1f71] italic mb-2 tracking-wider">VISA</div>
                                    <div>
                                        <p className="text-[15px] font-semibold text-[#2B3445] tracking-[0.05em]">**** **** **** 4543</p>
                                        <p className="text-[13px] text-[#7D879C] mt-1">John Doe</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="w-full lg:w-[32%] top-8">
                        <div className="bg-white rounded-[8px] p-6 lg:p-8 shadow-[0_1px_3px_rgba(3,0,71,0.09)] sticky top-28">
                            <h2 className="text-[16px] font-bold text-[#2B3445] mb-6 font-sans">Your order</h2>

                            {/* Order Items */}
                            {cart.length > 0 ? (
                                <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {cart.map(item => (
                                        <div key={item._id} className="flex justify-between items-start">
                                            <p className="text-[14px] text-[#2B3445] font-sans flex-1 pr-4 leading-relaxed">
                                                <span className="font-semibold mr-1.5">{item.quantity} x</span> {item.name}
                                            </p>
                                            <p className="text-[14px] text-[#2B3445] font-semibold whitespace-nowrap mt-0.5">
                                                Rs. {(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 mb-6 py-4">Your cart is empty.</p>
                            )}

                            {/* Divider */}
                            <div className="h-[1px] w-full mb-6 border-t border-dashed border-gray-200"></div>

                            {/* Calculation */}
                            <div className="flex flex-col gap-4 mb-6">
                                <div className="flex justify-between items-center text-[14px]">
                                    <span className="text-[#7D879C] font-sans">Subtotal:</span>
                                    <span className="text-[#2B3445] font-bold">Rs. {cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-[14px]">
                                    <span className="text-[#7D879C] font-sans">Shipping:</span>
                                    <span className="text-[#2B3445] font-bold">Free</span>
                                </div>
                                <div className="flex justify-between items-center text-[14px]">
                                    <span className="text-[#7D879C] font-sans">Tax:</span>
                                    <span className="text-[#2B3445] font-bold">Rs. 0.00</span>
                                </div>
                            </div>

                            {/* Total Divider */}
                            <div className="h-[1px] w-full mb-6 border-t border-dashed border-gray-200"></div>

                            {/* Total */}
                            <div className="flex justify-between items-center text-[20px] mb-8">
                                <span className="text-[#2B3445] font-medium font-sans">Total:</span>
                                <span className="text-[#D23F57] font-bold">Rs. {cartTotal.toFixed(2)}</span>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || cart.length === 0}
                                className="w-full bg-[#D23F57] hover:bg-[#b03549] text-white font-bold py-3.5 rounded-[8px] transition-colors shadow-sm font-sans tracking-wide disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {loading ? 'Placing Order...' : 'Place Order'}
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default CheckoutPage