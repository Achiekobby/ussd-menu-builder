// Advanced Analytics Service
// Provides comprehensive analytics, reporting, and performance monitoring

class AnalyticsService {
  constructor() {
    this.dataHistory = [];
    this.realTimeData = {};
    this.abTests = [];
    this.customReports = [];
    this.performanceMetrics = {};
  }

  // Real-time data processing
  processRealTimeData(nodes, edges) {
    const timestamp = new Date().toISOString();
    
    // Calculate real-time metrics
    const metrics = {
      timestamp,
      totalNodes: nodes.length,
      totalEdges: edges.length,
      activeUsers: this.generateActiveUsers(),
      currentSessions: this.generateCurrentSessions(),
      conversionRate: this.calculateRealTimeConversion(nodes, edges),
      revenue: this.generateRealTimeRevenue(),
      performance: this.calculatePerformanceMetrics(nodes, edges)
    };

    this.realTimeData = metrics;
    this.dataHistory.push(metrics);
    
    // Keep only last 1000 data points
    if (this.dataHistory.length > 1000) {
      this.dataHistory = this.dataHistory.slice(-1000);
    }

    return metrics;
  }

  // Generate realistic active users
  generateActiveUsers() {
    const baseUsers = 500;
    const timeOfDay = new Date().getHours();
    const dayOfWeek = new Date().getDay();
    
    // Peak hours (9 AM - 6 PM)
    const peakMultiplier = timeOfDay >= 9 && timeOfDay <= 18 ? 1.5 : 0.7;
    // Weekday vs weekend
    const dayMultiplier = dayOfWeek >= 1 && dayOfWeek <= 5 ? 1.2 : 0.8;
    
    return Math.floor(baseUsers * peakMultiplier * dayMultiplier + Math.random() * 200);
  }

  // Generate current sessions
  generateCurrentSessions() {
    return Math.floor(this.realTimeData.activeUsers * (0.3 + Math.random() * 0.4));
  }

  // Calculate real-time conversion rate
  calculateRealTimeConversion(nodes, edges) {
    const actionNodes = nodes.filter(n => n.type === 'actionNode').length;
    const touchpoints = nodes.filter(n => n.type === 'touchpointNode').length;
    
    if (touchpoints === 0) return 0;
    
    const baseRate = (actionNodes / touchpoints) * 100;
    const timeVariation = Math.sin(Date.now() / 1000000) * 2; // Small time-based variation
    
    return Math.max(0, Math.min(100, baseRate + timeVariation));
  }

  // Generate real-time revenue
  generateRealTimeRevenue() {
    const baseRevenue = 1000;
    const timeOfDay = new Date().getHours();
    const conversionRate = this.realTimeData.conversionRate || 15;
    
    // Revenue correlates with conversion rate and time of day
    const timeMultiplier = timeOfDay >= 9 && timeOfDay <= 18 ? 1.3 : 0.6;
    const conversionMultiplier = conversionRate / 15;
    
    return Math.floor(baseRevenue * timeMultiplier * conversionMultiplier + Math.random() * 500);
  }

  // Calculate performance metrics
  calculatePerformanceMetrics(nodes, edges) {
    const nodeTypes = this.countNodeTypes(nodes);
    const pathAnalysis = this.analyzePaths(nodes, edges);
    
    return {
      efficiency: this.calculateEfficiencyScore(nodes, edges),
      engagement: this.calculateEngagementScore(nodes, edges),
      conversion: this.calculateConversionScore(nodes, edges),
      complexity: this.calculateComplexityScore(nodes, edges),
      nodeTypes,
      pathAnalysis
    };
  }

  // Count node types
  countNodeTypes(nodes) {
    return nodes.reduce((acc, node) => {
      acc[node.type] = (acc[node.type] || 0) + 1;
      return acc;
    }, {});
  }

