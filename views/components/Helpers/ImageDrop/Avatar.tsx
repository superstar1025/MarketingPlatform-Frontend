import React from "react";
import defaultImage from "../../../../assets/elliot-settings-page-avatar.jpg";

const { UikAvatar } = require("../../../../@uik");

type Props = {
  updated: File[];
  avatar: Array<string>;
  avatarContent: string;
};

const Avatar = ({ updated, avatar, avatarContent }: Props) => {
  
  const [preview, setPreview] = React.useState("");
  const basePath = process.env.REACT_APP_ELLIOT_BASE_IMAGE_URL
  React.useEffect(() => {
    if (updated && updated.length !== 0) {
      setPreview(URL.createObjectURL(updated[0]));
    } else if(avatar && avatar.length !== 0) {
      if (avatar[0])
        setPreview(`${basePath}${avatar[0]}`);
    }
  }, [updated, avatar]);

  if (preview) {
    return (
      <UikAvatar
        imgUrl={ preview }
        size="extraLarge"
      />
    );
  }
  return (
    <UikAvatar
      imgUrl={ defaultImage }
      size="extraLarge"
    />
  )
};

export default Avatar;
