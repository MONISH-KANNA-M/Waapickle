import React from "react";
import { Link } from "react-router-dom";
import { FiStar, FiShoppingCart } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="group bg-light rounded-xl shadow-md hover:shadow-xl hover:bg-primary/5 transition-all duration-300 overflow-hidden">
      {/* Image section with link */}
      <Link
        to={`/product/${product.id}`}
        className="block"
      >
        <div className="relative image-hover-zoom overflow-hidden rounded-t-xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Enhanced Bestseller badge */}
          {product.bestseller && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-body font-bold shadow-lg z-10 animate-pulse">
              <span className="flex items-center space-x-1">
                <span>⭐</span>
                <span>BESTSELLER</span>
              </span>
            </div>
          )}

          {/* Stock status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
              <span className="bg-light text-dark px-4 py-2 rounded-lg font-body font-medium shadow-lg bounce-in">
                Out of Stock
              </span>
            </div>
          )}

          {/* Hover overlay with shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
        </div>
      </Link>

      {/* Product details section - separate from link */}
      <div className="p-6 bg-gradient-to-b from-light to-white">
        {/* Category and Rating */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-accent font-body text-sm font-medium px-2 py-1 bg-accent/10 rounded-full">
            {product.category}
          </span>
          <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full">
            <FiStar className="w-4 h-4 text-yellow-400 fill-current pulse-glow" />
            <span className="text-dark font-body text-sm font-semibold">
              {product.rating}
            </span>
            <span className="text-gray-500 font-body text-xs">
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* Product Name with Link */}
        <Link
          to={`/product/${product.id}`}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="font-heading font-bold text-lg text-dark mb-3 hover:text-primary transition-colors duration-200 line-clamp-2 cursor-pointer">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 font-body text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price and Weight */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="font-body font-bold text-xl text-primary gradient-text">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="font-body text-sm text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <span className="font-body text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {product.weight}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-body font-medium transition-colors duration-200 ${
              product.inStock
                ? "bg-primary text-light hover:bg-hover"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <FiShoppingCart size={18} />
            <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
          </button>

          {/* View Details Button */}
          <Link
            to={`/product/${product.id}`}
            className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-body font-medium border border-primary text-primary hover:bg-primary hover:text-light transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <span>View Details</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
