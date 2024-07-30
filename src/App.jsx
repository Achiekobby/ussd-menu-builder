import { Flex, Button } from "@radix-ui/themes";
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

import StartSurvey from "./nodes_library/StartSurvey";
import TitleNode from "./nodes_library/TitleNode";
import QuestionNode from "./nodes_library/QuestionNode";
import AnswerNode from "./nodes_library/AnswerNode";
import EndSurvey from "./nodes_library/EndSurvey";
import FreeTextAnswerNode from "./nodes_library/FreeTextAnswerNode";

import Sidebar from "./components/WidgetBar";
import PropertiesBar from "./components/PropertiesBar";

import { onDropNode, onDragOver } from "./utilities/drag_utilities";

import "reactflow/dist/style.css";

import {
  EyeOpenIcon,
  ThickArrowLeftIcon,
  UploadIcon,
  Share1Icon,
} from "@radix-ui/react-icons";
import useStore from "./store";
import { useShallow } from "zustand/react/shallow";
import { Toaster } from "react-hot-toast";
import { exportFlow } from "./utilities/save_export_utilities";

import MobilePreviewModal from "./components/Mobile/MobilePreviewModal";
import { showSuccessAlert } from "./utilities/alert_utilities";

const defaultEdgeOptions = {
  animated: false,
  type: "smoothstep",
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
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
      startSurvey: StartSurvey,
      titleNode: TitleNode,
      questionNode: QuestionNode,
      answerNode: AnswerNode,
      freeTextAnswerNode: FreeTextAnswerNode,
      endSurvey: EndSurvey,
    }),
    []
  );

  const [questions, setQuestions] = useState([]);

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [nodeElements, setNodeElements] = useState([]);
  // const [edgeElement, setEdgeElement] = useState([]);

  const generateShareableLink = () => {
    
    console.log("state",questions);
    const encodedState = encodeURIComponent(JSON.stringify(questions));
    const generatedUrl = `${window.location.origin}/preview?state=${encodedState}`;
    console.log("generated_url",generatedUrl);
    return generatedUrl;
  };

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
    (event) => onDropNode(event, reactFlowInstance, setNodes, nodes),
    [nodes, reactFlowInstance, setNodes]
  );

  const handlePreviewClick = () => {
    setIsModalOpen(true);
  };

    //* function to create question nodes
    function createQuestions(nodes, edges) {
      const questionsMap = {};
    
      console.log("nodes", nodes);
      console.log("edges", edges);
    
      // First pass: Create question entries in the map
      nodes.forEach((node) => {
        if (node.type === "questionNode") {
          questionsMap[node.id] = {
            id: node.id,
            text: node.data.text,
            answers: [],
          };
        }
      });
    
      // Second pass: Populate answers for each question
      edges.forEach((edge) => {
        if (questionsMap[edge.source]) {
          const question = questionsMap[edge.source];
          const answerNode = nodes.find((node) => node.id === edge.target);
          if (answerNode && answerNode.type === "answerNode") {
            question.answers.push({ text: answerNode.data.text, next: null, id: answerNode.id });
          }
          if (answerNode && answerNode.type === "freeTextAnswerNode") {
            question.answers.push({
              text: `free_text_${answerNode.id}`,
              next: null,
              id: answerNode.id,
            });
          }
        }
      });
    
      // Third pass: Link answers to next questions
      edges.forEach((edge) => {
        const answerNode = nodes.find((node) => node.id === edge.source);
        const nextQuestion = questionsMap[edge.target];
    
        if (answerNode && nextQuestion) {
          Object.values(questionsMap).forEach((question) => {
            question.answers.forEach((answer) => {
              if (answer.id === answerNode.id) {
                answer.next = nextQuestion.id;
              }
            });
          });
        }
      });
    
      return Object.values(questionsMap);
    }

    useEffect(() => {
      const loadQuestions = () => {
        const storageData = sessionStorage.getItem("ussd-storage");
        if (storageData) {
          const parsedData = JSON.parse(storageData);
          const { nodes, edges } = parsedData.state;
          const questions = createQuestions(nodes, edges);
          setQuestions(questions);
        }
      };
      loadQuestions();
    }, [nodes, edges]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Toaster position="bottom-center" reverseOrder={false} />
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
          snapToGrid
          fitView
        >
          <Controls />
          <MiniMap />
          <Panel position="top-left">
            <Sidebar />
          </Panel>
          <Panel position="top-right">
            <PropertiesBar />
          </Panel>
          <Panel position="top-center">
            <Flex gap="3">
              <Button
                color="yellow"
                variant="soft"
                onClick={handlePreviewClick}
              >
                <EyeOpenIcon /> Preview
              </Button>
              <Button
                color="blue"
                variant="soft"
                onClick={() => {
                  const link = generateShareableLink();
                  navigator.clipboard.writeText(link);
                  showSuccessAlert("Shareable link copied to clipboard!");
                }}
              >
                <Share1Icon /> Copy Link
              </Button>
              <Button
                color="cyan"
                variant="soft"
                onClick={() => exportFlow(nodes, edges)}
              >
                <UploadIcon /> Save
              </Button>
              <Button color="red" variant="soft">
                <ThickArrowLeftIcon /> Go Back
              </Button>
            </Flex>
          </Panel>
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="#666668"
          />
        </ReactFlow>
      </ReactFlowProvider>
      <MobilePreviewModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        nodes={nodes}
        edges={edges}
      />
    </div>
  );
}

export default App;
