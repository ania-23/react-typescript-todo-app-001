import React, {FormEvent, ChangeEvent, useState} from "react";

interface Props {
  inputText: string;
  onClick: (event: FormEvent) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLFormElement>) => void;
}

const TodoForm: React.FC<Props> = (props) => {
  const {inputText, onClick, onChange, onBlur} = props;

  const [isFocusInsideForm, setIsFocusInsideForm] = useState(false);

  //   // フォーカスがフォーム内にあるかどうかをトラッキング
  //   const handleFocusInsideForm = () => {
  //     console.log("formのなか");
  //     setIsFocusInsideForm(true);
  //   };

  // フォーカスがフォーム外に出たかどうかをトラッキング
  const handleFocusOutsideForm = () => {
    console.log("formのそと");
    setIsFocusInsideForm(false);
  };

  return (
    // <form onBlur={onBlur} onFocus={handleFocusInsideForm}>
    <form onBlur={onBlur}>
      <input
        type="text"
        id="inputValue"
        value={inputText}
        onChange={onChange}
      />
      <button
        type="submit"
        // onClick={(event) => {
        //   // フォーカスがフォーム内にある場合のみ処理を実行
        //   if (isFocusInsideForm) {
        //     onClick(event);
        //   }
        // }}
        // onFocus={handleFocusInsideForm}
        onClick={onClick}
        // onBlur={handleFocusOutsideForm}
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
