import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { Handle, Position } from "reactflow";
import PropTypes from "prop-types";
import { MagicWandIcon } from "@radix-ui/react-icons";

const Index = ({ isConnectable, data, selected }) => {
  return (
    <Box>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Box>
        <Card
          style={{
            backgroundColor: data.color,
            borderTop: "5px solid #5151CD",
            borderBottom:"2px solid #5151CD",
            borderRadius:"15px",
            boxShadow:selected ? "2px 0px 5px rgba(0,0,0,0.3)":""
          }}
        >
          <Flex gap="2" align="center">
            <Box>
              <Box as="div" size="1" weight="bold">
                <Flex gap="2" align="center" style={{ color: data.titleColor }}>
                  <MagicWandIcon style={{
                      marginRight: "5px",
                      padding: "5px",
                      background: "#5151CD",
                      color: "#ffffff",
                      borderRadius: "50%",
                    }} />
                  <Text weight="bold" size="1" style={{color:'#5151CD'}}>
                    Multi Choice Answer
                  </Text>
                </Flex>
              </Box>
              <hr style={{borderTop:"#5151CD"}}/>
              <Text
                as="div"
                size="1"
                color="gray"
                style={{ color: data.subtitleColor, width: "180px", fontWeight:"500" }}
              >
                {data.text
                  ? data.text
                  : "Answer to question will display here..."}
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
    </Box>
  );
};

Index.propTypes = {
  data: PropTypes.object.isRequired,
  isConnectable: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default Index;
