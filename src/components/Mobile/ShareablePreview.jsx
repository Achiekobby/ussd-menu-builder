import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import BackgroundImage from "../../assets/images/network_page.jpg";
import { Box, Container, Text, Flex } from "@radix-ui/themes";
import { ArrowRightIcon } from "@radix-ui/react-icons";

//* initial question
const initialQuestion = {
  text: "Do you want to proceed with the simulation?",
  options: ["1. Yes", "2. No"],
  type: "initial",
};

const customStyles = {
  position: "relative",
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  backgroundColor: "rgba(0, 0, 0, 0.75)",
};
const headLine = {
  color: "#ffffff",
  fontSize: "2.5rem",
  fontWeight: "600",
};
const subHeading = {
  color: "#ffffff",
  fontSize: "1.2rem",
  lineHeight: "2.6rem",
  fontWeight: "500",
};
const topHeading = {
  color: "#ffffff",
  fontSize: "1.2rem",
  lineHeight: "2.6rem",
  fontWeight: "500",
};

const imageContainer = {
  position: "absolute",
  height: "100%",
  width: "100%",
  top: "0",
  left: "0",
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.85)",
  },
  zIndex: "-1",
};

const imageStyle = {
  height: "100%",
  width: "100%",
  objectFit: "cover",
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
  width: "100%",
  background:"linear-gradient(135deg, hsla(17, 95%, 50%, 1) 0%, hsla(28, 95%, 58%, 1) 100%)"
};

const inputElement = {
  borderRadius: "5px",
  padding: "10px 12px",
  marginBottom: "20px",
  fontSize: "16px",
};

const buttonSubmit = {
  background: "#8E2800",
  color: "#ffffff",
};

const inputStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
};

const buttonStyle = {
  padding: "10px 30px",
  border: "none",
  background: "#F74C06",
  color: "white",
  textAlign: "center",
  borderRadius: "3px",
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

const ShareablePreview = () => {
  const location = useLocation();

  const [questions, setQuestions] = useState([]);
  const [currentContent, setCurrentContent] = useState(initialQuestion);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("")

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const state = query.get("state");
    if (state) {
      const parsedState = JSON.parse(decodeURIComponent(state));
      setQuestions(parsedState);
    }
  }, [location.search]);

  const findQuestionById = (id) => {
    return questions.find((question) => question.id === id);
  };

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

  const title = "Why Customize Your USSD Menu with Campaign Manager?";

  const subWording = `Transform the way you engage with your audience by creating a personalized USSD 
    menu tailored to your unique needs. With Campaign Manager, our intuitive USSD Menu Builder
    empowers you to design and deploy USSD menus effortlessly`;

  return (
    <Box style={customStyles}>
      <div style={imageContainer}>
        <img style={imageStyle} src={BackgroundImage} alt="background-image" />
      </div>
      <Container size={4}>
        <Flex display={"flex"} align={"center"} justify={"between"} wrap={"wrap"}>
          <Box>
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
                  {currentContent.options &&
                    currentContent.options.length > 1 && (
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
                    {currentContent.options &&
                      currentContent.options.length > 0 && (
                        <input
                          style={inputElement}
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                        />
                      )}
                    {currentContent.options &&
                      currentContent.options.length > 0 && (
                        <button style={buttonSubmit} onClick={handleNext}>
                          Send
                        </button>
                      )}
                    {currentContent.type === "end" && (
                      <button
                        style={buttonSubmit}
                        onClick={() => {
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
          </Box>
          <Box width={"50%"}>
            <Text style={topHeading}>CAMPAIGN MANAGER USSD MENU BUILDER</Text>
            <Box mb={"10px"} mt={"10px"}>
              <div
                style={{
                  background: "#F74C06",
                  height: "5px",
                  borderRadius: "5px",
                  width: "100px",
                  borderBottom: "1px solid #000000",
                  marginTop: "20px",
                }}
              ></div>
            </Box>
            <Box>
              <Text style={headLine}>{title}</Text>
            </Box>
            <Box>
              <Text style={subHeading}>{subWording}</Text>
            </Box>
            <Box mt={"50px"}>
              <Link style={buttonStyle} to="/">
                <ArrowRightIcon
                  width={20}
                  style={{
                    marginRight: "10px",
                  }}
                />
                Build Your Own USSD Menu
              </Link>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default ShareablePreview;
