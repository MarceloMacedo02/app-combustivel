import { Paper, InputBase, IconButton, Divider } from '@material-ui/core';
import { ReactNode, useState } from 'react';

import { useCallback } from "react";
import { debounce } from "lodash";
import { useEffect } from "react";
import {
  Search as SearchIcon,
  Edit3 as EditIcon,
  PlusCircle as UserplusIcon

} from 'react-feather';

interface FindItemVeiculosProps {
  data: any[];
}

function FindItemVeiculos({ data }: FindItemVeiculosProps) {
  const [userQuery, setUserQuery] = useState("");
  const [list, setlist] = useState<any[]>([]);

  const onChangefilter = (e: any) => {
    setUserQuery(e.target.value);
  };


  /**
   * Array filters items based on search criteria (query)
   */
  const filterItems = (query) :any[]=> {    
   return   data.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) > -1);    
  }
  useEffect(() => {
    setlist([]); 
    setlist(filterItems(userQuery) );
  }, [userQuery]);

  return (
    <>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
      >
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase onChange={(e) => { onChangefilter(e) }}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Pesquisar"
          inputProps={{ 'aria-label': 'pesquisar' }}
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" title="Adicionar" >
          <UserplusIcon />
        </IconButton>

      </Paper>
    </>
  );
}

export default FindItemVeiculos;
