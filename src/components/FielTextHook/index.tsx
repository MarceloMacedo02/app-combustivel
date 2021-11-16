import { useEffect } from "react";


type FielTextHookProps = {
  fieldName: string ,
  type?: string | 'text';
 
  label?: string | '',
  defaultFieldValue?: any | '',
  register?: any | null,
  setValue?: any | null,
  getValue?: any | null,
  errors?: any | null
}

function FielTextHook({ defaultFieldValue, fieldName, label, register, errors, setValue,type }: FielTextHookProps) {
  const onChange = (e) => {
    if (register && setValue) {
      setValue(fieldName, e.target.value);
    }
  }
  useEffect(() => {
    if (register && setValue) {
      setValue(fieldName, defaultFieldValue);
    }
  }, [defaultFieldValue])
  return (
    <>
      <>
        <div className=" form-group">
          <label className="form-label mt-2"> {label ? label : ''}</label>
          <input defaultValue={defaultFieldValue ? defaultFieldValue : ''}
            onChange={(e) => onChange(e)}
            type={type} required
            className={`form-control base-input   ${errors ? 'is-invalid' : ''}`}
            placeholder={label ? label : ''}
            name={fieldName ? fieldName : ''}
            {...register( fieldName )}
          />
          {errors && errors === "required" && <span>Campo obrigatório</span>}
        </div>

      </>

    </>
  );
}

export default FielTextHook;
