import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-bg py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4">
            Get In Touch
          </h1>
          <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question about our pickles? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-dark mb-6">
                Contact Information
              </h2>
              <p className="font-body text-gray-600 mb-8">
                Reach out to us through any of the following channels. We're here to help!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="bg-light p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 card-float-1">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FiMail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-dark mb-2">Email Us</h3>
                    <p className="font-body text-gray-600 mb-2">
                      Send us an email and we'll respond within 24 hours.
                    </p>
                    <a
                      href="mailto:hello@picklecraft.com"
                      className="font-body text-primary hover:text-hover transition-colors duration-200"
                    >
                      hello@picklecraft.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-light p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 card-float-2">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaWhatsapp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-dark mb-2">WhatsApp</h3>
                    <p className="font-body text-gray-600 mb-2">
                      Chat with us directly on WhatsApp for quick support.
                    </p>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-green-600 hover:text-green-700 transition-colors duration-200"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-light p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 card-float-3">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiPhone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-dark mb-2">Call Us</h3>
                    <p className="font-body text-gray-600 mb-2">
                      Call us during business hours (9 AM - 6 PM IST).
                    </p>
                    <a
                      href="tel:+919876543210"
                      className="font-body text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-light p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 card-float-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <FiMapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-dark mb-2">Visit Us</h3>
                    <p className="font-body text-gray-600 mb-2">
                      Come visit our production facility and taste our pickles fresh.
                    </p>
                    <address className="font-body text-gray-700 not-italic">
                      123 Pickle Street,<br />
                      Artisan Quarter,<br />
                      Mumbai, Maharashtra 400001
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-light rounded-2xl shadow-lg p-8">
            <h2 className="font-heading text-2xl font-bold text-dark mb-6">
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block font-body font-medium text-dark mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-accent/30 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block font-body font-medium text-dark mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-accent/30 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block font-body font-medium text-dark mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-accent/30 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="What is this regarding?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block font-body font-medium text-dark mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-accent/30 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-light py-3 px-6 rounded-lg font-body font-medium hover:bg-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <FiSend size={18} />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-light rounded-xl shadow-md p-8 text-center">
          <h3 className="font-heading text-xl font-bold text-dark mb-4">
            Business Hours
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-body text-gray-600">
            <div>
              <p className="font-medium text-dark">Monday - Friday</p>
              <p>9:00 AM - 6:00 PM IST</p>
            </div>
            <div>
              <p className="font-medium text-dark">Saturday</p>
              <p>10:00 AM - 4:00 PM IST</p>
            </div>
            <div>
              <p className="font-medium text-dark">Sunday</p>
              <p>Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;