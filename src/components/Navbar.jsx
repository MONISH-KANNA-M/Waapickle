import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiChevronDown,
  FiBell,
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiSettings,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const orderNotifications = savedOrders.map(order => ({
        id: order.id,
        type: 'order',
        title: `Order #${order.id.slice(-8).toUpperCase()}`,
        message: `Your order is ${order.status}`,
        status: order.status,
        date: order.createdAt,
        read: false
      }));
      setNotifications(orderNotifications);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Pickles", path: "/pickles" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-light shadow-lg border-b border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSWO5trvhKokO0_hB2SBXO400gYMEOL8QFzQ&s" alt="" />
            </div>
            <span className="font-heading font-bold text-xl text-dark">
              WaaPickle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="font-body text-dark hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side - Cart and Profile */}
          <div className="flex items-center gap-6">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative flex items-center p-2 text-dark hover:text-primary transition-colors duration-200"
            >
              <FiShoppingCart size={24} />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-light text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {/* Notification Icon */}
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="relative flex items-center ml-2 p-2 text-dark hover:text-primary transition-colors duration-200"
                >
                  <FiBell size={22} className="text-yellow-500" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 animate-bounce">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {isNotificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-light rounded-xl shadow-2xl border border-gray-200 z-50">
                    <div className="p-4">
                      <h3 className="font-heading font-semibold text-dark mb-3">Notifications</h3>
                      {notifications.length === 0 ? (
                        <p className="text-gray-500 text-sm">No notifications</p>
                      ) : (
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-3 rounded-lg border ${
                                notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                  {notification.status === 'placed' && <FiPackage className="w-5 h-5 text-blue-600" />}
                                  {notification.status === 'shipped' && <FiTruck className="w-5 h-5 text-yellow-600" />}
                                  {notification.status === 'delivered' && <FiCheckCircle className="w-5 h-5 text-green-600" />}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-body font-medium text-dark text-sm">
                                    {notification.title}
                                  </h4>
                                  <p className="font-body text-gray-600 text-xs">
                                    {notification.message}
                                  </p>
                                  <p className="font-body text-gray-500 text-xs mt-1">
                                    {new Date(notification.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Profile Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-2 text-dark hover:text-primary transition-colors duration-200"
                >
                  <FiUser size={24} />
                  <span className="hidden md:block font-body">
                    {user?.name}
                  </span>
                  <FiChevronDown size={16} />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-light rounded-lg shadow-lg border border-accent/20 py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 font-body text-dark hover:bg-bg transition-colors duration-200"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 font-body text-dark hover:bg-bg transition-colors duration-200"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 font-body text-dark hover:bg-bg transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="font-body text-dark hover:text-primary transition-colors duration-200"
                >
                  Login
                </Link>
               
                <Link
                  to="/signup"
                  className="bg-primary text-light px-4 py-2 rounded-lg font-body hover:bg-hover transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-dark hover:text-primary transition-colors duration-200"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-light border-t border-accent/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-2 font-body text-dark hover:bg-bg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Admin Dashboard Link in Mobile Menu */}
              {isAuthenticated && isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="block px-3 py-2 font-body text-primary hover:bg-bg transition-colors duration-200 flex items-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiSettings size={16} />
                  <span>Admin Dashboard</span>
                </Link>
              )}

              {!isAuthenticated && (
                <div className="pt-4 border-t border-accent/20">
                  <Link
                    to="/login"
                    className="block px-3 py-2 font-body text-dark hover:bg-bg transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                 
                  <Link
                    to="/signup"
                    className="block px-3 py-2 font-body text-dark hover:bg-bg transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
