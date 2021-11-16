import { Autocomplete, Card, CardContent, CardHeader, Container, FormLabel, Grid, TextField } from '@material-ui/core';
import { Select, Radio } from 'antd';
import { AxiosRequestConfig } from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import FielTextDisabled from '../../../components/FielTextDisabled';
import SelectComponent from '../../../components/SelectComponent';
import { Anos, Marcas, Modelos, newElementoFipe, TipVeiculo } from '../../../types/Fipe';
import { clearVeiculoFip, VeiculoFipe } from '../../../types/VeiculoFipe';
import { requestBackendNonCredentials } from '../../../util/requests';
import FipeMarca from '../FipeMarca';

const { Option } = Select;
interface EditFipeProps {
  outVeiculoFipe: (veiculoFipe: VeiculoFipe) => void;
  veiculoFipeuser: VeiculoFipe;
  register, errors, setValue, veiculo, setveiculo, getValues
}
export type structure = {
  label: string;
  codigo: any
}
type ModelosEstructure = {
  modelos: Modelos[];
}
function EditFipe({ outVeiculoFipe, veiculoFipeuser, register, errors, setValue, veiculo, setveiculo, getValues }: EditFipeProps) {
  
  const [tipoVeiculo, setTipoVeiculo] = useState('' );
  const [marca, setmarca] = useState<structure>( { label: '', codigo: '' }  );
  const [marcas, setmarcas] = useState<structure[]>([]);
  const [modelo, setmodelo] = useState<structure>( { label: '', codigo: '' } );
  const [modelos, setmodelos] = useState<structure[]>([]);
  const [ano, setAno] = useState<structure>(   { label: '', codigo: '' });
  const [anos, setAnos] = useState<structure[]>([]);
  const [request, setrequest] = useState('');

  const [statetipo, setstatetipo] = useState(false);
  const [statemarca, setstatemarca] = useState(false);
  const [statemodelo, setstatemodelo] = useState(false);
  const [stateano, setstateano] = useState(false);

  /**
   * Array filters items based on search criteria (query)
   */
  function filterItems(query, lista: structure[]) {
    var l: structure[] = lista.filter(function (el) {
      return el.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })
    if (l.length > 0) return l[0];
  }
  const _outVeiculoFipe = (_veiculoFipe: VeiculoFipe) => {
    outVeiculoFipe(_veiculoFipe)
  }
  useEffect(() => {

    console.log(veiculoFipeuser);
    if (veiculoFipeuser !== null) setTipoVeiculo(veiculoFipeuser.tipoVeiculo);
    if (veiculoFipeuser !== null) setmarca({...marca, label: veiculoFipeuser.marca, codigo: veiculoFipeuser.codigomarca }  );
    if (veiculoFipeuser !== null) setmodelo({ label: veiculoFipeuser.modelo, codigo: veiculoFipeuser.codigomodelo });
    if (veiculoFipeuser !== null) setAno({ label: veiculoFipeuser.anoModelo, codigo: veiculoFipeuser.codigoano });

    console.log(marca);

 
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
      <Container maxWidth="lg">
        <Card>
          <CardContent>
            <div className=" form-group">
              <label className="form-label mt-2"> Tipo Veículo</label>
              <br />
              <Select size={'middle'} value={tipoVeiculo} style={{ 'minWidth': 250 }} showSearch
                className={` form-control-select base-input ${errors.tipoVeiculo ? 'is-invalid' : ''}`}
                onChange={(e) => {
                  console.log(e);
                  setTipoVeiculo(e);
                }} placeholder='Tipo Veículo' >
                {TipVeiculo().map(x => <Option key={x} value={x}> {x} </Option>)}
              </Select>
            </div>

            <FipeMarca tipoVeiculo={tipoVeiculo} veiculoFipeuser={veiculoFipeuser} _marca={marca ? marca : null}
            outVeiculoFipe={_outVeiculoFipe} />
 
            <br/>
            Combustível:{veiculoFipeuser && veiculoFipeuser.combustivel}   
          </CardContent>

        </Card>
      </Container>
    </>
  );
}

export default EditFipe;
