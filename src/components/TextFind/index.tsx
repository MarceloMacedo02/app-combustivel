import { Paper, IconButton, InputBase } from '@material-ui/core';
import { ReactNode } from 'react';

import SearchIcon from '@mui/icons-material/Search';

interface TextFindProps {
  children: ReactNode;
}

function TextFind({ children }: TextFindProps) {
  return (
    <>
      <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'  }}
    >
       <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Pesquisar"
        inputProps={{ 'aria-label': 'pesquisar' }}
      />
       
       
    </Paper>
    </>
  );
}

export default TextFind;
