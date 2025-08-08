// Mock API utility for development
const api = {
  get: async (url) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock responses based on URL
    if (url === '/admin/dashboard/stats') {
      return {
        data: {
          revenue: 15420.50,
          orders: 127,
          products: 24,
          alerts: 8
        }
      };
    }
    
    if (url === '/admin/dashboard/sales') {
      return {
        data: [
          { date: 'Jan', sales: 4000, orders: 24, category: 'Dill' },
          { date: 'Feb', sales: 3000, orders: 18, category: 'Sweet' },
          { date: 'Mar', sales: 5000, orders: 32, category: 'Spicy' },
          { date: 'Apr', sales: 4500, orders: 28, category: 'Kosher' },
          { date: 'May', sales: 6000, orders: 38, category: 'Gherkins' },
          { date: 'Jun', sales: 5500, orders: 35, category: 'Bread & Butter' }
        ]
      };
    }
    
    if (url.startsWith('/admin/orders')) {
      return {
        data: [
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
            createdAt: new Date().toISOString(),
            items: [{ name: 'Sweet Pickle Relish', quantity: 1, price: 8.99 }]
          },
          {
            _id: '3',
            orderId: 'ORD-003',
            customer: { name: 'Carol Davis', email: 'carol@example.com' },
            total: 67.25,
            status: 'processing',
            createdAt: new Date().toISOString(),
            items: [{ name: 'Spicy Jalapeño Pickles', quantity: 3, price: 15.99 }]
          }
        ]
      };
    }

    if (url.startsWith('/admin/messages')) {
      return {
        data: [
          {
            _id: '1',
            customer: { name: 'John Doe', email: 'john@example.com' },
            subject: 'Great pickle quality!',
            message: 'I absolutely love your dill pickles. The taste is amazing and the crunch is perfect!',
            status: 'unread',
            createdAt: new Date().toISOString()
          },
          {
            _id: '2',
            customer: { name: 'Sarah Smith', email: 'sarah@example.com' },
            subject: 'Shipping inquiry',
            message: 'When will my order be shipped? I ordered 3 jars last week.',
            status: 'read',
            createdAt: new Date(Date.now() - 86400000).toISOString()
          },
          {
            _id: '3',
            customer: { name: 'Mike Johnson', email: 'mike@example.com' },
            subject: 'Product suggestion',
            message: 'Would you consider making spicy garlic pickles? I think they would be very popular!',
            status: 'unread',
            createdAt: new Date(Date.now() - 172800000).toISOString()
          }
        ]
      };
    }

    // Default response
    return { data: {} };
  },
  
  post: async (url, data) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: { success: true, message: 'Operation successful' } };
  },
  
  put: async (url, data) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: { success: true, message: 'Update successful' } };
  },
  
  patch: async (url, data) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: { success: true, message: 'Update successful' } };
  },

  delete: async (url) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: { success: true, message: 'Delete successful' } };
  }
};

export default api;
