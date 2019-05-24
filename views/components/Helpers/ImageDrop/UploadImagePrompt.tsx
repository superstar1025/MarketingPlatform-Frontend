import React from "react";

import { ReactComponent as Images } from "../../../../assets/images.svg";

interface IProps {
  children: React.ReactNode;
}

const UploadImagePrompt = (props: IProps) => {
  return (
    <div className="image-upload-placeholder">
      <Images />
      <div>{props.children}</div>
    </div>
  );
};

export default UploadImagePrompt;
