import {Button} from "@chakra-ui/button";
import React from "react";

interface Props {
  text: string;
  onClick: () => void;
}

const PrimaryButtonOutline: React.FC<Props> = (props) => {
  const {text, onClick} = props;

  return (
    <Button m="5px" onClick={onClick} colorScheme="teal" variant="outline">
      {text}
    </Button>
  );
};

export default PrimaryButtonOutline;
