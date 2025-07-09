import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Target } from "lucide-react";

const AnalyticsPanel = ({ nodes, edges }) => {
  const analytics = {
    totalNodes: nodes.length,
    totalEdges: edges.length,
    touchpoints: nodes.filter(node => node.type === 'touchpointNode').length,
    decisions: nodes.filter(node => node.type === 'decisionNode').length,
    aiNodes: nodes.filter(node => node.type === 'aiNode').length,
    conversionRate: 78.5,
    avgJourneyTime: 2.3
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft border border-white/20"
    >
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-primary-600" />
        <h3 className="font-semibold text-secondary-900">Journey Analytics</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-primary-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-primary-600" />
            <span className="text-xs font-medium text-primary-700">Total Nodes</span>
          </div>
          <div className="text-lg font-bold text-primary-900">{analytics.totalNodes}</div>
        </div>
        
        <div className="p-3 bg-success-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-success-600" />
            <span className="text-xs font-medium text-success-700">Conversion</span>
          </div>
          <div className="text-lg font-bold text-success-900">{analytics.conversionRate}%</div>
        </div>
        
        <div className="p-3 bg-accent-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-accent-600" />
            <span className="text-xs font-medium text-accent-700">Touchpoints</span>
          </div>
          <div className="text-lg font-bold text-accent-900">{analytics.touchpoints}</div>
        </div>
        
        <div className="p-3 bg-warning-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-4 h-4 text-warning-600" />
            <span className="text-xs font-medium text-warning-700">AI Nodes</span>
          </div>
          <div className="text-lg font-bold text-warning-900">{analytics.aiNodes}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsPanel; 