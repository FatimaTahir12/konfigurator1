import React from 'react';
import { useTable } from 'react-table';
import '../CSS/Main.css';

const ResponsiveTable = ({ columns, data, updateData }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>
                  {cell.column.id === 'column0' ? (
                    <input
                      type="text"
                      placeholder="Enter value"
                      style={{ width: '100%', boxSizing: 'border-box' }}
                      value={cell.value}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        const updatedData = data.map((rowData, index) =>
                          index === row.index ? [newValue] : rowData
                        );
                        updateData(updatedData);
                      }}
                    />
                  ) : (
                    <div style={{ minWidth: '1%' }}>{cell.render('Cell')}</div>
                  )}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ResponsiveTable;
