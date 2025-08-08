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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative image-hover-zoom rounded-2xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] rounded-2xl shadow-lg object-cover"
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
              <div className="flex items-center justify-between mb-2">
                <span className="text-accent font-body text-sm font-medium uppercase tracking-wider">
                  {product.category}
                </span>
                <div className="flex items-center space-x-1">
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

              <h1 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4">
                {product.name}
              </h1>

              <p className="font-body text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="font-heading text-3xl font-bold text-primary">
                ₹{product.price}
              </span>
              {discount > 0 && (
                <>
                  <span className="font-body text-xl text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-body font-medium">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Weight */}
            <div className="flex items-center space-x-2">
              <span className="font-body text-gray-600">Weight:</span>
              <span className="font-body font-medium text-dark">
                {product.weight}
              </span>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
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

            {/* Ingredients */}
            <div className="bg-light p-6 rounded-xl shadow-md">
              <h3 className="font-heading font-semibold text-lg text-dark mb-4">
                Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="bg-accent/20 text-dark px-3 py-1 rounded-full text-sm font-body"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-light p-4 rounded-lg">
                <h4 className="font-body font-medium text-dark mb-1">
                  100% Natural
                </h4>
                <p className="text-sm text-gray-600">
                  No artificial preservatives
                </p>
              </div>
              <div className="bg-light p-4 rounded-lg">
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
