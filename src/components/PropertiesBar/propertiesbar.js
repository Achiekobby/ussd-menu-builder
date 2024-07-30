import TitleNodeProperties from "../../property_panel/TitleNodeProperties";
import StartSurveyProperties from "../../property_panel/StartSurveyProperties";
import QuestionNodeProperties from "../../property_panel/QuestionNodeProperties";
import AnswerNodeProperties from "../../property_panel/AnswerNodeProperties";
import EndSurveyProperties from "../../property_panel/EndSurveyProperties";
import FreeAnswerNodeProperties from "../../property_panel/FreeAnswerNodeProperties";

export const setPanelPropertiesTab = (selectedNode, setPanelProperties) => {
  switch (selectedNode[0].type) {
    case "startSurvey":
      setPanelProperties(<StartSurveyProperties />);
      return;
    case "titleNode":
      setPanelProperties(<TitleNodeProperties />);
      return;
    case "questionNode":
      setPanelProperties(<QuestionNodeProperties />);
      return;
    case "answerNode":
      setPanelProperties(<AnswerNodeProperties />);
      return;
    case "freeTextAnswerNode":
      setPanelProperties(<FreeAnswerNodeProperties />);
      return;
    case "endSurvey":
      setPanelProperties(<EndSurveyProperties />);
      return;
    default:
      setPanelProperties(<div></div>);
      return;
  }
};
