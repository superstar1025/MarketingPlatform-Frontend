import React from "react";
import ReactQuill from "react-quill";
import { FormikProps } from "formik";

interface IProps {
  value: string;
  handleChange: (e: any) => void;
}
const RichTextEditor = ({ handleChange, value }: IProps) => {
  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={{
          toolbar: [
            ["bold", "italic", "underline"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { align: "" },
              { align: "center" },
              { align: "right" }
            ]
          ],
          clipboard: {
            matchVisual: false
          }
        }}
        value={value}
        onChange={newValue => {
          handleChange(newValue);
        }}
      />
    </div>
  );
};

export default RichTextEditor;
