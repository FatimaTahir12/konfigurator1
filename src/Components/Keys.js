import React, { useState } from 'react';

const Keys = () => {
  const [Columns, setColumns] = useState([
    ['Keys'],
    ['Data 1'],
    [''],
    [''],
    [''],
  ]);
  const [numColsToAdd, setNumColsToAdd] = useState(1);
  const [incrementValue, setIncrementValue] = useState(0);

  const addNewColumn = () => {
    const newColumn = ['Data', 'Data', 'Data', 'Data'];
    setColumns((prevColumns) => [
      ...prevColumns.map((row, rowIndex) => {
        if (rowIndex === 0) return ['Keys', ...row.slice(1), ...newColumn];
        return ['', ...newColumn];
      }),
    ]);
  };

  const deleteColumn = () => {
    if (Columns[0].length > 1) {
      setColumns((prevColumns) => prevColumns.map((row) => (row.length > 1 ? row.slice(0, -1) : row)));
    }
  };

  const handleIncrement = () => {
    setIncrementValue((prevValue) => prevValue + 1);
  };

  const handleDecrement = () => {
    setIncrementValue((prevValue) => Math.max(prevValue - 1, 0));
  };

  const handleNumColsChange = (e) => {
    setNumColsToAdd(parseInt(e.target.value));
  };

  const addMultipleColumns = () => {
    for (let i = 0; i < numColsToAdd; i++) {
      addNewColumn();
    }
    setNumColsToAdd(1);
  };

  return (
    <>
      <table className="right-div" style={{ width: '7rem', backgroundColor: '#e0e0e0', padding: '20px', overflowX: 'auto' }}>
        <tbody>
          {Columns.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ height: rowIndex === 0 ? '5rem' : rowIndex === 1 ? '14rem' : '2rem' }}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  style={{
                    border: '2px solid gray',
                    width: rowIndex === 0 ? `${100 / Columns[0].length}%` : undefined,
                  }}
                >
                  {rowIndex === 1 ? (
                    <>
                      <input
                        className='vertical'
                        style={{
                          width: '208%',
                          height: '10%',
                          resize: 'none',
                          border: 'none',
                          padding: '0',
                          background: 'transparent',
                          left: '18px',
                          top: '76px',
                        }}
                        value={cell}
                        onChange={(e) => {
                          const updatedColumns = [...Columns];
                          updatedColumns[rowIndex][cellIndex] = e.target.value;
                          setColumns(updatedColumns);
                        }}
                      />
                      {cellIndex === 0 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', top: '64px' }}>
                          <button onClick={handleDecrement}>-</button>
                          <span>{incrementValue}</span>
                          <button onClick={handleIncrement}>+</button>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {rowIndex >= 2 && rowIndex <= 4 && cellIndex === 0 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                          <input type="checkbox" style={{ margin: 'auto', transform: 'scale(1.5)' }} />
                        </div>
                      )}
                      {cell}
                    </>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
    </>
  );
};

export default Keys;
