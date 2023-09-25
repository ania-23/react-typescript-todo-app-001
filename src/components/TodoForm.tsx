import React, {FormEvent, ChangeEvent} from "react";

interface Props {
  inputText: string;
  onClick: (event: FormEvent) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TodoForm: React.FC<Props> = (props) => {
  const {inputText, onClick, onChange} = props;

  return (
    <form>
      <input
        type="text"
        id="inputValue"
        value={inputText}
        onChange={onChange}
      />
      <button type="submit" onClick={onClick}>
        Add
      </button>
    </form>
  );
};

export default TodoForm;
