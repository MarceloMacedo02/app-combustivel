import { FormControl, FormLabel, TextField } from '@material-ui/core';
import { ReactNode, useEffect } from 'react';

interface FielTextHookProps {
  fieldName: string,
  label: string,
  defaultFieldValue: any,
  register: any,
  setValue: any,
  getValue?: any | null,
  errors : any | null
  type?: string | 'text'
}

function FielTextHook({ defaultFieldValue, fieldName, label, register, errors, setValue ,type }: FielTextHookProps) {
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
      <FormControl fullWidth sx={{ m: 1 }}>
        <TextField id="outlined-basic" label={label} variant="outlined" type={type}
          size="small" defaultValue={defaultFieldValue} name={fieldName ? fieldName : ''}  onChange={(e) => onChange(e)} 
          {...register(fieldName, { required: true })} />
        {errors && errors?.type === 'required' && <FormLabel error >Campo Requerido - {label} !</FormLabel>}

      </FormControl>

    </>
  );
}

export default FielTextHook;
