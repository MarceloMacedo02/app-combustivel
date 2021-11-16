import { FormControl, FormLabel, TextField } from '@material-ui/core';
import { ReactNode, useEffect } from 'react';

interface FielTextDisabledProps {
  fieldName: string,
  label: string,
  defaultFieldValue: any,
  type?: string | 'text'
}

function FielTextDisabled({ defaultFieldValue, fieldName, label,     type }: FielTextDisabledProps) {
 
  return (
    <>
      <FormControl fullWidth sx={{ m: 1 }}>
        <TextField id="outlined-basic" label={label} variant="outlined" type={type} disabled
          size="small" defaultValue={defaultFieldValue} name={fieldName ? fieldName : ''}   />

      </FormControl>

    </>
  );
}

export default FielTextDisabled;
