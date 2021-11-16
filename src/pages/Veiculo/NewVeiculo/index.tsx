import { ReactNode } from 'react';
import {
  Button, Container, Paper, Box, Card,
  CardContent, Grid, CardHeader, FormControl
} from '@material-ui/core';

import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { Marcas } from '../../../types/Fipe';
import { Veiculo, veiculoBlank } from '../../../types/Veiculo';
import { VeiculoDTO } from '../../../types/VeiculoDTO';
import { VeiculoFipe } from '../../../types/VeiculoFipe';
import { requestBackend } from '../../../util/requests';
import EditFipe from '../EditFipe';
import StatusVeiculo from '../StatusVeiculo';
import RegistroVeiculo from '../RegistroVeiculo';
import { openNotificationWithIcon } from '../../../util/formatters';
interface NewVeiculoProps {
  children?: ReactNode;
}

function NewVeiculo({ }: NewVeiculoProps) {

  const [getRequest, setGetRequest] = useState('');
  const [marcas, setMarcas] = useState<Marcas[]>([]);
  const [veiculoFipe, setveiculoFipe] = useState<VeiculoDTO>({});
  const [veiculo, setveiculo] = useState<Veiculo>(veiculoBlank());
  const [param, setparam] = useState<any>(useParams())
  const getRequestMarcas = 'https://parallelum.com.br/fipe/api/v1/carros/marcas';

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
      setveiculo({...veiculo,id:response.data});
        navigate(`/app/veiculos/${response.data}`, { replace: true });
        openNotificationWithIcon('success',"Sucesso",'Dados Salvo com sucesso');
      }

    ).catch(
      (error) => {
        console.log(error);

        openNotificationWithIcon('errors',"Erro",error.message);

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
 
            <EditFipe veiculoFipeuser={veiculo.veiculoFipe ? veiculo.veiculoFipe : null} getValues={getValues} 
              outVeiculoFipe={setveiculoFipeIn} register={register} errors={errors} setValue={setValue} veiculo={veiculo}
              setveiculo={setveiculo} />
            <RegistroVeiculo setveiculo={setveiculo} getValues={getValues}
              setValue={setValue} errors={errors} veiculo={veiculo} register={register} />
            <StatusVeiculo setveiculo={setveiculo}
              setValue={setValue} errors={errors} veiculo={veiculo} register={register} getValues={getValues} />
          </Container>
        </Paper>
      </form>

    </>
  );
}

export default NewVeiculo;
