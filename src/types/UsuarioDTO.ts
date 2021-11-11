import { Column } from "../components/Table";

export type UsuarioDTO = {
    id?: number;
    nome?: string;
    email?: string;
}
export const ColumnsUsuarioDTO = (): Column[] => {
    var _columnsUsuarioDTO: Column[];
     
    _columnsUsuarioDTO.push({ id: "id", label: "ID", },{ id: "nome", label: "Nome", },{ id: "email", label: "Email", })

    return _columnsUsuarioDTO
}