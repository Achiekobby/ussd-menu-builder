import { create } from "zustand";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "reactflow";
import initialNodes from "./nodes";
import initialEdges from "./edges";
import { showAlert } from "./utilities/alert_utilities";
import { createJSONStorage, persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      nodes: initialNodes,
      edges: initialEdges,
      selectedNode: null,
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
      onConnect: (connection) => {
        const sourceNode = get().nodes.find(
          (node) => node.id === connection.source
        );
        const targetNode = get().nodes.find(
          (node) => node.id === connection.target
        );

        if (
          sourceNode.type === "startSurvey" &&
          targetNode.type !== "titleNode"
        ) {
          showAlert("Start survey can only connect to the Title Node");
          return;
        }

        if (
          sourceNode.type === "titleNode" &&
          targetNode.type !== "questionNode"
        ) {
          showAlert("Title node can only connect to the Question Node");
          return;
        }

        if (sourceNode.type === "titleNode") {
          //! Check if there is already a connection from titleNode to a questionNode
          const existingConnection = get().edges.find(
            (edge) =>
              edge.source === connection.source && edge.target !== sourceNode.id
          );
          if (existingConnection) {
            showAlert("Only one Question Node can connect to the Title Node");
            return;
          }
        }

        if (sourceNode.type === "questionNode") {
          const existingFreeTextConnection = get().edges.find(
            (edge) =>
              edge.source === connection.source &&
              get().nodes.find((node) => node.id === edge.target)?.type ===
                "freeTextAnswerNode"
          );
          if (existingFreeTextConnection) {
            showAlert("Only one Free Text Answer Node can connect to a Question Node");
            return;
          }
        }
        if (
          sourceNode.type === "questionNode" &&
          targetNode.type !== "answerNode" &&
          targetNode.type !== "freeTextAnswerNode"
        ) {
          showAlert("Question node can only connect to the Multi choice or User Input Node");
          return;
        }
        

        if (
          (sourceNode.type === "answerNode" || sourceNode ==="freeTextAnswerNode") &&
          targetNode.type !== "endSurvey" &&
          targetNode.type !== "questionNode"
        ) {
          showAlert(
            "MultiChoice and User Input nodes can only connect to End Survey Node or another Question Node"
          );
          return;
        }
        set({
          edges: addEdge(connection, get().edges),
        });
      },
      // onSelectionChange: ({ nodes }) => {
      //   set({
      //     selectedNode: nodes.map((node) => {
      //       if (nodes[0].id === node.id) {
      //         return node;
      //       }
      //     }),
      //   });
      // },
      onSelectionChange: ({ nodes }) => {
        const selectedNode = nodes.filter((node) => node.id === nodes[0].id);
        set({ selectedNode });
      },
      setNodes: (nodes) => {
        const startSurvey = nodes.filter((node) => node.type === "startSurvey");
        const titleNode = nodes.filter((node) => node.type === "titleNode");
        const endNode = nodes.filter((node) => node.type === "endSurvey");

        if (!startSurvey.length) {
          showAlert("Ussd Survey should start with a Start Survey Node");
          return;
        }

        if (startSurvey.length > 1) {
          showAlert("Ussd Survey should have only have one Start Survey Node");
          return;
        }

        if(endNode.length > 1){
          showAlert(
            "Only one End Node can be used in the survey"
          );
          return;
        }

        if (titleNode.length > 1) {
          showAlert("Only one Title Node can be used in the survey");
          return;
        }

        set({ nodes });
      },
      setEdges: (edges) => {
        set({ edges });
      },
      updateNodeColor: (nodeId, color) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              return { ...node, data: { ...node.data, color } };
            }
            return node;
          }),
        });
      },
      updateNodeTitleColor: (nodeId, titleColor) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              return { ...node, data: { ...node.data, titleColor } };
            }
            return node;
          }),
        });
      },
      updateNodeSubtitleColor: (nodeId, subtitleColor) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              return { ...node, data: { ...node.data, subtitleColor } };
            }
            return node;
          }),
        });
      },
      updateParagraph: (nodeId, text) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              return { ...node, data: { ...node.data, text } };
            }
            return node;
          }),
        });
      },
      updateCountId: (count) => {
        set({
          nodeCount: count,
        });
      },
    }),
    {
      name: "ussd-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useStore;
