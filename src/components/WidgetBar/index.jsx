import { MagicWandIcon,ChatBubbleIcon, PlayIcon, QuestionMarkCircledIcon, StopIcon, TextIcon } from "@radix-ui/react-icons";
import { Box, Card, Text, Flex, HoverCard, Heading } from "@radix-ui/themes";
import { onDragStart } from "../../utilities/drag_utilities";

const Index = () => {
  return (
    <Flex maxWidth="10rem" height="90vh">
      <Flex align="center" justify="center" direction="column">
        <Card style={{backgroundColor:"#FDFDFD", boxShadow:"10px 10px 5px 0px rgba(0,0,0,0.35)"}}>
          <Flex gap="3" align="center" direction="column">
            <Box>
              <Text as="div" size="2" weight="bold" align="center">
                Widgets
              </Text>
            </Box>
            <hr style={{width:"100%"}} />
            <Box
              draggable
              onDragStart={(event) => onDragStart(event, "startSurvey")}
            >
              <Flex direction="column" align="center">
                <HoverCard.Root>
                  <HoverCard.Trigger>
                    <PlayIcon style={
                      {
                        padding:"10px",
                        borderRadius:"50%",
                        background:"#006514D5",
                        color:"#ffffff"
                      }
                    } />
                  </HoverCard.Trigger>
                  <HoverCard.Content maxWidth="300px">
                    <Flex gap="4">
                      <Box>
                        <Heading size="3" as="h3">
                          Description
                        </Heading>
                        <Text as="div" size="2" color="gray" mb="2">
                          Info
                        </Text>
                        <Text as="div" size="2">
                          Start the survey. (Required for the start of your new
                          survey)
                        </Text>
                      </Box>
                    </Flex>
                  </HoverCard.Content>
                </HoverCard.Root>
                <Text>Start Survey</Text>
              </Flex>
            </Box>
          
            <Box
              draggable
              onDragStart={(event) => onDragStart(event, "titleNode")}
            >
              <Flex direction="column" align="center">
                <HoverCard.Root>
                  <HoverCard.Trigger>
                    <TextIcon style={{
                      marginRight: "10px",
                      padding: "10px",
                      background: "#B503A6",
                      color: "#ffffff",
                      borderRadius: "50%",
                    }} />
                  </HoverCard.Trigger>
                  <HoverCard.Content maxWidth="300px">
                    <Flex gap="4">
                      <Box>
                        <Heading size="3" as="h3">
                          Description
                        </Heading>
                        <Text as="div" size="2" color="gray" mb="2">
                          Title
                        </Text>
                        <Text as="div" size="2">
                          Add a title for your survey
                        </Text>
                      </Box>
                    </Flex>
                  </HoverCard.Content>
                </HoverCard.Root>
                <Text> Survey Title</Text>
              </Flex>
            </Box>
            <hr style={{width:"100%"}} />
            <Box
              draggable
              onDragStart={(event) => onDragStart(event, "questionNode")}
            >
              <Flex direction="column" align="center">
                <HoverCard.Root>
                  <HoverCard.Trigger>
                    <QuestionMarkCircledIcon style={{
                      fontSize:"1.5rem",
                      marginRight: "10px",
                      padding: "10px",
                      background: "#FF2A00",
                      color: "#ffffff",
                      borderRadius: "50%",
                    }} />
                  </HoverCard.Trigger>
                  <HoverCard.Content maxWidth="300px">
                    <Flex gap="4">
                      <Box>
                        <Heading size="3" as="h3">
                          Description
                        </Heading>
                        <Text as="div" size="2" color="gray" mb="2">
                          Question
                        </Text>
                        <Text as="div" size="2">
                          Add your question in this node
                        </Text>
                      </Box>
                    </Flex>
                  </HoverCard.Content>
                </HoverCard.Root>
                <Text>Question</Text>
              </Flex>
            </Box>
            <hr style={{width:"100%"}} />
            <Text style={{ fontWeight:"bold" }}>Answer Types</Text>
            <Box
              draggable
              onDragStart={(event) => onDragStart(event, "answerNode")}
            >
              <Flex direction="column" align="center">
                <HoverCard.Root>
                  <HoverCard.Trigger>
                    <MagicWandIcon style={{
                      marginRight: "10px",
                      padding: "10px",
                      background: "#5151CD",
                      color: "#ffffff",
                      borderRadius: "50%",
                    }}  />
                  </HoverCard.Trigger>
                  <HoverCard.Content maxWidth="300px">
                    <Flex gap="4">
                      <Box>
                        <Heading size="3" as="h3">
                          Description
                        </Heading>
                        <Text as="div" size="2" color="gray" mb="2">
                          Answer
                        </Text>
                        <Text as="div" size="2">
                          Add the answer to your question in this node
                        </Text>
                      </Box>
                    </Flex>
                  </HoverCard.Content>
                </HoverCard.Root>
                <Text>Multi Choice</Text>
              </Flex>
            </Box>
            <Box
              draggable
              onDragStart={(event) => onDragStart(event, "freeTextAnswerNode")}
            >
              <Flex direction="column" align="center">
                <HoverCard.Root>
                  <HoverCard.Trigger>
                    <ChatBubbleIcon style={{
                      marginRight: "10px",
                      padding: "10px",
                      background: "#979703",
                      color: "#ffffff",
                      borderRadius: "50%",
                    }}  />
                  </HoverCard.Trigger>
                  <HoverCard.Content maxWidth="300px">
                    <Flex gap="4">
                      <Box>
                        <Heading size="3" as="h3">
                          Description
                        </Heading>
                        <Text as="div" size="2" color="gray" mb="2">
                          Free Text Answer
                        </Text>
                        <Text as="div" size="2">
                          Expecting a user input as an answer, use this node.
                        </Text>
                      </Box>
                    </Flex>
                  </HoverCard.Content>
                </HoverCard.Root>
                <Text>Free Text</Text>
              </Flex>
            </Box>
            <hr style={{width:"100%"}} />
            <Box
              draggable="true"
              onDragStart={(event) => onDragStart(event, "endSurvey")}
            >
              <Flex direction="column" align="center">
                <HoverCard.Root>
                  <HoverCard.Trigger>
                    <StopIcon style={{
                      marginRight: "10px",
                      padding: "10px",
                      background: "#FF00BF",
                      color: "#ffffff",
                      borderRadius: "50%",
                    }} />
                  </HoverCard.Trigger>
                  <HoverCard.Content maxWidth="300px">
                    <Flex gap="4">
                      <Box>
                        <Heading size="3" as="h3">
                          Description
                        </Heading>
                        <Text as="div" size="2" color="gray" mb="2">
                          End
                        </Text>
                        <Text as="div" size="2">
                          End the survey (Required for the end of your survey)
                        </Text>
                      </Box>
                    </Flex>
                  </HoverCard.Content>
                </HoverCard.Root>
                <Text>End</Text>
              </Flex>
            </Box>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
};

export default Index;
