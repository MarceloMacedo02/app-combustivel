import { SampleIdDTO } from "./SampleDTO";
import { Setor } from "./Setor";
import { TipoCombustivel } from "./TipoCombustivel";

export type Veiculo = {
    id?: number;
    placa?: string;
    modelo?: SampleIdDTO;
    descricao?: string;
    chassi?: string;
    cor?: string;
    renavan?: string;
    observacao?: string;
    rota?: string;
    tombamento?: string;
    aquisicao?: string;
    maquinario?: boolean;
    ativo?: boolean;
    alugado?: boolean;
    tanque?: number;
    consumoMedio?: number;
    responsavel?: SampleIdDTO;//usuario
    conservacao?: string;
    ano?: string;
    setor?: Setor;
    tipoCombustivel?: TipoCombustivel;
    imei?: string;
    chip?: string;
    deviceId?: number;
}