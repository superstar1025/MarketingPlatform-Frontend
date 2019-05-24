import React from "react";
import classnames from "classnames";
import { Spring, animated } from "react-spring";

const {
  UikButton,
  UikTopBar,
  UikTopBarSection,
  UikTopBarTitle
} = require("../../../../@uik");

export interface DropDownProps {
  className?: string;
  title?: string;
  buttonText?: string | null;
  buttonAction?: () => void;
  buttonProps?: { [key: string]: any };
  close?: () => void;
  isLoading?: boolean;
}

const UserActionTopBarDropwdownBase = ({
  className = "top-bar-ready",
  title,
  buttonText,
  buttonAction = () => {},
  buttonProps,
  close = () => {},
  isLoading
}: DropDownProps) => {
  return (
    <Spring native from={{ top: -70 }} to={{ top: 0 }}>
      {styles => (
        <animated.div
          className={classnames(className, "animated-top-bar")}
          style={styles}
        >
          <UikTopBar>
            <UikTopBarSection>
              <UikTopBarTitle className="top-bar-title">{title}</UikTopBarTitle>
            </UikTopBarSection>

            <UikTopBarSection>
              {buttonText && (
                <UikButton
                  transparent
                  className="top-bar-button"
                  onClick={buttonAction}
                  {...buttonProps}
                  isLoading={isLoading}
                >
                  {buttonText}
                </UikButton>
              )}
              <UikButton transparent className="top-bar-button" onClick={close}>
                <i className="icofont-close" />
              </UikButton>
            </UikTopBarSection>
          </UikTopBar>
        </animated.div>
      )}
    </Spring>
  );
};

export default UserActionTopBarDropwdownBase;
