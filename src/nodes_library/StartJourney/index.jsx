import { memo, useState } from "react";
import { Handle, Position } from "reactflow";
import { motion } from "framer-motion";
import { Play, Zap, Target, Plus } from "lucide-react";
import { cn } from "../../utils/cn";

const StartJourney = memo(({ data, selected, isConnectable }) => {
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
          ? "border-primary-500 shadow-glow bg-gradient-to-br from-primary-50 to-primary-100"
          : "border-primary-200 bg-white hover:border-primary-300"
      )}
    >
      {/* Source Handle - Bottom */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="source"
        className={cn(
          "!w-4 !h-4 !bg-primary-500 !border-2 !border-white transition-all duration-200 hover:!scale-125 hover:!bg-primary-600",
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
      
      {/* Visual connection indicator */}
      {(selected || isHovered) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white text-xs px-2 py-1 rounded-lg shadow-lg pointer-events-none"
        >
          Connect
        </motion.div>
      )}
      
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-soft"
          >
            <Play className="w-6 h-6 text-white ml-1" />
          </motion.div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-primary-600" />
            <h3 className="font-semibold text-secondary-900 text-sm">
              {data.label || "Start Journey"}
            </h3>
          </div>
          
          <p className="text-xs text-secondary-600 leading-relaxed">
            {data.description || "Begin your customer's experience here"}
          </p>
          
          {data.metrics && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-success-50 rounded-lg">
                <Zap className="w-3 h-3 text-success-600" />
                <span className="text-xs font-medium text-success-700">
                  {data.metrics.entryRate || "100%"} Entry
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Status indicator */}
      <div className="absolute top-2 right-2">
        <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
      </div>
    </motion.div>
  );
});

StartJourney.displayName = "StartJourney";

export default StartJourney; 