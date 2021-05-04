import React, { useState } from "react";

// Spread attributes to HTML elements
type ButtonProps = JSX.IntrinsicElements["button"];

function Button({ ...allProps }: ButtonProps) {
  return <button {...allProps} />;
}

// Preset attributes
type ButtonProps1 = Omit<JSX.IntrinsicElements["button"], "type">;

function Button1({ ...allProps }: ButtonProps1) {
  return <button type="button" {...allProps}></button>;
}

// Styled components
// We omit the original type and className and intersect with our own types:
type StyledButton = Omit<
  JSX.IntrinsicElements["button"],
  "type" | "className"
> & { type: "primary" | "secondary" };
function StyledButton({ type, ...allProps }: StyledButton) {
  return <Button className={`btn-${type}`} />;
}

//Required properties
type MakeRequired<T, K extends keyof T> = Omit<T, K> &
  Required<{ [P in K]: T[P] }>;

type ImgProps = MakeRequired<JSX.IntrinsicElements["img"], "src" | "alt">;

function Img({ alt, ...allProps }: ImgProps) {
  return <img alt={alt} {...allProps} />;
}

// Controlled Input
type ControlledProps = JSX.IntrinsicElements["input"] & {
  value?: string;
};

function Controlled({ value = "", onChange, ...allProps }: ControlledProps) {
  const [val, setVal] = useState(value);
  return (
    <input
      value={val}
      {...allProps}
      onChange={(e) => {
        setVal(() => e.target?.value);
        onChange && onChange(e);
      }}
    />
  );
}
