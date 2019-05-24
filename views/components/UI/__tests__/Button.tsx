import * as React from "react";
import Button from "../Button";
import { renderTestUtil } from "../../../../setupTests";

describe(`${Button.name}`, () => {
  const buttonText = "Button Text";
  it('should always render a button with class name "button" and "button-primary" if the button is not disabled', async () => {
    const { container } = renderTestUtil({ ui: <Button>{buttonText}</Button> });
    const buttonclass = await container.querySelector(
      'button[class="button button-primary"]'
    );
    expect(buttonclass).toBeTruthy();
  });
  it('should render a button with class name "button" and "button-disabled" if the button is passed truthy disabled prop', async () => {
    const { container } = renderTestUtil({
      ui: <Button disabled={true}>{buttonText}</Button>
    });
    const buttonclass = await container.querySelector(
      'button[class="button button-disabled"]'
    );
    expect(buttonclass).toBeTruthy();
  });
  it('should render a button with class name "button" and class names passed via classes prop', async () => {
    const className = "button-secondary";
    const { container } = renderTestUtil({
      ui: (
        <Button disabled={false} className={className}>
          {buttonText}
        </Button>
      )
    });
    const buttonclass = await container.querySelector(
      `button[class="button ${className}"]`
    );
    expect(buttonclass).toBeTruthy();
  });
  it("should render a disabled button if the button is passed truthy disabled prop", async () => {
    const { container } = renderTestUtil({
      ui: <Button disabled={true}>{buttonText}</Button>
    });
    const disabledButton = await container.querySelector("button[disabled]");
    expect(disabledButton).toBeTruthy();
  });
  it('should render a button with type "button" by default', async () => {
    const { container } = renderTestUtil({ ui: <Button>{buttonText}</Button> });
    const buttonType = await container.querySelector('button[type="button"]');
    expect(buttonType).toBeTruthy();
  });
  it("should render a button with type prop that is passed", async () => {
    const { container } = renderTestUtil({
      ui: <Button type="submit">{buttonText}</Button>
    });
    const buttonType = await container.querySelector('button[type="submit"]');
    expect(buttonType).toBeTruthy();
  });
  it("should render button children", async () => {
    const { getByText } = renderTestUtil({ ui: <Button>{buttonText}</Button> });
    const buttonChildren = await getByText(buttonText);
    expect(buttonChildren).toBeTruthy();
  });
});
