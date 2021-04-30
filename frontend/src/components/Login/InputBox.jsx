import React from "react";
import styled from "styled-components";

const Input = styled.input`
  background-color: #edebeb;
  width: 80%;
  border: none;
  padding: 11px;
  margin-bottom: 23px;
  border-radius: 8px;
  color: rgba(0, 0, 0, 0.6);
`;

const InputBox = (props) => {
  const handleChange = (e) => {
    props.setFormObject((prev) => ({
      ...prev,
      [props.type]: e.target.value,
    }));
  };

  return (
    <Input
      value={props.formObject[props.type] || ""}
      onChange={handleChange}
      placeholder={props.placeholder}
      type={props.type}
    />
  );
};

export default InputBox;
