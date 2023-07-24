import React, { useState, useEffect } from 'react';
import '../CSS/Main.css';

const App = () => {
  const [numColsToAdd, setNumColsToAdd] = useState(1);
  const [columns, setColumns] = useState([]);

  const handleAddCols = () => {
    const newCols = [];
    for (let i = 1; i <= numColsToAdd; i++) {
      newCols.push({
        Header: `Column ${i}`,
        accessor: `col${i}`,
        Cell: ({ row }) => {
          if (row.index === 0) {
            return (
              <div>
                {/* The vertical input */}
                <input className="vertical" />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <button onClick={() => handleIncrement(row.index, i)}>+</button>
                  <input
                    type="text"
                    className="text-box"
                    placeholder="0"
                    value={data[row.index][`col${i}`]}
                    onChange={(e) => handleInputChange(e, row.index, i)}
                  />
                  <button onClick={() => handleDecrement(row.index, i)}>-</button>
                </div>
              </div>
            );
          } else {
            return (
              <input
                type="checkbox"
                checked={!!data[row.index][`col${i}`]} // !! converts the value to a boolean
                onChange={() => handleCheckboxChange(row.index, i)}
              />
            );
          }
        },
      });
    }
    return newCols;
  };

  const deleteRightTableRow = () => {
    if (numColsToAdd > 1) {
      setNumColsToAdd((prevNum) => prevNum - 1);
    }
  };

  const handleDropdownChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumColsToAdd(value);
  };

  const addRightTableRow = () => {
    setNumColsToAdd((prevNum) => prevNum + 1);
  };

  useEffect(() => {
    setColumns(handleAddCols());
  }, [numColsToAdd]);

  const [data, setData] = useState([
    { id: 1, pos1: '1', designation: 'Main Door', type: 'Type A', inside: '1', outside: '1', 'pc(s)': 1, keys: false },
    { id: 2, pos1: '2', designation: 'Side Door', type: 'Type B', inside: '1', outside: '1', 'pc(s)': 1, keys: false },
    // Add more sample data here
  ]);

  const handleInputChange = (e, rowIndex, colIndex) => {
    const { value } = e.target;
    const updatedData = data.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, [`col${colIndex}`]: value };
      }
      return row;
    });
    setData(updatedData);
  };

  const handleIncrement = (rowIndex, colIndex) => {
    const updatedData = data.map((row, index) => {
      if (index === rowIndex) {
        const currentValue = parseInt(row[`col${colIndex}`], 10);
        const newValue = isNaN(currentValue) ? 1 : currentValue + 1;
        return { ...row, [`col${colIndex}`]: newValue.toString() };
      }
      return row;
    });
    setData(updatedData);
  };

  const handleDecrement = (rowIndex, colIndex) => {
    const updatedData = data.map((row, index) => {
      if (index === rowIndex) {
        const currentValue = parseInt(row[`col${colIndex}`], 10);
        const newValue = isNaN(currentValue) ? 0 : Math.max(currentValue - 1, 0);
        return { ...row, [`col${colIndex}`]: newValue.toString() };
      }
      return row;
    });
    setData(updatedData);
  };

  const handleCheckboxChange = (rowIndex, colIndex) => {
    const updatedData = data.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, [`col${colIndex}`]: !row[`col${colIndex}`] };
      }
      return row;
    });
    setData(updatedData);
  };

  return (
    <div className="Main-div" style={{ display: 'flex', width: '90%', backgroundColor: '#F4F4F4' }}>
      <div style={{ flex: '1', width: '50%', backgroundColor: '#f0f0f0', padding: '20px' }}>
        <table>
          <thead>
            <tr className="table-row">
              {columns.map((column, index) => (
                <th key={`header-${index}`}>{column.Header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr className="table-row" key={`row-${rowIndex}`}>
                {columns.map((column, colIndex) => (
                  <td key={`row-${rowIndex}-col-${colIndex}`} className="vertical-cell">
                    {column.Cell({ row: { index: rowIndex } })}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="last-container" style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="newbtn" onClick={addRightTableRow}>
            +
          </button>
          {numColsToAdd > 1 && (
            <button className="newbtn" onClick={deleteRightTableRow}>
              -
            </button>
          )}
          <select
            className="select3"
            value={numColsToAdd}
            onChange={handleDropdownChange}
          >
            {[...Array(10)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default App;
