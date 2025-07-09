import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Sparkles, 
  X, 
  Lightbulb, 
  TrendingUp, 
  Target, 
  Zap, 
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Settings,
  BarChart3,
  Clock,
  AlertTriangle,
  Star,
  Activity,
  Users,
  DollarSign
} from "lucide-react";
import { cn } from "../utils/cn";
import mockAIService from "../services/mockAIService";

const AIAssistant = ({ isOpen, onClose, nodes, edges }) => {
  const [activeTab, setActiveTab] = useState("suggestions");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [performanceMetrics, setPerformanceMetrics] = useState(null);

  // Load performance metrics on mount
  useEffect(() => {
    setPerformanceMetrics(mockAIService.getPerformanceMetrics());
  }, []);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const result = await mockAIService.analyzeJourney(nodes, edges);
      setAnalysis(result);
      setPerformanceMetrics(mockAIService.getPerformanceMetrics());
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApplySuggestion = (suggestion) => {
    // This would integrate with the actual journey builder
    console.log('Applying suggestion:', suggestion);
    // You could implement actual node creation/optimization here
  };

  const getImpactColor = (impact) => {
    switch (impact.toLowerCase()) {
      case 'critical': return 'text-error-600 bg-error-50';
      case 'high': return 'text-warning-600 bg-warning-50';
      case 'medium': return 'text-primary-600 bg-primary-50';
      case 'low': return 'text-secondary-600 bg-secondary-50';
      default: return 'text-secondary-600 bg-secondary-50';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success-600';
    if (confidence >= 75) return 'text-warning-600';
    if (confidence >= 60) return 'text-orange-600';
    return 'text-error-600';
  };

  const tabs = [
    { id: "suggestions", label: "AI Suggestions", icon: Lightbulb },
    { id: "analytics", label: "Journey Analytics", icon: BarChart3 },
    { id: "predictions", label: "Predictions", icon: TrendingUp },
    { id: "insights", label: "Insights", icon: Target },
    { id: "performance", label: "AI Performance", icon: Activity }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 z-50 bg-white rounded-2xl shadow-2xl border border-secondary-200 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-secondary-200 bg-gradient-to-r from-accent-50 to-primary-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-secondary-900">AI Journey Assistant</h2>
                  <p className="text-sm text-secondary-600">Intelligent journey optimization and analysis</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
              >
                <X className="w-5 h-5 text-secondary-600" />
              </button>
            </div>

            {/* Content */}
            <div className="flex h-[calc(100vh-8rem)]">
              {/* Sidebar */}
              <div className="w-64 border-r border-secondary-200 bg-secondary-50">
                <div className="p-4">
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || nodes.length === 0}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200",
                      isAnalyzing || nodes.length === 0
                        ? "bg-secondary-200 text-secondary-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 shadow-lg hover:shadow-xl"
                    )}
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Analyze Journey
                      </>
                    )}
                  </button>
                  
                  {analysis && (
                    <div className="mt-4 p-3 bg-white rounded-lg border border-secondary-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-success-600" />
                        <span className="text-sm font-medium text-secondary-900">Analysis Complete</span>
                      </div>
                      <div className="text-xs text-secondary-600">
                        Confidence: <span className={cn("font-medium", getConfidenceColor(analysis.confidence))}>
                          {analysis.confidence}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Tabs */}
                <nav className="px-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1",
                        activeTab === tab.id
                          ? "bg-white text-accent-600 shadow-sm border border-accent-200"
                          : "text-secondary-600 hover:text-secondary-900 hover:bg-white/50"
                      )}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Main Content */}
              <div className="flex-1 overflow-auto">
                <div className="p-6">
                  {activeTab === "suggestions" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-secondary-900 mb-4">AI Optimization Suggestions</h3>
                        {analysis?.suggestions ? (
                          <div className="space-y-4">
                            {analysis.suggestions.map((suggestion, index) => (
                              <motion.div
                                key={suggestion.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl border border-secondary-200 p-6 hover:shadow-lg transition-all duration-200"
                              >
                                <div className="flex items-start justify-between mb-4">
                                  <div className="flex items-center gap-3">
                                    <div className={cn(
                                      "w-8 h-8 rounded-lg flex items-center justify-center",
                                      suggestion.type === 'critical' ? 'bg-error-100' :
                                      suggestion.type === 'optimization' ? 'bg-warning-100' :
                                      suggestion.type === 'enhancement' ? 'bg-primary-100' :
                                      'bg-secondary-100'
                                    )}>
                                      {suggestion.type === 'critical' ? <AlertTriangle className="w-4 h-4 text-error-600" /> :
                                       suggestion.type === 'optimization' ? <Zap className="w-4 h-4 text-warning-600" /> :
                                       suggestion.type === 'enhancement' ? <Star className="w-4 h-4 text-primary-600" /> :
                                       <Lightbulb className="w-4 h-4 text-secondary-600" />}
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-secondary-900">{suggestion.title}</h4>
                                      <span className={cn("inline-flex items-center px-2 py-1 rounded-full text-xs font-medium", getImpactColor(suggestion.impact))}>
                                        {suggestion.impact} Impact
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className={cn("text-sm font-medium", getConfidenceColor(suggestion.confidence))}>
                                      {suggestion.confidence}% confidence
                                    </div>
                                    <div className="text-xs text-secondary-500">
                                      +{suggestion.expectedImprovement}% improvement
                                    </div>
                                  </div>
                                </div>
                                
                                <p className="text-secondary-600 mb-4 leading-relaxed">
                                  {suggestion.description}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4 text-sm text-secondary-500">
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {suggestion.estimatedEffort}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Target className="w-3 h-3" />
                                      {suggestion.category}
                                    </span>
                                  </div>
                                  
                                  <button
                                    onClick={() => handleApplySuggestion(suggestion)}
                                    className="px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors text-sm font-medium"
                                  >
                                    Apply Suggestion
                                  </button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <Brain className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
                            <p className="text-secondary-600">Click "Analyze Journey" to get AI-powered suggestions</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === "analytics" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-secondary-900 mb-4">Journey Analytics</h3>
                      {analysis?.journeyMetrics ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div className="bg-white rounded-xl border border-secondary-200 p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                                <Target className="w-4 h-4 text-primary-600" />
                              </div>
                              <h4 className="font-semibold text-secondary-900">Efficiency Score</h4>
                            </div>
                            <div className="text-3xl font-bold text-primary-600 mb-2">
                              {analysis.journeyMetrics.efficiencyScore}%
                            </div>
                            <div className="w-full bg-secondary-200 rounded-full h-2">
                              <div 
                                className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${analysis.journeyMetrics.efficiencyScore}%` }}
                              />
                            </div>
                          </div>

                          <div className="bg-white rounded-xl border border-secondary-200 p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
                                <Users className="w-4 h-4 text-success-600" />
                              </div>
                              <h4 className="font-semibold text-secondary-900">Engagement Score</h4>
                            </div>
                            <div className="text-3xl font-bold text-success-600 mb-2">
                              {analysis.journeyMetrics.engagementScore}%
                            </div>
                            <div className="w-full bg-secondary-200 rounded-full h-2">
                              <div 
                                className="bg-success-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${analysis.journeyMetrics.engagementScore}%` }}
                              />
                            </div>
                          </div>

                          <div className="bg-white rounded-xl border border-secondary-200 p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 bg-warning-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 text-warning-600" />
                              </div>
                              <h4 className="font-semibold text-secondary-900">Conversion Score</h4>
                            </div>
                            <div className="text-3xl font-bold text-warning-600 mb-2">
                              {analysis.journeyMetrics.conversionScore}%
                            </div>
                            <div className="w-full bg-secondary-200 rounded-full h-2">
                              <div 
                                className="bg-warning-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${analysis.journeyMetrics.conversionScore}%` }}
                              />
                            </div>
                          </div>

                          <div className="bg-white rounded-xl border border-secondary-200 p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
                                <Star className="w-4 h-4 text-accent-600" />
                              </div>
                              <h4 className="font-semibold text-secondary-900">Retention Score</h4>
                            </div>
                            <div className="text-3xl font-bold text-accent-600 mb-2">
                              {analysis.journeyMetrics.retentionScore}%
                            </div>
                            <div className="w-full bg-secondary-200 rounded-full h-2">
                              <div 
                                className="bg-accent-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${analysis.journeyMetrics.retentionScore}%` }}
                              />
                            </div>
                          </div>

                          <div className="bg-white rounded-xl border border-secondary-200 p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Activity className="w-4 h-4 text-purple-600" />
                              </div>
                              <h4 className="font-semibold text-secondary-900">Complexity Score</h4>
                            </div>
                            <div className="text-3xl font-bold text-purple-600 mb-2">
                              {analysis.journeyMetrics.complexityScore}%
                            </div>
                            <div className="w-full bg-secondary-200 rounded-full h-2">
                              <div 
                                className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${analysis.journeyMetrics.complexityScore}%` }}
                              />
                            </div>
                          </div>

                          <div className="bg-white rounded-xl border border-secondary-200 p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-4 h-4 text-green-600" />
                              </div>
                              <h4 className="font-semibold text-secondary-900">Conversion Potential</h4>
                            </div>
                            <div className="text-3xl font-bold text-green-600 mb-2">
                              {analysis.journeyMetrics.conversionPotential}%
                            </div>
                            <div className="w-full bg-secondary-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${analysis.journeyMetrics.conversionPotential}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <BarChart3 className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
                          <p className="text-secondary-600">Run an analysis to view detailed journey analytics</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "predictions" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-secondary-900 mb-4">AI Predictions</h3>
                      {analysis?.predictions ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200">
                            <h4 className="font-semibold text-primary-900 mb-4">Conversion Predictions</h4>
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm text-primary-700">Predicted Conversion Rate</span>
                                  <span className="text-lg font-bold text-primary-900">
                                    {analysis.predictions.predictedConversionRate}%
                                  </span>
                                </div>
                                <div className="text-xs text-primary-600">
                                  Confidence: {analysis.predictions.confidenceInterval.lower}% - {analysis.predictions.confidenceInterval.upper}%
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-br from-success-50 to-success-100 rounded-xl p-6 border border-success-200">
                            <h4 className="font-semibold text-success-900 mb-4">Engagement Predictions</h4>
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm text-success-700">Predicted Engagement Time</span>
                                  <span className="text-lg font-bold text-success-900">
                                    {analysis.predictions.predictedEngagementTime}s
                                  </span>
                                </div>
                                <div className="text-xs text-success-600">
                                  Based on journey complexity
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-br from-warning-50 to-warning-100 rounded-xl p-6 border border-warning-200">
                            <h4 className="font-semibold text-warning-900 mb-4">Satisfaction Predictions</h4>
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm text-warning-700">Predicted Customer Satisfaction</span>
                                  <span className="text-lg font-bold text-warning-900">
                                    {analysis.predictions.predictedCustomerSatisfaction}%
                                  </span>
                                </div>
                                <div className="text-xs text-warning-600">
                                  Based on journey efficiency and engagement
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-6 border border-accent-200">
                            <h4 className="font-semibold text-accent-900 mb-4">Revenue Impact</h4>
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm text-accent-700">Predicted Revenue Impact</span>
                                  <span className="text-lg font-bold text-accent-900">
                                    ${analysis.predictions.predictedRevenueImpact}
                                  </span>
                                </div>
                                <div className="text-xs text-accent-600">
                                  Monthly projection
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <TrendingUp className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
                          <p className="text-secondary-600">Run an analysis to view AI predictions</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "insights" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-secondary-900 mb-4">AI Insights</h3>
                      {analysis?.insights ? (
                        <div className="space-y-4">
                          {analysis.insights.map((insight, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className={cn(
                                "p-4 rounded-xl border-l-4",
                                insight.type === 'positive' ? 'bg-success-50 border-success-400' :
                                insight.type === 'warning' ? 'bg-warning-50 border-warning-400' :
                                'bg-secondary-50 border-secondary-400'
                              )}
                            >
                              <div className="flex items-start gap-3">
                                <div className={cn(
                                  "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                                  insight.type === 'positive' ? 'bg-success-100' :
                                  insight.type === 'warning' ? 'bg-warning-100' :
                                  'bg-secondary-100'
                                )}>
                                  {insight.type === 'positive' ? <CheckCircle className="w-3 h-3 text-success-600" /> :
                                   insight.type === 'warning' ? <AlertTriangle className="w-3 h-3 text-warning-600" /> :
                                   <Lightbulb className="w-3 h-3 text-secondary-600" />}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-secondary-900 mb-1">{insight.title}</h4>
                                  <p className="text-secondary-600 text-sm leading-relaxed">{insight.description}</p>
                                  <span className={cn(
                                    "inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium",
                                    insight.impact === 'High' ? 'bg-red-100 text-red-700' :
                                    insight.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-blue-100 text-blue-700'
                                  )}>
                                    {insight.impact} Impact
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Target className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
                          <p className="text-secondary-600">Run an analysis to view AI insights</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "performance" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-secondary-900 mb-4">AI Performance Metrics</h3>
                      {performanceMetrics ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="bg-white rounded-xl border border-secondary-200 p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                                <Activity className="w-4 h-4 text-primary-600" />
                              </div>
                              <h4 className="font-semibold text-secondary-900">Total Analyses</h4>
                            </div>
                            <div className="text-3xl font-bold text-primary-600">
                              {performanceMetrics.totalAnalyses}
                            </div>
                            <p className="text-sm text-secondary-500 mt-2">Journeys analyzed</p>
                          </div>

                          <div className="bg-white rounded-xl border border-secondary-200 p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 text-success-600" />
                              </div>
                              <h4 className="font-semibold text-secondary-900">Average Improvement</h4>
                            </div>
                            <div className="text-3xl font-bold text-success-600">
                              {Math.round(performanceMetrics.averageImprovement)}%
                            </div>
                            <p className="text-sm text-secondary-500 mt-2">Confidence score</p>
                          </div>

                          <div className="bg-white rounded-xl border border-secondary-200 p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-accent-600" />
                              </div>
                              <h4 className="font-semibold text-secondary-900">Successful Optimizations</h4>
                            </div>
                            <div className="text-3xl font-bold text-accent-600">
                              {performanceMetrics.successfulOptimizations}
                            </div>
                            <p className="text-sm text-secondary-500 mt-2">Applied suggestions</p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Activity className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
                          <p className="text-secondary-600">No performance data available</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AIAssistant; 