  // Analyze journey paths
  analyzePaths(nodes, edges) {
    const startNodes = nodes.filter(n => n.type === 'startJourney');
    const endNodes = nodes.filter(n => n.type === 'endJourney');
    const decisionNodes = nodes.filter(n => n.type === 'decisionNode');
    const aiNodes = nodes.filter(n => n.type === 'aiNode');
    
    return {
      entryPoints: startNodes.length,
      exitPoints: endNodes.length,
      decisionPoints: decisionNodes.length,
      aiOptimizationPoints: aiNodes.length,
      averagePathLength: this.calculateAveragePathLength(nodes, edges),
      maxPathLength: this.calculateMaxPathLength(nodes, edges),
      pathVariations: this.calculatePathVariations(nodes, edges)
    };
  }

  // Calculate efficiency score
  calculateEfficiencyScore(nodes, edges) {
    const startNodes = nodes.filter(n => n.type === 'startJourney').length;
    const endNodes = nodes.filter(n => n.type === 'endJourney').length;
    const orphanedNodes = this.countOrphanedNodes(nodes, edges);
    
    if (nodes.length === 0) return 0;
    
    const completionRate = endNodes > 0 ? 100 : 0;
    const orphanRate = (orphanedNodes / nodes.length) * 100;
    const balanceScore = startNodes === 1 ? 100 : 50;
    
    return Math.round((completionRate + balanceScore - orphanRate) / 3);
  }

  // Calculate engagement score
  calculateEngagementScore(nodes, edges) {
    const touchpoints = nodes.filter(n => n.type === 'touchpointNode').length;
    const interactions = edges.length;
    const aiNodes = nodes.filter(n => n.type === 'aiNode').length;
    
    if (touchpoints === 0) return 0;
    
    const interactionDensity = Math.min(100, (interactions / touchpoints) * 50);
    const aiEnhancement = aiNodes * 10;
    
    return Math.min(100, interactionDensity + aiEnhancement);
  }

  // Calculate conversion score
  calculateConversionScore(nodes, edges) {
    const actionNodes = nodes.filter(n => n.type === 'actionNode').length;
    const touchpoints = nodes.filter(n => n.type === 'touchpointNode').length;
    const decisions = nodes.filter(n => n.type === 'decisionNode').length;
    
    if (touchpoints === 0) return 0;
    
    const actionRate = (actionNodes / touchpoints) * 100;
    const decisionEffectiveness = decisions > 0 ? Math.min(100, (actionNodes / decisions) * 40) : 100;
    
    return Math.round((actionRate + decisionEffectiveness) / 2);
  }

  // Calculate complexity score
  calculateComplexityScore(nodes, edges) {
    const baseScore = nodes.length * 10;
    const edgeScore = edges.length * 5;
    const decisionScore = nodes.filter(n => n.type === 'decisionNode').length * 20;
    const aiScore = nodes.filter(n => n.type === 'aiNode').length * 15;
    
    return Math.min(100, (baseScore + edgeScore + decisionScore + aiScore) / 10);
  }

  // Helper methods
  countOrphanedNodes(nodes, edges) {
    return nodes.filter(node => {
      const hasIncoming = edges.some(edge => edge.target === node.id);
      const hasOutgoing = edges.some(edge => edge.source === node.id);
      return !hasIncoming && !hasOutgoing && node.type !== 'startJourney';
    }).length;
  }

  calculateAveragePathLength(nodes, edges) {
    if (edges.length === 0) return 0;
    return Math.round(edges.length / Math.max(nodes.length, 1));
  }

  calculateMaxPathLength(nodes, edges) {
    return Math.max(edges.length, nodes.length);
  }

  calculatePathVariations(nodes, edges) {
    const decisionNodes = nodes.filter(n => n.type === 'decisionNode').length;
    return Math.pow(2, decisionNodes);
  }

  // Generate trend data
  generateTrendData(timeRange = '7d') {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const baseData = this.dataHistory.slice(-days);
    
    if (baseData.length === 0) {
      // Generate mock trend data
      return {
        conversion: Array.from({ length: days }, () => (Math.random() * 20 + 5).toFixed(1)),
        engagement: Array.from({ length: days }, () => (Math.random() * 30 + 40).toFixed(1)),
        revenue: Array.from({ length: days }, () => Math.floor(Math.random() * 5000) + 1000),
        retention: Array.from({ length: days }, () => (Math.random() * 20 + 60).toFixed(1))
      };
    }

    return {
      conversion: baseData.map(d => parseFloat(d.conversionRate)),
      engagement: baseData.map(d => d.performance.engagement),
      revenue: baseData.map(d => d.revenue),
      retention: Array.from({ length: days }, () => (Math.random() * 20 + 60).toFixed(1))
    };
  }

