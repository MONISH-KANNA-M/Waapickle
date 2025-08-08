import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiEye, FiDownload, FiStar, FiMessageSquare, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import products from '../assets/products';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [ratings, setRatings] = useState({});
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const savedRatings = JSON.parse(localStorage.getItem('productRatings') || '{}');
      setOrders(savedOrders);
      setRatings(savedRatings);
    }
  }, [isAuthenticated]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'placed':
        return <FiClock className="w-5 h-5 text-blue-600" />;
      case 'shipped':
        return <FiTruck className="w-5 h-5 text-yellow-600" />;
      case 'delivered':
        return <FiCheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <FiPackage className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'placed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const generateInvoice = (order) => {
    setSelectedOrder(order);
    setShowInvoice(true);
  };

  const downloadInvoice = () => {
    if (!selectedOrder) return;
    
    // Create invoice content
    const invoiceContent = `
      Waapickles - Invoice
      
      Invoice #: INV-${selectedOrder.id.slice(-8).toUpperCase()}
      Order #: ${selectedOrder.id.slice(-8).toUpperCase()}
      Date: ${formatDate(selectedOrder.createdAt)}
      Status: ${selectedOrder.status}
      
      Bill To:
      ${selectedOrder.billingDetails.firstName} ${selectedOrder.billingDetails.lastName}
      ${selectedOrder.billingDetails.address}
      ${selectedOrder.billingDetails.city}, ${selectedOrder.billingDetails.state} ${selectedOrder.billingDetails.pincode}
      Phone: ${selectedOrder.billingDetails.phone}
      
      Items:
      ${selectedOrder.items.map(item => 
        `${item.name} (${item.category} • ${item.weight}) - Qty: ${item.quantity} × ₹${item.price} = ₹${item.price * item.quantity}`
      ).join('\n')}
      
      Subtotal: ₹${selectedOrder.total - 50}
      Shipping: ₹50
      Total: ₹${selectedOrder.total}
      
      Thank you for choosing Waapickles!
      www.waapickles.com
    `;
    
    // Create and download file
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${selectedOrder.id.slice(-8).toUpperCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleRating = (productId, rating) => {
    const newRatings = { ...ratings, [productId]: rating };
    setRatings(newRatings);
    localStorage.setItem('productRatings', JSON.stringify(newRatings));
  };

  const handleReview = (productId, review) => {
    const newRatings = { 
      ...ratings, 
      [productId]: { 
        ...ratings[productId], 
        review 
      } 
    };
    setRatings(newRatings);
    localStorage.setItem('productRatings', JSON.stringify(newRatings));
  };

  const getProductById = (productId) => {
    return products.find(p => p.id === productId);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-light rounded-2xl shadow-lg p-12">
            <h2 className="font-heading text-2xl font-bold text-dark mb-4">
              Please Login
            </h2>
            <p className="font-body text-gray-600 mb-8">
              You need to be logged in to view your order history.
            </p>
            <Link
              to="/login"
              className="bg-primary text-light px-8 py-3 rounded-lg font-body font-medium hover:bg-hover transition-colors duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-dark mb-2">Order History</h1>
          <p className="font-body text-gray-600">Track and manage your orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-light rounded-2xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiPackage size={48} className="text-accent" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-dark mb-4">
              No Orders Yet
            </h2>
            <p className="font-body text-gray-600 mb-8">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <Link
              to="/pickles"
              className="bg-primary text-light px-8 py-3 rounded-lg font-body font-medium hover:bg-hover transition-colors duration-200"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-light rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-dark mb-1">
                        Order #{order.id.slice(-8).toUpperCase()}
                      </h3>
                      <p className="font-body text-gray-600 text-sm">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-body font-semibold text-lg text-primary">
                          ₹{order.total}
                        </p>
                        <p className="font-body text-sm text-gray-600">
                          {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3">
                    {order.items.map((item) => {
                      const product = getProductById(item.id);
                      const productRating = ratings[item.id] || {};
                      
                      return (
                        <div key={item.id} className="flex items-center space-x-4 p-3 bg-bg rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => handleProductClick(item.id)}
                          />
                          
                          <div className="flex-1">
                            <h4 
                              className="font-body font-medium text-dark cursor-pointer hover:text-primary transition-colors"
                              onClick={() => handleProductClick(item.id)}
                            >
                              {item.name}
                            </h4>
                            <p className="font-body text-gray-600 text-sm">
                              {item.category} • {item.weight}
                            </p>
                            <p className="font-body text-sm text-gray-600">
                              Qty: {item.quantity} × ₹{item.price}
                            </p>
                            
                            {/* Rating Section */}
                            {order.status === 'delivered' && (
                              <div className="mt-2">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="font-body text-sm text-gray-600">Rate this product:</span>
                                  <div className="flex space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <button
                                        key={star}
                                        onClick={() => handleRating(item.id, star)}
                                        className={`text-lg ${
                                          star <= (productRating.rating || 0)
                                            ? 'text-yellow-400'
                                            : 'text-gray-300'
                                        } hover:text-yellow-400 transition-colors`}
                                      >
                                        ★
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                
                                {/* Review Input */}
                                <div className="flex space-x-2">
                                  <input
                                    type="text"
                                    placeholder="Write a review..."
                                    value={productRating.review || ''}
                                    onChange={(e) => handleReview(item.id, e.target.value)}
                                    className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                  />
                                  <button
                                    onClick={() => handleReview(item.id, productRating.review || '')}
                                    className="px-3 py-1 bg-primary text-light text-sm rounded-lg hover:bg-hover transition-colors"
                                  >
                                    <FiMessageSquare size={14} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="text-right">
                            <p className="font-body font-medium text-dark">
                              ₹{item.price * item.quantity}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Order Actions */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-body font-medium text-dark mb-2">Delivery Address</h4>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>{order.billingDetails.firstName} {order.billingDetails.lastName}</p>
                            <p>{order.billingDetails.address}</p>
                            <p>{order.billingDetails.city}, {order.billingDetails.state} {order.billingDetails.pincode}</p>
                            <p>{order.billingDetails.phone}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-body font-medium text-dark mb-2">Order Status</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <FiCheckCircle className="w-4 h-4 text-green-600" />
                              <span className="font-body text-sm text-gray-600">Order Placed</span>
                            </div>
                            <div className={`flex items-center space-x-2 ${
                              ['shipped', 'delivered'].includes(order.status) ? 'text-green-600' : 'text-gray-400'
                            }`}>
                              <FiTruck className="w-4 h-4" />
                              <span className="font-body text-sm">Shipped</span>
                            </div>
                            <div className={`flex items-center space-x-2 ${
                              order.status === 'delivered' ? 'text-green-600' : 'text-gray-400'
                            }`}>
                              <FiCheckCircle className="w-4 h-4" />
                              <span className="font-body text-sm">Delivered</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={() => generateInvoice(order)}
                          className="flex items-center space-x-2 bg-primary text-light px-4 py-2 rounded-lg font-body font-medium hover:bg-hover transition-colors"
                        >
                          <FiDownload size={16} />
                          <span>View Invoice</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Invoice Modal */}
      {showInvoice && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-light rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button - Top Right */}
            <button
              onClick={() => setShowInvoice(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors duration-200"
            >
              <FiX size={20} />
            </button>
            
            <div className="p-8">
              {/* Invoice Header */}
              <div className="text-center mb-8">
                <h1 className="font-heading text-3xl font-bold text-primary mb-2">Waapickles</h1>
                <p className="font-body text-gray-600">Authentic Artisanal Pickles</p>
                <p className="font-body text-sm text-gray-500 mt-2">www.waapickles.com</p>
              </div>

              {/* Invoice Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-dark mb-4">Bill To:</h3>
                  <div className="font-body text-gray-600">
                    <p className="font-medium text-dark">{selectedOrder.billingDetails.firstName} {selectedOrder.billingDetails.lastName}</p>
                    <p>{selectedOrder.billingDetails.address}</p>
                    <p>{selectedOrder.billingDetails.city}, {selectedOrder.billingDetails.state} {selectedOrder.billingDetails.pincode}</p>
                    <p>Phone: {selectedOrder.billingDetails.phone}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-heading text-lg font-semibold text-dark mb-4">Invoice Details:</h3>
                  <div className="font-body text-gray-600">
                    <p><span className="font-medium text-dark">Invoice #:</span> INV-{selectedOrder.id.slice(-8).toUpperCase()}</p>
                    <p><span className="font-medium text-dark">Order #:</span> {selectedOrder.id.slice(-8).toUpperCase()}</p>
                    <p><span className="font-medium text-dark">Date:</span> {formatDate(selectedOrder.createdAt)}</p>
                    <p><span className="font-medium text-dark">Status:</span> <span className="capitalize">{selectedOrder.status}</span></p>
                  </div>
                </div>
              </div>

              {/* Invoice Items */}
              <div className="mb-8">
                <h3 className="font-heading text-lg font-semibold text-dark mb-4">Items:</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-body font-medium text-dark">Item</th>
                        <th className="px-4 py-3 text-center font-body font-medium text-dark">Qty</th>
                        <th className="px-4 py-3 text-right font-body font-medium text-dark">Price</th>
                        <th className="px-4 py-3 text-right font-body font-medium text-dark">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 font-body text-dark">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-600">{item.category} • {item.weight}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center font-body text-dark">{item.quantity}</td>
                          <td className="px-4 py-3 text-right font-body text-dark">₹{item.price}</td>
                          <td className="px-4 py-3 text-right font-body font-medium text-dark">₹{item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Invoice Summary */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-end">
                  <div className="w-64">
                    <div className="space-y-2">
                      <div className="flex justify-between font-body">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="text-dark">₹{selectedOrder.total - 50}</span>
                      </div>
                      <div className="flex justify-between font-body">
                        <span className="text-gray-600">Shipping:</span>
                        <span className="text-dark">₹50</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2">
                        <div className="flex justify-between font-body font-semibold text-lg">
                          <span className="text-dark">Total:</span>
                          <span className="text-primary">₹{selectedOrder.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="font-body text-sm text-gray-600 mb-2">Thank you for choosing Waapickles!</p>
                <p className="font-body text-xs text-gray-500">For any queries, contact us at support@waapickles.com</p>
              </div>
            </div>
            
            <div className="flex justify-center p-6 border-t border-gray-200">
              <button
                onClick={downloadInvoice}
                className="flex items-center space-x-2 bg-primary text-light px-6 py-3 rounded-lg font-body font-medium hover:bg-hover transition-colors"
              >
                <FiDownload size={18} />
                <span>Download Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;