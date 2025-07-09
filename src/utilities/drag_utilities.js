const getNodeId = () => `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Node type configurations with default data
const nodeTypeConfigs = {
  startJourney: {
    label: "Start Journey",
    description: "Begin your customer's experience here",
    metrics: {
      entryRate: "100%",
      totalStarts: "1.2K"
    },
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200"
  },
  touchpointNode: {
    label: "Customer Touchpoint",
    description: "Engage with your customer at this point",
    touchpointType: "web",
    metrics: {
      reach: "1.2K",
      engagement: "68%",
      responseTime: "2.3s",
      conversion: "12%"
    },
    priority: "medium",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  decisionNode: {
    label: "Decision Point",
    description: "Branching logic for customer journey",
    decisionType: "conditional",
    metrics: {
      decisions: "856",
      accuracy: "94%",
      avgTime: "1.8s"
    },
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  actionNode: {
    label: "Customer Action",
    description: "Customer action or conversion point",
    actionType: "purchase",
    metrics: {
      conversions: "234",
      conversionRate: "18%",
      avgValue: "$45.20"
    },
    color: "from-orange-500 to-amber-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  },
  aiNode: {
    label: "AI Decision",
    description: "AI-powered optimization point",
    aiType: "recommendation",
    metrics: {
      recommendations: "1.5K",
      accuracy: "92%",
      improvement: "+23%"
    },
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200"
  },
  endJourney: {
    label: "End Journey",
    description: "Journey completion point",
    metrics: {
      completions: "892",
      satisfaction: "4.8/5",
      retention: "78%"
    },
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  }
};

export const onDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};

export const onDropNode = (event, reactFlowInstance, setNodes, nodes) => {
  event.preventDefault();
  const type = event.dataTransfer.getData("application/reactflow");

  if (typeof type === "undefined" || !type) {
    return;
  }

  // Get the drop position
  const position = reactFlowInstance.screenToFlowPosition({
    x: event.clientX,
    y: event.clientY,
  });

  // Get node configuration
  const config = nodeTypeConfigs[type];
  if (!config) {
    console.error(`Unknown node type: ${type}`);
    return;
  }

  // Validate node placement
  const validation = validateNodePlacement(type, nodes, position);
  if (!validation.valid) {
    // You could show a toast notification here
    console.warn(validation.message);
    return;
  }

  // Create new node with proper data structure
  const newNode = {
    id: getNodeId(),
    type,
    position,
    data: {
      ...config,
      id: getNodeId(), // Add unique ID to data as well
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      // Add any additional properties that might be needed
      isActive: true,
      customProperties: {}
    },
  };

  // Add the new node
  setNodes(nodes.concat(newNode));

  // Return the new node for potential further processing
  return newNode;
};

// Validation function for node placement
const validateNodePlacement = (nodeType, existingNodes, position) => {
  // Check for duplicate start/end journey nodes
  if (nodeType === "startJourney") {
    const existingStart = existingNodes.find(node => node.type === "startJourney");
    if (existingStart) {
      return {
        valid: false,
        message: "Only one Start Journey node is allowed per journey"
      };
    }
  }

  if (nodeType === "endJourney") {
    const existingEnd = existingNodes.find(node => node.type === "endJourney");
    if (existingEnd) {
      return {
        valid: false,
        message: "Only one End Journey node is allowed per journey"
      };
    }
  }

  // Check for minimum distance from other nodes (optional)
  const minDistance = 100;
  const tooClose = existingNodes.some(node => {
    const distance = Math.sqrt(
      Math.pow(node.position.x - position.x, 2) + 
      Math.pow(node.position.y - position.y, 2)
    );
    return distance < minDistance;
  });

  if (tooClose) {
    return {
      valid: false,
      message: "Please place the node further from existing nodes"
    };
  }

  return { valid: true };
};

export const onDragStart = (event, nodeType) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
  
  // Add visual feedback
  event.target.style.opacity = "0.5";
};

// Helper function to get node configuration
export const getNodeConfig = (nodeType) => {
  return nodeTypeConfigs[nodeType] || null;
};

// Helper function to update node data
export const updateNodeData = (nodeId, updates, setNodes, nodes) => {
  setNodes(nodes.map(node => {
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
  }));
};
