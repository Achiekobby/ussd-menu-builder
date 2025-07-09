// Performance monitoring utilities

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      renderTime: [],
      memoryUsage: [],
      nodeCount: [],
      edgeCount: [],
      interactions: []
    };
    this.startTime = performance.now();
  }

  // Measure render performance
  measureRenderTime(componentName, renderTime) {
    this.metrics.renderTime.push({
      component: componentName,
      time: renderTime,
      timestamp: Date.now()
    });
  }

  // Track memory usage
  trackMemoryUsage() {
    if (performance.memory) {
      this.metrics.memoryUsage.push({
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit,
        timestamp: Date.now()
      });
    }
  }

  // Track flow complexity
  trackFlowComplexity(nodes, edges) {
    this.metrics.nodeCount.push({
      count: nodes.length,
      timestamp: Date.now()
    });
    this.metrics.edgeCount.push({
      count: edges.length,
      timestamp: Date.now()
    });
  }

  // Track user interactions
  trackInteraction(action, details = {}) {
    this.metrics.interactions.push({
      action,
      details,
      timestamp: Date.now()
    });
  }

  // Get performance summary
  getPerformanceSummary() {
    const renderTimes = this.metrics.renderTime.map(m => m.time);
    const avgRenderTime = renderTimes.length > 0 
      ? renderTimes.reduce((a, b) => a + b, 0) / renderTimes.length 
      : 0;

    const memoryUsage = this.metrics.memoryUsage;
    const latestMemory = memoryUsage.length > 0 ? memoryUsage[memoryUsage.length - 1] : null;

    const totalInteractions = this.metrics.interactions.length;
    const uniqueActions = [...new Set(this.metrics.interactions.map(i => i.action))];

    return {
      uptime: performance.now() - this.startTime,
      averageRenderTime: avgRenderTime,
      totalRenders: renderTimes.length,
      memoryUsage: latestMemory,
      totalInteractions,
      uniqueActions,
      flowComplexity: {
        maxNodes: Math.max(...this.metrics.nodeCount.map(n => n.count), 0),
        maxEdges: Math.max(...this.metrics.edgeCount.map(e => e.count), 0)
      }
    };
  }

  // Export performance data
  exportPerformanceData() {
    return {
      metrics: this.metrics,
      summary: this.getPerformanceSummary(),
      exportTime: new Date().toISOString()
    };
  }

  // Clear metrics
  clear() {
    this.metrics = {
      renderTime: [],
      memoryUsage: [],
      nodeCount: [],
      edgeCount: [],
      interactions: []
    };
    this.startTime = performance.now();
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

export default performanceMonitor;

// Utility functions
export const measureComponentRender = (componentName, callback) => {
  const start = performance.now();
  const result = callback();
  const end = performance.now();
  performanceMonitor.measureRenderTime(componentName, end - start);
  return result;
};

export const trackFlowUpdate = (nodes, edges) => {
  performanceMonitor.trackFlowComplexity(nodes, edges);
  performanceMonitor.trackMemoryUsage();
};

export const trackUserAction = (action, details) => {
  performanceMonitor.trackInteraction(action, details);
};

export const getPerformanceReport = () => {
  return performanceMonitor.getPerformanceSummary();
};

export const exportPerformanceReport = () => {
  return performanceMonitor.exportPerformanceData();
}; 