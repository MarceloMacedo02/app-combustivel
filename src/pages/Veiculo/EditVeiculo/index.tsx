import { Alert, Box, Breadcrumbs, Button, Card, CardContent, 
  FormControl, FormLabel, Grid, Link, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import FielTextHook from "../../../components/FielTextHook";
import { Veiculo } from "../../../types/Veiculo";
import { useState } from "react";


function EditVeiculo() {
  let params = useParams();
  const { register, handleSubmit, formState: { errors, isValid }, setValue, getValues, } = useForm();

  const [veiculo, setVeiculo] = useState<Veiculo>({})

  const onSubmit = (data) => {

    console.log(data);

  }
  return (
    <>
      <Card>
        <CardContent>
          <Breadcrumbs maxItems={2} aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/app/veiculos">
              Veículos
            </Link>

            <Typography color="text.primary">Editar Veículo</Typography>
          </Breadcrumbs>

        </CardContent>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mt: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <Button>
                Import
              </Button>
              <Button sx={{ mx: 1 }}>
                Export
              </Button>
              <Button type='submit'
                color="primary"
                variant="contained"
              >
                Salvar
              </Button>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Card>
                <CardContent>
                  <Grid container spacing={4}>
                    <Grid item lg={2}>
                      <FielTextHook fieldName={"placa"} label={"Placa"} defaultFieldValue={veiculo.placa || ''}
                        register={register} setValue={setValue} errors={errors.placa} />
                    </Grid>
                    <Grid item lg={4}> 
                      <FielTextHook fieldName={"chassi"} label={"Chassi"} defaultFieldValue={veiculo.chassi || ''}
                        register={register} setValue={setValue} errors={errors.chassi} />
                    </Grid>
                    <Grid item lg={2}>
                    <FielTextHook fieldName={"cor"} label={"Cor"} defaultFieldValue={veiculo.cor || ''}
                        register={register} setValue={setValue} errors={errors.cor} />
                    </Grid>
                    <Grid item lg={4}> 
                    <FielTextHook fieldName={"descricao"} label={"Descrição"} defaultFieldValue={veiculo.descricao || ''}
                        register={register} setValue={setValue} errors={errors.descricao} />
                    </Grid>
                  </Grid>

                  
                </CardContent>
              </Card>
            </Box>
          </Box>
        </form>
      </Card>
    </>
  );
}

export default EditVeiculo;
