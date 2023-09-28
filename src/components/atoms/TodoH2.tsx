import React from "react";

interface Props {
  status: 0 | 1 | 2;
}

const TodoH2: React.FC<Props> = (props) => {
  const {status} = props;
  let text = "";

  switch (status) {
    case 0:
      text = "未着手";
      break;
    case 1:
      text = "着手中";
      break;
    case 2:
      text = "完了";
      break;
  }

  return <h2>{text}</h2>;
};

export default TodoH2;
