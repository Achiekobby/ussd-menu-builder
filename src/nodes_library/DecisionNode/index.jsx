import { memo } from "react";
import { Handle, Position } from "reactflow";
import { motion } from "framer-motion";
import { GitBranch, CheckCircle, XCircle, AlertCircle, Brain } from "lucide-react";
import { cn } from "../../utils/cn";

const DecisionNode = memo(({ data, selected }) => {
  const getDecisionIcon = (type) => {
    switch (type) {
      case 'yes_no':
        return <GitBranch className="w-5 h-5" />;
      case 'multiple_choice':
        return <CheckCircle className="w-5 h-5" />;
      case 'conditional':
        return <AlertCircle className="w-5 h-5" />;
      case 'ai_decision':
        return <Brain className="w-5 h-5" />;
      default:
        return <GitBranch className="w-5 h-5" />;
    }
  };

  const getDecisionColor = (type) => {
    switch (type) {
      case 'yes_no':
        return 'from-blue-500 to-blue-600';
      case 'multiple_choice':
        return 'from-purple-500 to-purple-600';
      case 'conditional':
        return 'from-orange-500 to-orange-600';
      case 'ai_decision':
        return 'from-accent-500 to-accent-600';
      default:
        return 'from-secondary-500 to-secondary-600';
    }
  };

  const getOutcomeColor = (outcome) => {
    switch (outcome) {
      case 'positive':
        return 'bg-success-50 text-success-700 border-success-200';
      case 'negative':
        return 'bg-error-50 text-error-700 border-error-200';
      case 'neutral':
        return 'bg-warning-50 text-warning-700 border-warning-200';
      default:
        return 'bg-secondary-50 text-secondary-700 border-secondary-200';
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "relative p-4 rounded-2xl shadow-soft border-2 transition-all duration-200 min-w-[300px]",
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
        id="yes"
        className={cn(
          "!w-3 !h-3 !bg-success-500 !border-2 !border-white transition-opacity duration-200",
          selected ? "!opacity-100" : "!opacity-0"
        )}
        style={{ left: '25%' }}
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        id="no"
        className={cn(
          "!w-3 !h-3 !bg-error-500 !border-2 !border-white transition-opacity duration-200",
          selected ? "!opacity-100" : "!opacity-0"
        )}
        style={{ left: '75%' }}
      />
      
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={cn(
              "w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-soft text-white",
              getDecisionColor(data.decisionType || 'default')
            )}
          >
            {getDecisionIcon(data.decisionType || 'default')}
          </motion.div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <GitBranch className="w-4 h-4 text-secondary-600" />
            <h3 className="font-semibold text-secondary-900 text-sm">
              {data.label || "Decision Point"}
            </h3>
          </div>
          
          <p className="text-xs text-secondary-600 leading-relaxed mb-3">
            {data.description || "Make a decision based on customer behavior"}
          </p>
          
          {/* Decision criteria */}
          {data.criteria && (
            <div className="mb-3">
              <div className="text-xs font-medium text-secondary-700 mb-1">
                Decision Criteria:
              </div>
              <div className="flex flex-wrap gap-1">
                {data.criteria.map((criterion, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-secondary-100 text-secondary-700"
                  >
                    {criterion}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Outcomes */}
          <div className="grid grid-cols-2 gap-2">
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-medium",
              getOutcomeColor(data.outcomes?.yes || 'positive')
            )}>
              <CheckCircle className="w-3 h-3" />
              <span>Yes ({data.outcomes?.yes || 'positive'})</span>
            </div>
            
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-medium",
              getOutcomeColor(data.outcomes?.no || 'negative')
            )}>
              <XCircle className="w-3 h-3" />
              <span>No ({data.outcomes?.no || 'negative'})</span>
            </div>
          </div>
          
          {/* Decision type badge */}
          <div className="mt-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-700">
              {data.decisionType || 'binary'} decision
            </span>
          </div>
        </div>
      </div>
      
      {/* AI indicator */}
      {data.decisionType === 'ai_decision' && (
        <div className="absolute top-2 right-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-accent-500 rounded-full"
          />
        </div>
      )}
    </motion.div>
  );
});

DecisionNode.displayName = "DecisionNode";

export default DecisionNode; 