import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHome,
  FiPackage,
  FiPlus,
  FiShoppingBag,
  FiMessageSquare,
  FiUser,
  FiLogOut,
  FiGift,
  FiSettings,
  FiBarChart2,
  FiUsers,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/admin/dashboard", icon: FiBarChart2, label: "Dashboard" },
    { path: "/admin/products", icon: FiPackage, label: "Products" },
    { path: "/admin/add-product", icon: FiPlus, label: "Add Product" },
    { path: "/admin/orders", icon: FiShoppingBag, label: "Orders" },
    { path: "/admin/analytics", icon: FiBarChart2, label: "Analytics" },
    { path: "/admin/feedback", icon: FiMessageSquare, label: "Feedback" },
    { path: "/admin/crm", icon: FiUser, label: "CRM" },

    { path: "/admin/coupons", icon: FiGift, label: "Coupons" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ease-in-out"
      >
        <div className="transform transition-transform duration-200">
          {isOpen ? (
            <FiX className="w-6 h-6 text-gray-700" />
          ) : (
            <FiMenu className="w-6 h-6 text-gray-700" />
          )}
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 animate-fadeIn"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-light shadow-2xl z-40 transform transition-all duration-300 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary to-accent">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <FiSettings className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                <p className="text-white/80 text-sm">WaaPickle</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center px-4 py-3 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 ${isActive
                          ? "bg-primary text-white shadow-lg"
                          : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                        }`}
                    >
                      <Icon
                        className={`w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110 ${isActive
                            ? "text-white"
                            : "text-gray-500 group-hover:text-primary"
                          }`}
                      />
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="group flex items-center w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <FiLogOut className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
