import React from "react";
import ReactModal from "react-modal";
import classnames from "classnames";

ReactModal.setAppElement("#root");

function getParent() {
  return document.querySelector("#root") as HTMLElement;
}

// TODO: figure out better z-index solution to ensure proper stacking
const customStyles = {
  overlay: {
    backgroundColor: "rgba(62, 63, 66, 0.75)",
    position: "fixed",
    zIndex: "1500",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

type Props = {
  isOpen: boolean;
  style?: {
    [key: string]: any;
  };
  shouldCloseOnOverlayClick?: boolean;
  handleCloseModal: () => void;
  children: React.ReactNode;
  className?: string;
};

const Modal = ({
  isOpen,
  style = {},
  shouldCloseOnOverlayClick = true,
  handleCloseModal,
  children,
  className
}: Props) => {
  return (
    <ReactModal
      className={classnames(className, "elliot-modal")}
      parentSelector={getParent}
      isOpen={isOpen}
      style={{
        ...customStyles,
        ...style
      }}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      onRequestClose={handleCloseModal}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
