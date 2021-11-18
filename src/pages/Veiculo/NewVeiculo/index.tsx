import { ReactNode } from 'react';
import {
  Button, Container, Paper, Box, Card,
  CardContent, Grid, CardHeader, FormControl
} from '@material-ui/core';

import { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { Veiculo, veiculoBlank } from '../../../types/Veiculo';
import { VeiculoDTO } from '../../../types/VeiculoDTO';
import { structure, VeiculoFipe } from '../../../types/VeiculoFipe';
import { requestBackend } from '../../../util/requests';
import { openNotificationWithIcon } from '../../../util/formatters';
import RegistroVeiculo from '../RegistroVeiculo';
import FipeTipoVeiculo from '../FipeTipoVeiculo';
import FipeMarca from '../FipeMarca';
import FipeModelo from '../FipeModelo';
import FipeAno from '../FipeAno';
import StatusVeiculo from '../StatusVeiculo';
interface NewVeiculoProps {
  children?: ReactNode;
}

function NewVeiculo({ }: NewVeiculoProps) {

  const [getRequest, setGetRequest] = useState('');
  const [veiculo, setveiculo] = useState<Veiculo>(veiculoBlank());
  const [param, setparam] = useState<any>(useParams())
  const getRequestMarcas = 'https://parallelum.com.br/fipe/api/v1/carros/marcas';

  const [tipoVeiculo, settipoVeiculo] = useState('')
  const [marca, setmarca] = useState<structure>({ label: '', codigo: '' });
  const [marcas, setmarcas] = useState<structure[]>([]);
  const [model, setmodel] = useState({ label: '', codigo: '' })
  const [modelos, setmodelos] = useState<structure[]>([]);
  const [ano, setano] = useState({ label: '', codigo: '' })
  const [anos, setanos] = useState<structure[]>([]);
  const { register, handleSubmit, formState: { errors, isValid, isDirty }, setValue, getValues, } = useForm();

  const params: AxiosRequestConfig = {
    method: 'GET',
    url: getRequest,
  };
  useEffect(() => {


    if (param.id !== 'add') {
      const params: AxiosRequestConfig = {
        method: 'GET',
        url: `veiculos/${param.id}`,
      };
      requestBackend(params).then(
        (response) => {
          setveiculo(response.data);
          console.log(veiculo.veiculoFipe);

        }

      ).catch(
        (error) => {
          console.log(error);

        }
      );
    } else {
      setveiculo(veiculoBlank())
    }


  }, [param])

  const setpara = () => {
    setparam({ ...param, id: 4 });
    navigate(`/app/veiculos/${param.id}`, { replace: true });
  }
  const navigate = useNavigate();

  const onSubmit = (formdata) => {
    setValue('veiculoFipe', veiculo.veiculoFipe)
    console.log(formdata);
    if (param.id === 'add') {
      onLoad(formdata, 'POST', `veiculos/insert`);
    } else {
      onLoad(formdata, 'PUT', `veiculos/update/${veiculo.id}`);
    }

  }
  const onLoad = (formdata, metodo, _url) => {
    const params: AxiosRequestConfig = {

      method: metodo,
      url: _url,
      data: formdata
    };
    requestBackend(params).then(
      (response) => {
        //  setveiculo(response.data);
        param.id = response.data;
        setveiculo({ ...veiculo, id: response.data });
        navigate(`/app/veiculos/${response.data}`, { replace: true });
        openNotificationWithIcon('success', "Sucesso", 'Dados Salvo com sucesso');
      }

    ).catch(
      (error) => {
         
        try {
          openNotificationWithIcon('error', "Erro", error.response.data.message);
        } catch (error) {

        }
      }
    );
  }


  const setveiculoFipeIn = (_veiculoFipe: VeiculoFipe) => {
    console.log(_veiculoFipe);

    setValue('veiculoFipe', _veiculoFipe)
    setveiculo({ ...veiculo, veiculoFipe: _veiculoFipe });

  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper>
          <Card>
            <CardContent>
              <Box sx={{ mt: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >

                  {(veiculo.veiculoFipe && veiculo.veiculoFipe.codigoFipe.length > 0) && <Button type='submit'
                    color="primary"
                    variant="contained"

                  >
                    Salvar
                  </Button>
                  }
                </Box>

              </Box>

              <Container>
                <Card>
                  <CardContent>
                    <Grid container spacing={4}>
                      <Grid item lg={3}>

                        <FipeTipoVeiculo settipoVeiculo={settipoVeiculo} veiculoFipeuser={veiculo.veiculoFipe ? veiculo.veiculoFipe : null}
                          tipoVeiculo={tipoVeiculo} setmarcas={setmarcas} />

                      </Grid>
                      <Grid item lg={3}>
                        <FipeMarca tipoVeiculo={tipoVeiculo} veiculoFipeuser={veiculo.veiculoFipe ? veiculo.veiculoFipe : null}
                          setmarca={setmarca} setmarcas={setmarcas} marca={marca} marcas={marcas} />

                      </Grid>
                      <Grid item lg={3}>
                        <FipeModelo tipoVeiculo={tipoVeiculo} veiculoFipeuser={veiculo.veiculoFipe ? veiculo.veiculoFipe : null}
                          marca={marca} model={model} setmodel={setmodel} setmodelos={setmodelos} modelos={modelos} />

                      </Grid>
                      <Grid item lg={3}>
                        <FipeAno tipoVeiculo={tipoVeiculo} veiculoFipeuser={veiculo.veiculoFipe ? veiculo.veiculoFipe : null}
                          marca={marca} ano={ano} anos={anos} setano={setano} setanos={setanos} modelo={model} outVeiculoFipe={setveiculoFipeIn} />
                      </Grid>
                    </Grid>
                    Combustível:{veiculo.veiculoFipe && veiculo.veiculoFipe.combustivel}
                    <br />
                    <RegistroVeiculo setveiculo={setveiculo} getValues={getValues}
                      setValue={setValue} errors={errors} veiculo={veiculo} register={register} />
                    <StatusVeiculo setveiculo={setveiculo}
                      setValue={setValue} errors={errors} veiculo={veiculo} register={register} getValues={getValues} />

                  </CardContent>
                </Card>
              </Container>
            </CardContent>
          </Card>
        </Paper>
      </form>

    </>
  );
}

export default NewVeiculo;
