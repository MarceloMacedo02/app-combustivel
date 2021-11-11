import { Paper, Table, TableBody, TableCell, tableCellClasses, 
  TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { styled } from '@material-ui/system';
import { ReactNode, useState } from 'react';
import Pagination from '../Pagination';
/**
 * 
 */
export type Column = {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

/**
 * @description importante que id's das colunas sejam os mesmos nomes dos atributos de data
 * column= id: 'name' | 'code' | 'population' | 'size' | 'density';
 *  Data {
      name: string;
      code: string;
      population: number;
      size: number;
      density: number;
    } 
 */
type TableProps = {
  columns: Column[];
  rows: any[], 
  pageCount:number,  
  outPage:(newPage)=>void, 
}

function TableDef({ columns, rows ,outPage,pageCount}: TableProps) {  

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(newPage);
    
    outPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
 
    //rowsPerPage=+event.target.value;
    console.log(+event.target.value);
    
    outPage(+event.target.value);
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}    component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination pageCount={pageCount} range={3} onChange={outPage} />
    </>
  );
            }

export default TableDef;
