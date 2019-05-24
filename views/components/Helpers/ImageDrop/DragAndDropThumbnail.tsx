import React from "react";
import { SortableElement } from "react-sortable-hoc";

import defaultImage from "../../../../assets/elliot-placeholder.png";
import { BASE_IMAGE_URL } from "../../../../constants/catalog";

type Props = {
  url?: string;
  file?: File;
  index: number;
};

const DragAndDropThumbnail = ({ url, file }: Props) => {
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
      <li
        className="draggable-item image-upload-thumbnail"
        style={{
          backgroundImage: `url('${preview}')`
        }}
      />
    );
  }
  if (url) {
    return (
      <li
        className="draggable-item image-upload-thumbnail"
        style={{
          backgroundImage: `url('${BASE_IMAGE_URL}${url}')`
        }}
      />
    );
  }
  return (
    <li
      className="draggable-item image-upload-thumbnail"
      style={{
        backgroundImage: `url('${defaultImage}')`
      }}
    />
  );
};

export default SortableElement(DragAndDropThumbnail);
