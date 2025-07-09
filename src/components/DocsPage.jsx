import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Target, 
  Brain, 
  Zap, 
  GitBranch, 
  CheckCircle, 
  Play,
  Users,
  BarChart3,
  Settings,
  ArrowRight,
  Code,
  Database,
  Cloud,
  Shield,
  TrendingUp,
  MessageSquare,
  FileText,
  Video,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const DocsPage = ({ onBack }) => {
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    features: true,
    nodes: true,
    gettingStarted: false,
    api: false,
    deployment: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const nodeTypes = [
    {
      type: 'StartJourney',
      icon: Play,
      color: 'from-primary-500 to-primary-600',
      description: 'Entry point of customer journeys',
      features: ['Traffic source tracking', 'Entry rate analytics', 'Initial engagement metrics']
    },
    {
      type: 'TouchpointNode',
      icon: Target,
      color: 'from-secondary-500 to-secondary-600',
      description: 'Customer interaction points',
      features: ['Engagement tracking', 'Conversion metrics', 'Multi-channel support']
    },
    {
      type: 'AINode',
      icon: Brain,
      color: 'from-accent-500 to-accent-600',
      description: 'AI-powered decision making',
      features: ['Real-time optimization', 'Predictive analytics', 'Personalization']
    },
    {
      type: 'ActionNode',
      icon: Zap,
      color: 'from-success-500 to-success-600',
      description: 'Customer actions and conversions',
      features: ['Conversion tracking', 'Revenue attribution', 'Action triggers']
    },
    {
      type: 'DecisionNode',
      icon: GitBranch,
      color: 'from-warning-500 to-warning-600',
      description: 'Conditional journey branching',
      features: ['Multi-path routing', 'Conditional logic', 'Split testing']
    },
    {
      type: 'EndJourney',
      icon: CheckCircle,
      color: 'from-purple-500 to-purple-600',
      description: 'Journey completion points',
      features: ['Success tracking', 'Outcome measurement', 'Journey analytics']
    }
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Optimization',
      description: 'Intelligent journey recommendations and real-time optimization using machine learning algorithms.',
      benefits: ['Increase conversion rates by 20-30%', 'Reduce customer churn', 'Personalize experiences automatically']
    },
    {
      icon: Users,
      title: 'Real-Time Collaboration',
      description: 'Work together with your team in real-time, with live updates and version control.',
      benefits: ['Team collaboration', 'Live editing', 'Version history', 'Comment system']
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive analytics dashboard with conversion tracking, funnel analysis, and performance insights.',
      benefits: ['Conversion funnel analysis', 'Performance metrics', 'A/B testing results', 'ROI tracking']
    },
    {
      icon: Target,
      title: 'Multi-Channel Journey Mapping',
      description: 'Map customer experiences across all touchpoints - web, mobile, email, social, and offline.',
      benefits: ['Omnichannel visibility', 'Cross-platform tracking', 'Unified customer view']
    }
  ];

  const useCases = [
    {
      title: 'E-commerce Customer Journey',
      description: 'Map the complete customer journey from awareness to purchase and retention.',
      steps: ['Ad click → Landing page → Product browse → Cart → Purchase → Follow-up']
    },
    {
      title: 'SaaS Onboarding Flow',
      description: 'Design and optimize user onboarding experiences for better activation rates.',
      steps: ['Signup → Welcome email → Tutorial → First feature → Activation']
    },
    {
      title: 'Lead Generation Funnel',
      description: 'Optimize lead generation processes from initial contact to qualified lead.',
      steps: ['Website visit → Content download → Email nurture → Sales call → Qualification']
    },
    {
      title: 'Customer Support Journey',
      description: 'Map customer support experiences to reduce resolution time and improve satisfaction.',
      steps: ['Issue discovery → Support contact → Resolution → Follow-up → Satisfaction']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-secondary-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2 rounded-lg bg-secondary-100 hover:bg-secondary-200 transition-colors"
              >
                <ArrowRight className="w-4 h-4 text-secondary-600 rotate-180" />
              </button>
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary-600" />
                <h1 className="text-xl font-semibold text-secondary-900">Documentation</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-secondary-600">AI-Powered Customer Journey Builder</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-white/20 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">Contents</h2>
              <nav className="space-y-2">
                {Object.entries(expandedSections).map(([section, isExpanded]) => (
                  <div key={section}>
                    <button
                      onClick={() => toggleSection(section)}
                      className="flex items-center justify-between w-full text-left p-2 rounded-lg hover:bg-secondary-50 transition-colors"
                    >
                      <span className="text-sm font-medium text-secondary-700 capitalize">
                        {section.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-secondary-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-secondary-500" />
                      )}
                    </button>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Overview Section */}
            {expandedSections.overview && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-white/20 p-8"
              >
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">Overview</h2>
                <p className="text-secondary-700 mb-6 leading-relaxed">
                  The AI-Powered Customer Journey Builder is a comprehensive tool designed to help businesses 
                  visualize, optimize, and analyze customer experiences across all touchpoints. Built with 
                  modern web technologies and enhanced with AI capabilities, it enables teams to create 
                  sophisticated journey maps that drive better customer outcomes and business results.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-primary-900 mb-2">Business Impact</h3>
                    <ul className="space-y-2 text-sm text-primary-800">
                      <li>• 20-30% increase in conversion rates</li>
                      <li>• 15-25% reduction in customer churn</li>
                      <li>• 40% faster journey optimization</li>
                      <li>• Improved customer lifetime value</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-accent-900 mb-2">Technical Excellence</h3>
                    <ul className="space-y-2 text-sm text-accent-800">
                      <li>• Modern React with TypeScript</li>
                      <li>• Real-time collaboration</li>
                      <li>• AI/ML integration</li>
                      <li>• Enterprise-grade architecture</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-3">Key Capabilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-primary-600" />
                      <span className="text-sm font-medium text-secondary-700">Journey Mapping</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Brain className="w-5 h-5 text-accent-600" />
                      <span className="text-sm font-medium text-secondary-700">AI Optimization</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-success-600" />
                      <span className="text-sm font-medium text-secondary-700">Team Collaboration</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-5 h-5 text-warning-600" />
                      <span className="text-sm font-medium text-secondary-700">Analytics</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Settings className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-secondary-700">Customization</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-error-600" />
                      <span className="text-sm font-medium text-secondary-700">Performance</span>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Features Section */}
            {expandedSections.features && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-white/20 p-8"
              >
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">Core Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-white to-secondary-50 rounded-xl p-6 border border-secondary-200 hover:shadow-medium transition-all duration-200"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                          <feature.icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-secondary-900">{feature.title}</h3>
                      </div>
                      <p className="text-secondary-600 mb-4 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-secondary-700">
                            <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Node Types Section */}
            {expandedSections.nodes && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-white/20 p-8"
              >
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">Node Types</h2>
                <p className="text-secondary-700 mb-6">
                  Our journey builder includes six specialized node types, each designed for specific aspects 
                  of customer journey mapping and optimization.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {nodeTypes.map((node, index) => (
                    <motion.div
                      key={node.type}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-white to-secondary-50 rounded-xl p-6 border border-secondary-200 hover:shadow-medium transition-all duration-200"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${node.color} rounded-xl flex items-center justify-center`}>
                          <node.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-secondary-900">{node.type}</h3>
                          <p className="text-sm text-secondary-600">{node.description}</p>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {node.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-secondary-700">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Use Cases Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-white/20 p-8"
            >
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">Use Cases</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {useCases.map((useCase, index) => (
                  <motion.div
                    key={useCase.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-white to-secondary-50 rounded-xl p-6 border border-secondary-200"
                  >
                    <h3 className="text-lg font-semibold text-secondary-900 mb-3">{useCase.title}</h3>
                    <p className="text-secondary-600 mb-4 text-sm leading-relaxed">
                      {useCase.description}
                    </p>
                    <div className="bg-secondary-100 rounded-lg p-3">
                      <p className="text-xs font-medium text-secondary-700 mb-2">Typical Flow:</p>
                      <p className="text-xs text-secondary-600">{useCase.steps[0]}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Getting Started Section */}
            {expandedSections.gettingStarted && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-white/20 p-8"
              >
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">Getting Started</h2>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-primary-900 mb-4">Quick Start Guide</h3>
                    <ol className="space-y-3 text-sm text-primary-800">
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                        <span>Drag a StartJourney node onto the canvas to begin your journey</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                        <span>Add TouchpointNode components to represent customer interactions</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                        <span>Use DecisionNode components to create branching logic</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                        <span>Connect nodes by dragging from source handles to target handles</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
                        <span>Add an EndJourney node to complete your journey map</span>
                      </li>
                    </ol>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Video className="w-4 h-4 text-accent-600" />
                        <span className="text-sm font-medium text-accent-900">Video Tutorial</span>
                      </div>
                      <p className="text-xs text-accent-800">Watch our comprehensive tutorial</p>
                    </div>
                    <div className="bg-gradient-to-br from-success-50 to-success-100 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-success-600" />
                        <span className="text-sm font-medium text-success-900">Templates</span>
                      </div>
                      <p className="text-xs text-success-800">Start with pre-built templates</p>
                    </div>
                    <div className="bg-gradient-to-br from-warning-50 to-warning-100 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-warning-600" />
                        <span className="text-sm font-medium text-warning-900">Support</span>
                      </div>
                      <p className="text-xs text-warning-800">Get help from our team</p>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* API Documentation Section */}
            {expandedSections.api && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-white/20 p-8"
              >
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">API Documentation</h2>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-4">Technical Architecture</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Code className="w-4 h-4 text-primary-600" />
                          <span className="text-sm font-medium text-secondary-700">Frontend</span>
                        </div>
                        <ul className="text-xs text-secondary-600 space-y-1 ml-6">
                          <li>• React 18+ with Hooks</li>
                          <li>• TypeScript for type safety</li>
                          <li>• Tailwind CSS for styling</li>
                          <li>• Framer Motion for animations</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Database className="w-4 h-4 text-accent-600" />
                          <span className="text-sm font-medium text-secondary-700">State Management</span>
                        </div>
                        <ul className="text-xs text-secondary-600 space-y-1 ml-6">
                          <li>• Zustand for global state</li>
                          <li>• ReactFlow for graph management</li>
                          <li>• Real-time collaboration</li>
                          <li>• Persistent storage</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-accent-900 mb-4">AI Integration</h3>
                    <p className="text-sm text-accent-800 mb-4">
                      Our AI system provides intelligent journey optimization and recommendations.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white/50 rounded-lg p-3">
                        <h4 className="text-sm font-medium text-accent-900 mb-2">Prediction Engine</h4>
                        <p className="text-xs text-accent-800">Predicts customer behavior and journey outcomes</p>
                      </div>
                      <div className="bg-white/50 rounded-lg p-3">
                        <h4 className="text-sm font-medium text-accent-900 mb-2">Optimization Engine</h4>
                        <p className="text-xs text-accent-800">Automatically optimizes journey paths for better conversion</p>
                      </div>
                      <div className="bg-white/50 rounded-lg p-3">
                        <h4 className="text-sm font-medium text-accent-900 mb-2">Personalization</h4>
                        <p className="text-xs text-accent-800">Creates personalized experiences based on customer data</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Deployment Section */}
            {expandedSections.deployment && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-white/20 p-8"
              >
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">Deployment & Integration</h2>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-success-50 to-success-100 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-success-900 mb-4">Deployment Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Cloud className="w-4 h-4 text-success-600" />
                          <span className="text-sm font-medium text-success-900">Cloud Deployment</span>
                        </div>
                        <ul className="text-xs text-success-800 space-y-1">
                          <li>• AWS, Azure, or Google Cloud</li>
                          <li>• Docker containerization</li>
                          <li>• Auto-scaling capabilities</li>
                          <li>• CDN integration</li>
                        </ul>
                      </div>
                      <div className="bg-white/50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-4 h-4 text-success-600" />
                          <span className="text-sm font-medium text-success-900">Security & Compliance</span>
                        </div>
                        <ul className="text-xs text-success-800 space-y-1">
                          <li>• SOC 2 Type II compliance</li>
                          <li>• GDPR compliance</li>
                          <li>• End-to-end encryption</li>
                          <li>• Role-based access control</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-primary-900 mb-4">Integration Capabilities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-sm font-medium text-primary-900 mb-1">Analytics</h4>
                        <p className="text-xs text-primary-800">Google Analytics, Mixpanel, Amplitude</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-sm font-medium text-primary-900 mb-1">CRM</h4>
                        <p className="text-xs text-primary-800">Salesforce, HubSpot, Pipedrive</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Database className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-sm font-medium text-primary-900 mb-1">Data Sources</h4>
                        <p className="text-xs text-primary-800">APIs, Webhooks, Data warehouses</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Call to Action */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-primary-500 to-accent-600 rounded-xl p-8 text-center text-white"
            >
              <h2 className="text-2xl font-bold mb-4">Ready to Build Better Customer Journeys?</h2>
              <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
                Start creating intelligent, data-driven customer journeys that drive real business results. 
                Our AI-powered platform helps you optimize every touchpoint and maximize customer lifetime value.
              </p>
              <div className="flex items-center justify-center gap-4">
                <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Start Building
                </button>
                <button className="border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Demo
                </button>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage; 