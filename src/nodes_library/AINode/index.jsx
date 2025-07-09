import { memo } from "react";
import { Handle, Position } from "reactflow";
import { motion } from "framer-motion";
import { Brain, Sparkles, Cpu, Zap, Target, TrendingUp, Activity } from "lucide-react";
import { cn } from "../../utils/cn";

const AINode = memo(({ data, selected }) => {
  const getAITypeIcon = (type) => {
    switch (type) {
      case 'prediction':
        return <Target className="w-5 h-5" />;
      case 'optimization':
        return <TrendingUp className="w-5 h-5" />;
      case 'personalization':
        return <Sparkles className="w-5 h-5" />;
      case 'automation':
        return <Cpu className="w-5 h-5" />;
      case 'analysis':
        return <Activity className="w-5 h-5" />;
      default:
        return <Brain className="w-5 h-5" />;
    }
  };

  const getAITypeColor = (type) => {
    switch (type) {
      case 'prediction':
        return 'from-purple-500 to-purple-600';
      case 'optimization':
        return 'from-accent-500 to-accent-600';
      case 'personalization':
        return 'from-pink-500 to-pink-600';
      case 'automation':
        return 'from-blue-500 to-blue-600';
      case 'analysis':
        return 'from-green-500 to-green-600';
      default:
        return 'from-accent-500 to-accent-600';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success-600';
    if (confidence >= 75) return 'text-warning-600';
    if (confidence >= 60) return 'text-orange-600';
    return 'text-error-600';
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "relative p-4 rounded-2xl shadow-soft border-2 transition-all duration-200 min-w-[320px]",
        selected
          ? "border-accent-500 shadow-glow-accent bg-gradient-to-br from-accent-50 to-accent-100"
          : "border-accent-200 bg-white hover:border-accent-300"
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        id="target"
        className={cn(
          "!w-3 !h-3 !bg-accent-500 !border-2 !border-white transition-opacity duration-200",
          selected ? "!opacity-100" : "!opacity-0"
        )}
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        id="source"
        className={cn(
          "!w-3 !h-3 !bg-accent-500 !border-2 !border-white transition-opacity duration-200",
          selected ? "!opacity-100" : "!opacity-0"
        )}
      />
      
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className={cn(
              "w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-soft text-white relative overflow-hidden",
              getAITypeColor(data.aiType || 'default')
            )}
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent animate-pulse" />
            {getAITypeIcon(data.aiType || 'default')}
          </motion.div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Brain className="w-4 h-4 text-accent-600" />
            <h3 className="font-semibold text-secondary-900 text-sm">
              {data.label || "AI Decision"}
            </h3>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-accent-500 rounded-full"
            />
          </div>
          
          <p className="text-xs text-secondary-600 leading-relaxed mb-3">
            {data.description || "AI-powered decision making and optimization"}
          </p>
          
          {/* AI Metrics */}
          {data.metrics && (
            <div className="space-y-3">
              {/* Confidence Score */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-secondary-700">AI Confidence</span>
                <span className={cn(
                  "text-xs font-bold",
                  getConfidenceColor(data.metrics.confidence || 85)
                )}>
                  {data.metrics.confidence || 85}%
                </span>
              </div>
              
              {/* Confidence bar */}
              <div className="w-full bg-secondary-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${data.metrics.confidence || 85}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    data.metrics.confidence >= 90 ? 'bg-success-500' :
                    data.metrics.confidence >= 75 ? 'bg-warning-500' :
                    data.metrics.confidence >= 60 ? 'bg-orange-500' : 'bg-error-500'
                  )}
                />
              </div>
              
              {/* AI Performance metrics */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1 px-2 py-1 bg-accent-50 rounded-lg">
                  <Zap className="w-3 h-3 text-accent-600" />
                  <span className="text-xs font-medium text-accent-700">
                    {data.metrics.accuracy || "94.2%"} Accuracy
                  </span>
                </div>
                
                <div className="flex items-center gap-1 px-2 py-1 bg-purple-50 rounded-lg">
                  <Target className="w-3 h-3 text-purple-600" />
                  <span className="text-xs font-medium text-purple-700">
                    {data.metrics.precision || "89.1%"} Precision
                  </span>
                </div>
                
                <div className="flex items-center gap-1 px-2 py-1 bg-success-50 rounded-lg">
                  <TrendingUp className="w-3 h-3 text-success-600" />
                  <span className="text-xs font-medium text-success-700">
                    {data.metrics.improvement || "+23%"} Improvement
                  </span>
                </div>
                
                <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-lg">
                  <Cpu className="w-3 h-3 text-blue-600" />
                  <span className="text-xs font-medium text-blue-700">
                    {data.metrics.speed || "0.2s"} Response
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {/* AI Type badge */}
          <div className="mt-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-700">
              {data.aiType || 'intelligent'} AI
            </span>
          </div>
          
          {/* AI Features */}
          {data.features && (
            <div className="mt-2">
              <div className="text-xs font-medium text-secondary-700 mb-1">
                AI Features:
              </div>
              <div className="flex flex-wrap gap-1">
                {data.features.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-gradient-to-r from-accent-50 to-purple-50 text-accent-700 border border-accent-200"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* AI Processing indicator */}
      <div className="absolute top-2 right-2">
        <motion.div
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-3 h-3 bg-accent-500 rounded-full"
        />
      </div>
      
      {/* Neural network pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-accent-400 to-purple-400 rounded-2xl" />
      </div>
    </motion.div>
  );
});

AINode.displayName = "AINode";

export default AINode; 