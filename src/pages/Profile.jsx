import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit3, FiSave, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // In a real app, this would make an API call to update user profile
    toast.success('Profile updated successfully!');
    setIsEditing(false);
    
    // Save to localStorage for demo
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
    });
    setIsEditing(false);
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
              You need to be logged in to view your profile.
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-dark mb-2">My Profile</h1>
          <p className="font-body text-gray-600">Manage your account information</p>
        </div>

        <div className="bg-light rounded-2xl shadow-lg overflow-hidden card-float-1">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary to-accent p-8">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-24 h-24 bg-light rounded-full flex items-center justify-center">
                <FiUser size={48} className="text-primary" />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="font-heading text-2xl font-bold text-light mb-2">
                  {user?.name}
                </h2>
                <p className="font-body text-light/90">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-heading text-xl font-semibold text-dark">
                Account Information
              </h3>
              
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 bg-primary text-light px-4 py-2 rounded-lg font-body hover:bg-hover transition-colors duration-200"
                >
                  <FiEdit3 size={18} />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-body hover:bg-green-700 transition-colors duration-200"
                  >
                    <FiSave size={18} />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg font-body hover:bg-gray-700 transition-colors duration-200"
                  >
                    <FiX size={18} />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-6">
                <div>
                  <label className="block font-body font-medium text-dark mb-2">
                    <FiUser className="inline mr-2" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-accent/30 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  ) : (
                    <div className="bg-bg p-4 rounded-lg font-body text-dark">
                      {formData.name || 'Not provided'}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-body font-medium text-dark mb-2">
                    <FiMail className="inline mr-2" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-accent/30 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  ) : (
                    <div className="bg-bg p-4 rounded-lg font-body text-dark">
                      {formData.email || 'Not provided'}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-body font-medium text-dark mb-2">
                    <FiPhone className="inline mr-2" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-accent/30 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  ) : (
                    <div className="bg-bg p-4 rounded-lg font-body text-dark">
                      {formData.phone || 'Not provided'}
                    </div>
                  )}
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-6">
                <div>
                  <label className="block font-body font-medium text-dark mb-2">
                    <FiMapPin className="inline mr-2" />
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      rows={3}
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-accent/30 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    />
                  ) : (
                    <div className="bg-bg p-4 rounded-lg font-body text-dark h-24">
                      {formData.address || 'Not provided'}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body font-medium text-dark mb-2">
                      City
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-accent/30 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    ) : (
                      <div className="bg-bg p-4 rounded-lg font-body text-dark">
                        {formData.city || 'Not provided'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block font-body font-medium text-dark mb-2">
                      State
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-accent/30 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    ) : (
                      <div className="bg-bg p-4 rounded-lg font-body text-dark">
                        {formData.state || 'Not provided'}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-body font-medium text-dark mb-2">
                    Pincode
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-accent/30 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  ) : (
                    <div className="bg-bg p-4 rounded-lg font-body text-dark">
                      {formData.pincode || 'Not provided'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;