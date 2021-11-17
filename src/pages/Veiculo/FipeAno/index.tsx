import { Autocomplete, Card, CardContent, CardHeader, Container, FormLabel, Grid, TextField } from '@material-ui/core';
import { Select, Radio } from 'antd';
import { AxiosRequestConfig } from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import { clearVeiculoFip, structure, VeiculoFipe } from '../../../types/VeiculoFipe';
import { requestBackendNonCredentials } from '../../../util/requests'; 
const { Option } = Select;
interface FipeAnoProps {
  marca:structure,
  ano,anos,setano,setanos ,
  tipoVeiculo,
  modelo,
  veiculoFipeuser: VeiculoFipe, 
  outVeiculoFipe: (veiculoFipe: VeiculoFipe) => void;
}

function FipeAno({  marca, veiculoFipeuser, tipoVeiculo ,modelo,ano,anos,setano,setanos ,outVeiculoFipe}: FipeAnoProps) {

  const [label, setlabel] = useState('')

  useEffect(() => {
 //console.log(veiculoFipeuser);
 
    if (veiculoFipeuser !== null &&
      tipoVeiculo !== '' &&
      marca.label !== '' &&
      modelo.label !== ''
      ) {
      //console.log(marca);
      //console.log(tipoVeiculo);
      const l = veiculoFipeuser.anoModelo;
      const c = veiculoFipeuser.codigoano;
      let s:structure ={label: l, codigo: c };
      ;
      setlabel(c);
      setano(s);
      //console.log(s);

    }
    if (veiculoFipeuser !== null && (marca.label !== veiculoFipeuser.marca)&& (modelo.label !== veiculoFipeuser.modelo))
    {
       setlabel('');
    //console.log(modelo);
    
  }
  const params: AxiosRequestConfig = {
    method: 'GET',
    url: `https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas/${marca.codigo}/modelos/${modelo.codigo}/anos`,
  };
  // if (marcas.length > 0 && tipoVeiculo.length > 0) 
  {

    requestBackendNonCredentials(params)
      .then(
        (response) => {

          let marc: structure[] = [];
          response.data.forEach(element => {
            marc.push({ label: element.nome, codigo: element.codigo })
          });

          setanos(marc);
          //console.log(marc);
          
        }

      ).catch(
        (error) => {
          //  ////console.log(error);

        }
      );
  }
}, [modelo]);
useEffect(() => {
    let params: AxiosRequestConfig = {
      method: 'GET',
      url: `https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas/${marca.codigo}/modelos/${modelo.codigo}/anos/${ano.codigo}`,
    };

    requestBackendNonCredentials(params)
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
          fipe.tipoVeiculo = tipoVeiculo;
          fipe.valor = response.data.Valor;
          //console.log(fipe);

          //setveiculoFipe(fipe);
          outVeiculoFipe(fipe);

        }

      ).catch(
        (error) => {
          //    ////console.log(error);

        }
      );
     
    }, [ano]);

  return (
    <>
      {//modelo de veiculos
      }
      <div className=" form-group">
        <label className="form-label mt-2"> Ano Base do Veículo</label>
        <br />
        <Select size={'middle'} value={label} style={{ 'minWidth': 250 }}  
          className={` form-control-select base-input  `}
          onChange={(e) => {
            //console.log(e);
            anos.forEach(element => {
              if (element.codigo == e) { 
                setano({label:element.label,codigo:element.codigo}) ;
                setlabel(element.label)
 
              }
              //console.log(ano);
              
            });

          }} placeholder='Marca Veículo' >
          {anos.map(x => <Option key={x.codigo} value={x.codigo}> {x.label} </Option>)}
        </Select>
      </div>
    </>
  );
}

export default FipeAno;
