// CouponManagementPage.jsx
// Admin page for managing coupons (view, add, delete; local state only)
import { useState } from 'react';
import { FiGift, FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';

const initialCoupons = [
  { code: 'PICKLE10', discount: 10, count: 100, active: true, start: '', end: '' },
  { code: 'PICKLE20', discount: 20, count: 50, active: false, start: '', end: '' },
];

const CouponManagementPage = () => {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [count, setCount] = useState('');
  const [active, setActive] = useState(true);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [error, setError] = useState('');

  const handleAddCoupon = (e) => {
    e.preventDefault();
    const trimmedCode = code.trim().toUpperCase();
    const discountValue = parseInt(discount, 10);
    const countValue = parseInt(count, 10);
    if (!trimmedCode || isNaN(discountValue) || discountValue <= 0 || discountValue > 100 || isNaN(countValue) || countValue < 1) {
      setError('Enter a valid code, discount (1-100), and count (>=1)');
      return;
    }
    if (start && end && new Date(end) < new Date(start)) {
      setError('End date must be after start date');
      return;
    }
    if (coupons.some(c => c.code === trimmedCode)) {
      setError('Coupon code already exists');
      return;
    }
    setCoupons([
      ...coupons,
      { code: trimmedCode, discount: discountValue, count: countValue, active, start, end }
    ]);
    setCode('');
    setDiscount('');
    setCount('');
    setActive(true);
    setStart('');
    setEnd('');
    setError('');
  };

  const handleDelete = (code) => {
    setCoupons(coupons.filter(c => c.code !== code));
  };

  const handleCountChange = (code, newCount) => {
    if (isNaN(newCount) || newCount < 1) return;
    setCoupons(coupons.map(c => c.code === code ? { ...c, count: newCount } : c));
  };

  const handleToggleActive = (code) => {
    setCoupons(coupons.map(c => c.code === code ? { ...c, active: !c.active } : c));
  };

  const handleScheduleChange = (code, field, value) => {
    setCoupons(coupons.map(c => c.code === code ? { ...c, [field]: value } : c));
  };

  return (
    <div className="p-6 bg-bg min-h-screen animate-fadeIn">
      {/* Header */}
      <div className="mb-8 animate-slideInLeft">
        <div className="flex items-center mb-4">
          <div className="bg-gradient-to-r from-primary to-accent p-4 rounded-xl mr-4 animate-bounceIn">
            <FiGift className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 font-heading">Coupon Management</h1>
            <p className="text-gray-600 font-body text-lg">Create and manage discount coupons for your customers</p>
          </div>
        </div>
      </div>

      {/* Add Coupon Form */}
      <div className="card p-6 mb-8 animate-scaleIn animation-delay-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 font-heading">Add New Coupon</h2>
        <form onSubmit={handleAddCoupon} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Code</label>
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="e.g., PICKLE10"
              className="w-full px-4 py-3 border border-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              maxLength={20}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Discount %</label>
            <input
              type="number"
              value={discount}
              onChange={e => setDiscount(e.target.value)}
              placeholder="10"
              className="w-full px-4 py-3 border border-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              min={1}
              max={100}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Usage Count</label>
            <input
              type="number"
              value={count}
              onChange={e => setCount(e.target.value)}
              placeholder="100"
              className="w-full px-4 py-3 border border-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              min={1}
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-primary text-light px-4 py-3 rounded-lg font-medium hover:bg-hover transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <FiPlus className="w-4 h-4" />
              Add Coupon
            </button>
          </div>
        </form>
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Coupons Table */}
      <div className="card overflow-hidden animate-scaleIn animation-delay-300">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount (%)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {coupons.map(coupon => (
                <tr key={coupon.code} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-lg font-medium text-gray-900">{coupon.code}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {coupon.discount}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={coupon.count}
                      min={1}
                      className="w-20 px-2 py-1 border border-accent/30 rounded focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      onChange={e => handleCountChange(coupon.code, parseInt(e.target.value, 10))}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={coupon.active}
                      onChange={() => handleToggleActive(coupon.code)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="date"
                      value={coupon.start}
                      onChange={e => handleScheduleChange(coupon.code, 'start', e.target.value)}
                      className="px-3 py-1 border border-accent/30 rounded focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="date"
                      value={coupon.end}
                      onChange={e => handleScheduleChange(coupon.code, 'end', e.target.value)}
                      className="px-3 py-1 border border-accent/30 rounded focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDelete(coupon.code)}
                      className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      title="Delete coupon"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {coupons.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No coupons available. Create your first coupon above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CouponManagementPage; 