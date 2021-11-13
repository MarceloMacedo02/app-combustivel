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
    aquisicao?: string;
    maquinario?: boolean;
    ativo?: boolean;
    alugado?: boolean;
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
        aquisicao: '',
        maquinario: false,
        ativo: false,
        alugado: false,
        tanque: 0,
        consumoMedio: 0,
        responsavel: {
            id: 0,
            nome: '',
            email: ''
        },
        conservacao: '',
        ano: '',
        setor: {
            id: 0,
            nome: ''
        },
        tipoCombustivel: {
            id: 0,
            nome: ''
        },
        imei: '',
        chip: '',
        deviceId: 0,
        veiculoFipe:null
    }
    return veiculo;

}