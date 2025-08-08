import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiFilter } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import products, { categories } from '../assets/products';

const Pickles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  // Handle URL parameters on component mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && categories.some(cat => cat.value === categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12 fade-in-up">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Our Pickle</span>
            <span className="text-shimmer block heartbeat">Collection</span>
          </h1>
          <p className="font-body text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our range of authentic, handcrafted pickles made with traditional recipes
            passed down through generations
          </p>

          {/* Decorative line */}
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="glass rounded-2xl shadow-lg p-8 mb-12 slide-in-up">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Enhanced Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
<FiSearch 
  size={24} 
  className="animate-pulse heartbeat text-bold text-black drop-shadow-lg scale-125" 
/>              </div>
              <input
                type="text"
                placeholder=" Search for your favorite pickles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-primary/20 rounded-xl font-body focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 text-gray-700"
              />
            </div>

            {/* Enhanced Filter Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-primary text-light px-6 py-4 rounded-xl font-body font-semibold flex items-center space-x-2 hover:bg-hover transition-all duration-300 hover:scale-105"
            >
              <FiFilter size={18} />
              <span> Filters</span>
            </button>

            {/* Enhanced Desktop Filters */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Category Filter */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary pointer-events-none">
                  <span></span>
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-4 border-2 border-primary/20 rounded-xl font-body focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 appearance-none cursor-pointer min-w-[160px]"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Sort Filter */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary pointer-events-none">
                  <span></span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-10 pr-8 py-4 border-2 border-primary/20 rounded-xl font-body focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 appearance-none cursor-pointer min-w-[180px]"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-4 pt-4 border-t border-accent/20 space-y-4">
              <div>
                <label className="block font-body font-medium text-dark mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-accent/30 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block font-body font-medium text-dark mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-accent/30 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Results Count */}
        <div className="mb-8 fade-in-up">
          <div className="glass rounded-xl p-4 text-center">
            <p className="font-body text-lg font-semibold gradient-text">
              Showing {filteredAndSortedProducts.length} of {products.length} delicious pickles
            </p>
          </div>
        </div>

        {/* Enhanced Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAndSortedProducts.map((product, index) => (
              <div
                key={product.id}
                className="zoom-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 fade-in-up">
            <div className="max-w-lg mx-auto glass rounded-2xl p-12">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-8 pulse-glow">
                <FiSearch size={64} className="text-primary heartbeat" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-dark mb-4 gradient-text">
                No pickles found
              </h3>
              <p className="font-body text-gray-600 mb-8 leading-relaxed">
                We couldn't find any pickles matching your search criteria.
                Try adjusting your filters or search terms to discover our delicious collection.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSortBy('name');
                }}
                className="btn-magical hover-bounce"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pickles;