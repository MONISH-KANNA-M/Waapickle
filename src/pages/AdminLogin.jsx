import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiShield } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const success = await login(formData.email, formData.password);
    if (success) {
      // Check if user is admin
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-light rounded-2xl shadow-xl p-8 card-float-1">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <FiShield className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading font-bold text-2xl text-dark">Admin Access</span>
            </Link>
            <h2 className="font-heading text-2xl font-bold text-dark mb-2">
              Admin Login
            </h2>
            <p className="font-body text-gray-600">
              Access the admin dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block font-body font-medium text-dark mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg font-body focus:outline-none focus:ring-2 transition-colors duration-200 ${
                  errors.email
                    ? 'border-red-300 focus:ring-red-200 focus:border-red-500'
                    : 'border-accent/30 focus:ring-primary/20 focus:border-primary'
                }`}
                placeholder="Enter admin email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 font-body">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block font-body font-medium text-dark mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg font-body focus:outline-none focus:ring-2 transition-colors duration-200 ${
                    errors.password
                      ? 'border-red-300 focus:ring-red-200 focus:border-red-500'
                      : 'border-accent/30 focus:ring-primary/20 focus:border-primary'
                  }`}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 font-body">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-light py-3 px-6 rounded-lg font-body font-medium hover:bg-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Access Admin Panel'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="font-body text-gray-600">
              <Link
                to="/login"
                className="text-primary hover:text-hover font-medium transition-colors duration-200"
              >
                ← Back to regular login
              </Link>
            </p>
          </div>

          {/* Admin Info */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-body font-medium text-yellow-800 mb-2">Admin Access Info:</h3>
            <ul className="font-body text-sm text-yellow-700 space-y-1">
              <li>• Use any email with "admin" in it (e.g., admin@test.com)</li>
              <li>• Or use: admin@waapickle.com</li>
              <li>• Password: Any 6+ characters</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
