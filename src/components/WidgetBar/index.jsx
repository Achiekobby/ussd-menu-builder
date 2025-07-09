import { memo, useState } from "react";
import { motion } from "framer-motion";
import { 
  Play, 
  MessageSquare, 
  GitBranch, 
  Zap, 
  Brain, 
  CheckCircle,
  Target,
  Users,
  ShoppingCart,
  Sparkles,
  Filter,
  Plus
} from "lucide-react";
import { cn } from "../../utils/cn";

const WidgetBar = memo(() => {
  const nodeTypes = [
    {
      type: "startJourney",
      label: "Start Journey",
      icon: Play,
      description: "Begin customer journey",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      category: "journey"
    },
    {
      type: "touchpointNode",
      label: "Touchpoint",
      icon: MessageSquare,
      description: "Customer interaction point",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      category: "interaction"
    },
    {
      type: "decisionNode",
      label: "Decision",
      icon: GitBranch,
      description: "Branching logic point",
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      category: "logic"
    },
    {
      type: "actionNode",
      label: "Action",
      icon: Zap,
      description: "Customer action/ conversion",
      color: "from-orange-500 to-amber-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      category: "conversion"
    },
    {
      type: "aiNode",
      label: "AI Decision",
      icon: Brain,
      description: "AI-powered optimization",
      color: "from-pink-500 to-rose-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      category: "ai"
    },
    {
      type: "endJourney",
      label: "End Journey",
      icon: CheckCircle,
      description: "Journey completion",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      category: "journey"
    }
  ];

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const categories = [
    { id: "all", label: "All", icon: Target, color: "text-gray-600" },
    { id: "journey", label: "Journey", icon: Play, color: "text-emerald-600" },
    { id: "interaction", label: "Interaction", icon: Users, color: "text-blue-600" },
    { id: "logic", label: "Logic", icon: GitBranch, color: "text-purple-600" },
    { id: "conversion", label: "Conversion", icon: ShoppingCart, color: "text-orange-600" },
    { id: "ai", label: "AI", icon: Brain, color: "text-pink-600" }
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredNodes = selectedCategory === "all" 
    ? nodeTypes 
    : nodeTypes.filter(node => node.category === selectedCategory);

  return (
    <motion.div
      initial={{ x: -320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed left-4 top-20 w-80 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 z-10 max-h-[calc(100vh-6rem)] overflow-hidden flex flex-col"
    >
      {/* Enhanced Header */}
      <div className="relative p-6 bg-gradient-to-br from-slate-50 via-white to-blue-50 rounded-t-3xl border-b border-slate-200/50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-t-3xl" />
        <div className="relative flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Journey Nodes</h3>
            <p className="text-sm text-slate-600">Build your customer journey</p>
          </div>
        </div>
        <div className="relative flex items-center gap-2 text-xs text-slate-500">
          <Sparkles className="w-3 h-3 text-purple-500" />
          <span>AI-powered journey builder</span>
        </div>
      </div>

      {/* Enhanced Category Filter */}
      <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50/30 border-b border-slate-200/50">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-slate-600" />
          <span className="text-sm font-medium text-slate-700">Filter by type</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border",
                selectedCategory === category.id
                  ? "bg-white shadow-md border-slate-300 text-slate-800"
                  : "text-slate-600 hover:bg-white/80 border-slate-200 hover:border-slate-300"
              )}
            >
              <category.icon className="w-3 h-3" />
              {category.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Enhanced Nodes List */}
      <div className="p-4 flex-1 overflow-y-auto scrollbar-hide bg-gradient-to-b from-white to-slate-50/30">
        <div className="grid gap-3">
          {filteredNodes.map((node, index) => (
            <motion.div
              key={node.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group cursor-grab active:cursor-grabbing"
              draggable
              onDragStart={(event) => onDragStart(event, node.type)}
            >
              <div className={cn(
                "p-4 rounded-2xl shadow-sm border transition-all duration-300 group-hover:shadow-lg group-hover:border-slate-300",
                node.bgColor,
                node.borderColor
              )}>
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={cn(
                      "w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-lg text-white",
                      node.color
                    )}
                  >
                    <node.icon className="w-6 h-6" />
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">
                      {node.label}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {node.description}
                    </p>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                      <Plus className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Footer */}
      <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50/30 border-t border-slate-200/50 rounded-b-3xl">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse" />
            <span className="text-slate-700 font-medium">{filteredNodes.length} nodes</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg">
            <Sparkles className="w-3 h-3 text-purple-600" />
            <span className="text-xs font-medium text-purple-700">AI Ready</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

WidgetBar.displayName = "WidgetBar";

export default WidgetBar;
