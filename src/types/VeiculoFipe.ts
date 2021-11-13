export type VeiculoFipe =
    {
        valor?: string;
        marca?: string;
       
        modelo?: string;
        anoModelo?: string;
        combustivel?: string;
        codigoFipe?: string;
        mesReferencia?: string;
        tipoVeiculo?: string;
        siglaCombustivel?: string;       
        codigoano?:string;
        codigomodelo?:string;
        codigomarca?:string;

    }
    export const clearVeiculoFip=()=>{
        let fipe:VeiculoFipe;
        fipe.anoModelo='';//AnoModelo;
        fipe.codigoFipe='';//CodigoFipe;
        fipe.combustivel='';//Combustivel;
        fipe.marca='';//Marca;
        fipe.mesReferencia='';//MesReferencia;
        fipe.modelo='';//Modelo;
        fipe.siglaCombustivel='';//SiglaCombustivel;
        fipe.tipoVeiculo='';//TipoVeiculo;
        fipe.valor='';//Valor; 
        return fipe;
    }
    /*
AnoModelo: 2019
CodigoFipe: "531001-6"
: "Diesel"
: "BEPOBUS"
: "novembro de 2021 "
: "NÀSCERE URBANO (diesel)(E5)"
: "D"
: 3
: "R$ 262.413,00"
*/