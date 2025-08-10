import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiTag, FiX } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    applyCoupon, 
    removeCoupon,
    coupon,
    getSubtotal,
    getShippingCost,
    getTotal
  } = useCart();

  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      applyCoupon(couponCode.trim());
      setCouponCode("");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-bg py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-light rounded-2xl shadow-lg p-12">
            <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiShoppingBag size={48} className="text-accent" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-dark mb-4">
              Your cart is empty
            </h2>
            <p className="font-body text-gray-600 mb-8">
              Looks like you haven't added any pickles to your cart yet. Explore
              our collection to find your favorites!
            </p>
            <Link
              to="/pickles"
              className="bg-primary text-light px-8 py-3 rounded-lg font-body font-medium hover:bg-hover transition-colors duration-200 inline-block"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const shipping = getShippingCost();
  const total = getTotal();

  return (
    <div className="min-h-screen bg-bg py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-dark mb-2">
            Shopping Cart
          </h1>
          <p className="font-body text-gray-600">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className={`bg-light rounded-xl shadow-md p-6 card-float-${(index % 6) + 1}`}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <h3 className="font-heading font-semibold text-lg text-dark">
                          {item.name}
                        </h3>
                        <p className="font-body text-gray-600 text-sm">
                          {item.category}
                        </p>
                        <p className="font-body text-gray-600 text-sm">
                          {item.weight}
                        </p>
                      </div>

                      <div className="flex flex-col sm:items-end gap-2">
                        <p className="font-body font-semibold text-lg text-primary">
                          ₹{item.price}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                          >
                            <FiMinus size={16} />
                          </button>

                          <span className="font-body font-medium text-dark w-8 text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                          >
                            <FiPlus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Item Total and Remove */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center space-x-1 text-red-600 hover:text-red-700 font-body text-sm transition-colors duration-200"
                      >
                        <FiTrash2 size={16} />
                        <span>Remove</span>
                      </button>

                      <p className="font-body font-semibold text-dark">
                        Subtotal: ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-end">
              <button
                onClick={clearCart}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-body transition-colors duration-200"
              >
                <FiTrash2 size={18} />
                <span>Clear Cart</span>
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-light rounded-xl shadow-md p-6 sticky top-24 card-float-1">
              <h2 className="font-heading text-xl font-semibold text-dark mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between font-body">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-dark">₹{subtotal}</span>
                </div>

                <div className="flex justify-between font-body">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                <br />
                
                <hr />
                <br />
              {/* Coupon Section */}
              <div className="mb-6">
                <h3 className="font-body font-medium text-dark mb-3 flex items-center">
                  <FiTag className="mr-2" />
                  Apply Coupon
                </h3>
                
                {coupon ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-body font-medium text-green-800">
                          {coupon.code} - {coupon.description}
                        </p>
                        <p className="font-body text-sm text-green-600">
                          -₹{coupon.discount} discount applied
                        </p>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-green-600 hover:text-green-700"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-primary text-light rounded-lg font-body text-sm hover:bg-hover transition-colors duration-200"
                    >
                      Apply
                    </button>
                  </div>
                )}

                {/* Available Coupons */}
                <div className="mt-3">
                  <p className="font-body text-xs text-gray-500 mb-2">Available coupons:</p>
                  <div className="space-y-1">
                    <p className="font-body text-xs text-gray-600">PICKLE100 - ₹100 off (min ₹500)</p>
                 
                  </div>
                </div>
              </div>

              
              <div className="space-y-4 mb-6">
               

                {coupon && (
                  <div className="flex justify-between font-body">
                    <span className="text-gray-600">Discount ({coupon.code})</span>
                    <span className="text-red-600">-₹{coupon.discount}</span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-body font-semibold text-lg">
                    <span className="text-dark">Total</span>
                    <span className="text-primary">
                      ₹{total}
                    </span>
                  </div>
                </div>
              </div>

              {subtotal < 500 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                  <p className="font-body text-sm text-yellow-800">
                    Add ₹{500 - subtotal} more to get free shipping!
                  </p>
                </div>
              )}

              <Link
                to="/checkout"
                className="w-full bg-primary text-light py-3 px-6 rounded-lg font-body font-medium hover:bg-hover transition-colors duration-200 block text-center"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/pickles"
                className="w-full mt-3 border border-primary text-primary py-3 px-6 rounded-lg font-body font-medium hover:bg-primary hover:text-light transition-colors duration-200 block text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
