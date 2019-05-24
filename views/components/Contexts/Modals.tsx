import React from "react";
import ModalSwitch from "../Helpers/ModalSwitch";

type Props = {
  children: React.ReactNode;
};
type ModalProps =
  | {
      [key: string]: any;
    }
  | undefined;

export const ModalContext = React.createContext<{
  toggleModalType: (v: string, p: { [key: string]: any }) => void;
  modalType: string;
  modalProps?: ModalProps;
}>({
  toggleModalType: (v?: string, p?: { [key: string]: any }) => {},
  modalType: "",
  modalProps: {}
});

const ModalsProvider = ({ children }: Props) => {
  const [modalType, setModalType] = React.useState("");
  const [modalProps, setModalProps] = React.useState<ModalProps>({});

  const toggleModalType = (
    type?: string,
    modalProps?: { [key: string]: any }
  ) => {
    if (type) {
      setModalType(type);
      setModalProps(modalProps);
    } else {
      setModalType("");
      setModalProps({});
    }
  };
  return (
    <ModalContext.Provider value={{ toggleModalType, modalType, modalProps }}>
      {children}
      <ModalSwitch
        modalType={modalType}
        modalProps={modalProps}
        toggleModalType={toggleModalType}
      />
    </ModalContext.Provider>
  );
};

export default ModalsProvider;
