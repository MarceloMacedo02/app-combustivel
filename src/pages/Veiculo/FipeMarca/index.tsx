import { Autocomplete, Card, CardContent, CardHeader, Container, FormLabel, Grid, TextField } from '@material-ui/core';
import { Select, Radio } from 'antd';
import { AxiosRequestConfig } from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import { clearVeiculoFip, structure, VeiculoFipe } from '../../../types/VeiculoFipe';
import { requestBackendNonCredentials } from '../../../util/requests';
import FipeModelo from '../FipeModelo';
const { Option } = Select;

interface FipoMarcaProps {
  tipoVeiculo;
  setmarca,
  setmarcas,
  marca,
  marcas,
  veiculoFipeuser: VeiculoFipe;
  outVeiculoFipe?: (veiculoFipe: VeiculoFipe) => void;
}

function FipeMarca({ tipoVeiculo, setmarca, setmarcas, marca,marcas, veiculoFipeuser, outVeiculoFipe }: FipoMarcaProps) {


  const _outVeiculoFipe = (_veiculoFipe: VeiculoFipe) => {
    outVeiculoFipe(_veiculoFipe)
  }


  const [stateveiculoFipe, setstateveiculoFipe] = useState<VeiculoFipe>(veiculoFipeuser);
  useEffect(() => {
    if (veiculoFipeuser !== null && stateveiculoFipe == null)
      setstateveiculoFipe(veiculoFipeuser);
    //console.log(stateveiculoFipe);
    if (veiculoFipeuser !== null && marca.label == '') setmarca({ ...marca, label: veiculoFipeuser.marca, codigo: veiculoFipeuser.codigomarca });
    if (veiculoFipeuser !== null && (tipoVeiculo !== veiculoFipeuser.tipoVeiculo)) setmarca({ label: '', codigo: '' });
    let params: AxiosRequestConfig = {
      method: 'GET',
      url: `https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas`,
    };
    if (tipoVeiculo.length > 0) requestBackendNonCredentials(params)
      .then(
        (response) => {
          let marc: structure[] = [];
          response.data.forEach(element => {
            marc.push({ label: element.nome, codigo: element.codigo })
          });
          setmarcas(marc);
          //console.log(marc);
        }
      ).catch(
        (error) => {
          //      ////console.log(error);
        }
      );
  }, [tipoVeiculo])

  return (
    <>
      {//marcas de veiculos
      }
      <div className=" form-group">
        <label className="form-label mt-2"> Marca Veículo</label>
        <br />
        <Select size={'middle'} value={marca.label} style={{ 'minWidth': 250 }}
          className={` form-control-select base-input  `}
          onChange={(e) => {
            //console.log(e);
            marcas.forEach(element => {
              if (element.codigo == e) { setmarca(element) }
            });

          }} placeholder='Marca Veículo'
        >
          {marcas.map(x => <Option key={x.codigo} value={x.codigo}> {x.label} </Option>)}
        </Select>
      </div>

      {/* <FipeModelo  outVeiculoFipe={_outVeiculoFipe} marca={marca} tipoVeiculo={tipoVeiculo} veiculoFipeuser={veiculoFipeuser}
      />/*/}

    </>
  );
}

export default FipeMarca;
