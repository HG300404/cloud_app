import { Input } from "antd";
import React, { useState } from "react";
import { WrapperInputStyle } from "./style";
const InputForm = (props) => {
  const { placeholder = "Input text", ...rests } = props;
  //lay value moi lan nhap ki tu vao
  const handleOnchangeInput = (e) => {
    props.onChange(e.target.value);
  };
  return (
    <>
      <WrapperInputStyle
        placeholder={placeholder}
        value={props.value}
        {...rests}
        onChange={handleOnchangeInput}
      />
    </>
  );
};
export default InputForm;
