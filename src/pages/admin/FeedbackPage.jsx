import { useState, useEffect } from 'react';
import { FiMail, FiCheck, FiX, FiStar, FiMessageCircle } from 'react-icons/fi';
import { formatDate } from '../../utils/format';

import api from '../../utils/api';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await api.get('/admin/messages');
      setFeedback(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      // Provide mock data for development
      const mockFeedback = [
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
      ];
      setFeedback(mockFeedback);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (feedbackId, status) => {
    try {
      await api.patch(`/admin/messages/${feedbackId}/status`, { status });
      setFeedback(feedback.map(msg => 
        msg._id === feedbackId ? { ...msg, status } : msg
      ));
      if (window.showToast) {
        window.showToast('Feedback status updated', 'success');
      }
    } catch (error) {
      console.error('Error updating feedback status:', error);
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
    <div className="p-6 animate-fadeIn">
      <div className="mb-8 animate-slideInLeft">
        <div className="flex items-center mb-4">
          <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-xl mr-4 animate-bounceIn">
            <FiMessageCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-heading">Customer Feedback</h1>
            <p className="text-gray-600 font-body">Manage customer inquiries and support requests</p>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden animate-scaleIn">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 font-heading">Recent Feedback</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-body">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-body">
                  Subject
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-body">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-body">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-body">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feedback.map((message, index) => (
                <tr 
                  key={message._id} 
                  className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-all duration-200 animate-slideInLeft"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-semibold text-sm">
                          {message.customer.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 font-body">{message.customer.name}</div>
                        <div className="text-sm text-gray-500 font-body">{message.customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-body">
                    {message.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 hover:scale-105 ${
                      message.status === 'read' 
                        ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800' 
                        : 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800'
                    }`}>
                      {message.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-body">
                    {formatDate(message.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => {
                          setSelectedFeedback(message);
                          setShowFeedbackModal(true);
                        }}
                        className="p-2 text-primary hover:text-accent hover:bg-primary/10 rounded-lg transition-all duration-200 transform hover:scale-110"
                        title="View feedback"
                      >
                        <FiMail className="w-4 h-4" />
                      </button>
                      {message.status === 'unread' && (
                        <button
                          onClick={() => handleStatusUpdate(message._id, 'read')}
                          className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200 transform hover:scale-110"
                          title="Mark as read"
                        >
                          <FiCheck className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feedback Details Modal */}
      {showFeedbackModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-xl mr-4">
                  <FiStar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 font-heading">
                    Customer Feedback
                  </h3>
                  <p className="text-gray-600 font-body">From {selectedFeedback.customer.name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-all duration-200 transform hover:scale-110"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-2 font-heading">Subject</h4>
                <p className="text-gray-700 font-body">{selectedFeedback.subject}</p>
              </div>

              <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-2 font-heading">Message</h4>
                <p className="text-gray-700 whitespace-pre-wrap font-body leading-relaxed">{selectedFeedback.message}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3 font-heading">Customer Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="font-body"><strong>Name:</strong> {selectedFeedback.customer.name}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="font-body"><strong>Email:</strong> {selectedFeedback.customer.email}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm md:col-span-2">
                    <p className="font-body"><strong>Date:</strong> {formatDate(selectedFeedback.createdAt)}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                {selectedFeedback.status === 'unread' && (
                  <button
                    onClick={() => {
                      handleStatusUpdate(selectedFeedback._id, 'read');
                      setShowFeedbackModal(false);
                    }}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 font-body"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-2 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 transform hover:scale-105 font-body"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;
