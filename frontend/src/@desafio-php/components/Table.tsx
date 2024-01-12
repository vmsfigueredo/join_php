import React, {useEffect, useState} from 'react';
import {
  Box,
  CircularProgress,
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow as MuiTableRow,
  Theme
} from '@mui/material';
import {styled} from '@mui/styles';
import {SxProps} from '@mui/system';
import moment from 'moment';
import _ from "lodash";

export enum formatTypes {
  date,
}

export type ColumnType = {
  key: string;
  label: string | React.ReactNode;
  render?: (cell: any, row: any) => React.ReactElement | string;
  sx?: SxProps<Theme>;

  type?: formatTypes;
};
type TableProps = {
  columns: ColumnType[];
  rows: any[];
  loading?: boolean;
};
export const Table = ({columns, rows, loading}: TableProps) => {
  const [formattedData, setFormattedData] = useState<ColumnType[]>([]);
  const TableRow = styled(MuiTableRow)({
    '&:nth-of-type(odd)': {
      backgroundColor: '#fafafa'
    }
  });
  useEffect(() => {
    let result: ColumnType[] = [...rows];
    columns.map((column) => {
      result = result.map((row) => {
        switch (column.type) {
          case formatTypes.date:
            return {...row, [column.key]: moment(_.get(row, column.key)).format('DD/MM/YYYY')};
          default:
            return {...row};
        }
      });
    });
    setFormattedData(result);
  }, [rows]);
  if (columns) {
    return (
      <Paper sx={{width: '100%'}}>
        <MuiTable sx={{width: '100%', position: 'relative'}}>
          <TableHead>
            <MuiTableRow>
              {columns.map((column) => (
                <TableCell variant={'head'} key={`head-column-${column.key}`}>
                  <Box component={'div'} sx={column.sx}>
                    {column.label}
                  </Box>
                </TableCell>
              ))}
            </MuiTableRow>
          </TableHead>
          <TableBody>
            {formattedData.length > 0 ? (
              formattedData.map((row: ColumnType, index: number) => (
                <TableRow key={`row-${index}`}>
                  {columns.map((column) => {
                    if (typeof column.render !== 'undefined') {
                      return (
                        <TableCell key={`column-${column.key}-${index}`}>
                          <Box component={'div'} sx={column.sx}>
                            {column.render(_.get(row, column.key), row)}
                          </Box>
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={`column-${column.key}-${index}`}>
                        <Box component={'div'} sx={column.sx}>
                          {typeof _.get(row, column.key) !== 'undefined' ? _.get(row, column.key) : ''}
                        </Box>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} sx={{textAlign: 'center'}}>
                  Nenhum resultado encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {loading && (
            <Box
              position={'absolute'}
              padding={'5px 10px'}
              bgcolor={'rgba(255,255,255,0.7)'}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '5px;'
              }}
              component={Paper}>
              <CircularProgress/>
              Carregando
            </Box>
          )}
        </MuiTable>
      </Paper>
    );
  }

  return <></>;
};
