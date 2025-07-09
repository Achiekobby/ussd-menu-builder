import { memo, useState } from "react";
import { Handle, Position } from "reactflow";
import { motion } from "framer-motion";
import { MessageSquare, Users, TrendingUp, Clock, Plus, ArrowDown } from "lucide-react";
import { cn } from "../../utils/cn";

const TouchpointNode = memo(({ data, selected, isConnectable }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTouchpointIcon = (type) => {
    switch (type) {
      case 'email':
        return '📧';
      case 'sms':
        return '📱';
      case 'web':
        return '🌐';
      case 'app':
        return '📱';
      case 'social':
        return '📢';
      case 'phone':
        return '📞';
      default:
        return '💬';
    }
  };

  const getTouchpointColor = (type) => {
    switch (type) {
      case 'email':
        return 'from-blue-500 to-blue-600';
      case 'sms':
        return 'from-green-500 to-green-600';
      case 'web':
        return 'from-purple-500 to-purple-600';
      case 'app':
        return 'from-indigo-500 to-indigo-600';
      case 'social':
        return 'from-pink-500 to-pink-600';
      case 'phone':
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-secondary-500 to-secondary-600';
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative p-4 rounded-2xl shadow-soft border-2 transition-all duration-200 min-w-[280px] group",
        selected
          ? "border-primary-500 shadow-glow bg-gradient-to-br from-primary-50 to-primary-100"
          : "border-secondary-200 bg-white hover:border-secondary-300"
      )}
    >
      {/* Target Handle - Top */}
      <Handle
        type="target"
        position={Position.Top}
        id="target"
        className={cn(
          "!w-4 !h-4 !bg-secondary-500 !border-2 !border-white transition-all duration-200 hover:!scale-125 hover:!bg-secondary-600",
          selected || isHovered ? "!opacity-100" : "!opacity-60"
        )}
        style={{
          top: '-8px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <ArrowDown className="w-2 h-2 text-white" />
        </div>
      </Handle>
      
      {/* Source Handle - Bottom */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="source"
        className={cn(
          "!w-4 !h-4 !bg-secondary-500 !border-2 !border-white transition-all duration-200 hover:!scale-125 hover:!bg-secondary-600",
          selected || isHovered ? "!opacity-100" : "!opacity-60"
        )}
        style={{
          bottom: '-8px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Plus className="w-2 h-2 text-white" />
        </div>
      </Handle>
      
      {/* Visual connection indicators */}
      {(selected || isHovered) && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-secondary-500 text-white text-xs px-2 py-1 rounded-lg shadow-lg pointer-events-none"
          >
            Connect to
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-secondary-500 text-white text-xs px-2 py-1 rounded-lg shadow-lg pointer-events-none"
          >
            Connect from
          </motion.div>
        </>
      )}
      
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className={cn(
              "w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-soft text-white text-xl",
              getTouchpointColor(data.touchpointType || 'default')
            )}
          >
            {getTouchpointIcon(data.touchpointType || 'default')}
          </motion.div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-4 h-4 text-secondary-600" />
            <h3 className="font-semibold text-secondary-900 text-sm">
              {data.label || "Customer Touchpoint"}
            </h3>
          </div>
          
          <p className="text-xs text-secondary-600 leading-relaxed mb-3">
            {data.description || "Engage with your customer at this point"}
          </p>
          
          {/* Metrics */}
          <div className="grid grid-cols-2 gap-2">
            {data.metrics && (
              <>
                <div className="flex items-center gap-1 px-2 py-1 bg-primary-50 rounded-lg">
                  <Users className="w-3 h-3 text-primary-600" />
                  <span className="text-xs font-medium text-primary-700">
                    {data.metrics.reach || "1.2K"} Reach
                  </span>
                </div>
                
                <div className="flex items-center gap-1 px-2 py-1 bg-success-50 rounded-lg">
                  <TrendingUp className="w-3 h-3 text-success-600" />
                  <span className="text-xs font-medium text-success-700">
                    {data.metrics.engagement || "68%"} Engagement
                  </span>
                </div>
                
                <div className="flex items-center gap-1 px-2 py-1 bg-warning-50 rounded-lg">
                  <Clock className="w-3 h-3 text-warning-600" />
                  <span className="text-xs font-medium text-warning-700">
                    {data.metrics.responseTime || "2.3s"} Response
                  </span>
                </div>
                
                <div className="flex items-center gap-1 px-2 py-1 bg-accent-50 rounded-lg">
                  <TrendingUp className="w-3 h-3 text-accent-600" />
                  <span className="text-xs font-medium text-accent-700">
                    {data.metrics.conversion || "12%"} Conversion
                  </span>
                </div>
              </>
            )}
          </div>
          
          {/* Touchpoint type badge */}
          <div className="mt-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-700">
              {data.touchpointType || 'interaction'} touchpoint
            </span>
          </div>
        </div>
      </div>
      
      {/* Priority indicator */}
      {data.priority && (
        <div className="absolute top-2 right-2">
          <div className={cn(
            "w-2 h-2 rounded-full",
            data.priority === 'high' ? 'bg-error-500' :
            data.priority === 'medium' ? 'bg-warning-500' : 'bg-success-500'
          )} />
        </div>
      )}
    </motion.div>
  );
});

TouchpointNode.displayName = "TouchpointNode";

export default TouchpointNode; 