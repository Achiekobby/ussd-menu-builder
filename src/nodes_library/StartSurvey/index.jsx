import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { Handle, Position } from "reactflow";
import PropTypes from "prop-types";
import { PlayIcon } from "@radix-ui/react-icons";

const Index = ({ data, isConnectable, selected }) => {
  return (
    <div>
      <Box>
        <Card
          borderRadius={0}
          style={{
            backgroundColor: data.color,
            borderTop:"5px solid #006514D5",
            borderBottom:"2px solid #006514D5",
            borderRadius: "15px",
            boxShadow:selected ? "2px 0px 5px rgba(0,0,0,0.3)":""
          }}
        >
          <Flex gap="2" align="center">
            <Box>
              <Box as="div" size="1">
                <Flex gap="1" align="center" style={{ color: data.titleColor }}>
                  <PlayIcon
                    style={{
                      marginRight: "5px",
                      padding: "5px",
                      background: "#006514D5",
                      color: "#ffffff",
                      borderRadius: "50%",
                    }}
                  />
                  <Text weight="bold" size="1" style={{color:"#006514D5"}}>
                    Start
                  </Text>
                  
                </Flex>
              </Box>
              <hr style={{borderTop:"1px solid #006514D5"}} />
              <Text
                as="div"
                size="1"
                style={{ color: data.subtitleColor, width: "180px", fontWeight:"500" }}
              >
                (Trigger new USSD flow menu)
              </Text>
            </Box>
          </Flex>
        </Card>
      </Box>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};

Index.propTypes = {
  data: PropTypes.object.isRequired,
  isConnectable: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default Index;
