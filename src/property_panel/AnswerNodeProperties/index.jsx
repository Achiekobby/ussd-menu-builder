import PropTypes from "prop-types";
import ColorProperties from "../../components/ColorProperties";
import { Flex, Text, TextField } from "@radix-ui/themes";
import useStore from "../../store";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
import { MagicWandIcon } from "@radix-ui/react-icons";

const selector = (state) => ({
  updateParagraph: state.updateParagraph,
});

const Index = ({ id, data }) => {
  const { updateParagraph } = useStore(useShallow(selector));
  const [text, setText] = useState(data.text);

  useEffect(() => {
    setText(data.text);
  }, [data.text]);

  const handleChange = (evt) => {
    const newText = evt.target.value;
    setText(newText);
    updateParagraph(id, newText);
  };

  return (
    <>
      <Flex
        align="center"
        justify="center"
        style={{ marginTop: "var(--space-4)", marginBottom: "var(--space-4)" }}
      >
        <Text as="div" size="2" weight="bold" align="center">
          Answer Properties
        </Text>
      </Flex>
      <ColorProperties id={id} data={data} hasParagraph={true} />
      <Flex
        gap="2"
        align="start"
        justify="center"
        style={{
          flexDirection: "column",
          marginTop: "var(--space-4)",
          width: "100%",
          marginBottom: "var(--space-4)",
        }}
      >
        <Text
          as="div"
          size="2"
          weight="bold"
          align="center"
          style={{ display: "flex", alignItems: "center" }}
        >
          <MagicWandIcon
            style={{
              marginRight: "10px",
              padding: "5px",
              background: "#EF5F00",
              color: "#ffffff",
              borderRadius: "50%",
            }}
          />
          <span>Answer</span>
          <span style={{ color: "red", marginLeft: "5px" }}>*</span>
        </Text>
        <TextField.Root
          value={text}
          maxLength="40"
          style={{ width: "100%" }}
          onChange={handleChange}
          placeholder="Enter paragraph text here ..."
        />
        <Flex justify="end" style={{ width: "100%" }}>
          <Text as="p" style={{ fontSize: "0.65rem" }} weight="bold">
            {text.length}/40 Character(s)
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

Index.propTypes = {
  data: PropTypes.object.isRequired, // Define the shape if you know it
  id: PropTypes.string.isRequired,
};

export default Index;
