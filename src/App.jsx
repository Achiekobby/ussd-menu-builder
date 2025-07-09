import { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  MiniMap,
  Panel,
  ReactFlowProvider,
} from "reactflow";
import { motion, AnimatePresence } from "framer-motion";

// Node Components
import StartJourney from "./nodes_library/StartJourney";
import TouchpointNode from "./nodes_library/TouchpointNode";
import DecisionNode from "./nodes_library/DecisionNode";
import ActionNode from "./nodes_library/ActionNode";
import EndJourney from "./nodes_library/EndJourney";
import AINode from "./nodes_library/AINode";

// UI Components
import Sidebar from "./components/WidgetBar";
import PropertiesBar from "./components/PropertiesBar";
import AIAssistant from "./components/AIAssistant";
import AnalyticsPanel from "./components/AnalyticsPanel";
import CollaborationPanel from "./components/CollaborationPanel";
import LandingPage from "./components/LandingPage";
import ConfirmationModal from "./components/ConfirmationModal";
import ContextMenu from "./components/ContextMenu";
import DocsPage from "./components/DocsPage";
import AdvancedAnalytics from "./components/AdvancedAnalytics";

// Utilities
import { onDropNode, onDragOver } from "./utilities/drag_utilities";
import useStore from "./store";
import { useShallow } from "zustand/react/shallow";
import { Toaster } from "react-hot-toast";
import { exportFlow } from "./utilities/save_export_utilities";
import { showSuccessAlert, showAlert } from "./utilities/alert_utilities";
import { saveCurrentState, undo, redo, canUndo, canRedo } from "./utilities/history_utilities";

// Icons
import {
  Eye,
  Share2,
  Download,
  Undo2,
  Redo2,
  Sparkles,
  BarChart3,
  Users,
  Settings,
  Zap,
  Brain,
  Target,
  MessageSquare,
  ShoppingCart,
  UserCheck,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Layers,
  Globe,
  Trash2,
  X
} from "lucide-react";

import "reactflow/dist/style.css";

const defaultEdgeOptions = {
  animated: true,
  type: "smoothstep",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    color: '#6366f1',
  },
  style: {
    strokeWidth: 3,
    stroke: '#6366f1',
  },
  className: 'react-flow__edge-path',
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onSelectionChange: state.onSelectionChange,
  setNodes: state.setNodes,
});

