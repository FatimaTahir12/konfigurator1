import React from 'react';
import { useTable } from 'react-table';
import '../CSS/Main.css';
const ResponsiveTable = ({ columns, data, onAddRow, onRemoveRow }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  // Count the number of rows with "keys" set to true
  const keysRowCount = data.filter((row) => row.keys).length;

  return (
    <div className="table-container">
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup, rowIndex) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              style={{ height: rowIndex === 0 ? '20px' : rowIndex === 1 ? '30px' : '40px' }}
            >
              {headerGroup.headers.map((column, colIndex) => (
                <th
                  {...column.getHeaderProps()}
                  className={
                    column.Header === 'Pos'
                      ? 'regular-header'
                      : column.Header === 'Keys'
                      ? 'blue-header grey-header'
                      : 'blue-header'
                  }
                  colSpan={column.Header === 'Keys' ? 3 : 1}
                  rowSpan={
                    rowIndex === 0 && colIndex === 4 && keysRowCount > 0
                      ? keysRowCount * 10
                      : 1
                  }
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            if (row.original.keys) {
              return null;
            }
            return (
              <tr {...row.getRowProps()} className={row.original['Keys'] ? '' : 'grey-row'}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ResponsiveTable;
