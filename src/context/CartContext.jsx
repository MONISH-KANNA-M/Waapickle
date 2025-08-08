import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price,
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price,
      };

    case 'REMOVE_FROM_CART':
      const itemToRemove = state.items.find(item => item.id === action.payload);
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (itemToRemove.price * itemToRemove.quantity),
      };

    case 'UPDATE_QUANTITY':
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      const quantityDiff = quantity - item.quantity;
      
      return {
        ...state,
        items: state.items.map(item =>
          item.id === id ? { ...item, quantity } : item
        ),
        total: state.total + (item.price * quantityDiff),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        coupon: null,
        discount: 0,
      };

    case 'APPLY_COUPON':
      return {
        ...state,
        coupon: action.payload.coupon,
        discount: action.payload.discount,
      };

    case 'REMOVE_COUPON':
      return {
        ...state,
        coupon: null,
        discount: 0,
      };

    case 'LOAD_CART':
      return action.payload;

    default:
      return state;
  }
};

const initialState = {
  items: [],
  total: 0,
  coupon: null,
  discount: 0,
};

// Available coupons
const availableCoupons = {
  'PICKLE100': { discount: 100, minAmount: 500, description: 'Get ₹100 off on orders above ₹500' },
  'PICKLE50': { discount: 50, minAmount: 300, description: 'Get ₹50 off on orders above ₹300' },
  'PICKLE25': { discount: 25, minAmount: 200, description: 'Get ₹25 off on orders above ₹200' },
  'FREESHIP': { discount: 50, minAmount: 0, description: 'Free shipping on any order' },
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    toast.info('Item removed from cart');
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Cart cleared');
  };

  const applyCoupon = (couponCode) => {
    const coupon = availableCoupons[couponCode.toUpperCase()];
    
    if (!coupon) {
      toast.error('Invalid coupon code');
      return false;
    }

    if (state.coupon && state.coupon.code === couponCode.toUpperCase()) {
      toast.info('Coupon already applied');
      return false;
    }

    if (state.total < coupon.minAmount) {
      toast.error(`Minimum order amount of ₹${coupon.minAmount} required for this coupon`);
      return false;
    }

    dispatch({ 
      type: 'APPLY_COUPON', 
      payload: { 
        coupon: { code: couponCode.toUpperCase(), ...coupon },
        discount: coupon.discount 
      } 
    });
    toast.success(`Coupon applied! ${coupon.description}`);
    return true;
  };

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
    toast.info('Coupon removed');
  };

  const getItemCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getShippingCost = () => {
    const subtotal = getSubtotal();
    return subtotal >= 500 ? 0 : 50;
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const shipping = getShippingCost();
    const finalTotal = subtotal + shipping - state.discount;
    return Math.max(0, finalTotal); // Ensure total is not negative
  };

  return (
    <CartContext.Provider value={{
      ...state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      applyCoupon,
      removeCoupon,
      getItemCount,
      getSubtotal,
      getShippingCost,
      getTotal,
      availableCoupons,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};