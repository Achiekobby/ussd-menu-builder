// Mock AI Service for Customer Journey Analysis
// This service simulates advanced AI capabilities for portfolio demonstration

class MockAIService {
  constructor() {
    this.analysisHistory = [];
    this.optimizationPatterns = new Map();
    this.performanceMetrics = {
      totalAnalyses: 0,
      averageImprovement: 0,
      successfulOptimizations: 0
    };
  }

  // Main analysis function
  async analyzeJourney(nodes, edges) {
    const analysisId = `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Simulate AI processing time
    await this.simulateProcessing();
    
    const journeyMetrics = this.calculateJourneyMetrics(nodes, edges);
    const suggestions = this.generateOptimizationSuggestions(nodes, edges, journeyMetrics);
    const predictions = this.generatePredictions(journeyMetrics);
    const insights = this.generateInsights(nodes, edges, journeyMetrics);
    
    const analysis = {
      id: analysisId,
      timestamp: new Date().toISOString(),
      journeyMetrics,
      suggestions,
      predictions,
      insights,
      confidence: this.calculateConfidence(journeyMetrics),
      processingTime: Math.random() * 2000 + 1000 // 1-3 seconds
    };
    
    this.analysisHistory.push(analysis);
    this.updatePerformanceMetrics(analysis);
    
    return analysis;
  }

  // Calculate comprehensive journey metrics
  calculateJourneyMetrics(nodes, edges) {
    const nodeTypes = this.countNodeTypes(nodes);
    const pathAnalysis = this.analyzePaths(nodes, edges);
    const complexityScore = this.calculateComplexityScore(nodes, edges);
    const conversionPotential = this.estimateConversionPotential(nodes, edges);
    
    return {
      totalNodes: nodes.length,
      totalEdges: edges.length,
      nodeTypes,
      pathAnalysis,
      complexityScore,
      conversionPotential,
      efficiencyScore: this.calculateEfficiencyScore(nodes, edges),
      engagementScore: this.calculateEngagementScore(nodes, edges),
      conversionScore: this.calculateConversionScore(nodes, edges),
      retentionScore: this.calculateRetentionScore(nodes, edges)
    };
  }

  // Count different types of nodes
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

  // Calculate complexity score
  calculateComplexityScore(nodes, edges) {
    const baseScore = nodes.length * 10;
    const edgeScore = edges.length * 5;
    const decisionScore = nodes.filter(n => n.type === 'decisionNode').length * 20;
    const aiScore = nodes.filter(n => n.type === 'aiNode').length * 15;
    
    return Math.min(100, (baseScore + edgeScore + decisionScore + aiScore) / 10);
  }

  // Estimate conversion potential
  estimateConversionPotential(nodes, edges) {
    const actionNodes = nodes.filter(n => n.type === 'actionNode').length;
    const touchpoints = nodes.filter(n => n.type === 'touchpointNode').length;
    const decisions = nodes.filter(n => n.type === 'decisionNode').length;
    
    if (touchpoints === 0) return 0;
    
    const conversionRate = (actionNodes / touchpoints) * 100;
    const decisionEfficiency = decisions > 0 ? Math.min(100, (actionNodes / decisions) * 50) : 100;
    
    return Math.round((conversionRate + decisionEfficiency) / 2);
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

  // Calculate retention score
  calculateRetentionScore(nodes, edges) {
    const endNodes = nodes.filter(n => n.type === 'endJourney').length;
    const actionNodes = nodes.filter(n => n.type === 'actionNode').length;
    const aiNodes = nodes.filter(n => n.type === 'aiNode').length;
    
    if (endNodes === 0) return 0;
    
    const completionRate = endNodes > 0 ? 100 : 0;
    const valueCreation = Math.min(100, actionNodes * 15);
    const personalization = aiNodes * 10;
    
    return Math.round((completionRate + valueCreation + personalization) / 3);
  }

  // Generate optimization suggestions
  generateOptimizationSuggestions(nodes, edges, metrics) {
    const suggestions = [];
    
    // Analyze journey structure
    if (metrics.pathAnalysis.entryPoints === 0) {
      suggestions.push({
        id: `suggestion_${Date.now()}_1`,
        type: "critical",
        title: "Add Journey Entry Point",
        description: "Your journey lacks a clear starting point. Add a StartJourney node to define where customers begin their experience.",
        impact: "Critical",
        confidence: 98,
        category: "structure",
        priority: 1,
        estimatedEffort: "5 minutes",
        expectedImprovement: 25
      });
    }
    
    if (metrics.pathAnalysis.exitPoints === 0) {
      suggestions.push({
        id: `suggestion_${Date.now()}_2`,
        type: "critical",
        title: "Add Journey Completion Point",
        description: "Your journey needs an EndJourney node to track successful completions and measure conversion rates.",
        impact: "Critical",
        confidence: 96,
        category: "structure",
        priority: 1,
        estimatedEffort: "3 minutes",
        expectedImprovement: 20
      });
    }
    
    // Analyze engagement opportunities
    if (metrics.engagementScore < 50) {
      suggestions.push({
        id: `suggestion_${Date.now()}_3`,
        type: "optimization",
        title: "Enhance Customer Engagement",
        description: "Consider adding more TouchpointNode components to increase customer interaction opportunities and engagement.",
        impact: "High",
        confidence: 87,
        category: "engagement",
        priority: 2,
        estimatedEffort: "15 minutes",
        expectedImprovement: 15
      });
    }
    
    // Analyze conversion optimization
    if (metrics.conversionScore < 60) {
      suggestions.push({
        id: `suggestion_${Date.now()}_4`,
        type: "optimization",
        title: "Optimize Conversion Paths",
        description: "Add ActionNode components to track and optimize customer conversions. Consider using DecisionNode components to create targeted conversion paths.",
        impact: "High",
        confidence: 92,
        category: "conversion",
        priority: 2,
        estimatedEffort: "20 minutes",
        expectedImprovement: 30
      });
    }
    
    // Suggest AI optimization
    if (metrics.nodeTypes.aiNode === 0) {
      suggestions.push({
        id: `suggestion_${Date.now()}_5`,
        type: "enhancement",
        title: "Add AI-Powered Optimization",
        description: "Integrate AINode components to enable intelligent decision-making and personalized customer experiences.",
        impact: "Medium",
        confidence: 85,
        category: "ai",
        priority: 3,
        estimatedEffort: "30 minutes",
        expectedImprovement: 20
      });
    }
    
    // Analyze complexity
    if (metrics.complexityScore > 80) {
      suggestions.push({
        id: `suggestion_${Date.now()}_6`,
        type: "simplification",
        title: "Simplify Journey Complexity",
        description: "Your journey may be too complex. Consider consolidating decision points and streamlining the customer path.",
        impact: "Medium",
        confidence: 78,
        category: "complexity",
        priority: 2,
        estimatedEffort: "25 minutes",
        expectedImprovement: 10
      });
    }
    
    // Add personalized suggestions based on patterns
    const personalizedSuggestions = this.generatePersonalizedSuggestions(nodes, edges, metrics);
    suggestions.push(...personalizedSuggestions);
    
    return suggestions.sort((a, b) => a.priority - b.priority);
  }

  // Generate personalized suggestions
  generatePersonalizedSuggestions(nodes, edges, metrics) {
    const suggestions = [];
    
    // Analyze node distribution
    const touchpointRatio = metrics.nodeTypes.touchpointNode / Math.max(metrics.totalNodes, 1);
    if (touchpointRatio < 0.3) {
      suggestions.push({
        id: `suggestion_${Date.now()}_7`,
        type: "enhancement",
        title: "Increase Customer Touchpoints",
        description: "Your journey has relatively few customer interaction points. Adding more touchpoints can improve engagement and conversion opportunities.",
        impact: "Medium",
        confidence: 82,
        category: "engagement",
        priority: 3,
        estimatedEffort: "20 minutes",
        expectedImprovement: 12
      });
    }
    
    // Analyze decision point effectiveness
    const decisionNodes = nodes.filter(n => n.type === 'decisionNode');
    if (decisionNodes.length > 0) {
      const avgOutgoingEdges = edges.filter(e => 
        decisionNodes.some(d => d.id === e.source)
      ).length / decisionNodes.length;
      
      if (avgOutgoingEdges < 2) {
        suggestions.push({
          id: `suggestion_${Date.now()}_8`,
          type: "optimization",
          title: "Enhance Decision Branching",
          description: "Your decision nodes could benefit from more branching options to create personalized customer paths.",
          impact: "Medium",
          confidence: 79,
          category: "personalization",
          priority: 3,
          estimatedEffort: "15 minutes",
          expectedImprovement: 8
        });
      }
    }
    
    return suggestions;
  }

  // Generate predictions
  generatePredictions(metrics) {
    const baseConversionRate = metrics.conversionPotential;
    const efficiencyMultiplier = metrics.efficiencyScore / 100;
    const engagementMultiplier = metrics.engagementScore / 100;
    
    return {
      predictedConversionRate: Math.round(baseConversionRate * efficiencyMultiplier * engagementMultiplier),
      predictedEngagementTime: Math.round(metrics.pathAnalysis.averagePathLength * 2.5),
      predictedCustomerSatisfaction: Math.round((metrics.efficiencyScore + metrics.engagementScore) / 2),
      predictedRevenueImpact: this.calculateRevenueImpact(metrics),
      confidenceInterval: {
        lower: Math.max(0, baseConversionRate - 10),
        upper: Math.min(100, baseConversionRate + 10)
      }
    };
  }

  // Generate insights
  generateInsights(nodes, edges, metrics) {
    const insights = [];
    
    // Journey structure insights
    if (metrics.efficiencyScore > 80) {
      insights.push({
        type: "positive",
        title: "Well-Structured Journey",
        description: "Your journey has excellent structural efficiency with clear entry and exit points.",
        impact: "High"
      });
    }
    
    if (metrics.engagementScore > 70) {
      insights.push({
        type: "positive",
        title: "Strong Engagement Design",
        description: "Your journey effectively engages customers through multiple interaction points.",
        impact: "Medium"
      });
    }
    
    if (metrics.conversionScore < 40) {
      insights.push({
        type: "warning",
        title: "Conversion Optimization Opportunity",
        description: "There's significant potential to improve conversion rates through targeted optimization.",
        impact: "High"
      });
    }
    
    if (metrics.complexityScore > 90) {
      insights.push({
        type: "warning",
        title: "High Complexity Detected",
        description: "Your journey may be too complex, which could lead to customer confusion and drop-offs.",
        impact: "Medium"
      });
    }
    
    return insights;
  }

  // Calculate confidence score
  calculateConfidence(metrics) {
    const dataQuality = Math.min(100, metrics.totalNodes * 5);
    const structureQuality = metrics.efficiencyScore;
    const completeness = metrics.pathAnalysis.entryPoints > 0 && metrics.pathAnalysis.exitPoints > 0 ? 100 : 50;
    
    return Math.round((dataQuality + structureQuality + completeness) / 3);
  }

  // Calculate revenue impact
  calculateRevenueImpact(metrics) {
    const baseRevenue = 1000; // Base revenue assumption
    const conversionMultiplier = metrics.conversionPotential / 100;
    const efficiencyMultiplier = metrics.efficiencyScore / 100;
    
    return Math.round(baseRevenue * conversionMultiplier * efficiencyMultiplier);
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
    // Simplified calculation
    return Math.max(edges.length, nodes.length);
  }

  calculatePathVariations(nodes, edges) {
    const decisionNodes = nodes.filter(n => n.type === 'decisionNode').length;
    return Math.pow(2, decisionNodes);
  }

  // Simulate AI processing time
  async simulateProcessing() {
    const processingTime = Math.random() * 2000 + 1000; // 1-3 seconds
    await new Promise(resolve => setTimeout(resolve, processingTime));
  }

  // Update performance metrics
  updatePerformanceMetrics(analysis) {
    this.performanceMetrics.totalAnalyses++;
    this.performanceMetrics.averageImprovement = 
      (this.performanceMetrics.averageImprovement + analysis.confidence) / 2;
    this.performanceMetrics.successfulOptimizations++;
  }

  // Get performance metrics
  getPerformanceMetrics() {
    return {
      ...this.performanceMetrics,
      lastAnalysis: this.analysisHistory[this.analysisHistory.length - 1]?.timestamp
    };
  }

  // Get analysis history
  getAnalysisHistory() {
    return this.analysisHistory;
  }

  // Clear history
  clearHistory() {
    this.analysisHistory = [];
    this.performanceMetrics = {
      totalAnalyses: 0,
      averageImprovement: 0,
      successfulOptimizations: 0
    };
  }
}

// Create singleton instance
const mockAIService = new MockAIService();

export default mockAIService; 