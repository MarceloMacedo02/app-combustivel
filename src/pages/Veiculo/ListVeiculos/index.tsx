
import { CardContent, Card, Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import TableDef, { Column } from '../../../components/Table';
import TextFind from '../../../components/TextFind';
import { ColumnsVeiculoDTO, VeiculoDTO } from '../../../types/VeiculoDTO';
import { SpringPage } from '../../../types/vendor/spring';
import { hasAnyRoles } from '../../../util/auth';
import { requestBackend } from '../../../util/requests';
import { Edit3 as EditIcon, } from 'react-feather';
import { useNavigate } from 'react-router';
function ListVeiculos() {
  const [name, setName] = useState('');
  const [page, setPage] = useState<SpringPage<VeiculoDTO>>();
  const [numberPage, setNumberPage] = useState(0);
  const [columns, setcolumns] = useState(ColumnsVeiculoDTO());
  const [status, setstatus] = useState<boolean>(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [state, setstate] = useState('Sim');
  const controller = 'veiculos';
  const navigate = useNavigate();


  const onFilter = () => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/${controller}/pageableveiculo`,
      params: {
        value: name,
        ativo: state,
        page: numberPage,
        size: 10,
      },
    };
    requestBackend(params).then(
      (rest) => {
        let data;
        data = rest.data;
        if (status) {
          data.content.forEach(element => {
            element.edit = <a onClick={() => { navigate(`/app/veiculos/${element.id}`, { replace: true }); }} > <EditIcon size='15' /></a>
          });
        }
        setPage(data);
        console.log(data);
      }
    );
  }


  useEffect(() => {
    setstatus(hasAnyRoles(['SUPER_ADMINISTRADOR']));
    setcolumns(ColumnsVeiculoDTO());
    console.log(columns);
    if (status) {
      let cols: Column[] = ColumnsVeiculoDTO();
      cols.push({ id: "edit", label: "Edit", });
      setcolumns(cols);
    }
    console.log(columns);

    onFilter();
  }, [numberPage, name, rowsPerPage,state]);
  //

  return (
    <>
      <Card sx={{ m: 1, mt: 2, minHeight: 600 }}>
        <CardContent>
          <TextFind onFilterName={setName} addVisible={status} onSetPage={() => setNumberPage(0)}
            onClicknew={() => { navigate(`/app/veiculos/add`, { replace: true }); }} />
          <hr />
          <h5>Lista de Veículos</h5>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label" >Veículo Ativo</InputLabel>
              <Select size='small'
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={state}
                label="Veículo Ativo"
                onChange={(e)=>setstate(e.target.value)}
              > 
                <MenuItem value={'Sim'}>Sim</MenuItem>
                <MenuItem value={'Não'}>Não</MenuItem> 
              </Select> 
            </FormControl>
          </Box>

          <TableDef columns={columns} rows={page != null ? page.content : []}
            outPage={setNumberPage} pageCount={page ? page.totalPages : 0} />
        </CardContent>
      </Card>
    </>
  );
}




export default ListVeiculos;
