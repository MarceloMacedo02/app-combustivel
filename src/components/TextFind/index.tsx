import { Paper,   InputBase, IconButton, Divider } from '@material-ui/core';
import { ReactNode, useState } from 'react';

import { useCallback } from "react";
import { debounce } from "lodash";
import { useEffect } from "react"; 
import {
  Search as SearchIcon,
  Edit3 as EditIcon,
 UserPlus as UserplusIcon 
 
} from 'react-feather'; 
interface TextFindProps {
  onFilterName: (nome: string) => void;
  addVisible:boolean ;
  onSetPage?:( )=>void;
}

function TextFind({ onFilterName,addVisible,onSetPage }: TextFindProps) {

  const [userQuery, setUserQuery] = useState("");
  const updateQuery = () => {
    onSetPage();
    if (userQuery.length > 0) { onFilterName(userQuery) } else { onFilterName('') };
  };

  const delayedQuery = useCallback(debounce(updateQuery, 1000), [userQuery]);

  const onChangefilter = (e: any) => {

    setUserQuery(e.target.value);
  };

  useEffect(() => {
    console.log(addVisible);
    
    delayedQuery();

    return delayedQuery.cancel;
  }, [userQuery, delayedQuery]);

  return (
    <>
      <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'  }}
    >
       <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase onChange={(e) => { onChangefilter(e) }}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Pesquisar"
        inputProps={{ 'aria-label': 'pesquisar' }}
      />
       
      {addVisible &&  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />}
      {addVisible &&   <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" title="Adicionar Usuário">
        <UserplusIcon />
      </IconButton>
      }
    </Paper>
    </>
  );
}

export default TextFind;
