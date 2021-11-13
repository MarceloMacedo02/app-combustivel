export const TipVeiculo = (): string[] => {
    return ['carros', 'motos', 'caminhoes']
}
export type Marcas = {
    codigo: any;
    nome: string
}
export type Modelos = {
    codigo: any;
    nome: string
}
export type Anos = {
    codigo: any;
    nome: string
}

export const newElementoFipe={codigo:'',nome:''};