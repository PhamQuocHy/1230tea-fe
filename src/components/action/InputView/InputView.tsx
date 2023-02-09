import { Input } from "antd";
import React from "react";

interface InputViewProps {
  value: string,
  onChange: (value: string) => void,
  planceholder: string
}

const InputView: React.FC<InputViewProps> = ({
  value,
  onChange,
  planceholder
}) => {
  return (
    <Input
      type={'text'}
      defaultValue={value}
      placeholder={planceholder}
      onChange={(value: any) => onChange(value.target.value)}
    />
  )
}


export default InputView