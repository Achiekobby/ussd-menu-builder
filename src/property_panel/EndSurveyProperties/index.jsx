import PropTypes from "prop-types";
import ColorProperties from "../../components/ColorProperties";
import { Flex, Text } from "@radix-ui/themes";

const Index = ({ id, data }) => {
  return (
    <>
      <Flex
        align="center"
        justify="center"
        style={{ marginTop: "var(--space-4)", marginBottom: "var(--space-4)" }}
      >
        <Text as="div" size="2" weight="bold" align="center">
          End Survey Properties
        </Text>
      </Flex>
      <ColorProperties id={id} data={data} />
    </>
  );
};

Index.propTypes = {
  data: PropTypes.object.isRequired, // Define the shape if you know it
  id: PropTypes.string.isRequired,
};

export default Index;
