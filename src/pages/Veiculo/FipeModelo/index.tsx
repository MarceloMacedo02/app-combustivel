import { Autocomplete, Card, CardContent, CardHeader, Container, FormLabel, Grid, TextField } from '@material-ui/core';
import { Select, Radio } from 'antd';
import { AxiosRequestConfig } from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import { clearVeiculoFip, structure, VeiculoFipe } from '../../../types/VeiculoFipe';
import { requestBackendNonCredentials } from '../../../util/requests'; 
import FipeAno from '../FipeAno';
const { Option } = Select;
interface FipeModeloProps {
  marca: structure;
  tipoVeiculo;
  model,
  setmodel,
  setmodelos,
  modelos,
  veiculoFipeuser: VeiculoFipe;
  outMarca?: (structure) => void;
  outVeiculoFipe?: (veiculoFipe: VeiculoFipe) => void;
}

function FipeModelo({ marca, veiculoFipeuser, tipoVeiculo, model,
    setmodel,  setmodelos,  modelos,outVeiculoFipe }: FipeModeloProps) {

  const [label, setlabel] = useState('')

  const _outVeiculoFipe = (_veiculoFipe: VeiculoFipe) => {
    outVeiculoFipe(_veiculoFipe)
  }
  useEffect(() => {

    //console.log(veiculoFipeuser !== null ? veiculoFipeuser.modelo : 'nulo');
    if (veiculoFipeuser !== null &&
      tipoVeiculo !== '' &&
      marca.label !== '') {
      //console.log(marca);
      //console.log(tipoVeiculo);
      const l = veiculoFipeuser.modelo;
      const c = veiculoFipeuser.codigomodelo;
      let s: structure = { label: l, codigo: c };
      //console.log(model); 
      //console.log(s);
      setlabel(l);
      setmodel(s);
      //console.log(model);

    }
    if (veiculoFipeuser !== null && (marca.label !== veiculoFipeuser.marca)) {
      setlabel('');
      //console.log(marca);

    }
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas/${marca.codigo}/modelos`,
    };
    //  if (tipoVeiculo.length > 0)
    {
      requestBackendNonCredentials(params)
        .then(
          (response) => {
            let marc: structure[] = [];
            response.data.modelos.forEach(element => {
              marc.push({ label: element.nome, codigo: element.codigo })
            });
            setmodelos(marc);
            //console.log(marc);
          }

        ).catch(
          (error) => {
            //     ////console.log(error);

          }
        );
    }
  }, [marca]);

  return (
    <>
      {//modelo de veiculos
      }
      <div className=" form-group">
        <label className="form-label mt-2"> Modelo Veículo</label>
        <br />
        <Select size={'middle'} value={label} style={{ 'minWidth': 250 }}  
          className={` form-control-select base-input  `}
          onChange={(e) => {
            //console.log(e);
            modelos.forEach(element => {
              if (element.codigo == e) {
                setmodel(element);
                setlabel(element.label)

              }
              //console.log(model);

            });

          }} placeholder='Marca Veículo' >
          {modelos.map(x => <Option key={x.codigo} value={x.codigo}> {x.label} </Option>)}
        </Select>
      </div>

   {/*}   <FipeAno marca={marca} tipoVeiculo={tipoVeiculo} veiculoFipeuser={veiculoFipeuser} modelo={model}   outVeiculoFipe={_outVeiculoFipe}/>
   */}
   </>
  );
}

export default FipeModelo;
