import React from 'react'

type InputProps = {
  name: string;
  id: string;
  type: "text" | "password";
  disabled?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
};


function HookRef() {
  const divRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
      if (divRef.current) {
          console.log(`hookRef div width: ${divRef.current.clientWidth}`);
      }
  }, []);

  return <div ref={divRef} style={{ width: "100%", height: "30px", backgroundColor: "orange" }} />;
}

type Props = {};
const Button = React.forwardRef<HTMLButtonElement, Props>(
  (props, forwardedRef) => (
    <button {...props} ref={forwardedRef} />
  )
);

const Input = React.forwardRef(function Input({name, type, id, disabled, inputRef, ...props}: InputProps) {
  return (
    <input
      {...props}
      name={name}
      id={id}
      disabled={disabled}
      type={type}
      ref={inputRef} />
  );
});

export default HookRef;