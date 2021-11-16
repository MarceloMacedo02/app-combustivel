import { Column } from "../components/Table";

export type Setor={
    id?: number; 
	nome?: string;
}
export function ColumnsSetor(): Column[] {
    var _columnsSetor: Column[];
    _columnsSetor = [{ id: "id", label: "ID", }, { id: "nome", label: "Nome", } ];
    return _columnsSetor;
}