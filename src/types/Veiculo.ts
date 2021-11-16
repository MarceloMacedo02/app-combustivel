import { SampleIdDTO } from "./SampleDTO";
import { Setor } from "./Setor";
import { TipoCombustivel } from "./TipoCombustivel";
import { UsuarioDTO } from "./UsuarioDTO";
import { VeiculoFipe } from "./VeiculoFipe";

export type Veiculo = {
    id?: number;
    placa?: string;//
    modelo?: SampleIdDTO;
    descricao?: string;
    chassi?: string;
    cor?: string;
    renavan?: string;
    observacao?: string;
    rota?: string;
    tombamento?: string; 
    aquisicao?: Date;
    maquinario?: string;
    ativo?: string;
    alugado?: string;
    tanque?: number;
    consumoMedio?: number;
    responsavel?: UsuarioDTO;//usuario
    conservacao?: string;
    ano?: string;
    setor?: Setor;
    tipoCombustivel?: TipoCombustivel;
    imei?: string;
    chip?: string;
    deviceId?: number;
    veiculoFipe?: VeiculoFipe;
}

export function veiculoBlank(): Veiculo {
    let veiculo: Veiculo = {
        placa: '',
        modelo: {
            id: 0
        },
        descricao: '',
        chassi: '',
        cor: '',
        renavan: '',
        observacao: '',
        rota: '',
        tombamento: '',
        aquisicao: new Date(),
        maquinario: 'Sim',
        ativo: 'Sim',
        alugado: 'Sim',
        tanque: 0,
        consumoMedio: 0, 
        conservacao: '',
        ano: '',
         
        imei: '',
        chip: '',
        deviceId: 0,
        veiculoFipe:null
    }
    return veiculo;

}