  // A/B Testing management
  createABTest(testConfig) {
    const test = {
      id: `ab_test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: testConfig.name,
      description: testConfig.description,
      status: 'running',
      createdAt: new Date().toISOString(),
      variantA: {
        conversion: 0,
        traffic: 0,
        revenue: 0
      },
      variantB: {
        conversion: 0,
        traffic: 0,
        revenue: 0
      },
      confidence: 0,
      ...testConfig
    };

    this.abTests.push(test);
    return test;
  }

  updateABTest(testId, updates) {
    const testIndex = this.abTests.findIndex(test => test.id === testId);
    if (testIndex !== -1) {
      this.abTests[testIndex] = { ...this.abTests[testIndex], ...updates };
      
      // Calculate confidence if both variants have data
      const test = this.abTests[testIndex];
      if (test.variantA.traffic > 0 && test.variantB.traffic > 0) {
        test.confidence = this.calculateABTestConfidence(test);
      }
    }
  }

  calculateABTestConfidence(test) {
    // Simplified confidence calculation
    const totalTraffic = test.variantA.traffic + test.variantB.traffic;
    const conversionDiff = Math.abs(test.variantA.conversion - test.variantB.conversion);
    
    if (totalTraffic < 100) return 0;
    if (conversionDiff < 1) return 50;
    if (conversionDiff < 3) return 70;
    if (conversionDiff < 5) return 85;
    return 95;
  }

  getABTests() {
    return this.abTests;
  }

  // Custom reports management
  createCustomReport(reportConfig) {
    const report = {
      id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: reportConfig.name,
      type: reportConfig.type || 'manual',
      schedule: reportConfig.schedule || 'on-demand',
      status: 'pending',
      createdAt: new Date().toISOString(),
      lastRun: null,
      ...reportConfig
    };

    this.customReports.push(report);
    return report;
  }

  runReport(reportId) {
    const reportIndex = this.customReports.findIndex(report => report.id === reportId);
    if (reportIndex !== -1) {
      this.customReports[reportIndex].status = 'running';
      this.customReports[reportIndex].lastRun = new Date().toISOString();
      
      // Simulate report generation
      setTimeout(() => {
        this.customReports[reportIndex].status = 'completed';
      }, 2000);
    }
  }

  getCustomReports() {
    return this.customReports;
  }

  // Performance monitoring
  trackPerformance(metric, value) {
    if (!this.performanceMetrics[metric]) {
      this.performanceMetrics[metric] = [];
    }
    
    this.performanceMetrics[metric].push({
      timestamp: new Date().toISOString(),
      value
    });
    
    // Keep only last 1000 data points per metric
    if (this.performanceMetrics[metric].length > 1000) {
      this.performanceMetrics[metric] = this.performanceMetrics[metric].slice(-1000);
    }
  }

  getPerformanceMetrics() {
    return this.performanceMetrics;
  }

  // Export functionality
  exportData(format = 'json') {
    const exportData = {
      timestamp: new Date().toISOString(),
      realTimeData: this.realTimeData,
      dataHistory: this.dataHistory,
      abTests: this.abTests,
      customReports: this.customReports,
      performanceMetrics: this.performanceMetrics
    };

    if (format === 'json') {
      return JSON.stringify(exportData, null, 2);
    }
    
    // Add more export formats as needed
    return exportData;
  }

  // Clear data
  clearData() {
    this.dataHistory = [];
    this.realTimeData = {};
    this.abTests = [];
    this.customReports = [];
    this.performanceMetrics = {};
  }
}

// Create singleton instance
const analyticsService = new AnalyticsService();

export default analyticsService; 