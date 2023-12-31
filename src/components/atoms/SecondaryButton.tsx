import React from "react";

interface Props {
  text: string;
  onClick: (e: any) => void;
}

const SecondaryButton: React.FC<Props> = (props) => {
  const {text, onClick} = props;

  return (
    <button className="deleteButton" onClick={onClick}>
      {text}
    </button>
  );
};

export default SecondaryButton;
