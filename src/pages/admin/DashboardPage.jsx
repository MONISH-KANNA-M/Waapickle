import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiShoppingBag,
  FiDollarSign,
  FiUsers,
  FiPackage,
  FiTrendingUp,
  FiTrendingDown,
  FiEye,
  FiPlus,
  FiMessageSquare,
  FiGift
} from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import api from '../../utils/api';
import { formatPrice, formatDate } from '../../utils/format';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalProducts: 0,
    recentOrders: [],
    topProducts: [],
    salesData: [],
    orderStatusData: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [orders, products, customers] = await Promise.all([
          api.get('/orders'),
          api.get('/products'),
          api.get('/customers')
        ]);

        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const orderStatusData = [
          { name: 'Pending', value: orders.filter(o => o.status === 'pending').length, color: '#F59E0B' },
          { name: 'Processing', value: orders.filter(o => o.status === 'processing').length, color: '#3B82F6' },
          { name: 'Shipped', value: orders.filter(o => o.status === 'shipped').length, color: '#10B981' },
          { name: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, color: '#059669' },
          { name: 'Cancelled', value: orders.filter(o => o.status === 'cancelled').length, color: '#EF4444' }
        ];

        const salesData = [
          { month: 'Jan', sales: 12000 },
          { month: 'Feb', sales: 19000 },
          { month: 'Mar', sales: 15000 },
          { month: 'Apr', sales: 22000 },
          { month: 'May', sales: 28000 },
          { month: 'Jun', sales: 35000 }
        ];

        setStats({
          totalOrders: orders.length,
          totalRevenue,
          totalCustomers: customers.length,
          totalProducts: products.length,
          recentOrders: orders.slice(0, 5),
          topProducts: products.slice(0, 5),
          salesData,
          orderStatusData
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = 'primary' }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? <FiTrendingUp className="w-4 h-4 mr-1" /> : <FiTrendingDown className="w-4 h-4 mr-1" />}
              {trendValue}
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          color === 'primary' ? 'bg-primary' :
          color === 'green' ? 'bg-green-500' :
          color === 'blue' ? 'bg-blue-500' :
          color === 'purple' ? 'bg-purple-500' :
          'bg-primary'
        }`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex space-x-3">
          <Link
            to="/admin/add-product"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-hover transition-colors duration-200 flex items-center gap-2"
          >
            <FiPlus className="w-4 h-4" />
            Add Product
          </Link>
          <Link
            to="/admin/orders"
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
          >
            <FiEye className="w-4 h-4" />
            View Orders
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={FiShoppingBag}
          trend="up"
          trendValue="+12% from last month"
          color="primary"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(stats.totalRevenue)}
          icon={FiDollarSign}
          trend="up"
          trendValue="+8% from last month"
          color="green"
        />
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={FiUsers}
          trend="up"
          trendValue="+5% from last month"
          color="blue"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={FiPackage}
          trend="up"
          trendValue="+3 new this week"
          color="purple"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatPrice(value)} />
              <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.orderStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              <Link to="/admin/orders" className="text-primary hover:text-hover text-sm font-medium">
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{formatPrice(order.total)}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
              <Link to="/admin/products" className="text-primary hover:text-hover text-sm font-medium">
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats.topProducts.map((product) => (
                <div key={product.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <FiPackage className="w-6 h-6 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{formatPrice(product.price)}</p>
                    <p className="text-sm text-gray-600">{product.stock} in stock</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/add-product"
            className="flex items-center p-4 bg-primary text-white rounded-lg hover:bg-hover transition-colors duration-200"
          >
            <FiPlus className="w-5 h-5 mr-3" />
            <span>Add Product</span>
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <FiShoppingBag className="w-5 h-5 mr-3" />
            <span>Manage Orders</span>
          </Link>
          <Link
            to="/admin/feedback"
            className="flex items-center p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            <FiMessageSquare className="w-5 h-5 mr-3" />
            <span>View Feedback</span>
          </Link>
          <Link
            to="/admin/coupons"
            className="flex items-center p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200"
          >
            <FiGift className="w-5 h-5 mr-3" />
            <span>Manage Coupons</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 