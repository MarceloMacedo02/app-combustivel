import { string } from "yup/lib/locale";
import { Contato } from "./Contato";
import { Endereco } from './Endereco';
export type Usuario = {
	id?: number;
	documento?: string;
	nome?: string;
	email?: string;
	perfil?: string;
	endereco?: Endereco;
	contato?: Contato
}