import { FiHeart, FiShield, FiStar, FiUsers, FiAward, FiMapPin, FiArrowRight, FiClock, FiTrendingUp, FiGlobe, FiCheckCircle } from "react-icons/fi";

const About = () => {
  const journeySteps = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Started in a small kitchen with a dream to bring authentic pickling traditions to modern tables.",
      icon: "🌱",
      color: "from-green-400 to-emerald-500"
    },
    {
      year: "2021",
      title: "First Farmers Market",
      description: "Our pickles gained local recognition at the weekly farmers market, building our first loyal customers.",
      icon: "🏪",
      color: "from-blue-400 to-cyan-500"
    },
    {
      year: "2022",
      title: "Commercial Kitchen",
      description: "Expanded to a commercial kitchen to meet growing demand while maintaining our artisanal approach.",
      icon: "🏭",
      color: "from-purple-400 to-violet-500"
    },
    {
      year: "2023",
      title: "Online Store Launch",
      description: "Launched our online store to share our pickles with pickle lovers across the country.",
      icon: "🌐",
      color: "from-orange-400 to-red-500"
    }
  ];

  const values = [
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Tradition",
      description: "We honor time-tested pickling techniques passed down through generations.",
      bgColor: "from-amber-400 to-orange-500"
    },
    {
      icon: <FiStar className="w-8 h-8" />,
      title: "Quality",
      description: "We use only the finest ingredients and never compromise on taste or safety.",
      bgColor: "from-emerald-400 to-teal-500"
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Innovation",
      description: "We blend traditional methods with modern creativity to create unique flavors.",
      bgColor: "from-purple-400 to-indigo-500"
    }
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full float-animation blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full float-delayed blur-xl"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-primary/15 to-accent/15 rounded-full float-animation blur-lg"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-accent/15 to-primary/15 rounded-full float-delayed blur-lg"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-block mb-6">
              <span className="inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-6xl md:text-8xl font-bold animate-pulse">
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Our journey from kitchen table to your table
              </span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed slide-in-up">
              Every jar tells a story of tradition, passion, and the perfect balance of flavors
            </p>

            {/* Decorative elements */}
            <div className="flex justify-center items-center space-x-6 mt-12 bounce-in-delayed">
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
              <FiHeart className="text-primary text-3xl pulse-glow" />
              <div className="w-16 h-1 bg-gradient-to-r from-accent to-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Meet Our Founder Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Image */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80"
              alt="Sarah Johnson - Founder"
              className="relative rounded-3xl shadow-2xl w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary to-accent text-light p-6 rounded-2xl shadow-xl transform group-hover:rotate-12 transition-transform duration-500">
              <FiAward className="w-10 h-10" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="inline-block bg-gradient-to-r from-primary to-accent text-light px-6 py-2 rounded-full text-sm font-semibold mb-4">
              Our Story
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark leading-tight">
              Meet Our Founder
            </h2>
            <div className="space-y-6">
              <p className="font-body text-lg text-gray-600 leading-relaxed">
                Sarah Johnson grew up watching her grandmother preserve the summer's bounty in their family kitchen.
                The smell of dill, garlic, and vinegar filled the air as generations of family recipes were passed down.
              </p>
              <p className="font-body text-lg text-gray-600 leading-relaxed">
                After years of experimenting with traditional techniques and modern twists, Sarah decided to share her passion for pickling with the world.
                What started as a small batch in her home kitchen has grown into a beloved brand that honors tradition while embracing innovation.
              </p>
            </div>
            
            {/* Quote */}
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent rounded-full"></div>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-2xl border border-amber-200">
                <p className="font-body text-xl text-gray-700 italic leading-relaxed">
                  "Every jar we make is a tribute to my grandmother's wisdom and a promise to future generations that the art of pickling will never be lost."
                </p>
                <div className="flex items-center mt-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mr-4">
                    <FiHeart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark">Sarah Johnson</p>
                    <p className="text-sm text-gray-600">Founder & Master Pickler</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
              <p className="font-body text-lg text-gray-700 italic text-center">
                "Inspired by our family's love of all things pickled."
              </p>
            </div>
          </div>
        </div>

        {/* Our Journey Section - Redesigned */}
        <div className="mb-32">
          <div className="text-center mb-20 fade-in-up">
            <div className="inline-block bg-gradient-to-r from-primary to-accent text-light px-8 py-3 rounded-full text-lg font-semibold mb-6">
              Our Growth Story
            </div>
            <h2 className="font-heading text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Our Journey
              </span>
            </h2>
            <p className="font-body text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From humble beginnings to becoming a beloved pickle brand
            </p>

            {/* Decorative line */}
            <div className="w-24 h-2 bg-gradient-to-r from-primary to-accent mx-auto mt-8 rounded-full"></div>
          </div>

          {/* New Journey Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {journeySteps.map((step, index) => (
              <div key={index} className="group relative">
                {/* Connection lines */}
                {index < journeySteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-300 z-0 transform -translate-y-1/2"></div>
                )}
                
                <div className="relative z-10 bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 group-hover:scale-105 border border-gray-100">
                  {/* Icon */}
                  <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto transform group-hover:rotate-12 transition-transform duration-500`}>
                    {step.icon}
                  </div>
                  
                  {/* Year */}
                  <div className="text-center mb-4">
                    <span className="inline-block bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-full text-sm font-bold">
                      {step.year}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-heading text-2xl font-bold text-dark mb-4 text-center group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="font-body text-gray-600 leading-relaxed text-center">
                    {step.description}
                  </p>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mb-32">
          <div className="text-center mb-20 fade-in-up">
            <div className="inline-block bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-full text-lg font-semibold mb-6">
              What Drives Us
            </div>
            <h2 className="font-heading text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Our Values
              </span>
            </h2>
            <p className="font-body text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The principles that guide everything we do
            </p>

            {/* Decorative line */}
            <div className="w-24 h-2 bg-gradient-to-r from-primary to-accent mx-auto mt-8 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map((value, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-gray-100 overflow-hidden`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className={`w-20 h-20 bg-gradient-to-r ${value.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-8 text-light group-hover:rotate-12 transition-all duration-500 transform group-hover:scale-110`}>
                  {value.icon}
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-heading text-2xl font-bold text-dark mb-6 text-center group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="font-body text-gray-600 leading-relaxed text-center">
                    {value.description}
                  </p>
                </div>

                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${value.bgColor} opacity-10 rounded-bl-3xl`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-block bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
              How We Work
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark leading-tight">
              Our Process
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-6 group">
                <div className="bg-gradient-to-r from-primary to-accent text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl text-dark mb-2 group-hover:text-primary transition-colors duration-300">Careful Selection</h3>
                  <p className="font-body text-gray-600">We handpick the freshest ingredients from trusted local farmers.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6 group">
                <div className="bg-gradient-to-r from-primary to-accent text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl text-dark mb-2 group-hover:text-primary transition-colors duration-300">Traditional Methods</h3>
                  <p className="font-body text-gray-600">Using age-old techniques passed down through generations.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6 group">
                <div className="bg-gradient-to-r from-primary to-accent text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl text-dark mb-2 group-hover:text-primary transition-colors duration-300">Quality Control</h3>
                  <p className="font-body text-gray-600">Every batch is tested to ensure perfect taste and safety.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <img
              src="https://media.istockphoto.com/id/1182262157/photo/pickles-in-jars.jpg?s=612x612&w=0&k=20&c=gueIu-0RwTSjT-C-16OwoOGwp3fy-zA4g3-DRNrCF3M="
              alt="Quality control and packaging process"
              className="relative rounded-3xl shadow-2xl w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute -top-6 -left-6 bg-gradient-to-r from-accent to-primary text-white p-6 rounded-2xl shadow-xl transform group-hover:rotate-12 transition-transform duration-500">
              <FiMapPin className="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="relative bg-gradient-to-br from-primary via-accent to-primary py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full float-animation blur-xl"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-white/10 rounded-full float-delayed blur-xl"></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-white/10 rounded-full float-animation blur-lg"></div>
          <div className="absolute bottom-32 right-1/3 w-28 h-28 bg-white/10 rounded-full float-delayed blur-lg"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="fade-in-up">
            <div className="inline-block mb-8">
              <span className="text-6xl animate-bounce"></span>
            </div>
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-white mb-8 text-shadow">
              <span className="heartbeat">Join Our Pickle Family</span>
            </h2>
            <p className="font-body text-xl md:text-2xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the taste of tradition and discover why our pickles have become a beloved part of so many tables.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center bounce-in-delayed">
              <a
                href="/pickles"
                className="group bg-white text-primary px-12 py-5 rounded-2xl font-body font-bold text-xl hover-lift hover-glow transition-all duration-300 inline-flex items-center justify-center space-x-3 relative overflow-hidden shadow-2xl"
              >
                <span>Explore Our Pickles</span>
                <FiArrowRight size={24} className="wiggle" />

                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </a>
              <a
                href="/contact"
                className="group border-3 border-white text-white px-12 py-5 rounded-2xl font-body font-bold text-xl hover:bg-white hover:text-primary transition-all duration-300 inline-flex items-center justify-center space-x-3 hover-bounce relative overflow-hidden shadow-2xl"
              >
                <span>Get in Touch</span>
                <FiHeart size={24} className="pulse-glow" />

                {/* Button background effect */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 