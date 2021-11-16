
import { Box, Button, Card, CardContent, CardHeader, Container, FormControl, Grid, TextField } from '@material-ui/core';

import { AxiosRequestConfig, Method } from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Edit3 as EditIcon, } from 'react-feather';
import { useNavigate } from 'react-router';
import TableDef, { Column } from '../../components/Table';
import TextFind from '../../components/TextFind';
import { ColumnsSetor, Setor } from '../../types/Setor';
import { SpringPage } from '../../types/vendor/spring';
import { hasAnyRoles } from '../../util/auth';
import { requestBackend } from '../../util/requests';
import { useForm } from 'react-hook-form';
import FielTextHook from '../../components/FielTextHook';

function FormSetor() {
  const [name, setName] = useState('');
  const [page, setPage] = useState<SpringPage<Setor[]>>();
  const [numberPage, setNumberPage] = useState(0);
  const [columns, setcolumns] = useState(ColumnsSetor());
  const [status, setstatus] = useState<boolean>(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [setor, setsetor] = useState<Setor>({})
  const [update, setupdate] = useState()
  

  const controller = 'setores';
  const navigate = useNavigate();


  const { register, handleSubmit, formState: { errors, isValid }, setValue, getValues, } = useForm();

  const onFilter = () => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/${controller}/pageable`,
      params: {
        value: name,
        page: numberPage,
        size: 10,
      },
    };
    requestBackend(params).then(
      (rest) => {
        let data;
        data = rest.data;
        console.log(data);

        if (status) {
          data.content.forEach(element => {
            element.edit = <a onClick={() => editSetor(element)} > <EditIcon size='15' /></a>
          });

        }
        setPage(data);
        console.log(data);
      }
    );
  }


  useEffect(() => {
    setstatus(hasAnyRoles(['SUPER_ADMINISTRADOR']));
    setcolumns(ColumnsSetor());
    console.log(columns);
    if (status) {
      let cols: Column[] = ColumnsSetor();
      cols.push({ id: "edit", label: "Edit", });
      setcolumns(cols);
    }
    console.log(columns);

    onFilter();
  }, [numberPage, name, rowsPerPage,update]);
  //
  const onSubmit = () => {
    let s: Setor = { id: setor.id, nome: setor.nome }
    setsetor(s)
    console.log(setor);

    let _url;
    let metodo: Method;
    if (getValues('id') == 0) {
      _url = `${controller}/insert`;
      metodo = 'POST';
    }
    else {
      _url = `${controller}/update/${setor.id}`;
      metodo = 'PUT';
    }
    const params: AxiosRequestConfig = {
      method: metodo,
      url: _url,
      data: setor

    };
    requestBackend(params).then(
      (rest) => {
        setupdate(rest.data)
      })
    setOpen(false)
  }

  const newSetor = () => {
    setValue('id', 0);
    setsetor({});
    setOpen(true);
  }
  const editSetor = (_setor: Setor) => {
    setValue('id', _setor.id);
    setsetor(_setor);
    setOpen(true);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Card sx={{ m: 1, mt: 2, minHeight: 600 }}>
        <CardContent>
          <TextFind onFilterName={setName} addVisible={status} onSetPage={() => setNumberPage(0)}
            onClicknew={() => newSetor()} />
          <hr />
          <h5>Lista de Setores</h5>
          <TableDef columns={columns} rows={page != null ? page.content : []}
            outPage={setNumberPage} pageCount={page ? page.totalPages : 0} />
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"  Cadastro de Setor  "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField id="outlined-basic" label={'Setor'} variant="outlined"
                size="small" defaultValue={setor ? setor.nome : ''} onChange={(e) => setsetor({ ...setor, nome: e.target.value })}
              />


            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={onSubmit} autoFocus>Gravar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


export default FormSetor;
