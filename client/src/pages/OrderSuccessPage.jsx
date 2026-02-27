import { Link } from 'react-router-dom'

function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="text-6xl"></div>
      <h1 className="text-3xl font-bold text-gray-900">Order Placed!</h1>
      <p className="text-gray-500">Thank you for shopping with ElectroMart</p>
      <Link
        to="/products"
        className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
      >
        Continue Shopping
      </Link>
    </div>
  )
}

export default OrderSuccessPage