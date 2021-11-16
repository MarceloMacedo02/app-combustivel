import {
  Alert, Box, Breadcrumbs, Button, Card, CardContent,
  CardHeader,
  FormControl, FormLabel, Grid, InputLabel, Link, makeStyles, MenuItem, Paper, Select, TextField, Typography
} from "@material-ui/core";
import FielTextDisabled from "../../../components/FielTextDisabled";
import { Veiculo } from '../../../types/Veiculo';
import { formatDate, samplFormatDate } from "../../../util/formatters";

interface ResumoVeiculoProps {
  register: any,
  setValue: any,
  getValues: any,
  errors: any | null,
  veiculo: Veiculo,
  setveiculo
}

function ResumoVeiculo({ register, errors, setValue, veiculo, setveiculo, getValues }: ResumoVeiculoProps) {
  return (
    <>
      <Card sx={{ m: 1, mt: 2, }}>
        <CardHeader title='Resumo do Veículo' />
        <CardContent>
          <Grid container spacing={4}>

            <Grid item lg={3}>
              <FielTextDisabled fieldName={"placa"} label={"Placa"} defaultFieldValue={getValues('placa')} />
            </Grid>
            <Grid item lg={3}>
              <FielTextDisabled fieldName={"chassi"} label={"Chassi"} defaultFieldValue={getValues('chassi')} />
            </Grid>
            <Grid item lg={3}>
              <FielTextDisabled fieldName={"cor"} label={"Cor"} defaultFieldValue={getValues('cor')} />
            </Grid>
            <Grid item lg={3}>
              <FielTextDisabled fieldName={"descricao"} label={"Descrição"} defaultFieldValue={getValues('descricao')} />
            </Grid>
            <Grid item lg={3}>
              <FielTextDisabled fieldName={"tombamento"} label={"Tombamento"} defaultFieldValue={getValues('tombamento')} />
            </Grid>
            <Grid item lg={3}>
              <FielTextDisabled fieldName={"tanque"} label={"Tanque"} defaultFieldValue={getValues('tanque')} />
            </Grid>
            <Grid item lg={3}>
              <FielTextDisabled fieldName={"consumoMedio"} label={"Consumo Medio"}
                defaultFieldValue={getValues('consumoMedio')} />
            </Grid>
            <Grid item lg={3}>
              <FielTextDisabled fieldName={"aquisicao"} label={"Aquisição"} defaultFieldValue={samplFormatDate(getValues('aquisicao'))} />
            </Grid>


            <Grid item lg={3}>
              <FielTextDisabled fieldName={"valor"} label={"Valor"} defaultFieldValue={getValues('veiculoFipe.valor')} />
            </Grid>
            <Grid item lg={3}>
              <FielTextDisabled fieldName={"veiculoFipe.mesReferencia"} label={"Mês Referência"} defaultFieldValue={getValues('veiculoFipe.mesReferencia')} />
            </Grid>
            <Grid item lg={3}>
              <FielTextDisabled fieldName={"marca"} label={"Marca"} defaultFieldValue={getValues('veiculoFipe.marca')} />
            </Grid>
            <Grid item lg={3}>
              <FielTextDisabled fieldName={"modelo"} label={"Modelo"} defaultFieldValue={getValues('veiculoFipe.modelo')} />
            </Grid>
            <Grid item lg={3}>
              <FielTextDisabled fieldName={"anoModelo"} label={"Ano"} defaultFieldValue={getValues('veiculoFipe.anoModelo')} />
            </Grid>
            <Grid item lg={3}>
              <FielTextDisabled fieldName={"combustivel"} label={"Tipo Combustível"} defaultFieldValue={getValues('veiculoFipe.combustivel')} />
            </Grid>
            <Grid item lg={3}>
              <FielTextDisabled fieldName={"tipoVeiculo"} label={"Tipo Veículo"}
                defaultFieldValue={getValues('veiculoFipe.tipoVeiculo')} />
            </Grid>
            
            <Grid item lg={3}>
              <FielTextDisabled fieldName={"maquinario"} label={"Maquinário"} defaultFieldValue={getValues('maquinario')} />
            </Grid>
            <Grid item lg={3}>
              <FielTextDisabled fieldName={"ativo"} label={"Ativo"} defaultFieldValue={getValues('ativo')} />
            </Grid>
            <Grid item lg={3}>
              <FielTextDisabled fieldName={"setor"} label={"Setor"} defaultFieldValue={getValues('setor.nome')} />
            </Grid>
            <Grid item lg={3}>
              <FielTextDisabled fieldName={"responsavel"} label={"Responsável"} defaultFieldValue={getValues('responsavel.nome')} />
            </Grid>
            <Grid item lg={3}>
              <FielTextDisabled fieldName={"conservacao"} label={"Status de Conservação"} defaultFieldValue={getValues('conservacao')} />
            </Grid>
            <Grid item lg={3}>
              <FielTextDisabled fieldName={"rota"} label={"Rotal"} defaultFieldValue={getValues('rota')} />
            </Grid>
            <Grid item lg={3}>
              <FielTextDisabled fieldName={"imei"} label={"Imei"}
                defaultFieldValue={getValues('imei')} />
            </Grid>
            <Grid item lg={3}>
              <FielTextDisabled fieldName={"chip"} label={"Chip"} defaultFieldValue={getValues('chip')} />
            </Grid>
            <Grid item lg={3}>
              <FielTextDisabled fieldName={"deviceId"} label={"DeviceId"} defaultFieldValue={getValues('deviceId')} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
     
    </>
  );
}

export default ResumoVeiculo;
