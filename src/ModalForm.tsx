import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import LoginForm from "./components/LoginForm";
import PrimaryButtonOutline from "./components/atoms/PrimaryButtonOutline";
import SignUpForm from "./components/SignUpForm";
import PrimaryButton from "./components/atoms/PrimaryButton";
import {useNavigate} from "react-router-dom";

// onLogin プロパティの型アノテーションを追加
interface ModalFormProps {
  onSubmit: () => void;
  text: string;
}
export const ModalForm = ({onSubmit, text}: ModalFormProps) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  // 利用規約
  const navigate = useNavigate();
  const handleTerms = () => {
    // パラメータ
    navigate("/terms");
  };

  return (
    <>
      {text === "Login" ? (
        <PrimaryButtonOutline onClick={onOpen} text={text} />
      ) : (
        <PrimaryButton onClick={onOpen} text={text} />
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{text}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {text === "Login" ? (
              <LoginForm onSubmit={onSubmit} onClose={onClose} />
            ) : (
              <SignUpForm onSubmit={onSubmit} onClose={onClose} />
            )}
          </ModalBody>

          <ModalFooter>
            {text === "Login" ? (
              <></>
            ) : (
              <Button variant="ghost" onClick={handleTerms}>
                利用規約
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
