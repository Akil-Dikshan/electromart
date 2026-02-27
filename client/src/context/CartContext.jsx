import { createContext, useContext, useReducer } from 'react'
//!reducer
const cartReducer = (state, action) => {
  switch (action.type) {

    case 'ADD_ITEM': {
      const existingItem = state.find(item => item._id === action.payload._id)

      if (existingItem) {
        return state.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...state, { ...action.payload, quantity: 1 }]
    }

    case 'REMOVE_ITEM':
      return state.filter(item => item._id !== action.payload)

    case 'INCREASE_QUANTITY':
      return state.map(item =>
        item._id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )

    case 'DECREASE_QUANTITY':
      return state.map(item =>
        item._id === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)

    case 'CLEAR_CART':
      return []

    default:
      return state
  }
}

//!context 
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product })
  }

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId })
  }

  const increaseQuantity = (productId) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: productId })
  }

  const decreaseQuantity = (productId) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: productId })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const cartTotal = cart.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)

  const cartCount = cart.reduce((count, item) => {
    return count + item.quantity
  }, 0)

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  )
}
//!custom hook
export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}