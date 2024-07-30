import { useEffect, useState } from "react";
import Modal from "react-modal";
import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";


Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
    background: "none",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

const screenStyles = {
  width: "90%",
  borderRadius: "16px",
  overflow: "hidden",
  padding: "20px",
  background: "#ffffff",
  boxSizing: "border-box",
  boxShadow: "10px 0 10px 6px rgba(0,0,0,0.2)",
};

const contentStyle = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  height: "100%",
  backgroundColor: "hsla(10, 82%, 65%, 1)",
  background:
    "linear-gradient(135deg, hsla(17, 95%, 50%, 1) 0%, hsla(28, 95%, 58%, 1) 100%)",
};
const inputElement = {
  borderRadius: "5px",
  padding: "10px 12px",
  marginBottom: "20px",
  fontSize: "16px",
};

const buttonSubmit = {
  background: "#FE5A1D",
  color: "#ffffff",
};

const inputStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
};

const errorMessageStyle = {
  position: "absolute",
  bottom: "0px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "#e44e4e",
  color: "#ffffff",
  padding: "20px",
  borderRadius: "5px",
  width: "100%",
  textAlign: "center",
  fontSize:"1.15rem",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};

//* initial question
const initialQuestion = {
  text: "Do you want to proceed with the simulation?",
  options: ["1. Yes", "2. No"],
  type: "initial",
};


// eslint-disable-next-line react/prop-types
const MobilePreviewModal = ({ isOpen, onRequestClose, nodes, edges }) => {
  const [questions, setQuestions] = useState([]);

  const [currentContent, setCurrentContent] = useState(initialQuestion);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  //* function to create question nodes
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

  //Todo => Simulation Method
  const handleNext = () => {
    if (!inputValue.trim()) {
      setError("Input cannot be empty. Please enter a valid response.");
      return;
    }
  
    if (currentContent.type === "initial") {
      if (inputValue === "1") {
        setError("");
        setHistory([currentContent]);
        setCurrentContent({
          text: questions[0].text,
          options: questions[0].answers.map(
            (a, index) => `${index + 1}. ${a.text}`
          ),
          type: questions[0].answers.length > 1 ? "question" : "question_free",
          nextNodes: questions[0].answers.map((a) => a.next),
        });
      } else if (inputValue === "2") {
        setError("");
        onRequestClose();
      } else {
        setError("Invalid input. Please enter a valid option (1 or 2).");
      }
    } else if (
      currentContent.type === "question" ||
      currentContent.type === "question_free"
    ) {
      let selectedIndex;
  
      if (inputValue === "0" && history.length > 0) {
        const previousContent = history.pop();
        setCurrentContent(previousContent);
        setHistory([...history]);
        setInputValue("");
        setError("");
        return;
      } else if (currentContent.type === "question_free") {
        selectedIndex = 0;
      } else if (!isNaN(parseInt(inputValue, 10))) {
        selectedIndex = parseInt(inputValue, 10) - 1;
        if (selectedIndex < 0 || selectedIndex >= currentContent.options.length) {
          setError("Invalid input. Please enter a number corresponding to one of the options.");
          return;
        }
      } else {
        setError("Invalid input. Please enter a number corresponding to one of the options.");
        return;
      }
  
      const nextNodeId = currentContent.nextNodes[selectedIndex];
  
      if (nextNodeId) {
        const nextQuestion = findQuestionById(nextNodeId);
        if (nextQuestion) {
          setHistory([...history, currentContent]);
          setCurrentContent({
            text: nextQuestion.text,
            options: nextQuestion.answers.map(
              (a, index) => `${index + 1}. ${a.text}`
            ),
            type: nextQuestion.answers.length > 1 ? "question" : "question_free",
            nextNodes: nextQuestion.answers.map((a) => a.next),
          });
          setError("");
        } else {
          setCurrentContent({
            text: "There was an issue loading the next question. Please try again later.",
            type: "error",
          });
        }
      } else {
        setError("");
        setCurrentContent({
          text: "Thank you for completing the survey!",
          type: "end",
        });
      }
    }
    setInputValue("");
  };
  
  
  

  //Todo => Helper function to find a question by its ID
  const findQuestionById = (id) => {
    return questions.find((question) => question.id === id);
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weekday = days[now.getDay()];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[now.getMonth()];

    const formattedDate = `${weekday}, ${now.getDate()} ${month} ${now.getFullYear()}`;

    return formattedDate;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="USSD Flow Preview"
    >
      <DeviceFrameset
        device="iPhone X"
        color="gold"
        height={812}
        width={375}
        zoom={0.8}
      >
        <div style={contentStyle}>
          <div
            style={{
              marginBottom: "30px",
              position: "absolute",
              top: "30px",
            }}
          >
            <div
              style={{
                fontSize: "5rem",
                fontWeight: "bold",
                color: "#000000",
                textAlign: "center",
                marginBottom: "5px",
              }}
            >
              {getCurrentTime()}
            </div>
            <div
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#000000",
                textAlign: "center",
              }}
            >
              {getCurrentDateTime()}
            </div>
          </div>
          <div style={screenStyles}>
            <p style={{ fontSize: "1.04rem", fontWeight: "bold" }}>
              {currentContent.text}
            </p>
            {currentContent.options && currentContent.options.length > 1 && (
              <ul>
                {currentContent.options.map((option, index) => (
                  <li
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      listStyle: "none",
                    }}
                    key={index}
                  >
                    {option}
                  </li>
                ))}
                {currentContent.type !== "initial" &&
                  currentContent.type !== "end" && (
                    <li
                      style={{
                        fontSize: "18px",
                        fontWeight: "500",
                        listStyle: "none",
                      }}
                    >
                      0. Back
                    </li>
                  )}
              </ul>
            )}
            <div style={inputStyle}>
              {currentContent.options && currentContent.options.length > 0 && (
                <input
                  style={inputElement}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              )}
              {currentContent.options && currentContent.options.length > 0 && (
                <button style={buttonSubmit} onClick={handleNext}>
                  Send
                </button>
              )}
              {currentContent.type === "end" && (
                <button
                  style={buttonSubmit}
                  onClick={() => {
                    onRequestClose();
                    setCurrentContent(initialQuestion);
                  }}
                >
                  End
                </button>
              )}
            </div>
          </div>
          {error && <div style={errorMessageStyle}>{error}</div>}
        </div>
      </DeviceFrameset>
    </Modal>
  );
};

export default MobilePreviewModal;
