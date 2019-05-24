import React from "react";

import { DateTime } from "../../../typeDefinitions/__generated__/components";
import { times } from "../../../constants/setting";

const { DateTimePicker } = require("@atlaskit/datetime-picker");

interface IProps {
  value: DateTime;
  handleChange: (e: any) => void;
}

const DateTimeRangePicker = ({ value, handleChange }: IProps) => {
  return (
    <div className="datetime-range">
      <DateTimePicker
        onChange={(newValue: DateTime) => {
          const buffer = newValue.split('+');
          const formatedValue = buffer[0]+':00.0'
          handleChange(formatedValue);
        }}
        value={value}
        hideIcon={true}
        times={times}
      />
    </div>
  );
};

export default DateTimeRangePicker;
