import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  text: string;
  route: string;
}

const BackLink = (props: IProps) => {
  return (
    <Link to={props.route} className="back-link">
      <i className="icofont-rounded-left" />{" "}
      <span className="section-header">{props.text}</span>
    </Link>
  );
};

export default BackLink;
