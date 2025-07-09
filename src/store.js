import { create } from "zustand";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "reactflow";
import { showAlert, showSuccessAlert } from "./utilities/alert_utilities";
import { createJSONStorage, persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      selectedNode: null,
      nodeCount: 0,
      
      // Node change handlers
      onNodesChange: (changes) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },
      
      onEdgesChange: (changes) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },
      
      // Enhanced connection logic
      onConnect: (connection) => {
        const sourceNode = get().nodes.find((node) => node.id === connection.source);
        const targetNode = get().nodes.find((node) => node.id === connection.target);
        
        if (!sourceNode || !targetNode) {
          showAlert("Connection failed: Node not found");
          return;
        }

        // Enhanced Journey Builder validation logic
        const validation = validateConnection(sourceNode, targetNode, get().edges);
        
        if (!validation.valid) {
          showAlert(validation.message);
          return;
        }

        // Create edge with enhanced data
        const newEdge = {
          ...connection,
          id: `edge_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type: 'smoothstep',
          animated: true,
          style: { strokeWidth: 2 },
          data: {
            createdAt: new Date().toISOString(),
            sourceType: sourceNode.type,
            targetType: targetNode.type,
            label: `${sourceNode.data?.label || sourceNode.type} → ${targetNode.data?.label || targetNode.type}`
          }
        };

        set({
          edges: addEdge(newEdge, get().edges),
        });
        
        showSuccessAlert("Connection created successfully!");
      },
      
      onSelectionChange: ({ nodes, edges }) => {
        set({ 
          selectedNode: nodes.length > 0 ? nodes[0] : null,
          selectedEdge: edges.length > 0 ? edges[0] : null
        });
      },
      
      // Enhanced node management
      setNodes: (nodes) => {
        const validation = validateNodes(nodes);
        if (!validation.valid) {
          showAlert(validation.message);
          return;
        }
        
        set({ 
          nodes,
          nodeCount: nodes.length
        });
      },
      
      setEdges: (edges) => {
        set({ edges });
      },
      
      // Node data update functions
      updateNodeData: (nodeId, updates) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              return { 
                ...node, 
                data: { 
                  ...node.data, 
                  ...updates,
                  lastModified: new Date().toISOString()
                } 
              };
            }
            return node;
          }),
        });
      },
      
      // Node deletion
      deleteNode: (nodeId) => {
        const node = get().nodes.find(n => n.id === nodeId);
        if (!node) return;
        
        // Remove connected edges
        const connectedEdges = get().edges.filter(
          edge => edge.source === nodeId || edge.target === nodeId
        );
        
        set({
          nodes: get().nodes.filter(n => n.id !== nodeId),
          edges: get().edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId)
        });
        
        showSuccessAlert(`${node.data?.label || node.type} node deleted`);
      },
      
      // Duplicate node
      duplicateNode: (nodeId) => {
        const node = get().nodes.find(n => n.id === nodeId);
        if (!node) return;
        
        const newNode = {
          ...node,
          id: `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          position: {
            x: node.position.x + 200,
            y: node.position.y + 100
          },
          data: {
            ...node.data,
            id: `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            label: `${node.data?.label || node.type} (Copy)`,
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString()
          }
        };
        
        set({
          nodes: [...get().nodes, newNode]
        });
        
        showSuccessAlert("Node duplicated successfully!");
      },
      
      // Clear canvas
      clearCanvas: () => {
        set({
          nodes: [],
          edges: [],
          selectedNode: null,
          nodeCount: 0
        });
        showSuccessAlert("Canvas cleared successfully!");
      },
      
      // Get journey statistics
      getJourneyStats: () => {
        const nodes = get().nodes;
        const edges = get().edges;
        
        return {
          totalNodes: nodes.length,
          totalEdges: edges.length,
          nodeTypes: nodes.reduce((acc, node) => {
            acc[node.type] = (acc[node.type] || 0) + 1;
            return acc;
          }, {}),
          hasStart: nodes.some(n => n.type === 'startJourney'),
          hasEnd: nodes.some(n => n.type === 'endJourney'),
          isComplete: nodes.some(n => n.type === 'startJourney') && 
                     nodes.some(n => n.type === 'endJourney') &&
                     edges.length > 0
        };
      },
      
      // Legacy functions for backward compatibility
      setSelectedNode: (node) => {
        set({ selectedNode: node });
      },
      
      updateNodeColor: (nodeId, color) => {
        get().updateNodeData(nodeId, { color });
      },
      
      updateNodeTitleColor: (nodeId, titleColor) => {
        get().updateNodeData(nodeId, { titleColor });
      },
      
      updateNodeSubtitleColor: (nodeId, subtitleColor) => {
        get().updateNodeData(nodeId, { subtitleColor });
      },
      
      updateParagraph: (nodeId, text) => {
        get().updateNodeData(nodeId, { text });
      },
      
      updateCountId: (count) => {
        set({ nodeCount: count });
      },
    }),
    {
      name: "journey-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

// Validation functions
const validateConnection = (sourceNode, targetNode, existingEdges) => {
  // Prevent self-connection
  if (sourceNode.id === targetNode.id) {
    return {
      valid: false,
      message: "Cannot connect a node to itself"
    };
  }
  
  // Check for duplicate connections
  const duplicateConnection = existingEdges.find(
    edge => edge.source === sourceNode.id && edge.target === targetNode.id
  );
  if (duplicateConnection) {
    return {
      valid: false,
      message: "Connection already exists between these nodes"
    };
  }
  
  // Journey-specific validation
  if (sourceNode.type === "startJourney") {
    if (targetNode.type === "startJourney") {
      return {
        valid: false,
        message: "Start Journey cannot connect to another Start Journey"
      };
    }
    if (targetNode.type === "endJourney") {
      return {
        valid: false,
        message: "Start Journey cannot directly connect to End Journey"
      };
    }
  }

  if (sourceNode.type === "endJourney") {
    return {
      valid: false,
      message: "End Journey cannot have outgoing connections"
    };
  }
  
  // Prevent cycles (basic check)
  if (targetNode.type === "startJourney") {
    return {
      valid: false,
      message: "Cannot connect back to Start Journey"
    };
  }

  return { valid: true };
};

const validateNodes = (nodes) => {
  const startJourney = nodes.filter((node) => node.type === "startJourney");
  const endJourney = nodes.filter((node) => node.type === "endJourney");

  if (startJourney.length > 1) {
    return {
      valid: false,
      message: "Journey can only have one Start Journey node"
    };
  }

  if (endJourney.length > 1) {
    return {
      valid: false,
      message: "Journey can only have one End Journey node"
    };
  }

  return { valid: true };
};

export default useStore;
