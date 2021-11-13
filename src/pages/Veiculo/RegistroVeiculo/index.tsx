
import { Box, Card, CardContent, CardHeader, Container, FormControl, Grid } from '@material-ui/core';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import FielTextHook from "../../../components/FielTextHook";
import { ReactNode, useEffect, useState } from 'react';
import { Veiculo } from '../../../types/Veiculo';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/lab';
interface RegistroVeiculoProps {

  register: any,
  setValue: any,
  getValue?: any | null,
  errors: any | null,
  veiculo: Veiculo,setveiculo
}

function RegistroVeiculo({ register, errors, setValue, veiculo ,setveiculo}: RegistroVeiculoProps) {
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <CardHeader title='Identificação do Veículo' />
              <Grid container spacing={3}>
                <Grid item lg={4}>
                  <FielTextHook fieldName={"placa"} label={"Placa"} defaultFieldValue={veiculo.placa || ''}
                    register={register} setValue={setValue} errors={errors.placa} />
                </Grid>
                <Grid item lg={4}>
                  <FielTextHook fieldName={"chassi"} label={"Chassi"} defaultFieldValue={veiculo.chassi || ''}
                    register={register} setValue={setValue} errors={errors.chassi} />
                </Grid>
                <Grid item lg={4}>
                  <FielTextHook fieldName={"cor"} label={"Cor"} defaultFieldValue={veiculo.cor || ''}
                    register={register} setValue={setValue} errors={errors.cor} />
                </Grid>

                <Grid item lg={4}>
                  <FielTextHook fieldName={"descricao"} label={"Descrição"} defaultFieldValue={veiculo.descricao || ''}
                    register={register} setValue={setValue} errors={errors.descricao} />
                </Grid>
                <Grid item lg={4}>
                  <FielTextHook fieldName={"tombamento"} label={"Tombamento"} defaultFieldValue={veiculo.tombamento || ''}
                    register={register} setValue={setValue} errors={errors.tombamento} />
                </Grid>
                <Grid item lg={4}>
                  <FielTextHook fieldName={"tanque"} label={"Tanque"} defaultFieldValue={veiculo.tanque || ''} type='number'
                    register={register} setValue={setValue} errors={errors.tanque} />
                </Grid>
                <Grid item lg={4}>
                  <FielTextHook fieldName={"consumoMedio"} label={"Consumo Medio"} defaultFieldValue={veiculo.consumoMedio || ''}
                    type='number' register={register} setValue={setValue} errors={errors.consumoMedio} />
                </Grid>
                <Grid item lg={4}>
                  <FormControl fullWidth sx={{ m: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker 
                      disableFuture
                        inputFormat="dd/MM/yyyy"
                        label="Aquisição"
                        openTo="day"
                        views={['day', 'month', 'year']}
                        value={veiculo.aquisicao}
                        onChange={(newValue) => {
                          setValue('aquisicao', newValue);
                          setveiculo({...veiculo,aquisicao:newValue})
                        }}
                        renderInput={(params) => <TextField {...params} size='small' />}
                      />
                    </LocalizationProvider>
                  </FormControl>
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
