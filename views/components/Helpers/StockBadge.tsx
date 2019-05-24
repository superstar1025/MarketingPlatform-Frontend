import React from "react";
import classNames from "classnames";
import isNumber from "lodash/fp/isNumber";

interface IProps {
  variantCount?: number | null;
  quantity?: number | null;
}

type StockBadge = (props: IProps) => React.ReactElement<any> | null;

// TODO: localization
const StockBadge: StockBadge = ({ variantCount, quantity }) => {
  return (
    <div>
      <span
        className={classNames({
          "in-stock": isNumber(quantity) && quantity > 0,
          "out-of-stock": isNumber(quantity) && quantity <= 0
        })}
      >
        {quantity}
      </span>{" "}
      in stock{" "}
      {isNumber(variantCount) && variantCount > 0 && (
        <span>for {variantCount} variants</span>
      )}
    </div>
  );
};

export default StockBadge;
