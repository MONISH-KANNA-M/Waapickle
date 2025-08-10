import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiStar,
  FiTruck,
  FiShield,
  FiHeart,
  FiPackage,
  FiCheckCircle,
} from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import OptimizedImage from "../components/OptimizedImage";
import products, { categories } from "../assets/products";

// Carousel images for hero section - using bestseller product images
const carouselImages = [
  "https://media.istockphoto.com/id/506283829/photo/jars-of-pickled-vegetables-in-the-garden-marinated-food.jpg?s=612x612&w=0&k=20&c=f_JBwYsZer1xUERCMvHnld7yXUxumC1Cm4bupSzFzGQ=",
  "https://media.istockphoto.com/id/596042100/photo/preserved-vegetables-in-the-jars.jpg?s=612x612&w=0&k=20&c=9nWxratbVv4dFDfUyV__omQ91Xp74c1hGDSfIFgO3dU=",
  "https://c4.wallpaperflare.com/wallpaper/849/285/173/pickle-can-garlic-cucumbers-wallpaper-preview.jpg",
  "https://storage.googleapis.com/jm-gcp-bethestory-p-12po-bucket/uploads/2021/08/pickling.jpg",
  "https://png.pngtree.com/thumb_back/fh260/background/20220708/pngtree-mango-pickle-in-glass-bowl-with-raw-ingredients-on-black-surface-photo-image_37704290.jpg",
];

const orderStatus = [
  { status: "Placed", icon: <FiPackage />, color: "bg-blue-100 text-blue-700" },
  {
    status: "Shipped",
    icon: <FiTruck />,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    status: "Delivered",
    icon: <FiCheckCircle />,
    color: "bg-green-100 text-green-700",
  },
];

const Home = () => {
  const bestsellers = products.filter((product) => product.bestseller);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      text: "The best pickles I've ever tasted! Authentic flavors and excellent quality.",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      rating: 5,
      text: "Fast delivery and amazing packaging. The mango pickle is absolutely delicious!",
    },
    {
      id: 3,
      name: "Anita Patel",
      rating: 4,
      text: "Traditional taste just like my grandmother used to make. Highly recommended!",
    },
  ];

  const features = [
    {
      icon: <FiTruck size={24} />,
      title: "Free Delivery",
      description: "Free shipping on orders above ₹500",
    },
    {
      icon: <FiShield size={24} />,
      title: "Quality Assured",
      description: "100% natural ingredients and traditional recipes",
    },
    {
      icon: <FiHeart size={24} />,
      title: "Made with Love",
      description: "Handcrafted with care and authentic flavors",
    },
  ];

  return (
    <div className="min-h-screen font-sans bg-bg">
      {/* Hero Section with Enhanced Carousel */}
      <section className="relative bg-gradient-to-br from-primary/10 to-accent/10 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="slide-in-left">
              <h1 className="font-heading text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                <span className="gradient-text">Authentic</span>
                <span className="text-shimmer block heartbeat">
                  Artisanal Pickles
                </span>
              </h1>
              <p className="font-body text-xl text-gray-700 mb-8 leading-relaxed fade-in-up">
                Discover the perfect blend of traditional recipes and premium
                ingredients. Each jar is handcrafted with love to bring you
                authentic flavors that remind you of home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 bounce-in-delayed">
                <Link
                  to="/pickles"
                  className="btn-magical hover-slide flex items-center justify-center space-x-2"
                >
                  <span>Shop Now</span>
                  <FiArrowRight size={20} className="wiggle" />
                </Link>
                <button
                  className="btn-secondary hover-glow"
                  onClick={() => navigate("/about")}
                >
                  Learn More
                </button>
              </div>
            </div>

            <div className="relative slide-in-right">
              <div className="relative image-hover-zoom rounded-3xl overflow-hidden shadow-2xl">
                <OptimizedImage
                  src={carouselImages[carouselIndex]}
                  alt="Artisanal Pickles"
                  className="w-full h-[400px] transition-all duration-700 ease-in-out object-cover"
                  key={carouselIndex}
                  lazy={false}
                  placeholder={true}
                />

                {/* Carousel indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {carouselImages.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === carouselIndex
                          ? "bg-white scale-125"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-light relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-dots opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="font-heading text-4xl md:text-5xl font-bold gradient-text mb-4">
              Why Choose Us
            </h2>
            <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our premium pickle collection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group text-center p-8 glass rounded-2xl hover-lift hover-glow transition-all duration-500 bounce-in card-float-${
                  index + 1
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 text-light group-hover:rotate-slow transition-all duration-300 hover-bounce">
                  {feature.icon}
                </div>
                <h3 className="font-heading font-bold text-2xl text-dark mb-4 group-hover:text-shimmer transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="font-body text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative element */}
                <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Bestsellers Section */}
      <section className="py-20 bg-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              <span className="text-shimmer">Our Bestsellers</span>
            </h2>
            <p className="font-body text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our most loved pickles, crafted with traditional recipes
              and premium ingredients that have delighted families for
              generations
            </p>

            {/* Decorative line */}
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-primary mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {bestsellers.map((product, index) => (
              <div
                key={product.id}
                className={`zoom-in card-float-${index + 1}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center bounce-in-delayed">
            <Link
              to="/pickles"
              className="btn-magical hover-slide inline-flex items-center space-x-3 text-lg px-10 py-4"
            >
              <span>View All Pickles</span>
              <FiArrowRight size={24} className="wiggle" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-primary mb-4">
              Shop by Category
            </h2>
            <p className="font-body text-lg text-gray-600">
              Find the perfect pickle for every taste
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.slice(1).map((category, index) => (
              <Link
                key={category.value}
                to={`/pickles?category=${category.value}`}
                className={`group bg-white rounded-xl shadow-md hover:shadow-2xl hover:scale-105 hover:-translate-y-2 hover:bg-primary/10 transition-all duration-300 overflow-hidden card-float-${
                  index + 1
                }`}
              >
                <div className="h-32 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="font-heading text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-200 animate-pulse">
                    {category.name}
                  </span>
                </div>
                <div className="p-6">
                  <p className="font-body text-gray-600 text-center">
                    Explore our {category.name.toLowerCase()} pickle collection
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-primary mb-4">
              What Our Customers Say
            </h2>
            <p className="font-body text-lg text-gray-600">
              Read reviews from our happy customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-light p-8 rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 card-float-${
                  index + 1
                }`}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current animate-pulse"
                    />
                  ))}
                </div>
                <p className="font-body text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <p className="font-body font-semibold text-dark">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

// Add these Tailwind custom classes to your global CSS for float-animation and slow spin
/*
.float-animation {
  animation: float 2s ease-in-out infinite;
}
@keyframes float {
  0% { transform: translateY(0px);}
  50% { transform: translateY(-10px);}
  100% { transform: translateY(0px);}
}
.animate-spin-slow {
  animation: spin 3s linear infinite;
}
@keyframes spin {
  100% { transform: rotate(360deg);}
}
.animate-float {
  animation: float 2s ease-in-out infinite;
}
*/
/*
.float-animation {
  animation: float 2s ease-in-out infinite;
}
@keyframes float {
  0% { transform: translateY(0px);}
  50% { transform: translateY(-10px);}
  100% { transform: translateY(0px);}
}
.animate-spin-slow {
  animation: spin 3s linear infinite;
}
@keyframes spin {
  100% { transform: rotate(360deg);}
}
.animate-float {
  animation: float 2s ease-in-out infinite;
}
*/
