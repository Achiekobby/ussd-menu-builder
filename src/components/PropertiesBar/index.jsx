import { memo } from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  Type, 
  MessageSquare, 
  Target, 
  Zap, 
  Brain,
  BarChart3,
  Palette,
  Link,
  Trash2,
  Copy,
  Eye
} from "lucide-react";
import { cn } from "../../utils/cn";
import useStore from "../../store";
import { useShallow } from "zustand/react/shallow";

const PropertiesBar = memo(() => {
  const { selectedNode, setSelectedNode } = useStore(
    useShallow((state) => ({
  selectedNode: state.selectedNode,
      setSelectedNode: state.setSelectedNode,
    }))
  );

  if (!selectedNode) {
    return (
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-80 bg-white/90 backdrop-blur-md rounded-2xl shadow-strong border border-white/20 p-6"
      >
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-secondary-900 mb-2">Node Properties</h3>
          <p className="text-sm text-secondary-600">
            Select a node to view and edit its properties
          </p>
        </div>
      </motion.div>
    );
  }

  const getNodeIcon = (type) => {
    switch (type) {
      case 'startJourney':
        return <Target className="w-5 h-5" />;
      case 'touchpointNode':
        return <MessageSquare className="w-5 h-5" />;
      case 'decisionNode':
        return <Target className="w-5 h-5" />;
      case 'actionNode':
        return <Zap className="w-5 h-5" />;
      case 'aiNode':
        return <Brain className="w-5 h-5" />;
      case 'endJourney':
        return <Target className="w-5 h-5" />;
      default:
        return <Settings className="w-5 h-5" />;
    }
  };

  const getNodeColor = (type) => {
    switch (type) {
      case 'startJourney':
        return 'from-primary-500 to-primary-600';
      case 'touchpointNode':
        return 'from-secondary-500 to-secondary-600';
      case 'decisionNode':
        return 'from-blue-500 to-blue-600';
      case 'actionNode':
        return 'from-success-500 to-success-600';
      case 'aiNode':
        return 'from-accent-500 to-accent-600';
      case 'endJourney':
        return 'from-success-500 to-success-600';
        default:
        return 'from-secondary-500 to-secondary-600';
    }
  };

  const getNodeTypeLabel = (type) => {
    switch (type) {
      case 'startJourney':
        return 'Start Journey';
      case 'touchpointNode':
        return 'Touchpoint';
      case 'decisionNode':
        return 'Decision';
      case 'actionNode':
        return 'Action';
      case 'aiNode':
        return 'AI Decision';
      case 'endJourney':
        return 'End Journey';
      default:
        return 'Node';
    }
  };

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-80 bg-white/90 backdrop-blur-md rounded-2xl shadow-strong border border-white/20 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-secondary-200 bg-gradient-to-r from-primary-50 to-accent-50">
        <div className="flex items-center gap-3 mb-3">
          <div className={cn(
            "w-10 h-10 bg-gradient-to-br rounded-lg flex items-center justify-center shadow-soft text-white",
            getNodeColor(selectedNode.type || 'default')
          )}>
            {getNodeIcon(selectedNode.type || 'default')}
          </div>
          <div>
            <h3 className="font-semibold text-secondary-900">{getNodeTypeLabel(selectedNode.type || 'default')}</h3>
            <p className="text-xs text-secondary-600">Node Properties</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-secondary-500">ID:</span>
          <code className="text-xs bg-secondary-100 px-2 py-1 rounded font-mono text-secondary-700">
            {selectedNode.id || 'N/A'}
          </code>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6 max-h-96 overflow-y-auto scrollbar-hide">
        {/* Basic Properties */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-secondary-900 flex items-center gap-2">
            <Type className="w-4 h-4" />
            Basic Properties
          </h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-secondary-700 mb-1">
                Label
              </label>
              <input
                type="text"
                value={selectedNode.data?.label || ""}
                onChange={(e) => {
                  setSelectedNode({
                    ...selectedNode,
                    data: { ...selectedNode.data, label: e.target.value }
                  });
                }}
                className="w-full px-3 py-2 text-sm border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter node label"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-secondary-700 mb-1">
                Description
              </label>
              <textarea
                value={selectedNode.data?.description || ""}
                onChange={(e) => {
                  setSelectedNode({
                    ...selectedNode,
                    data: { ...selectedNode.data, description: e.target.value }
                  });
                }}
                rows={3}
                className="w-full px-3 py-2 text-sm border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                placeholder="Enter node description"
              />
            </div>
          </div>
        </div>

        {/* Node-Specific Properties */}
        {selectedNode.type && selectedNode.type === 'touchpointNode' && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-secondary-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Touchpoint Settings
            </h4>
            
            <div>
              <label className="block text-xs font-medium text-secondary-700 mb-1">
                Touchpoint Type
              </label>
              <select
                value={selectedNode.data?.touchpointType || "default"}
                onChange={(e) => {
                  setSelectedNode({
                    ...selectedNode,
                    data: { ...selectedNode.data, touchpointType: e.target.value }
                  });
                }}
                className="w-full px-3 py-2 text-sm border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="default">General</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="web">Web</option>
                <option value="app">Mobile App</option>
                <option value="social">Social Media</option>
                <option value="phone">Phone</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-secondary-700 mb-1">
                Priority
              </label>
              <select
                value={selectedNode.data?.priority || "medium"}
                onChange={(e) => {
                  setSelectedNode({
                    ...selectedNode,
                    data: { ...selectedNode.data, priority: e.target.value }
                  });
                }}
                className="w-full px-3 py-2 text-sm border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        )}

        {selectedNode.type && selectedNode.type === 'decisionNode' && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-secondary-900 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Decision Settings
            </h4>
            
            <div>
              <label className="block text-xs font-medium text-secondary-700 mb-1">
                Decision Type
              </label>
              <select
                value={selectedNode.data?.decisionType || "yes_no"}
                onChange={(e) => {
                  setSelectedNode({
                    ...selectedNode,
                    data: { ...selectedNode.data, decisionType: e.target.value }
                  });
                }}
                className="w-full px-3 py-2 text-sm border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="yes_no">Yes/No</option>
                <option value="multiple_choice">Multiple Choice</option>
                <option value="conditional">Conditional</option>
                <option value="ai_decision">AI Decision</option>
              </select>
            </div>
          </div>
        )}

        {selectedNode.type && selectedNode.type === 'actionNode' && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-secondary-900 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Action Settings
            </h4>
            
            <div>
              <label className="block text-xs font-medium text-secondary-700 mb-1">
                Action Type
              </label>
              <select
                value={selectedNode.data?.actionType || "default"}
                onChange={(e) => {
                  setSelectedNode({
                    ...selectedNode,
                    data: { ...selectedNode.data, actionType: e.target.value }
                  });
                }}
                className="w-full px-3 py-2 text-sm border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="default">General</option>
                <option value="purchase">Purchase</option>
                <option value="signup">Sign Up</option>
                <option value="contact">Contact</option>
                <option value="review">Review</option>
                <option value="download">Download</option>
              </select>
            </div>
          </div>
        )}

        {selectedNode.type && selectedNode.type === 'aiNode' && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-secondary-900 flex items-center gap-2">
              <Brain className="w-4 h-4" />
              AI Settings
            </h4>
            
            <div>
              <label className="block text-xs font-medium text-secondary-700 mb-1">
                AI Type
              </label>
              <select
                value={selectedNode.data?.aiType || "default"}
                onChange={(e) => {
                  setSelectedNode({
                    ...selectedNode,
                    data: { ...selectedNode.data, aiType: e.target.value }
                  });
                }}
                className="w-full px-3 py-2 text-sm border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="default">General AI</option>
                <option value="prediction">Prediction</option>
                <option value="optimization">Optimization</option>
                <option value="personalization">Personalization</option>
                <option value="automation">Automation</option>
                <option value="analysis">Analysis</option>
              </select>
            </div>
          </div>
        )}

        {/* Metrics Section */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-secondary-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Metrics & Analytics
          </h4>
          
          <div className="p-3 bg-secondary-50 rounded-lg">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-secondary-600">Position X:</span>
                <span className="font-medium">
                  {selectedNode.position ? Math.round(selectedNode.position.x) : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600">Position Y:</span>
                <span className="font-medium">
                  {selectedNode.position ? Math.round(selectedNode.position.y) : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-secondary-900">Actions</h4>
          
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-secondary-700 bg-secondary-100 rounded-lg hover:bg-secondary-200 transition-colors">
              <Copy className="w-3 h-3" />
              Duplicate
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-error-700 bg-error-100 rounded-lg hover:bg-error-200 transition-colors">
              <Trash2 className="w-3 h-3" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

PropertiesBar.displayName = "PropertiesBar";

export default PropertiesBar;
