const getNodeId = () => `node_${+new Date()}`;

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

  const position = reactFlowInstance.screenToFlowPosition({
    x: event.clientX,
    y: event.clientY,
  });

  const newNode = {
    id: getNodeId(),
    type,
    position,
    data: {
      color: "#ffffff",
      titleColor: "#000000",
      subtitleColor: "#000000",
      text: "",
    },
  };

  setNodes(nodes.concat(newNode));
};

export const onDragStart = (event, nodeType) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
};
