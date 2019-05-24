import React from "react";

import defaultImage from "../../../assets/elliot-placeholder.png";
import { BASE_IMAGE_URL } from "../../../constants/catalog";

interface IProps {
  url?: string | null;
  file?: File;
}

// TODO: iterate on this
const Thumbnail = ({ file, url }: IProps) => {
  const [preview, setPreview] = React.useState("");

  React.useEffect(() => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [file]);

  if (preview) {
    return (
      <div
        className="image-upload-thumbnail"
        style={{
          backgroundImage: `url('${preview}')`
        }}
      />
    );
  }
  if (url) {
    return (
      <div
        className="image-upload-thumbnail"
        style={{
          backgroundImage: `url('${BASE_IMAGE_URL}${url}')`
        }}
      />
    );
  }
  return (
    <div
      className="image-upload-thumbnail"
      style={{
        backgroundImage: `url('${defaultImage}')`
      }}
    />
  );
};

export default Thumbnail;
