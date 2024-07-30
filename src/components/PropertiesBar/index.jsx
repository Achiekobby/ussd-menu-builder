import { Box, Card, Flex } from "@radix-ui/themes";
import useStore from "../../store";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
import TitleNodeProperties from "../../property_panel/TitleNodeProperties";
import StartSurveyProperties from "../../property_panel/StartSurveyProperties";
import QuestionNodeProperties from "../../property_panel/QuestionNodeProperties";
import AnswerNodeProperties from "../../property_panel/AnswerNodeProperties";
import EndSurveyProperties from "../../property_panel/EndSurveyProperties";
import FreeAnswerNodeProperties from "../../property_panel/FreeAnswerNodeProperties";

const selector = (state) => ({
  selectedNode: state.selectedNode,
});

const Index = () => {
  const { selectedNode } = useStore(useShallow(selector));
  const [panelProperties, setPanelProperties] = useState(null);

  useEffect(() => {
    if (selectedNode && selectedNode.length) {
      const selectedNodeValue = selectedNode[0];
      switch (selectedNodeValue.type) {
        case "startSurvey":
          setPanelProperties(
            <StartSurveyProperties
              id={selectedNodeValue.id}
              data={selectedNodeValue.data}
            />
          );
          return;
        case "titleNode":
          setPanelProperties(
            <TitleNodeProperties
              id={selectedNodeValue.id}
              data={selectedNodeValue.data}
            />
          );
          return;
        case "questionNode":
          setPanelProperties(
            <QuestionNodeProperties
              id={selectedNodeValue.id}
              data={selectedNodeValue.data}
            />
          );
          return;
        case "answerNode":
          setPanelProperties(
            <AnswerNodeProperties
              id={selectedNodeValue.id}
              data={selectedNodeValue.data}
            />
          );
          return;
        case "freeTextAnswerNode":
          setPanelProperties(
            <FreeAnswerNodeProperties
              id={selectedNodeValue.id}
              data={selectedNodeValue.data}
            />
          );
          return;
        case "endSurvey":
          setPanelProperties(
            <EndSurveyProperties
              id={selectedNodeValue.id}
              data={selectedNodeValue.data}
            />
          );
          return;
        default:
          setPanelProperties(null);
          return;
      }
    }
  }, [selectedNode, setPanelProperties]);

  return !panelProperties ? (
    <></>
  ) : (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        backgroundColor: "#ffffff",
        boxShadow: "10px 10px 10px 10px rgba(0,0,0,0.35)",
        padding: "20px",
        borderRadius:"10px"
      }}
    >
      <Card
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          padding: "20px"
        }}
      >
        <Flex gap="3" direction="column" width="15rem" height="20rem">
          {panelProperties}
        </Flex>
      </Card>
    </Box>
  );
};

export default Index;
