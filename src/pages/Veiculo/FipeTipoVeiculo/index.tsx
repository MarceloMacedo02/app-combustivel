import { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { structure, VeiculoFipe } from '../../../types/VeiculoFipe';
import { requestBackendNonCredentials } from '../../../util/requests';
import {
  Card, CardContent, Container

} from '@material-ui/core';
import { Select } from 'antd';
import { TipVeiculo } from '../../../types/Fipe';
const { Option } = Select;
 
interface FipeTipoVeiculoProps {
  settipoVeiculo: (_tipoVeiculo) => void;
  veiculoFipeuser: VeiculoFipe;
  tipoVeiculo: string | '';
  setmarcas;
}

function FipeTipoVeiculo({ setmarcas, tipoVeiculo, settipoVeiculo, veiculoFipeuser, }: FipeTipoVeiculoProps) {

  useEffect(() => {

    console.log(veiculoFipeuser);
    if (veiculoFipeuser !== null) settipoVeiculo(veiculoFipeuser.tipoVeiculo);
    {
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
            console.log(marc);
            

          }

        ).catch(
          (error) => {
            //      //console.log(error);

          }
        );
    }

    console.log(tipoVeiculo, veiculoFipeuser);

  }, [veiculoFipeuser])

  return (
    <>
       
            <div className=" form-group">
              <label className="form-label mt-2"> Tipo Veículo</label>
              <br />
              <Select size={'middle'} value={tipoVeiculo} style={{ 'minWidth': 250 }} showSearch
                className={` form-control-select base-input `}
                onChange={(e) => {
                  console.log(e);
                  settipoVeiculo(e);
                }} placeholder='Tipo Veículo' >
                {TipVeiculo().map(x => <Option key={x} value={x}> {x} </Option>)}
              </Select>
            </div>
            <br />
           {/* Combustível:{veiculoFipeuser && veiculoFipeuser.combustivel}*/}
          
    </>
  );
}

export default FipeTipoVeiculo;
