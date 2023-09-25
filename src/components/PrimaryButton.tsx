import React from "react";

interface Props {
  text: string;
  onClick: () => void;
}

const PrimaryButton: React.FC<Props> = (props) => {
  const {text, onClick} = props;

  return (
    <button className="loginButton" onClick={onClick}>
      {text}
    </button>
  );
};

export default PrimaryButton;
