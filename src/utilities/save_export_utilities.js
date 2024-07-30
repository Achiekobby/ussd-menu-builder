import axios from "axios";
import { showAlert, showSuccessAlert } from "./alert_utilities";
import Domain from "../Domain";

export const exportFlow = async (nodes, edges) => {

  //* Function to format the question data for the backend
  function createQuestions(nodes, edges) {
    const questionsMap = {};

    //Todo=> First pass: Create question entries in the map
    nodes.forEach((node) => {
      if (node.type === "questionNode") {
        questionsMap[node.id] = {
          id: node.id,
          text: node.data.text,
          answers: [],
        };
      }
    });
    console.log("questionsMap", questionsMap);

    //Todo => Second pass: Populate answers for each question
    edges.forEach((edge) => {
      if (questionsMap[edge.source]) {
        const question = questionsMap[edge.source];
        const answerNode = nodes.find((node) => node.id === edge.target);
        if (answerNode) {
          const answer = {
            text:
              answerNode.type === "answerNode"
                ? answerNode.data.text
                : `free_text_${answerNode.id}`,
            next: null,
            id: answerNode.id,
          };
          question.answers.push(answer);
        }
      }
    });

    //Todo => Third pass: Link answers to next questions
    edges.forEach((edge) => {
      const sourceNode = nodes.find((node) => node.id === edge.source);
      const targetQuestion = questionsMap[edge.target];
      if (sourceNode && targetQuestion) {
        Object.values(questionsMap).forEach((question) => {
          question.answers.forEach((answer) => {
            if (answer.id === sourceNode.id) {
              answer.next = targetQuestion.id;
            }
          });
        });
      }
    });

    return Object.values(questionsMap);
  }

  const questions = createQuestions(nodes, edges);
  console.log("questions", questions);

  const unstructured_data = sessionStorage.getItem("ussd-storage");
  const { backendDomain } = Domain;

  try {
    const response = await axios.post(`${backendDomain}/ussd/test`, {
      user_id: 1,
      ussd_code: "*380*90#",
      semi_formatted_data: JSON.stringify(questions),
      raw_data: unstructured_data
    });
    if (response) {
      showSuccessAlert("USSD Flow uploaded successfully");
    }
  } catch (err) {
    showAlert("USSD Flow upload failed");
  }
};
