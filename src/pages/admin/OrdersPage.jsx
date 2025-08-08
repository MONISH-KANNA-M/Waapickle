import { useState, useEffect } from 'react';
import { FiEye, FiCheck, FiX, FiShoppingBag } from 'react-icons/fi';
import { formatPrice, formatDate } from '../../utils/format';

import api from '../../utils/api';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/admin/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Provide mock data for development
      const mockOrders = [
        {
          _id: '1',
          orderId: 'ORD-001',
          customer: { name: 'Alice Johnson', email: 'alice@example.com' },
          total: 45.99,
          status: 'delivered',
          createdAt: new Date().toISOString(),
          items: [{ name: 'Classic Dill Pickles', quantity: 2, price: 12.99 }]
        },
        {
          _id: '2',
          orderId: 'ORD-002',
          customer: { name: 'Bob Smith', email: 'bob@example.com' },
          total: 32.50,
          status: 'shipped',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          items: [{ name: 'Sweet Pickle Relish', quantity: 1, price: 8.99 }]
        },
        {
          _id: '3',
          orderId: 'ORD-003',
          customer: { name: 'Carol Davis', email: 'carol@example.com' },
          total: 67.25,
          status: 'processing',
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          items: [{ name: 'Spicy Jalapeño Pickles', quantity: 3, price: 15.99 }]
        }
      ];
      setOrders(mockOrders);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await api.patch(`/admin/orders/${orderId}/status`, { status: newStatus });
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
      if (window.showToast) {
        window.showToast('Order status updated', 'success');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      if (window.showToast) {
        window.showToast('Failed to update order status', 'error');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-bg min-h-screen animate-fadeIn">
      {/* Header */}
      <div className="mb-8 animate-slideInLeft">
        <div className="flex items-center mb-4">
          <div className="bg-gradient-to-r from-primary to-accent p-4 rounded-xl mr-4 animate-bounceIn">
            <FiShoppingBag className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 font-heading">Orders</h1>
            <p className="text-gray-600 font-body text-lg">Manage customer orders and track shipments</p>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.orderId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                      <div className="text-sm text-gray-500">{order.customer.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatPrice(order.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowOrderModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      {order.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(order._id, 'processing')}
                            className="text-green-600 hover:text-green-700"
                          >
                            <FiCheck className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(order._id, 'cancelled')}
                            className="text-red-600 hover:text-red-700"
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Order #{selectedOrder.orderId}
              </h3>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Customer Information</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p><strong>Name:</strong> {selectedOrder.customer.name}</p>
                  <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                  {selectedOrder.customer.phone && (
                    <p><strong>Phone:</strong> {selectedOrder.customer.phone}</p>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {item.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Order Summary</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatPrice(selectedOrder.subtotal || selectedOrder.total * 0.9)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>{formatPrice(selectedOrder.tax || selectedOrder.total * 0.08)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{formatPrice(selectedOrder.shipping || 5.99)}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Update Status</h4>
                <div className="flex space-x-2">
                  {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusUpdate(selectedOrder._id, status)}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        selectedOrder.status === status
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage; 