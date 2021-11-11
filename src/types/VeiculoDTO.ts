import { Column } from "../components/Table";
import { SampleIdDTO } from "./SampleDTO";
import { Setor } from "./Setor";
import { TipoCombustivel } from "./TipoCombustivel";
import { UsuarioDTO } from "./UsuarioDTO";

export type VeiculoDTO = {
    id?: number;
    placa?: string;
    modelo?: string;     
    cor?: string;
    tombamento?: string;    
    ativo?: boolean;    
    responsavel?: string;//usuario
    conservacao?: string;
    ano?: string;
    setor?: string;
    
}
export const ColumnsVeiculoDTO= (): Column[] => {
    var _columnsVeiculoDTO: Column[];
    _columnsVeiculoDTO = [{ id: "id", label: "ID", }, { id: "placa", label: "Placa", }, { id: "modelo", label: "Modelo", },
    { id: "cor", label: "Cor", }, { id: "tombamento", label: "Tombamento", }, { id: "ativo", label: "Ativo", },
    { id: "responsavel", label: "Responsável", }, { id: "conservacao", label: "Conservacao", }, { id: "ano", label: "Ano", }
    , { id: "setor", label: "Setor", }];
    return _columnsVeiculoDTO;
}