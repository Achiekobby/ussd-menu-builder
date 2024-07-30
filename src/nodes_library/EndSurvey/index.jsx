import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { Handle, Position } from "reactflow";
import PropTypes from "prop-types";
import { StopIcon } from "@radix-ui/react-icons";

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
            borderTop: "5px solid #FF0000",
            borderBottom:"2px solid #FF0000",
            boxShadow:selected ? "2px 0px 5px rgba(0,0,0,0.3)":""
          }}
        >
          <Flex gap="2" align="center">
            <Box>
              <Box as="div" size="1">
                <Flex gap="2" align="center" style={{ color: data.titleColor }}>
                  <StopIcon height="20" width="20" />
                  <Text weight="bold" size="1">
                    End Survey
                  </Text>
                </Flex>
              </Box>
              <Text
                as="div"
                size="1"
                color="gray"
                style={{ color: data.subtitleColor }}
              >
                Info (Trigger an end to USSD flow menu)
              </Text>
            </Box>
          </Flex>
        </Card>
      </Box>
    </Box>
  );
};

Index.propTypes = {
  data: PropTypes.object.isRequired,
  isConnectable: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default Index;
