import React from "react";

interface IProps {
  basePrice: number;
  salePrice?: number;
}

type PriceDisplay = (props: IProps) => React.ReactElement<any>;

const PriceDisplay: PriceDisplay = ({ basePrice, salePrice }) => {
  if (salePrice && basePrice !== salePrice) {
    return (
      <span>
        <s>{basePrice && `$${basePrice}`}</s>{" "}
        <span>{salePrice && `$${salePrice}`}</span>
      </span>
    );
  } else {
    return <span>{basePrice && `$${basePrice}`}</span>;
  }
};

export default PriceDisplay;
