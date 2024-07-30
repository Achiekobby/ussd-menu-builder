import { Flex, Text } from "@radix-ui/themes";
import PropTypes from "prop-types";
import useStore from "../../store";
import { useShallow } from "zustand/react/shallow";

const selector = (state) => ({
  updateNodeColor: state.updateNodeColor,
  updateNodeTitleColor: state.updateNodeTitleColor,
  updateNodeSubtitleColor: state.updateNodeSubtitleColor,
});

const Index = ({ id, data, hasParagraph = false }) => {
  const { updateNodeColor, updateNodeTitleColor, updateNodeSubtitleColor } =
    useStore(useShallow(selector));


  return (
    <>
      <Flex gap="2" align="center" justify={"between"}>
        <Text size="1">Background Color</Text>
        <input
          type="color"
          value={data.color}
          onChange={(evt) => updateNodeColor(id, evt.target.value)}
          className="nodrag"
        />
      </Flex>
      <Flex gap="2" align="center" justify={"between"}>
        <Text size="1">Title Color</Text>
        <input
          type="color"
          value={data.titleColor}
          onChange={(evt) => updateNodeTitleColor(id, evt.target.value)}
          className="nodrag"
        />
      </Flex>
      <Flex gap="2" align="center" justify={"between"}>
        <Text size="1">
          {hasParagraph ? "Paragraph Color" : "Subtitle Color"}
        </Text>
        <input
          type="color"
          value={data.subtitleColor}
          onChange={(evt) => updateNodeSubtitleColor(id, evt.target.value)}
          className="nodrag"
        />
      </Flex>
    </>
  );
};

Index.propTypes = {
  data: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  hasParagraph: PropTypes.bool,
};

export default Index;
