import { Select, Radio } from 'antd';
import { useEffect, useState } from 'react';
const { Option } = Select;
interface SelectComponentProps {
  defaultFieldValue: any ,
  option: { value, title }[]

  titleField: string,
  register,
  errors,
  getValues,
  setValue,
  dataField
}

function SelectComponent({ dataField, defaultFieldValue, titleField, register, errors, getValues, setValue, option }: SelectComponentProps) {

  const [state, setstate] = useState<string>()
  
  useEffect(() => {
  if(defaultFieldValue)  setstate(defaultFieldValue);
  }, [defaultFieldValue])

  const setvalue = (value) => {
    setstate(value);
    setValue( dataField , value);
  }
  return (
    <>

      <div className=" form-group">
        <label className="form-label mt-2"> {titleField}</label>
        <Select size={'middle'} value={state}   style={{'minWidth':250}}
          className={`form-control base-input ${errors ? 'is-invalid' : ''}`}
        onChange={setvalue} placeholder={titleField}> 
          { option && option.map((option) => <Option value={option.value}>{option.title}</Option>)}

        </Select>
        {errors &&errors.type === "required" && <span>This is required</span>}
      </div>
    </>
  );
}

export default SelectComponent;
