import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { FiStar, FiShoppingCart, FiHeart, FiCheck, FiX } from "react-icons/fi";
import products from "../assets/products";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <Navigate to="/pickles" replace />;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const discount =
    product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
            <li>/</li>
            <li><a href="/pickles" className="hover:text-primary transition-colors">Pickles</a></li>
            <li>/</li>
            <li className="text-dark font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative image-hover-zoom rounded-2xl overflow-hidden shadow-xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 sm:h-96 lg:h-[500px] rounded-2xl object-cover"
              />
              {product.bestseller && (
                <div className="absolute top-4 left-4 bg-primary text-light px-3 py-1 rounded-full text-sm font-body font-medium shadow-md">
                  Bestseller
                </div>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl backdrop-blur-sm">
                  <span className="bg-light text-dark px-6 py-3 rounded-lg font-body font-medium text-lg shadow-lg">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <span className="text-accent font-body text-sm font-medium uppercase tracking-wider">
                  {product.category}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-dark font-body text-sm">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-4 leading-tight">
                {product.name}
              </h1>

              <p className="font-body text-base sm:text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Section */}
            <div className="bg-light p-4 rounded-xl border border-gray-200">
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-heading text-2xl sm:text-3xl font-bold text-primary">
                  ₹{product.price}
                </span>
                {discount > 0 && (
                  <>
                    <span className="font-body text-lg text-gray-500 line-through">
                      ₹{product.originalPrice}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-body font-medium">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-light rounded-lg">
                <span className="font-body text-gray-600">Weight:</span>
                <span className="font-body font-medium text-dark">
                  {product.weight}
                </span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-light rounded-lg">
                {product.inStock ? (
                  <>
                    <FiCheck className="w-5 h-5 text-green-600" />
                    <span className="font-body text-green-600 font-medium">
                      In Stock
                    </span>
                  </>
                ) : (
                  <>
                    <FiX className="w-5 h-5 text-red-600" />
                    <span className="font-body text-red-600 font-medium">
                      Out of Stock
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-body font-medium transition-colors duration-200 ${
                  product.inStock
                    ? "bg-primary text-light hover:bg-hover"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <FiShoppingCart size={20} />
                <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
              </button>

              <button className="flex items-center justify-center p-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-light transition-colors duration-200">
                <FiHeart size={20} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-light p-4 rounded-lg border border-gray-200">
                <h4 className="font-body font-medium text-dark mb-1">
                  100% Natural
                </h4>
                <p className="text-sm text-gray-600">
                  No artificial preservatives
                </p>
              </div>
              <div className="bg-light p-4 rounded-lg border border-gray-200">
                <h4 className="font-body font-medium text-dark mb-1">
                  Traditional Recipe
                </h4>
                <p className="text-sm text-gray-600">
                  Authentic homemade taste
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Sections */}
        <div className="mt-16 space-y-8">
          {/* Natural Ingredients Section */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl shadow-lg border border-amber-200">
            <h3 className="font-heading font-semibold text-xl text-dark mb-6 flex items-center">
              <span className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">🍃</span>
              </span>
              Natural Ingredients
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm p-3 rounded-lg border border-amber-200 flex items-center space-x-2 hover:bg-white hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="font-medium text-dark text-sm">
                    {ingredient}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-sm text-amber-700 mt-4 italic">
              All ingredients are carefully sourced and 100% natural
            </p>
          </div>

          {/* Traditional Process Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-lg border border-blue-200">
            <h3 className="font-heading font-semibold text-xl text-dark mb-6 flex items-center">
              <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">⚙️</span>
              </span>
              Traditional Pickling Process
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark mb-1">Selection & Preparation</h4>
                    <p className="text-sm text-gray-600">Fresh, high-quality ingredients are carefully selected and cleaned thoroughly</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark mb-1">Spice Mixing</h4>
                    <p className="text-sm text-gray-600">Traditional spice blends are prepared using age-old family recipes</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark mb-1">Marination</h4>
                    <p className="text-sm text-gray-600">Ingredients are marinated in spices and oils for optimal flavor absorption</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark mb-1">Aging Process</h4>
                    <p className="text-sm text-gray-600">Pickles are aged in traditional clay pots for authentic taste development</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl shadow-lg border border-green-200">
            <h3 className="font-heading font-semibold text-xl text-dark mb-6 flex items-center">
              <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">⭐</span>
              </span>
              Customer Reviews & Ratings
            </h3>
            
            {/* Overall Rating */}
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-green-200 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-dark ml-2">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
              </div>
              
              {/* Rating Bars */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const percentage = star === 5 ? 80 : star === 4 ? 15 : star === 3 ? 3 : star === 2 ? 1 : 1;
                  return (
                    <div key={star} className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 w-8">{star}★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12">{percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sample Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Priya S.", rating: 5, comment: "Absolutely delicious! The authentic taste reminds me of my grandmother's recipe.", date: "2 days ago" },
                { name: "Rajesh K.", rating: 5, comment: "Best pickle I've ever tasted. Perfect balance of spices and tanginess.", date: "1 week ago" },
                { name: "Meera P.", rating: 4, comment: "Great quality and authentic flavor. Will definitely order again!", date: "2 weeks ago" }
              ].map((review, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-dark">{review.name}</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-3 h-3 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-dark mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(
                (p) => p.category === product.category && p.id !== product.id
              )
              .slice(0, 4)
              .map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-light rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-body font-medium text-dark mb-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-body font-semibold text-primary">
                        ₹{relatedProduct.price}
                      </span>
                      <button
                        onClick={() => addToCart(relatedProduct)}
                        disabled={!relatedProduct.inStock}
                        className="text-primary hover:text-hover transition-colors duration-200 disabled:text-gray-400"
                      >
                        <FiShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
