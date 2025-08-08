import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');
  
  const { login, loading } = useAuth();
  const navigate = useNavigate();

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
      navigate('/');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!forgotPasswordEmail) {
      setForgotPasswordMessage('Please enter your email address');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(forgotPasswordEmail)) {
      setForgotPasswordMessage('Please enter a valid email address');
      return;
    }
    
    // Simulate password reset
    setForgotPasswordMessage('Password reset link has been sent to your email!');
    setTimeout(() => {
      setShowForgotPassword(false);
      setForgotPasswordEmail('');
      setForgotPasswordMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-light rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSWO5trvhKokO0_hB2SBXO400gYMEOL8QFzQ&s" alt="" />
              </div>
              <span className="font-heading font-bold text-2xl text-dark">WaaPickle</span>
            </Link>
            <h2 className="font-heading text-2xl font-bold text-dark mb-2">
              Welcome Back
            </h2>
            <p className="font-body text-gray-600">
              Sign in to your account to continue
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
                placeholder="Enter your email"
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
                  placeholder="Enter your password"
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

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-primary hover:text-hover font-medium transition-colors duration-200"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-light py-3 px-6 rounded-lg font-body font-medium hover:bg-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center space-y-2">
            <p className="font-body text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-primary hover:text-hover font-medium transition-colors duration-200"
              >
                Sign up here
              </Link>
            </p>
            <p className="font-body text-gray-600">
              Admin access?{' '}
              <Link
                to="/admin-login"
                className="text-primary hover:text-hover font-medium transition-colors duration-200"
              >
                Login as admin
              </Link>
            </p>
          </div>

          {/* Demo Account Info */}
          <div className="mt-6 p-4 bg-accent/10 rounded-lg">
            <p className="font-body text-sm text-gray-700 text-center">
              <strong>Demo:</strong> Use any email and password (6+ characters) to login
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-light rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <h3 className="font-heading text-xl font-bold text-dark mb-2">
                Forgot Password
              </h3>
              <p className="font-body text-gray-600">
                Enter your email address to reset your password
              </p>
            </div>

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label htmlFor="forgot-email" className="block font-body font-medium text-dark mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="forgot-email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-accent/30 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Enter your email"
                />
              </div>

              {forgotPasswordMessage && (
                <div className={`p-3 rounded-lg text-sm font-body ${
                  forgotPasswordMessage.includes('sent') 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {forgotPasswordMessage}
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setForgotPasswordEmail('');
                    setForgotPasswordMessage('');
                  }}
                  className="flex-1 bg-gray-300 text-dark py-2 px-4 rounded-lg font-body font-medium hover:bg-gray-400 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-light py-2 px-4 rounded-lg font-body font-medium hover:bg-hover transition-colors duration-200"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;