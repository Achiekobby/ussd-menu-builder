import { showAlert, showSuccessAlert } from "./alert_utilities";

// Export journey data in various formats
export const exportFlow = async (nodes, edges, format = 'json') => {
  try {
    const journeyData = {
      metadata: {
        name: "Customer Journey",
        version: "1.0.0",
        createdAt: new Date().toISOString(),
        totalNodes: nodes.length,
        totalEdges: edges.length
      },
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type,
        data: edge.data
      })),
      analytics: {
        nodeTypes: nodes.reduce((acc, node) => {
          acc[node.type] = (acc[node.type] || 0) + 1;
          return acc;
        }, {}),
        startNodes: nodes.filter(n => n.type === 'startJourney').length,
        endNodes: nodes.filter(n => n.type === 'endJourney').length,
        touchpoints: nodes.filter(n => n.type === 'touchpointNode').length,
        decisions: nodes.filter(n => n.type === 'decisionNode').length,
        actions: nodes.filter(n => n.type === 'actionNode').length,
        aiNodes: nodes.filter(n => n.type === 'aiNode').length
      }
    };

    switch (format.toLowerCase()) {
      case 'json':
        return exportAsJSON(journeyData);
      case 'png':
        return exportAsPNG(nodes, edges);
      case 'pdf':
        return exportAsPDF(journeyData);
      case 'csv':
        return exportAsCSV(journeyData);
      default:
        return exportAsJSON(journeyData);
    }
  } catch (error) {
    console.error('Export failed:', error);
    showAlert("Export failed. Please try again.");
  }
};

// Export as JSON
const exportAsJSON = (journeyData) => {
  const dataStr = JSON.stringify(journeyData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `customer-journey-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  showSuccessAlert("Journey exported as JSON successfully!");
};

// Export as PNG
const exportAsPNG = (nodes, edges) => { 
  showAlert("PNG export coming soon! Use JSON export for now.");
};

// Export as PDF
const exportAsPDF = (journeyData) => {
  showAlert("PDF export coming soon! Use JSON export for now.");
};

// Export as CSV
const exportAsCSV = (journeyData) => {
  const csvData = [
    ['Node ID', 'Type', 'Label', 'Position X', 'Position Y'],
    ...journeyData.nodes.map(node => [
      node.id,
      node.type,
      node.data?.label || node.type,
      node.position.x,
      node.position.y
    ])
  ];
  
  const csvContent = csvData.map(row => row.join(',')).join('\n');
  const dataBlob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `customer-journey-nodes-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  showSuccessAlert("Journey nodes exported as CSV successfully!");
};

// Save journey to local storage
export const saveJourney = (nodes, edges) => {
  try {
    const journeyData = {
      nodes,
      edges,
      savedAt: new Date().toISOString()
    };
    
    localStorage.setItem('customer-journey-data', JSON.stringify(journeyData));
    showSuccessAlert("Journey saved to local storage!");
  } catch (error) {
    console.error('Save failed:', error);
    showAlert("Save failed. Please try again.");
  }
};

// Load journey from local storage
export const loadJourney = () => {
  try {
    const savedData = localStorage.getItem('customer-journey-data');
    if (savedData) {
      const journeyData = JSON.parse(savedData);
      showSuccessAlert("Journey loaded from local storage!");
      return journeyData;
    } else {
      showAlert("No saved journey found.");
      return null;
    }
  } catch (error) {
    console.error('Load failed:', error);
    showAlert("Load failed. Please try again.");
    return null;
  }
};

// Clear saved journey
export const clearSavedJourney = () => {
  try {
    localStorage.removeItem('customer-journey-data');
    showSuccessAlert("Saved journey cleared!");
  } catch (error) {
    console.error('Clear failed:', error);
    showAlert("Clear failed. Please try again.");
  }
};
