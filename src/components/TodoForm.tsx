import {Button} from "@chakra-ui/react";
import React, {FormEvent, ChangeEvent} from "react";
import PrimaryButton from "./atoms/PrimaryButton";

interface Props {
  inputText: string;
  onClick: (event: FormEvent) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TodoForm: React.FC<Props> = (props) => {
  const {onClick, onChange} = props;

  return (
    <form>
      <input type="text" id="inputValue" onChange={onChange} />
      <Button type="submit" onClick={onClick} size="xs">
        Add
      </Button>
    </form>
  );
};

export default TodoForm;
