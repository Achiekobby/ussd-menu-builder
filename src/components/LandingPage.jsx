import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Users, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Play, 
  Star, 
  Rocket,
  ChevronDown,
  Github
} from "lucide-react";
import { cn } from "../utils/cn";

const LandingPage = ({ onGetStarted }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Optimization",
      description: "Intelligent journey analysis with machine learning-driven suggestions for maximum conversion rates.",
      color: "from-accent-500 to-purple-600",
      stats: "94% accuracy"
    },
    {
      icon: Target,
      title: "Real-Time Analytics",
      description: "Live performance tracking with predictive insights and comprehensive journey analytics.",
      color: "from-primary-500 to-blue-600",
      stats: "Real-time data"
    },
    {
      icon: Users,
      title: "Collaboration Tools",
      description: "Team collaboration with real-time editing, version control, and seamless sharing capabilities.",
      color: "from-success-500 to-green-600",
      stats: "Multi-user support"
    },
    {
      icon: Zap,
      title: "Modern Design System",
      description: "Beautiful, responsive interface with smooth animations and professional user experience.",
      color: "from-warning-500 to-orange-600",
      stats: "60fps animations"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      content: "This tool revolutionized our customer journey mapping. The AI suggestions increased our conversion rate by 34%.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "UX Director",
      company: "InnovateLab",
      content: "The collaboration features are incredible. Our team can work together seamlessly on complex customer flows.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Marketing Lead",
      company: "GrowthCo",
      content: "The analytics and insights helped us identify critical drop-off points we never knew existed.",
      rating: 5
    }
  ];

  const stats = [
    { label: "Journey Optimization", value: "94%", suffix: "accuracy" },
    { label: "Conversion Increase", value: "34%", suffix: "average" },
    { label: "Time Saved", value: "67%", suffix: "faster" },
    { label: "User Satisfaction", value: "4.9", suffix: "/5 stars" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-600 rounded-xl flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gradient">JourneyAI</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <a href="#features" className="text-secondary-600 hover:text-secondary-900 transition-colors">
            Features
          </a>
          <a href="#demo" className="text-secondary-600 hover:text-secondary-900 transition-colors">
            Demo
          </a>
          <a href="#pricing" className="text-secondary-600 hover:text-secondary-900 transition-colors">
            Pricing
          </a>
          <button
            onClick={onGetStarted}
            className="btn-primary"
          >
            Get Started
          </button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-50 text-accent-700 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              AI-Powered Customer Journey Builder
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-secondary-900 mb-6 leading-tight"
          >
            Design Intelligent
            <span className="text-gradient block">Customer Experiences</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Build, optimize, and analyze customer journeys with AI-powered insights. 
            Create seamless experiences that convert visitors into loyal customers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button
              onClick={onGetStarted}
              className="btn-primary text-lg px-8 py-4"
            >
              Start Building Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-secondary-600">{stat.label}</div>
                <div className="text-xs text-secondary-500">{stat.suffix}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-secondary-900 mb-4">
            Powerful Features for Modern Teams
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Everything you need to create, optimize, and scale your customer journeys
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-hover p-8"
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-soft text-white",
                  feature.color
                )}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-600 mb-3 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-accent-600">
                    <CheckCircle className="w-4 h-4" />
                    {feature.stats}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-secondary-900 mb-4">
            See It in Action
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Watch how easy it is to create intelligent customer journeys
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-white rounded-2xl shadow-strong border border-secondary-200 overflow-hidden">
            <div className="p-4 bg-secondary-50 border-b border-secondary-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-error-500 rounded-full"></div>
                <div className="w-3 h-3 bg-warning-500 rounded-full"></div>
                <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                <span className="text-sm text-secondary-600 ml-4">JourneyAI Builder</span>
              </div>
            </div>
            <div className="p-8 bg-gradient-to-br from-secondary-50 to-primary-50 min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-secondary-900 mb-2">
                  Interactive Demo
                </h3>
                <p className="text-secondary-600 mb-6">
                  Click "Get Started" to explore the full application
                </p>
                <button
                  onClick={onGetStarted}
                  className="btn-primary"
                >
                  Launch Demo
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-secondary-900 mb-4">
            Loved by Teams Worldwide
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            See what our users are saying about their experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-hover p-6"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-warning-400 text-warning-400" />
                ))}
              </div>
              <p className="text-secondary-600 mb-4 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-semibold text-secondary-900">{testimonial.name}</div>
                <div className="text-sm text-secondary-600">{testimonial.role} at {testimonial.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-primary-500 to-accent-600 rounded-3xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Customer Experience?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of teams using AI-powered journey optimization to increase conversions and customer satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onGetStarted}
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-secondary-50 transition-colors flex items-center gap-2"
              >
                Start Building Now
                <Rocket className="w-5 h-5" />
              </button>
              <a
                href="https://github.com/yourusername/ai-customer-journey-builder"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-secondary-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-600 rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-secondary-900">JourneyAI</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-secondary-600">
              <a href="#features" className="hover:text-secondary-900 transition-colors">Features</a>
              <a href="#demo" className="hover:text-secondary-900 transition-colors">Demo</a>
              <a href="https://github.com/yourusername/ai-customer-journey-builder" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-900 transition-colors flex items-center gap-1">
                GitHub
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-secondary-200 text-center text-sm text-secondary-500">
            © 2024 JourneyAI. Built with ❤️ for the future of customer experience design.
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-primary-600 text-white rounded-full shadow-strong hover:bg-primary-700 transition-colors z-50 flex items-center justify-center"
      >
        <ChevronDown className="w-5 h-5 rotate-180" />
      </motion.button>
    </div>
  );
};

export default LandingPage; 