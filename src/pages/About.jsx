import { FiHeart, FiShield, FiStar, FiUsers, FiAward, FiMapPin, FiArrowRight } from "react-icons/fi";

const About = () => {
  const teamMembers = [
    {
      name: "Priya Sharma",
      role: "Founder & Master Pickler",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
      description: "With 15+ years of experience in traditional pickle making, Priya brings authentic recipes passed down through generations."
    },
    {
      name: "Rajesh Kumar",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      description: "Ensures every jar meets our high quality standards and maintains our traditional methods."
    },
    {
      name: "Anjali Patel",
      role: "Quality Control Specialist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
      description: "Makes sure every ingredient is fresh and every batch is perfect before it reaches your table."
    }
  ];

  const values = [
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: "Made with Love",
      description: "Every jar is crafted with the same love and care that goes into homemade pickles."
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Quality Assured",
      description: "We use only the finest ingredients and maintain strict quality control standards."
    },
    {
      icon: <FiStar className="w-8 h-8" />,
      title: "Traditional Recipes",
      description: "Our recipes have been passed down through generations, preserving authentic flavors."
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Community Focused",
      description: "Supporting local farmers and contributing to our community's growth."
    }
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Enhanced Hero Section */}
      <div className="relative bg-waves py-24 overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full float-animation"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full float-delayed"></div>
          <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-primary/10 rounded-full float-animation"></div>
          <div className="absolute bottom-20 right-1/3 w-14 h-14 bg-accent/10 rounded-full float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 fade-in-up">
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-8">
              <span className="gradient-text">Our</span>
              <span className="text-shimmer block heartbeat">Story</span>
            </h1>
            <p className="font-body text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed slide-in-up">
              Preserving tradition, one jar at a time. Discover the passion behind our artisanal pickles
              and the generations of love that go into every recipe.
            </p>

            {/* Decorative elements */}
            <div className="flex justify-center items-center space-x-4 mt-8 bounce-in-delayed">
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
              <FiHeart className="text-primary text-2xl pulse-glow" />
              <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image */}
          <div className="relative">
            <img
              src="https://media.istockphoto.com/id/1316583859/photo/mango-pickle-or-aam-ka-aachar-or-achar-in-a-bowl-on-wooden-background-theme-with-raw-mangos.jpg?s=612x612&w=0&k=20&c=dQqg5cBILEP-7WJB5LYLYdopSoqZ1ebc9cxXif80DJk="
              alt="Traditional pickle making process"
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-primary text-light p-4 rounded-xl shadow-lg">
              <FiAward className="w-8 h-8" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">
              A Family Tradition Since 1985
            </h2>
            <p className="font-body text-lg text-gray-600 leading-relaxed">
              What started as a small family kitchen in the heart of India has grown into a beloved pickle brand, 
              but our commitment to traditional methods and authentic flavors remains unchanged.
            </p>
            <p className="font-body text-lg text-gray-600 leading-relaxed">
              Our founder, Priya Sharma, learned the art of pickle making from her grandmother, who would spend 
              hours in the kitchen, carefully selecting spices and perfecting recipes that had been passed down 
              through generations.
            </p>
            <p className="font-body text-lg text-gray-600 leading-relaxed">
              Today, we continue to use the same time-honored techniques, sourcing the finest ingredients from 
              local farmers and maintaining the same attention to detail that made our pickles famous.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="font-heading text-2xl font-bold text-primary">35+</div>
                <div className="font-body text-sm text-gray-600">Years of Experience</div>
              </div>
              <div className="text-center">
                <div className="font-heading text-2xl font-bold text-primary">50K+</div>
                <div className="font-body text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="font-heading text-2xl font-bold text-primary">15+</div>
                <div className="font-body text-sm text-gray-600">Unique Varieties</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Values Section */}
        <div className="mb-24">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Our Values</span>
            </h2>
            <p className="font-body text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These core principles guide everything we do, from ingredient selection to customer service,
              ensuring every jar meets our highest standards.
            </p>

            {/* Decorative line */}
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group glass rounded-2xl p-8 text-center hover-lift hover-glow transition-all duration-500 zoom-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 text-light group-hover:rotate-slow transition-all duration-300 pulse-glow">
                  {value.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-dark mb-4 group-hover:text-shimmer transition-all duration-300">
                  {value.title}
                </h3>
                <p className="font-body text-gray-600 leading-relaxed">
                  {value.description}
                </p>

                {/* Hover decoration */}
                <div className="w-8 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Content */}
          <div className="space-y-6">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">
              Our Process
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-primary text-light w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-dark mb-2">Careful Selection</h3>
                  <p className="font-body text-gray-600">We handpick the freshest ingredients from trusted local farmers.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary text-light w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-dark mb-2">Traditional Methods</h3>
                  <p className="font-body text-gray-600">Using age-old techniques passed down through generations.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary text-light w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-dark mb-2">Quality Control</h3>
                  <p className="font-body text-gray-600">Every batch is tested to ensure perfect taste and safety.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="https://media.istockphoto.com/id/1182262157/photo/pickles-in-jars.jpg?s=612x612&w=0&k=20&c=gueIu-0RwTSjT-C-16OwoOGwp3fy-zA4g3-DRNrCF3M="
              alt="Quality control and packaging process"
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
            <div className="absolute -top-6 -left-6 bg-accent text-light p-4 rounded-xl shadow-lg">
              <FiMapPin className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Enhanced Team Section */}
        <div>
          <div className="text-center mb-16 fade-in-up">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Meet Our Team</span>
            </h2>
            <p className="font-body text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The passionate people behind every jar of our delicious pickles,
              bringing decades of experience and love to every recipe.
            </p>

            {/* Decorative line */}
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group glass rounded-2xl p-8 text-center hover-lift hover-glow transition-all duration-500 bounce-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300 hover-scale"
                  />

                  {/* Floating badge */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-light pulse-glow">
                    <FiStar size={16} />
                  </div>
                </div>

                <h3 className="font-heading text-2xl font-bold text-dark mb-2 group-hover:text-shimmer transition-all duration-300">
                  {member.name}
                </h3>
                <p className="font-body text-primary font-semibold mb-4 text-lg">
                  {member.role}
                </p>
                <p className="font-body text-gray-600 leading-relaxed">
                  {member.description}
                </p>

                {/* Hover decoration */}
                <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="relative bg-gradient-to-br from-primary via-accent to-primary py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-light/10 rounded-full float-animation"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-light/10 rounded-full float-delayed"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-light/10 rounded-full float-animation"></div>
          <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-light/10 rounded-full float-delayed"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="fade-in-up">
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-light mb-8 text-shadow">
              <span className="heartbeat">Taste the Tradition</span>
            </h2>
            <p className="font-body text-xl text-light/95 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the authentic flavors that have made our pickles a household name for over three decades.
              Join thousands of satisfied customers who trust our quality.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center bounce-in-delayed">
              <a
                href="/pickles"
                className="group bg-light text-primary px-10 py-4 rounded-xl font-body font-bold text-lg hover-lift hover-glow transition-all duration-300 inline-flex items-center justify-center space-x-2 relative overflow-hidden"
              >
                <span>Explore Our Pickles</span>
                <FiArrowRight size={20} className="wiggle" />

                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </a>
              <a
                href="/contact"
                className="group border-2 border-light text-light px-10 py-4 rounded-xl font-body font-bold text-lg hover:bg-light hover:text-primary transition-all duration-300 inline-flex items-center justify-center space-x-2 hover-bounce relative overflow-hidden"
              >
                <span>Get in Touch</span>
                <FiHeart size={20} className="pulse-glow" />

                {/* Button background effect */}
                <div className="absolute inset-0 bg-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 