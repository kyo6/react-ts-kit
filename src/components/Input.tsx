import React from "react";

type InputProps = {
  id: string;
  name: string;
  type: "text" | "password";
  disabled?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
};

const Input = ({
  name,
  type,
  id,
  disabled,
  inputRef,
  ...props
}: InputProps) => {
  return (
    <input
      {...props}
      name={name}
      id={id}
      disabled={disabled}
      type={type}
      ref={inputRef}
    />
  );
};

export default React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <Input {...props} inputRef={ref} />
})

