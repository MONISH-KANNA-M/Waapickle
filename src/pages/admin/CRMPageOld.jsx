// CRMPage.jsx
// Admin Customer Relationship Management (CRM) page
import { useState } from 'react';
import { FiSearch, FiEye, FiUserX, FiMail, FiPhone, FiUser } from 'react-icons/fi';

const mockCustomers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@email.com', phone: '555-1234', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@email.com', phone: '555-5678', status: 'Active' },
  { id: 3, name: 'Charlie Lee', email: 'charlie@email.com', phone: '555-8765', status: 'Inactive' },
];

const CRMPage = () => {
  const [customers, setCustomers] = useState(mockCustomers);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleDeactivate = (id) => {
    setCustomers(customers.map(c => c.id === id ? { ...c, status: 'Inactive' } : c));
  };

  const handleView = (customer) => {
    setSelectedCustomer(customer);
    setModalOpen(true);
  };

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-primary to-accent p-4 rounded-xl mr-4">
            <FiUser className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 font-heading">Customer Relationship Management</h1>
            <p className="text-gray-600 font-body text-lg">Manage your customer relationships</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search customers by name, email, or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <div className="card p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <FiUser className="w-4 h-4" />
                    Name
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <FiMail className="w-4 h-4" />
                    Email
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <FiPhone className="w-4 h-4" />
                    Phone
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map(customer => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{customer.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-600">{customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-600">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      customer.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleView(customer)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-1"
                      >
                        <FiEye className="w-4 h-4" />
                        View
                      </button>
                      {customer.status === 'Active' && (
                        <button
                          onClick={() => handleDeactivate(customer.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center gap-1"
                        >
                          <FiUserX className="w-4 h-4" />
                          Deactivate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No customers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Customer Details Modal */}
      {modalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={() => setModalOpen(false)}
              title="Close"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-6 text-primary-700">Customer Details</h2>
            <div className="mb-4">
              <div className="font-semibold text-gray-700">Name:</div>
              <div className="mb-2">{selectedCustomer.name}</div>
              <div className="font-semibold text-gray-700">Email:</div>
              <div className="mb-2">{selectedCustomer.email}</div>
              <div className="font-semibold text-gray-700">Phone:</div>
              <div className="mb-2">{selectedCustomer.phone}</div>
              <div className="font-semibold text-gray-700">Status:</div>
              <div>{selectedCustomer.status}</div>
            </div>
            <button
              onClick={() => setModalOpen(false)}
              className="w-full bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMPage;