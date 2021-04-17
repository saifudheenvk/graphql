import React from "react";
import InputBox from "./InputBox";

const LoginForm = (props) => {
  return (
    <>
      <InputBox
        type="email"
        placeholder="Email"
        formObject={props.formObject}
        setFormObject={props.setFormObject}
      />
      <InputBox
        type="password"
        placeholder="Password"
        formObject={props.formObject}
        setFormObject={props.setFormObject}
      />
    </>
  );
};

export default LoginForm;
