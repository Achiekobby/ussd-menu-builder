import { memo, useState } from "react";
import { Handle, Position } from "reactflow";
import { motion } from "framer-motion";
import { CheckCircle, Target, TrendingUp, Users } from "lucide-react";
import { cn } from "../../utils/cn";

const EndJourney = memo(({ data, selected, isConnectable }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative p-4 rounded-2xl shadow-soft border-2 transition-all duration-200 group",
        selected
          ? "border-success-500 shadow-glow bg-gradient-to-br from-success-50 to-success-100"
          : "border-success-200 bg-white hover:border-success-300"
      )}
    >
      {/* Target Handle - Top */}
      <Handle
        type="target"
        position={Position.Top}
        id="target"
        className={cn(
          "!w-4 !h-4 !bg-success-500 !border-2 !border-white transition-all duration-200 hover:!scale-125 hover:!bg-success-600",
          selected || isHovered ? "!opacity-100" : "!opacity-60"
        )}
        style={{
          top: '-8px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <CheckCircle className="w-2 h-2 text-white" />
        </div>
      </Handle>
      
      {/* Visual connection indicator */}
      {(selected || isHovered) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-success-500 text-white text-xs px-2 py-1 rounded-lg shadow-lg pointer-events-none"
        >
          Connect to
        </motion.div>
      )}
      
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-xl flex items-center justify-center shadow-soft"
          >
            <CheckCircle className="w-6 h-6 text-white" />
          </motion.div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-success-600" />
            <h3 className="font-semibold text-secondary-900 text-sm">
              {data.label || "End Journey"}
            </h3>
          </div>
          
          <p className="text-xs text-secondary-600 leading-relaxed">
            {data.description || "Journey completion point"}
          </p>
          
          {data.metrics && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-success-50 rounded-lg">
                <Users className="w-3 h-3 text-success-600" />
                <span className="text-xs font-medium text-success-700">
                  {data.metrics.completions || "892"} Completed
                </span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-accent-50 rounded-lg">
                <TrendingUp className="w-3 h-3 text-accent-600" />
                <span className="text-xs font-medium text-accent-700">
                  {data.metrics.satisfaction || "4.8/5"} Rating
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Completion indicator */}
      <div className="absolute top-2 right-2">
        <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
      </div>
    </motion.div>
  );
});

EndJourney.displayName = "EndJourney";

export default EndJourney; 