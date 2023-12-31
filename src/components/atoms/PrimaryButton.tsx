import {Button} from "@chakra-ui/button";
import React from "react";

interface Props {
  text: string;
  onClick: () => void;
}

const PrimaryButton: React.FC<Props> = (props) => {
  const {text, onClick} = props;

  return (
    <Button m="5px" onClick={onClick} colorScheme="teal" variant="solid">
      {text}
    </Button>
  );
};

export default PrimaryButton;
