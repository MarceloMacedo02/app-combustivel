
import { Box, Card, CardContent, CardHeader, Container, FormControl, FormLabel, Grid } from '@material-ui/core';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import FielTextHook from "../../../components/FielTextHook";
import { Veiculo } from '../../../types/Veiculo';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/lab';
import { DatePicker, Space } from 'antd';
import moment from 'moment';

interface RegistroVeiculoProps {

  register: any,
  setValue: any,
  getValues?: any,
  errors: any | null,
  veiculo: Veiculo,
  setveiculo
}

function RegistroVeiculo({ register, errors, setValue, veiculo, setveiculo, getValues }: RegistroVeiculoProps) {

  const dateFormat = 'DD/MM/YYYY';
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item lg={4}>

                  <FielTextHook fieldName={"placa"} label={"Placa"} defaultFieldValue={veiculo.placa}
                    register={register} setValue={setValue} errors={errors.placa} />
                </Grid>
                <Grid item lg={4}>
                  <FielTextHook fieldName={"chassi"} label={"Chassi"} defaultFieldValue={veiculo.chassi}
                    register={register} setValue={setValue} errors={errors.chassi} />
                </Grid>
                <Grid item lg={4}>
                  <FielTextHook fieldName={"renavan"} label={"Renavan"} defaultFieldValue={veiculo.renavan}
                    register={register} setValue={setValue} errors={errors.renavan} />
                </Grid>

                <Grid item lg={4}>
                  <FielTextHook fieldName={"cor"} label={"Cor"} defaultFieldValue={veiculo.cor}
                    register={register} setValue={setValue} errors={errors.cor} />
                </Grid>

                <Grid item lg={4}>
                  <FielTextHook fieldName={"descricao"} label={"Descrição"} defaultFieldValue={veiculo.descricao}
                    register={register} setValue={setValue} errors={errors.descricao} />
                </Grid>
                <Grid item lg={4}>
                  <FielTextHook fieldName={"tombamento"} label={"Tombamento"} defaultFieldValue={veiculo.tombamento}
                    register={register} setValue={setValue} errors={errors.tombamento} />
                </Grid>
                <Grid item lg={4}>
                  <FielTextHook fieldName={"tanque"} label={"Tanque"} defaultFieldValue={veiculo.tanque} type='number'
                    register={register} setValue={setValue} errors={errors.tanque} />
                </Grid>
                <Grid item lg={4}>
                  <FielTextHook fieldName={"consumoMedio"} label={"Consumo Medio"} defaultFieldValue={veiculo.consumoMedio}
                    type='number' register={register} setValue={setValue} errors={errors.consumoMedio} />
                </Grid>
                 

              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}

export default RegistroVeiculo;
function samplFormatDate(aquisicao: Date): moment.MomentInput {
  throw new Error('Function not implemented.');
}

