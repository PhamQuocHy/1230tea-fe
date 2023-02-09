import React from 'react'
import { Select } from 'antd'

const OptionsList = ({type, data, style, disabled, value, setValue}) => {

  return (
    <Select
      style={style}
      disabled={disabled}
      value={value}
      onChange={(selectedValue) => {
        setValue(selectedValue)
      }}
    >
      {data &&
        data.map((item, index) => {
          return (
            <Select.Option key={index} value={item.id}>
              {type === 'year' ? 'Năm ' + item.name : item.name}
            </Select.Option>
          )
        })}
    </Select>
  )
}
export default OptionsList
