import React, { useState, useEffect } from 'react';

const RightDivTable = () => {
  const initialRightTableData = [
    ['Column 1'],
    ['Data 1'],
    ['Data 6'],
    ['Data 11'],
    ['Data 16'],
  ];

  const [rightTableData, setRightTableData] = useState(initialRightTableData);

  const updatedRightTableData = rightTableData.map((row) =>
    row.map((cell) => ({
      // id: uuidv4(),
      content: cell,
    }))
  );

  const [rightTableCheckboxes, setRightTableCheckboxes] = useState(
    updatedRightTableData.map((row) => row.map(() => false))
  );

  const Checkbox = ({ checked, onChange }) => (
    <div className="checkbox">
      <input className="checkbox-square" type="checkbox" checked={checked} onChange={onChange} />
    </div>
  );

  const addRightTableColumn = () => {
    const updatedTable = rightTableData.map((row) => [...row, 'New Data']);
    setRightTableData(updatedTable);
  };

  const deleteRightTableColumn = () => {
    if (rightTableData[0].length > 1) {
      const updatedTable = rightTableData.map((row) => {
        const newRow = [...row];
        newRow.pop();
        return newRow;
      });
      setRightTableData(updatedTable);
    }
  };

  const handleCheckboxChange = (rowIndex, cellIndex) => {
    const updatedCheckboxes = rightTableCheckboxes.map((row, i) =>
      row.map((checkbox, j) => (i === rowIndex && j === cellIndex ? !checkbox : checkbox))
    );
    setRightTableCheckboxes(updatedCheckboxes);
  };

  return (
    <>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ minWidth: '600px', width: '100%', borderSpacing: '10px' }}>
          <tbody>
            {updatedRightTableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cell.id}>
                    <Checkbox
                      checked={rightTableCheckboxes[rowIndex][cellIndex]}
                      onChange={() => handleCheckboxChange(rowIndex, cellIndex)}
                    />
                    <label htmlFor={cell.id}>{cell.content}</label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={addRightTableColumn}>Add Column (+)</button>
        <button onClick={deleteRightTableColumn}>Delete Column (-)</button>
      </div>
    </>
  );
};

export default RightDivTable;
