import { Autocomplete, Card, CardContent, CardHeader, Container, TextField } from '@material-ui/core';
import { Box } from '@material-ui/system';
import { AxiosRequestConfig } from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import { Anos, Marcas, Modelos, newElementoFipe, TipVeiculo } from '../../../types/Fipe';
import { clearVeiculoFip, VeiculoFipe } from '../../../types/VeiculoFipe';
import { requestExtern } from '../../../util/requests';

interface EditFipeProps {
  outVeiculoFipe?: (veiculoFipe: VeiculoFipe) => void;
  veiculoFipeuser: VeiculoFipe;
}
type structure = {
  label: string;
  codigo: any
}
type ModelosEstructure = {
  modelos: Modelos[];
}
function EditFipe({ outVeiculoFipe, veiculoFipeuser }: EditFipeProps) {
  const [veiculoFipe, setveiculoFipe] = useState<VeiculoFipe>(null);
  const [tipoVeiculo, setTipoVeiculo] = useState('');
  const [marca, setmarca] = useState<structure>({ codigo: '', label: '' });
  const [marcas, setmarcas] = useState<structure[]>([]);
  const [modelo, setmodelo] = useState<structure>({ codigo: '', label: '' });
  const [modelos, setmodelos] = useState<structure[]>([]);
  const [ano, setAno] = useState<structure>({ codigo: '', label: '' });
  const [anos, setAnos] = useState<structure[]>([]);
  const [request, setrequest] = useState('');


  /**
   * Array filters items based on search criteria (query)
   */
  function filterItems(query, lista: structure[]) {
    var l: structure[] = lista.filter(function (el) {
      return el.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })
    if (l.length > 0) return l[0];
  }




  useEffect(() => {
    setveiculoFipe(null);
    setmarca({ codigo: '', label: '' });
    setAno({ codigo: '', label: '' });
    setmodelos([]);
    setmarcas([]);
    if (veiculoFipeuser !== null) {
      setTipoVeiculo(veiculoFipeuser.tipoVeiculo);
      setmarca({ label: veiculoFipeuser.marca, codigo: veiculoFipeuser.codigomarca });
      setmodelo({ label: veiculoFipeuser.modelo, codigo: veiculoFipeuser.codigomodelo });
      setAno({ label: veiculoFipeuser.anoModelo, codigo: veiculoFipeuser.codigoano });
    }
    let params: AxiosRequestConfig = {
      method: 'GET',
      url: `https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas`,
    };
    if (tipoVeiculo.length > 0) requestExtern(params)
      .then(
        (response) => {
          let marc: structure[] = [];
          response.data.forEach(element => {
            marc.push({ label: element.nome, codigo: element.codigo })
          });

          setmarcas(marc);
          //console.log(marcas);

        }

      ).catch(
        (error) => {
          //      //console.log(error);

        }
      );
    setAnos([]);

  }, [tipoVeiculo])


  useEffect(() => {
    setveiculoFipe(null);
    setmodelo({ codigo: '', label: '' });
    setAno({ codigo: '', label: '' });
    setmodelos([]);
    setrequest('');
    //marcas

    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas/${marca.codigo}/modelos`,
    };
    //  if (tipoVeiculo.length > 0)
    {
      requestExtern(params)
        .then(
          (response) => {
            let marc: structure[] = [];
            response.data.modelos.forEach(element => {
              marc.push({ label: element.nome, codigo: element.codigo })
            });


            //console.log(marc);

            setmodelos(marc);
          }

        ).catch(
          (error) => {
            //     //console.log(error);

          }
        );
      setAnos([]);
    }
  }, [marca]);

  useEffect(() => {
    setveiculoFipe(null);
    setAno({ codigo: '', label: '' });
    setAnos([]);
    setrequest('');
    //console.log       (`https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas/${marca.codigo}/modelos/${modelo.codigo}/anos`);
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas/${marca.codigo}/modelos/${modelo.codigo}/anos`,
    };


    // if (marcas.length > 0 && tipoVeiculo.length > 0) 
    {

      requestExtern(params)
        .then(
          (response) => {

            let marc: structure[] = [];
            response.data.forEach(element => {
              marc.push({ label: element.nome, codigo: element.codigo })
            });

            setAnos(marc);
          }

        ).catch(
          (error) => {
            //  //console.log(error);

          }
        );
    }

  }, [modelo])
  useEffect(() => {
    setveiculoFipe(null);
    //   if (marcas.length > 0 && tipoVeiculo.length > 0 && modelos.length > 0)
    {
      let params: AxiosRequestConfig = {
        method: 'GET',
        url: `https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas/${marca.codigo}/modelos/${modelo.codigo}/anos/${ano.codigo}`,
      };

      requestExtern(params)
        .then(
          (response) => {
            //setveiculoFipe(response.data);
            let fipe: VeiculoFipe = {};
            fipe.codigoano = ano.codigo;
            fipe.codigomarca = marca.codigo;
            fipe.codigomodelo = modelo.codigo;
            fipe.anoModelo = response.data.AnoModelo;
            fipe.codigoFipe = response.data.CodigoFipe;
            fipe.combustivel = response.data.Combustivel;
            fipe.marca = response.data.Marca;
            fipe.mesReferencia = response.data.MesReferencia;
            fipe.modelo = response.data.Modelo;
            fipe.siglaCombustivel = response.data.SiglaCombustivel;
            fipe.tipoVeiculo = response.data.TipoVeiculo;
            fipe.valor = response.data.Valor;
            console.log(fipe);

            //setveiculoFipe(fipe);
            outVeiculoFipe(fipe);

          }

        ).catch(
          (error) => {
            //    //console.log(error);

          }
        );
    }
  }, [ano])
  return (
    <>
      <Container maxWidth="lg">
        <Card>
          <CardContent>
            <CardHeader title='Dados Veiculos Gerais' />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={TipVeiculo()} 
              onChange={(event: any, newValue: string | null) => {
                setTipoVeiculo(newValue);
              }}
              renderInput={(params) => <TextField {...params} defaultValue={tipoVeiculo} label="Tipo" />}
            />
            <Autocomplete sx={{ mt: 3 }}
              disablePortal
              id="combo-box-demo"
              options={marcas}
              value={marca.label}

              onChange={(event, value) => {
                try {
                  let t: structure;
                  let f = JSON.stringify(value);
                  t = JSON.parse(f);
                  setmarca({ label: t.label, codigo: t.codigo });
                } catch (error) {

                }

              }}

              renderInput={(params) => <TextField   {...params} defaultValue={marca.label} label="Marca" />}
            />
            <Autocomplete sx={{ mt: 3 }}
              disablePortal
              id="combo-box-demo"
              options={modelos}
              value={modelo.label}
              onChange={(event, value) => {
                try {

                  let t: structure;
                  let f = JSON.stringify(value);
                  t = JSON.parse(f);

                  setmodelo({ label: t.label, codigo: t.codigo });
                } catch (error) {

                }

              }}
              renderInput={(params) => <TextField   {...params} defaultValue={modelo.label} label="Modelo" />}
            /> <Autocomplete sx={{ mt: 3 }}
              disablePortal
              id="combo-box-demo"
              options={anos}
              value={ano.label}
              onChange={(event, value) => {
                try {
                  let t: structure;
                  let f = JSON.stringify(value);
                  t = JSON.parse(f);
                  setAno({ label: t.label, codigo: t.codigo });
                } catch (error) {

                }
              }}
              renderInput={(params) => <TextField   {...params} defaultValue={ano.label} label="Anos" />}
            />
          </CardContent>

        </Card>
      </Container>
    </>
  );
}

export default EditFipe;