function App() {
  const nodeTypes = useMemo(
    () => ({
      startJourney: StartJourney,
      touchpointNode: TouchpointNode,
      decisionNode: DecisionNode,
      actionNode: ActionNode,
      aiNode: AINode,
      endJourney: EndJourney,
    }),
    []
  );

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [activePanel, setActivePanel] = useState("ai");
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isCollaborating, setIsCollaborating] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({
    totalTouchpoints: 0,
    conversionRate: 0,
    avgJourneyTime: 0,
    aiOptimizations: 0,
  });
  const [showTopMenu, setShowTopMenu] = useState(false);
  const [contextMenu, setContextMenu] = useState({
    isOpen: false,
    position: { x: 0, y: 0 },
    node: null
  });
  const [showDocs, setShowDocs] = useState(false);
  const [showAdvancedAnalytics, setShowAdvancedAnalytics] = useState(false);

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setNodes,
    onSelectionChange,
  } = useStore(useShallow(selector));

  const onDrop = useCallback(
    (event) => {
      const newNode = onDropNode(event, reactFlowInstance, setNodes, nodes);
      if (newNode) {
        showSuccessAlert(`${newNode.data.label} added to canvas!`);
      }
    },
    [nodes, reactFlowInstance, setNodes]
  );

  const generateShareableLink = () => {
    const encodedState = encodeURIComponent(JSON.stringify({ nodes, edges }));
    const generatedUrl = `${window.location.origin}/preview?state=${encodedState}`;
    return generatedUrl;
  };

  const handleKeyboardAction = (action) => {
    switch (action) {
      case 'undo':
        const undoState = undo();
        if (undoState) {
          setNodes(undoState.nodes);
          onEdgesChange(undoState.edges.map(edge => ({ type: 'add', item: edge })));
          showSuccessAlert("Undone!");
        }
        break;
      case 'redo':
        const redoState = redo();
        if (redoState) {
          setNodes(redoState.nodes);
          onEdgesChange(redoState.edges.map(edge => ({ type: 'add', item: edge })));
          showSuccessAlert("Redone!");
        }
        break;
      case 'ai-optimize':
        setShowAIAssistant(true);
        break;
      default:
        break;
    }
  };

  // Save state to history when nodes or edges change
  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      saveCurrentState(nodes, edges);
    }
  }, [nodes, edges]);

  // Update analytics data
  useEffect(() => {
    const touchpoints = nodes.filter(node => node.type === 'touchpointNode').length;
    const decisions = nodes.filter(node => node.type === 'decisionNode').length;
    const aiNodes = nodes.filter(node => node.type === 'aiNode').length;
    
    setAnalyticsData({
      totalTouchpoints: touchpoints,
      conversionRate: touchpoints > 0 ? Math.round((decisions / touchpoints) * 100) : 0,
      avgJourneyTime: Math.round((touchpoints + decisions) * 2.5),
      aiOptimizations: aiNodes,
    });
  }, [nodes]);

  const panelItems = [
    { id: "ai", icon: Brain, label: "AI Assistant", color: "text-accent-600" },
    { id: "analytics", icon: BarChart3, label: "Analytics", color: "text-primary-600" },
    { id: "advanced-analytics", icon: TrendingUp, label: "Advanced Analytics", color: "text-success-600" },
    { id: "collaboration", icon: Users, label: "Collaboration", color: "text-warning-600" },
    { id: "docs", icon: Layers, label: "Documentation", color: "text-purple-600" },
  ];

  const handleGetStarted = () => {
    setShowLandingPage(false);
  };

  const handlePanelClick = (panelId) => {
    if (panelId === 'docs') {
      setShowDocs(true);
    } else if (panelId === 'advanced-analytics') {
      setShowAdvancedAnalytics(true);
    } else {
      setActivePanel(panelId);
    }
  };

  const handleClearCanvas = () => {
    if (nodes.length > 0 || edges.length > 0) {
      setShowClearConfirmation(true);
    } else {
      showAlert("Canvas is already empty!");
    }
  };

  const confirmClearCanvas = () => {
    setNodes([]);
    onEdgesChange([]);
    showSuccessAlert("Canvas cleared successfully!");
  };

  // Context menu handlers
  const handleNodeContextMenu = useCallback((event, node) => {
    event.preventDefault();
    setContextMenu({
      isOpen: true,
      position: { x: event.clientX, y: event.clientY },
      node
    });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu({ isOpen: false, position: { x: 0, y: 0 }, node: null });
  }, []);

  const handleContextMenuAction = useCallback((action, node) => {
    switch (action) {
      case 'edit':
        // TODO: Open node editor
        showAlert("Node editor coming soon!");
        break;
      case 'duplicate':
        // TODO: Implement node duplication
        showAlert("Node duplication coming soon!");
        break;
      case 'delete':
        if (node) {
          const updatedNodes = nodes.filter(n => n.id !== node.id);
          setNodes(updatedNodes);
          showSuccessAlert("Node deleted successfully!");
        }
        break;
      default:
        break;
    }
  }, [nodes, setNodes]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Close context menu on Escape
      if (event.key === 'Escape') {
        closeContextMenu();
        setShowTopMenu(false);
        return;
      }

      // Only handle shortcuts when not typing in input fields
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      // Ctrl/Cmd + Z: Undo
      if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        handleKeyboardAction('undo');
      }

      // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y: Redo
      if ((event.ctrlKey || event.metaKey) && ((event.shiftKey && event.key === 'z') || event.key === 'y')) {
        event.preventDefault();
        handleKeyboardAction('redo');
      }

      // Delete/Backspace: Delete selected node
      if ((event.key === 'Delete' || event.key === 'Backspace') && contextMenu.node) {
        event.preventDefault();
        handleContextMenuAction('delete', contextMenu.node);
        closeContextMenu();
      }

      // Ctrl/Cmd + D: Duplicate selected node
      if ((event.ctrlKey || event.metaKey) && event.key === 'd') {
        event.preventDefault();
        if (contextMenu.node) {
          handleContextMenuAction('duplicate', contextMenu.node);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [contextMenu.node, closeContextMenu, handleKeyboardAction, handleContextMenuAction]);

  if (showLandingPage) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (showDocs) {
    return <DocsPage onBack={() => setShowDocs(false)} />;
  }

  if (showAdvancedAnalytics) {
    return <AdvancedAnalytics 
      nodes={nodes} 
      edges={edges} 
      isOpen={showAdvancedAnalytics} 
      onClose={() => setShowAdvancedAnalytics(false)} 
    />;
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #334155',
          },
        }}
      />
      
      <ReactFlowProvider>
        <ReactFlow
          onDragOver={onDragOver}
          nodes={nodes}
          edges={edges}
          onDrop={onDrop}
          onInit={setReactFlowInstance}
          selectNodesOnDrag
          onSelectionChange={onSelectionChange}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          fitView
          className="bg-transparent"
          onNodeContextMenu={handleNodeContextMenu}
          onPaneContextMenu={(event) => {
            event.preventDefault();
            closeContextMenu();
          }}
          connectionMode="loose"
          snapToGrid={true}
          snapGrid={[15, 15]}
          connectionRadius={50}
          deleteKeyCode="Delete"
          multiSelectionKeyCode="Shift"
          panOnDrag={true}
          zoomOnScroll={true}
          zoomOnPinch={true}
          zoomOnDoubleClick={false}
          preventScrolling={true}
          attributionPosition="bottom-left"
        >
          <Controls className="!bg-white/80 !backdrop-blur-sm !border !border-white/20 !rounded-xl !shadow-soft" />
          <MiniMap className="!bg-white/80 !backdrop-blur-sm !border !border-white/20 !rounded-xl !shadow-soft" />
          
          {/* Top Panel - Removed original buttons, now only shows slide-in menu trigger */}

          {/* Top Left Panel - Horizontal buttons on top of Journey Nodes */}
          <Panel position="top-left" className="!bg-transparent" style={{ marginLeft: '16px', marginTop: '16px' }}>
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center gap-2 p-2"
            >
              {panelItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePanelClick(item.id)}
                  className={`p-2 rounded-lg shadow-soft border border-white/20 backdrop-blur-sm transition-all duration-200 ${
                    activePanel === item.id 
                      ? 'bg-white/90 shadow-medium' 
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                  title={item.label}
                >
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                </motion.button>
              ))}
              
              {/* Settings button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowTopMenu((v) => !v)}
                className="p-2 rounded-lg shadow-soft border border-white/20 backdrop-blur-sm transition-all duration-200 bg-white/60 hover:bg-white/80"
                title="Show actions"
              >
                <Settings className="w-4 h-4 text-secondary-600" />
              </motion.button>
            </motion.div>
          </Panel>

          {/* Right Panel */}
          <Panel position="top-right" className="!bg-transparent">
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="p-4"
            >
            <PropertiesBar />
            </motion.div>
          </Panel>

          {/* Bottom Panel - Analytics */}
          <Panel position="bottom-center" className="!bg-transparent">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center justify-center gap-4 p-2 flex-wrap"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-white/20 whitespace-nowrap">
                <Target className="w-4 h-4 text-primary-600 flex-shrink-0" />
                <span className="text-sm font-medium text-secondary-700">
                  {analyticsData.totalTouchpoints} Touchpoints
                </span>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-white/20 whitespace-nowrap">
                <TrendingUp className="w-4 h-4 text-success-600 flex-shrink-0" />
                <span className="text-sm font-medium text-secondary-700">
                  {analyticsData.conversionRate}% Conversion
                </span>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-white/20 whitespace-nowrap">
                <Clock className="w-4 h-4 text-warning-600 flex-shrink-0" />
                <span className="text-sm font-medium text-secondary-700">
                  {analyticsData.avgJourneyTime}s Avg Time
                </span>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-white/20 whitespace-nowrap">
                <Brain className="w-4 h-4 text-accent-600 flex-shrink-0" />
                <span className="text-sm font-medium text-secondary-700">
                  {analyticsData.aiOptimizations} AI Optimizations
                </span>
              </div>
            </motion.div>
          </Panel>

          <Background
            variant={BackgroundVariant.Dots}
            gap={30}
            size={1}
            color="#cbd5e1"
            className="opacity-30"
          />
          
          {/* Welcome Message when no nodes */}
          {nodes.length === 0 && (
            <Panel position="center" className="!bg-transparent" style={{ marginTop: '150px' }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft border border-white/20 max-w-md"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  Welcome to Journey Builder
                </h3>
                <p className="text-secondary-600 mb-4">
                  Start building your customer journey by dragging nodes from the left sidebar onto the canvas.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-secondary-500">
                  <MessageSquare className="w-4 h-4" />
                  <span>Drag nodes from the left panel</span>
                </div>
              </motion.div>
            </Panel>
          )}
        </ReactFlow>
      </ReactFlowProvider>

      {/* AI Assistant Modal */}
      <AnimatePresence>
        {showAIAssistant && (
          <AIAssistant 
            isOpen={showAIAssistant}
            onClose={() => setShowAIAssistant(false)}
        nodes={nodes}
        edges={edges}
          />
        )}
      </AnimatePresence>

      {/* Clear Canvas Confirmation Modal */}
      <ConfirmationModal
        isOpen={showClearConfirmation}
        onClose={() => setShowClearConfirmation(false)}
        onConfirm={confirmClearCanvas}
        title="Clear Canvas"
        message="Are you sure you want to clear the entire canvas? This action will remove all nodes and connections, and cannot be undone."
        confirmText="Clear Canvas"
        cancelText="Cancel"
        type="danger"
      />

      {/* Sidebar */}
      <Sidebar />

      {/* Enhanced Slide-in Actions Panel */}
      <AnimatePresence>
        {showTopMenu && (
          <>
            {/* Enhanced Backdrop */}
            <motion.div
              key="menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowTopMenu(false)}
            />
            {/* Enhanced Panel */}
            <motion.div
              key="menu-panel"
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="fixed top-0 right-0 z-50 w-full max-w-sm h-full bg-white/98 backdrop-blur-xl shadow-2xl border-l border-slate-200/50 flex flex-col"
            >
              {/* Enhanced Header */}
              <div className="relative p-6 bg-gradient-to-br from-slate-50 via-white to-blue-50 border-b border-slate-200/50">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">Quick Actions</h3>
                      <p className="text-sm text-slate-600">Manage your journey</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close menu"
                    onClick={() => setShowTopMenu(false)}
                    className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-md border border-slate-200 hover:bg-white transition-all duration-200"
                  >
                    <X className="w-4 h-4 text-slate-600" />
                  </motion.button>
                </div>
              </div>
              
              {/* Enhanced Action Buttons */}
              <div className="p-6 flex-1 overflow-y-auto bg-gradient-to-b from-white to-slate-50/30">
                <div className="grid gap-4">
                  {/* Primary Actions */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Primary</h4>
                    
                    <motion.button 
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3 group" 
                      onClick={() => { setShowAIAssistant(true); setShowTopMenu(false); }}
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">AI Optimize</div>
                        <div className="text-xs text-emerald-100">Enhance with AI</div>
                      </div>
                    </motion.button>

                    <motion.button 
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3 group" 
                      onClick={() => { setShowLandingPage(true); setShowTopMenu(false); }}
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">Landing Page</div>
                        <div className="text-xs text-blue-100">View landing page</div>
                      </div>
                    </motion.button>
                  </div>

                  {/* Share & Export */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Share & Export</h4>
                    
                    <motion.button 
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-4 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-200 flex items-center gap-3 group" 
                      onClick={() => { 
                        const link = generateShareableLink(); 
                        navigator.clipboard.writeText(link); 
                        showSuccessAlert('Shareable link copied to clipboard!'); 
                        setShowTopMenu(false); 
                      }}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                        <Share2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-slate-900">Share</div>
                        <div className="text-xs text-slate-600">Copy shareable link</div>
                      </div>
                    </motion.button>

                    <motion.button 
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-4 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-200 flex items-center gap-3 group" 
                      onClick={() => { exportFlow(nodes, edges); setShowTopMenu(false); }}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-slate-900">Export</div>
                        <div className="text-xs text-slate-600">Download journey</div>
                      </div>
                    </motion.button>
                  </div>

                  {/* History */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">History</h4>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <motion.button 
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed" 
                        disabled={!canUndo()}
                        onClick={() => { handleKeyboardAction('undo'); setShowTopMenu(false); }}
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center">
                          <Undo2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-medium text-slate-700">Undo</span>
                      </motion.button>

                      <motion.button 
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed" 
                        disabled={!canRedo()}
                        onClick={() => { handleKeyboardAction('redo'); setShowTopMenu(false); }}
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center">
                          <Redo2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-medium text-slate-700">Redo</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Danger Zone</h4>
                    
                    <motion.button 
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-4 bg-white rounded-2xl shadow-sm border border-red-200 hover:shadow-md hover:border-red-300 transition-all duration-200 flex items-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed" 
                      disabled={nodes.length === 0 && edges.length === 0}
                      onClick={() => { handleClearCanvas(); setShowTopMenu(false); }}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
                        <Trash2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-slate-900">Clear Canvas</div>
                        <div className="text-xs text-slate-600">Remove all nodes</div>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Enhanced Footer */}
              <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50/30 border-t border-slate-200/50">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse" />
                    <span className="text-slate-700 font-medium">Ready to build</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg">
                    <Sparkles className="w-3 h-3 text-purple-600" />
                    <span className="text-xs font-medium text-purple-700">AI Powered</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Context Menu */}
      <ContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        node={contextMenu.node}
        onClose={closeContextMenu}
        onEdit={(node) => handleContextMenuAction('edit', node)}
        onDuplicate={(node) => handleContextMenuAction('duplicate', node)}
        onDelete={(node) => handleContextMenuAction('delete', node)}
      />
    </div>
  );
}

export default App;
