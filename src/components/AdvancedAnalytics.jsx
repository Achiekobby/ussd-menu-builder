import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target, 
  Clock, 
  DollarSign,
  Activity,
  Filter,
  Download,
  RefreshCw,
  Calendar,
  PieChart,
  LineChart,
  BarChart,
  Eye,
  EyeOff,
  Settings,
  Plus,
  X,
  ChevronDown,
  ChevronRight,
  Star,
  AlertTriangle,
  CheckCircle,
  Zap,
  Brain
} from "lucide-react";
import { cn } from "../utils/cn";

const AdvancedAnalytics = ({ nodes, edges, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("7d");
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [selectedMetrics, setSelectedMetrics] = useState(["conversion", "engagement", "revenue"]);
  const [showFilters, setShowFilters] = useState(false);
  const [abTests, setAbTests] = useState([]);
  const [customReports, setCustomReports] = useState([]);

  // Real-time analytics data
  const [analyticsData, setAnalyticsData] = useState({
    realTime: {
      activeUsers: 0,
      currentSessions: 0,
      conversionRate: 0,
      revenue: 0
    },
    trends: {
      conversion: [],
      engagement: [],
      revenue: [],
      retention: []
    },
    performance: {
      topJourneys: [],
      bottlenecks: [],
      opportunities: []
    }
  });

  // Generate mock real-time data
  useEffect(() => {
    const generateRealTimeData = () => {
      setAnalyticsData(prev => ({
        ...prev,
        realTime: {
          activeUsers: Math.floor(Math.random() * 1000) + 500,
          currentSessions: Math.floor(Math.random() * 200) + 50,
          conversionRate: (Math.random() * 20 + 5).toFixed(1),
          revenue: Math.floor(Math.random() * 5000) + 1000
        }
      }));
    };

    generateRealTimeData();
    
    if (isAutoRefresh) {
      const interval = setInterval(generateRealTimeData, refreshInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [isAutoRefresh, refreshInterval]);

  // Generate trend data
  useEffect(() => {
    const generateTrendData = () => {
      const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
      const trends = {
        conversion: Array.from({ length: days }, () => (Math.random() * 20 + 5).toFixed(1)),
        engagement: Array.from({ length: days }, () => (Math.random() * 30 + 40).toFixed(1)),
        revenue: Array.from({ length: days }, () => Math.floor(Math.random() * 5000) + 1000),
        retention: Array.from({ length: days }, () => (Math.random() * 20 + 60).toFixed(1))
      };
      
      setAnalyticsData(prev => ({
        ...prev,
        trends
      }));
    };

    generateTrendData();
  }, [timeRange]);

  // Calculate journey performance metrics
  const journeyMetrics = useMemo(() => {
    const nodeTypes = nodes.reduce((acc, node) => {
      acc[node.type] = (acc[node.type] || 0) + 1;
      return acc;
    }, {});

    const startNodes = nodeTypes.startJourney || 0;
    const endNodes = nodeTypes.endJourney || 0;
    const touchpoints = nodeTypes.touchpointNode || 0;
    const actions = nodeTypes.actionNode || 0;
    const decisions = nodeTypes.decisionNode || 0;
    const aiNodes = nodeTypes.aiNode || 0;

    return {
      totalNodes: nodes.length,
      totalEdges: edges.length,
      startNodes,
      endNodes,
      touchpoints,
      actions,
      decisions,
      aiNodes,
      conversionRate: touchpoints > 0 ? ((actions / touchpoints) * 100).toFixed(1) : 0,
      complexityScore: Math.min(100, (nodes.length * 10 + edges.length * 5) / 10),
      efficiencyScore: startNodes > 0 && endNodes > 0 ? 85 : 45,
      engagementScore: Math.min(100, (touchpoints * 15 + aiNodes * 10))
    };
  }, [nodes, edges]);

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "realtime", label: "Real-Time", icon: Activity },
    { id: "trends", label: "Trends", icon: TrendingUp },
    { id: "performance", label: "Performance", icon: Target },
    { id: "abtesting", label: "A/B Testing", icon: Users },
    { id: "reports", label: "Reports", icon: Download }
  ];

  const timeRanges = [
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" }
  ];

  const MetricCard = ({ title, value, change, icon: Icon, color, subtitle }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-secondary-200 p-6 hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="text-right">
          {change && (
            <span className={cn(
              "text-sm font-medium",
              change > 0 ? "text-success-600" : "text-error-600"
            )}>
              {change > 0 ? "+" : ""}{change}%
            </span>
          )}
        </div>
      </div>
      <div className="mb-2">
        <div className="text-2xl font-bold text-secondary-900">{value}</div>
        <div className="text-sm text-secondary-600">{title}</div>
      </div>
      {subtitle && (
        <div className="text-xs text-secondary-500">{subtitle}</div>
      )}
    </motion.div>
  );

  const TrendChart = ({ data, title, color, format = "number" }) => (
    <div className="bg-white rounded-xl border border-secondary-200 p-6">
      <h3 className="font-semibold text-secondary-900 mb-4">{title}</h3>
      <div className="flex items-end justify-between h-32">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className={cn("w-8 rounded-t transition-all duration-300", color)}
              style={{ 
                height: `${(value / Math.max(...data)) * 100}%`,
                minHeight: "4px"
              }}
            />
            <div className="text-xs text-secondary-500 mt-2">
              {format === "currency" ? `$${(value / 1000).toFixed(1)}k` : 
               format === "percentage" ? `${value}%` : value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ABTestCard = ({ test }) => (
    <div className="bg-white rounded-xl border border-secondary-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-secondary-900">{test.name}</h3>
        <span className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          test.status === "running" ? "bg-success-100 text-success-700" :
          test.status === "paused" ? "bg-warning-100 text-warning-700" :
          "bg-secondary-100 text-secondary-700"
        )}>
          {test.status}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-sm text-secondary-600 mb-1">Variant A</div>
          <div className="text-lg font-semibold text-secondary-900">{test.variantA.conversion}%</div>
          <div className="text-xs text-secondary-500">{test.variantA.traffic} users</div>
        </div>
        <div>
          <div className="text-sm text-secondary-600 mb-1">Variant B</div>
          <div className="text-lg font-semibold text-secondary-900">{test.variantB.conversion}%</div>
          <div className="text-xs text-secondary-500">{test.variantB.traffic} users</div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-secondary-600">
          Confidence: <span className="font-medium text-secondary-900">{test.confidence}%</span>
        </div>
        <button className="px-3 py-1 bg-primary-500 text-white rounded-lg text-sm hover:bg-primary-600 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );

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
            <div className="flex items-center justify-between p-6 border-b border-secondary-200 bg-gradient-to-r from-primary-50 to-accent-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-secondary-900">Advanced Analytics</h2>
                  <p className="text-sm text-secondary-600">Real-time insights and performance monitoring</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAutoRefresh(!isAutoRefresh)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isAutoRefresh 
                      ? "bg-success-100 text-success-700" 
                      : "bg-secondary-100 text-secondary-700"
                  )}
                >
                  <RefreshCw className={cn("w-4 h-4", isAutoRefresh && "animate-spin")} />
                  Auto-refresh
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
                >
                  <X className="w-5 h-5 text-secondary-600" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex h-[calc(100vh-8rem)]">
              {/* Sidebar */}
              <div className="w-64 border-r border-secondary-200 bg-secondary-50">
                <div className="p-4">
                  <div className="mb-4">
                    <label className="text-sm font-medium text-secondary-700 mb-2 block">Time Range</label>
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {timeRanges.map(range => (
                        <option key={range.value} value={range.value}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="text-sm font-medium text-secondary-700 mb-2 block">Refresh Interval</label>
                    <select
                      value={refreshInterval}
                      onChange={(e) => setRefreshInterval(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value={10}>10 seconds</option>
                      <option value={30}>30 seconds</option>
                      <option value={60}>1 minute</option>
                      <option value={300}>5 minutes</option>
                    </select>
                  </div>
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
                          ? "bg-white text-primary-600 shadow-sm border border-primary-200"
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
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-secondary-900">Journey Overview</h3>
                        <button
                          onClick={() => setShowFilters(!showFilters)}
                          className="flex items-center gap-2 px-3 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors"
                        >
                          <Filter className="w-4 h-4" />
                          Filters
                        </button>
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <MetricCard
                          title="Total Nodes"
                          value={journeyMetrics.totalNodes}
                          icon={Target}
                          color="bg-primary-500"
                          subtitle="Journey components"
                        />
                        <MetricCard
                          title="Conversion Rate"
                          value={`${journeyMetrics.conversionRate}%`}
                          change={+2.5}
                          icon={TrendingUp}
                          color="bg-success-500"
                          subtitle="From touchpoints to actions"
                        />
                        <MetricCard
                          title="Efficiency Score"
                          value={`${journeyMetrics.efficiencyScore}%`}
                          change={+1.8}
                          icon={Zap}
                          color="bg-warning-500"
                          subtitle="Journey optimization"
                        />
                        <MetricCard
                          title="Engagement Score"
                          value={`${journeyMetrics.engagementScore}%`}
                          change={+3.2}
                          icon={Users}
                          color="bg-accent-500"
                          subtitle="Customer interaction"
                        />
                      </div>

                      {/* Journey Performance */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl border border-secondary-200 p-6">
                          <h4 className="font-semibold text-secondary-900 mb-4">Journey Components</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-secondary-600">Start Points</span>
                              <span className="font-medium text-secondary-900">{journeyMetrics.startNodes}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-secondary-600">Touchpoints</span>
                              <span className="font-medium text-secondary-900">{journeyMetrics.touchpoints}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-secondary-600">Decision Points</span>
                              <span className="font-medium text-secondary-900">{journeyMetrics.decisions}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-secondary-600">Action Points</span>
                              <span className="font-medium text-secondary-900">{journeyMetrics.actions}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-secondary-600">AI Nodes</span>
                              <span className="font-medium text-secondary-900">{journeyMetrics.aiNodes}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-secondary-600">End Points</span>
                              <span className="font-medium text-secondary-900">{journeyMetrics.endNodes}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl border border-secondary-200 p-6">
                          <h4 className="font-semibold text-secondary-900 mb-4">Performance Insights</h4>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-success-600" />
                              <div>
                                <div className="text-sm font-medium text-secondary-900">Well Structured</div>
                                <div className="text-xs text-secondary-500">Journey has clear entry and exit points</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <AlertTriangle className="w-5 h-5 text-warning-600" />
                              <div>
                                <div className="text-sm font-medium text-secondary-900">Optimization Opportunity</div>
                                <div className="text-xs text-secondary-500">Consider adding more AI optimization nodes</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Star className="w-5 h-5 text-accent-600" />
                              <div>
                                <div className="text-sm font-medium text-secondary-900">Good Engagement</div>
                                <div className="text-xs text-secondary-500">Multiple touchpoints for customer interaction</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "realtime" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-secondary-900">Real-Time Metrics</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <MetricCard
                          title="Active Users"
                          value={analyticsData.realTime.activeUsers.toLocaleString()}
                          icon={Users}
                          color="bg-primary-500"
                          subtitle="Currently online"
                        />
                        <MetricCard
                          title="Active Sessions"
                          value={analyticsData.realTime.currentSessions}
                          icon={Activity}
                          color="bg-success-500"
                          subtitle="Ongoing journeys"
                        />
                        <MetricCard
                          title="Conversion Rate"
                          value={`${analyticsData.realTime.conversionRate}%`}
                          icon={Target}
                          color="bg-warning-500"
                          subtitle="Real-time conversion"
                        />
                        <MetricCard
                          title="Revenue"
                          value={`$${analyticsData.realTime.revenue.toLocaleString()}`}
                          icon={DollarSign}
                          color="bg-accent-500"
                          subtitle="Today's revenue"
                        />
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <TrendChart
                          data={analyticsData.trends.conversion}
                          title="Conversion Rate Trend"
                          color="bg-success-500"
                          format="percentage"
                        />
                        <TrendChart
                          data={analyticsData.trends.revenue}
                          title="Revenue Trend"
                          color="bg-accent-500"
                          format="currency"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "trends" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-secondary-900">Performance Trends</h3>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <TrendChart
                          data={analyticsData.trends.conversion}
                          title="Conversion Rate"
                          color="bg-success-500"
                          format="percentage"
                        />
                        <TrendChart
                          data={analyticsData.trends.engagement}
                          title="Engagement Rate"
                          color="bg-primary-500"
                          format="percentage"
                        />
                        <TrendChart
                          data={analyticsData.trends.revenue}
                          title="Revenue"
                          color="bg-accent-500"
                          format="currency"
                        />
                        <TrendChart
                          data={analyticsData.trends.retention}
                          title="Retention Rate"
                          color="bg-warning-500"
                          format="percentage"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "performance" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-secondary-900">Journey Performance</h3>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl border border-secondary-200 p-6">
                          <h4 className="font-semibold text-secondary-900 mb-4">Top Performing Journeys</h4>
                          <div className="space-y-3">
                            {[
                              { name: "E-commerce Checkout", conversion: "23.4%", users: 1240 },
                              { name: "Lead Generation", conversion: "18.7%", users: 890 },
                              { name: "Product Onboarding", conversion: "15.2%", users: 567 }
                            ].map((journey, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                                <div>
                                  <div className="font-medium text-secondary-900">{journey.name}</div>
                                  <div className="text-sm text-secondary-500">{journey.users} users</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold text-success-600">{journey.conversion}</div>
                                  <div className="text-xs text-secondary-500">conversion</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white rounded-xl border border-secondary-200 p-6">
                          <h4 className="font-semibold text-secondary-900 mb-4">Bottlenecks</h4>
                          <div className="space-y-3">
                            {[
                              { issue: "Long form completion", impact: "High", users: 234 },
                              { issue: "Payment processing", impact: "Medium", users: 156 },
                              { issue: "Email verification", impact: "Low", users: 89 }
                            ].map((bottleneck, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-error-50 rounded-lg">
                                <div>
                                  <div className="font-medium text-secondary-900">{bottleneck.issue}</div>
                                  <div className="text-sm text-secondary-500">{bottleneck.users} affected</div>
                                </div>
                                <span className={cn(
                                  "px-2 py-1 rounded-full text-xs font-medium",
                                  bottleneck.impact === "High" ? "bg-error-100 text-error-700" :
                                  bottleneck.impact === "Medium" ? "bg-warning-100 text-warning-700" :
                                  "bg-secondary-100 text-secondary-700"
                                )}>
                                  {bottleneck.impact}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white rounded-xl border border-secondary-200 p-6">
                          <h4 className="font-semibold text-secondary-900 mb-4">Optimization Opportunities</h4>
                          <div className="space-y-3">
                            {[
                              { opportunity: "Add AI personalization", potential: "+15%", effort: "Medium" },
                              { opportunity: "Simplify checkout", potential: "+12%", effort: "Low" },
                              { opportunity: "Mobile optimization", potential: "+8%", effort: "High" }
                            ].map((opportunity, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-success-50 rounded-lg">
                                <div>
                                  <div className="font-medium text-secondary-900">{opportunity.opportunity}</div>
                                  <div className="text-sm text-secondary-500">{opportunity.effort} effort</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold text-success-600">{opportunity.potential}</div>
                                  <div className="text-xs text-secondary-500">potential</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "abtesting" && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-secondary-900">A/B Testing</h3>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                          <Plus className="w-4 h-4" />
                          New Test
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {[
                          {
                            name: "Checkout Flow Optimization",
                            status: "running",
                            variantA: { conversion: 18.5, traffic: 1250 },
                            variantB: { conversion: 22.1, traffic: 1248 },
                            confidence: 95
                          },
                          {
                            name: "Landing Page Headlines",
                            status: "running",
                            variantA: { conversion: 12.3, traffic: 890 },
                            variantB: { conversion: 14.7, traffic: 892 },
                            confidence: 87
                          },
                          {
                            name: "Email Subject Lines",
                            status: "paused",
                            variantA: { conversion: 8.9, traffic: 2340 },
                            variantB: { conversion: 9.2, traffic: 2338 },
                            confidence: 62
                          }
                        ].map((test, index) => (
                          <ABTestCard key={index} test={test} />
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "reports" && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-secondary-900">Custom Reports</h3>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                          <Plus className="w-4 h-4" />
                          Create Report
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {[
                          {
                            name: "Weekly Performance Summary",
                            type: "Automated",
                            schedule: "Every Monday",
                            lastRun: "2 hours ago",
                            status: "completed"
                          },
                          {
                            name: "Conversion Funnel Analysis",
                            type: "Manual",
                            schedule: "On-demand",
                            lastRun: "Yesterday",
                            status: "completed"
                          },
                          {
                            name: "Customer Journey Heatmap",
                            type: "Automated",
                            schedule: "Daily",
                            lastRun: "1 hour ago",
                            status: "running"
                          }
                        ].map((report, index) => (
                          <div key={index} className="bg-white rounded-xl border border-secondary-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-semibold text-secondary-900">{report.name}</h4>
                              <span className={cn(
                                "px-2 py-1 rounded-full text-xs font-medium",
                                report.status === "completed" ? "bg-success-100 text-success-700" :
                                report.status === "running" ? "bg-warning-100 text-warning-700" :
                                "bg-secondary-100 text-secondary-700"
                              )}>
                                {report.status}
                              </span>
                            </div>
                            
                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between text-sm">
                                <span className="text-secondary-600">Type:</span>
                                <span className="text-secondary-900">{report.type}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-secondary-600">Schedule:</span>
                                <span className="text-secondary-900">{report.schedule}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-secondary-600">Last Run:</span>
                                <span className="text-secondary-900">{report.lastRun}</span>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <button className="flex-1 px-3 py-2 bg-secondary-100 text-secondary-700 rounded-lg text-sm hover:bg-secondary-200 transition-colors">
                                <Download className="w-4 h-4 inline mr-1" />
                                Download
                              </button>
                              <button className="px-3 py-2 bg-primary-500 text-white rounded-lg text-sm hover:bg-primary-600 transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
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

export default AdvancedAnalytics; 