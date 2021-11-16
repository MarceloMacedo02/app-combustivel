import {
  Alert, Box, Breadcrumbs, Button, Card, CardContent,
  FormControl, FormLabel, Grid, InputLabel, Link, makeStyles, MenuItem, Paper, Select, TextField, Typography
} from "@material-ui/core";
import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import FielTextHook from "../../../components/FielTextHook";
import SelectComponent from "../../../components/SelectComponent";
import { Veiculo } from "../../../types/Veiculo";
import { requestBackend } from "../../../util/requests";

interface StatusVeiculoProps {
  register: any,
  setValue: any,
  getValues: any,
  errors: any | null,
  veiculo: Veiculo,
  setveiculo
}

function StatusVeiculo({ register, errors, setValue, veiculo, setveiculo, getValues }: StatusVeiculoProps) {
  ;

  const [setores, setsetores] = useState([])
  const [usuarios, setusuarios] = useState([])
  const onFilter = () => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/setores`,

    };
    requestBackend(params).then(
      (rest) => {
        setsetores(rest.data);
      }
    );


  }
  const onfilterUsuarios = () => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/usuarios`,

    };
    requestBackend(params).then(
      (rest) => {
        setusuarios(rest.data);
      });
  }
  useEffect(() => {
    onFilter();
    onfilterUsuarios();
  }, [])
  return (
    <>
      <Card sx={{ m: 1, mt: 2, }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item lg={4}>
              <SelectComponent defaultFieldValue={veiculo.maquinario}
                option={[{ value: 'Sim', title: "Sim" }, { value: "Não", title: 'Não' }]}
                dataField={'maquinario'} titleField={"Maquinário"} register={register}
                errors={errors.maquinario} getValues={getValues} setValue={setValue} />


            </Grid>

            <Grid item lg={4}>
              <SelectComponent defaultFieldValue={veiculo.ativo}
                option={[{ value: 'Sim', title: "Sim" }, { value: "Não", title: 'Não' }]}
                dataField={'ativo'} titleField={"Ativo"} register={register}
                errors={errors.ativo} getValues={getValues} setValue={setValue} />


            </Grid>
            <Grid item lg={4}>
              <SelectComponent defaultFieldValue={veiculo.setor ? veiculo.setor.id : null}
                option={setores && setores.map(
                  x => ({ value: x.id, title: x.nome }))}
                dataField={'setor'} titleField={"Setor"} register={register}
                errors={errors.setor} getValues={getValues} setValue={setValue} />

            </Grid>
            <Grid item lg={4}>
              <SelectComponent defaultFieldValue={veiculo.responsavel ? veiculo.responsavel.id : null}
                option={usuarios && usuarios.map(
                  x => ({ value: x.id, title: x.nome }))}
                dataField={'responsavel'} titleField={"Responsável"} register={register}
                errors={errors.setor} getValues={getValues} setValue={setValue} />

            </Grid>

            <Grid item lg={4}>

              <SelectComponent defaultFieldValue={veiculo.conservacao ? veiculo.conservacao : null} 
                option={[{ value: 'BOM', title: "BOM" }, { value: "REGULAR", title: 'REGULAR' }, { value: "RUIM", title: 'RUIM' }]}
                dataField={'conservacao'} titleField={"Conservação"} register={register}
                errors={errors.conservacao} getValues={getValues} setValue={setValue} />
 
            </Grid>

            <Grid item lg={4}>
              <FielTextHook fieldName={"rota"} label={"Rota"} defaultFieldValue={veiculo.rota || ''}
                register={register} setValue={setValue} errors={errors.rota} />
            </Grid>


            <Grid item lg={4}>
              <FielTextHook fieldName={"imei"} label={"Imei"} defaultFieldValue={veiculo.imei || ''}
                register={register} setValue={setValue} errors={errors.imei} />
            </Grid>



            <Grid item lg={4}>
              <FielTextHook fieldName={"chip"} label={"Chip"} defaultFieldValue={veiculo.chip || ''}
                register={register} setValue={setValue} errors={errors.chip} />
            </Grid>



            <Grid item lg={4}>
              <FielTextHook fieldName={"deviceId"} label={"DeviceId"} defaultFieldValue={veiculo.deviceId || ''} type='number'
                register={register} setValue={setValue} errors={errors.deviceId} />
            </Grid>
          </Grid>

        </CardContent>
      </Card>


    </>
  );
}

export default StatusVeiculo;
