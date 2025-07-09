import { memo } from "react";
import { Handle, Position } from "reactflow";
import { motion } from "framer-motion";
import { Zap, ShoppingCart, UserCheck, MessageSquare, Star, TrendingUp } from "lucide-react";
import { cn } from "../../utils/cn";

const ActionNode = memo(({ data, selected }) => {
  const getActionIcon = (type) => {
    switch (type) {
      case 'purchase':
        return <ShoppingCart className="w-5 h-5" />;
      case 'signup':
        return <UserCheck className="w-5 h-5" />;
      case 'contact':
        return <MessageSquare className="w-5 h-5" />;
      case 'review':
        return <Star className="w-5 h-5" />;
      case 'download':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  const getActionColor = (type) => {
    switch (type) {
      case 'purchase':
        return 'from-success-500 to-success-600';
      case 'signup':
        return 'from-primary-500 to-primary-600';
      case 'contact':
        return 'from-accent-500 to-accent-600';
      case 'review':
        return 'from-warning-500 to-warning-600';
      case 'download':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-secondary-500 to-secondary-600';
    }
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-success-500';
    if (percentage >= 60) return 'bg-warning-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-error-500';
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "relative p-4 rounded-2xl shadow-soft border-2 transition-all duration-200 min-w-[280px]",
        selected
          ? "border-primary-500 shadow-glow bg-gradient-to-br from-primary-50 to-primary-100"
          : "border-secondary-200 bg-white hover:border-secondary-300"
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        id="target"
        className={cn(
          "!w-3 !h-3 !bg-secondary-500 !border-2 !border-white transition-opacity duration-200",
          selected ? "!opacity-100" : "!opacity-0"
        )}
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        id="source"
        className={cn(
          "!w-3 !h-3 !bg-secondary-500 !border-2 !border-white transition-opacity duration-200",
          selected ? "!opacity-100" : "!opacity-0"
        )}
      />
      
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={cn(
              "w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-soft text-white",
              getActionColor(data.actionType || 'default')
            )}
          >
            {getActionIcon(data.actionType || 'default')}
          </motion.div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-secondary-600" />
            <h3 className="font-semibold text-secondary-900 text-sm">
              {data.label || "Customer Action"}
            </h3>
          </div>
          
          <p className="text-xs text-secondary-600 leading-relaxed mb-3">
            {data.description || "Customer performs this action"}
          </p>
          
          {/* Action metrics */}
          {data.metrics && (
            <div className="space-y-2">
              {/* Conversion rate */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-secondary-700">Conversion Rate</span>
                <span className="text-xs font-bold text-success-600">
                  {data.metrics.conversionRate || "15.2%"}
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-secondary-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${data.metrics.conversionRate || 15.2}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    getProgressColor(data.metrics.conversionRate || 15.2)
                  )}
                />
              </div>
              
              {/* Additional metrics */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1 px-2 py-1 bg-primary-50 rounded-lg">
                  <TrendingUp className="w-3 h-3 text-primary-600" />
                  <span className="text-xs font-medium text-primary-700">
                    {data.metrics.volume || "1.2K"} Actions
                  </span>
                </div>
                
                <div className="flex items-center gap-1 px-2 py-1 bg-success-50 rounded-lg">
                  <Star className="w-3 h-3 text-success-600" />
                  <span className="text-xs font-medium text-success-700">
                    {data.metrics.value || "$2.4K"} Value
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {/* Action type badge */}
          <div className="mt-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-700">
              {data.actionType || 'interaction'} action
            </span>
          </div>
          
          {/* Trigger conditions */}
          {data.triggers && (
            <div className="mt-2">
              <div className="text-xs font-medium text-secondary-700 mb-1">
                Triggers:
              </div>
              <div className="flex flex-wrap gap-1">
                {data.triggers.map((trigger, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-accent-50 text-accent-700"
                  >
                    {trigger}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Success indicator */}
      {data.metrics?.conversionRate > 10 && (
        <div className="absolute top-2 right-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-success-500 rounded-full"
          />
        </div>
      )}
    </motion.div>
  );
});

ActionNode.displayName = "ActionNode";

export default ActionNode; 