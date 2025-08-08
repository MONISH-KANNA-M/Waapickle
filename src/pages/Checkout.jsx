import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCreditCard, FiMapPin, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    // Billing Details
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    
    // Address
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Payment
    paymentMethod: 'razorpay',
  });
  
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone number must be 10 digits';
    
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }
    
    if (items.length === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
      return;
    }
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate Razorpay payment
      const orderData = {
        id: `ORDER_${Date.now()}`,
        items: items,
        total: total >= 500 ? total : total + 50,
        billingDetails: formData,
        status: 'placed',
        createdAt: new Date().toISOString(),
      };
      
      // Save order to localStorage (in real app, this would be sent to backend)
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([orderData, ...existingOrders]));
      
      // Clear cart
      clearCart();
      
      toast.success('Order placed successfully!');
      navigate('/orders');
      
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const shippingCost = total >= 500 ? 0 : 50;
  const finalTotal = total + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-bg py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-light rounded-2xl shadow-lg p-12">
            <h2 className="font-heading text-2xl font-bold text-dark mb-4">
              Your cart is empty
            </h2>
            <p className="font-body text-gray-600 mb-8">
              Add some pickles to your cart before proceeding to checkout.
            </p>
            <button
              onClick={() => navigate('/pickles')}
              className="bg-primary text-light px-8 py-3 rounded-lg font-body font-medium hover:bg-hover transition-colors duration-200"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-dark mb-2">Checkout</h1>
          <p className="font-body text-gray-600">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-light rounded-xl shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Billing Details */}
              <div>
                <h2 className="font-heading text-xl font-semibold text-dark mb-6 flex items-center">
                  <FiUser className="mr-2" />
                  Billing Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block font-body font-medium text-dark mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg font-body focus:outline-none focus:ring-2 transition-colors duration-200 ${
                        errors.firstName
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-accent/30 focus:ring-primary/20'
                      }`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600 font-body">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block font-body font-medium text-dark mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg font-body focus:outline-none focus:ring-2 transition-colors duration-200 ${
                        errors.lastName
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-accent/30 focus:ring-primary/20'
                      }`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600 font-body">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="email" className="block font-body font-medium text-dark mb-2">
                      <FiMail className="inline mr-1" />
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg font-body focus:outline-none focus:ring-2 transition-colors duration-200 ${
                        errors.email
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-accent/30 focus:ring-primary/20'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 font-body">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block font-body font-medium text-dark mb-2">
                      <FiPhone className="inline mr-1" />
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg font-body focus:outline-none focus:ring-2 transition-colors duration-200 ${
                        errors.phone
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-accent/30 focus:ring-primary/20'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600 font-body">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="font-heading text-xl font-semibold text-dark mb-6 flex items-center">
                  <FiMapPin className="mr-2" />
                  Shipping Address
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block font-body font-medium text-dark mb-2">
                      Street Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg font-body focus:outline-none focus:ring-2 transition-colors duration-200 resize-none ${
                        errors.address
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-accent/30 focus:ring-primary/20'
                      }`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600 font-body">{errors.address}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block font-body font-medium text-dark mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg font-body focus:outline-none focus:ring-2 transition-colors duration-200 ${
                          errors.city
                            ? 'border-red-300 focus:ring-red-200'
                            : 'border-accent/30 focus:ring-primary/20'
                        }`}
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600 font-body">{errors.city}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block font-body font-medium text-dark mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg font-body focus:outline-none focus:ring-2 transition-colors duration-200 ${
                          errors.state
                            ? 'border-red-300 focus:ring-red-200'
                            : 'border-accent/30 focus:ring-primary/20'
                        }`}
                      />
                      {errors.state && (
                        <p className="mt-1 text-sm text-red-600 font-body">{errors.state}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="pincode" className="block font-body font-medium text-dark mb-2">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg font-body focus:outline-none focus:ring-2 transition-colors duration-200 ${
                          errors.pincode
                            ? 'border-red-300 focus:ring-red-200'
                            : 'border-accent/30 focus:ring-primary/20'
                        }`}
                      />
                      {errors.pincode && (
                        <p className="mt-1 text-sm text-red-600 font-body">{errors.pincode}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="font-heading text-xl font-semibold text-dark mb-6 flex items-center">
                  <FiCreditCard className="mr-2" />
                  Payment Method
                </h2>
                
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-primary rounded-lg bg-primary/5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={formData.paymentMethod === 'razorpay'}
                      onChange={handleChange}
                      className="mr-3 text-primary focus:ring-primary"
                    />
                    <div className="flex-1">
                      <div className="font-body font-medium text-dark">Razorpay</div>
                      <div className="font-body text-sm text-gray-600">
                        Pay securely with cards, UPI, wallets & more
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-primary text-light py-4 px-6 rounded-lg font-body font-semibold hover:bg-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing Payment...' : `Place Order - ₹${finalTotal}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-light rounded-xl shadow-md p-8 h-fit sticky top-24">
            <h2 className="font-heading text-xl font-semibold text-dark mb-6">
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-body font-medium text-dark text-sm">{item.name}</h3>
                    <p className="font-body text-gray-600 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-body font-medium text-dark">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between font-body">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-dark">₹{total}</span>
              </div>
              
              <div className="flex justify-between font-body">
                <span className="text-gray-600">Shipping</span>
                <span className={shippingCost === 0 ? 'text-green-600' : 'text-dark'}>
                  {shippingCost === 0 ? 'Free' : `₹${shippingCost}`}
                </span>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between font-body font-semibold text-lg">
                  <span className="text-dark">Total</span>
                  <span className="text-primary">₹{finalTotal}</span>
                </div>
              </div>
            </div>
            
            {total < 500 && (
              <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="font-body text-sm text-yellow-800">
                  Add ₹{500 - total} more to get free shipping!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;