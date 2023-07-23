import React, { useState, useEffect } from 'react';
import ResponsiveTable from './ResponsiveTable';
//import { v4 as uuidv4 } from 'uuid'; // Import the uuid function
import '../CSS/Main.css';

const App = () => {

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
      <input type="checkbox" checked={checked} onChange={onChange} />
      <div className="checkbox-square"></div>
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

  const [doorDesignations, setDoorDesignations] = useState([
    { id: 1, value: 'Tur 1' },
    { id: 2, value: 'Tur 2' },
    // Add more door designations here
  ]);

  const [data, setData] = useState([
    { id: 1, pos1: '1', designation: 'Main Door', type: 'Type A', inside: '1', outside: '1', 'pc(s)': 1, keys: false },
    { id: 2, pos1: '2', designation: 'Side Door', type: 'Type B', inside: '1', outside: '1', 'pc(s)': 1, keys: false },
    // Add more sample data here
  ]);

  const [numRowsToAdd, setNumRowsToAdd] = useState(1);

  const handleChange = (id, value) => {
    setDoorDesignations((prevDoorDesignations) =>
      prevDoorDesignations.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const handleTypeChange = (id, value) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, type: value } : item))
    );
  };

  const handleLengthChange = (id, type, value) => {
    value = parseInt(value, 10);
    if (!isNaN(value)) {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, [type]: value } : item
        )
      );
    }
  };

  const handlePcsChange = (id, value) => {
    value = parseInt(value, 10);
    if (!isNaN(value)) {
      setData((prevData) =>
        prevData.map((item) => (item.id === id ? { ...item, 'pc(s)': value } : item))
      );
    }
  };

  const handleKeysChange = (id) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, keys: !item.keys } : item))
    );
  };

  const handleAddRows = () => {
    const newRows = [];
    for (let i = 1; i <= numRowsToAdd; i++) {
      newRows.push({
        id: data.length + i,
        pos1: (data.length + i).toString(),
        designation: doorDesignations.find((item) => item.id === data.length + i)?.value || '',
        type: '',
        inside: 1,
        outside: 1,
        'pc(s)': 1,
        keys: false,
      });
    }
    setData((prevData) => [...prevData, ...newRows]);
  };

  const handleAddRows1 = () => {
    setData((prevData) => [
      ...prevData,
      {
        id: prevData.length + 1,
        pos1: (prevData.length + 1).toString(),
        designation: doorDesignations.find((item) => item.id === prevData.length + 1)?.value || '',
        type: '',
        inside: 1,
        outside: 1,
        'pc(s)': 1,
        keys: false,
      },
    ]);
  };

  const handleRemoveRow = (id) => {
    setData((prevData) => prevData.slice(0, prevData.length - 1));
  };

  useEffect(() => {
    handleAddRows();
  }, [numRowsToAdd]);

  // Define columns for the table
  const columns = React.useMemo(
    () => [
      {
        Header: ' ',
        columns: [
          {
            Header: 'Pos',
            accessor: 'pos',
            Cell: ({ value }) => <div style={{ minWidth: '1%' }}>{value}</div>,
            headerClassName: 'blue-header grey-header', // Apply both "blue-header" and "grey-header" classes to the "Pos" header
            columns: [
              {
                Header: "  ",
                accessor: 'pos1',
              }
            ]
          }
        ]
      },
      {
        Header: 'Door designation',
        accessor: 'designation',
        Cell: ({ row }) => (
          <input
            type="text"
            value={doorDesignations.find((item) => item.id === row.original.id)?.value || ''}
            onChange={(e) => handleChange(row.original.id, e.target.value)}
            placeholder={`Tur ${row.original.id}`}
            style={{ minWidth: '1%' }}
          />
        ),
        headerClassName: 'regular-header',
        width: '30%',
        minWidth: '30%',
      },
      {
        Header: 'Cylinder type',
        accessor: 'type',
        Cell: ({ row }) => (
          <select
            value={row.original.type}
            onChange={(e) => handleTypeChange(row.original.id, e.target.value)}
          >
            <option value="">Double Cylinder</option>
            <option value="a">Knob cylinder</option>
            <option value="b">half cylinder</option>
            <option value="c">padlock</option>
            <option value="d">camlock cylinder</option>
            <option value="e">rim cylinder</option>
          </select>
        ),
        headerClassName: 'regular-header',
        width: '30%',
        minWidth: '30%',
      },
      {
        Header: 'Cylinder length mm',
        accessor: 'mm',
        width: '20%',
        minWidth: '20%',
        columns: [
          {
            Header: 'Inside',
            accessor: 'inside',
            headerClassName: 'regular-header',
            Cell: ({ row }) => (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  onClick={() => {
                    const inside = parseInt(row.original.inside, 10);
                    handleLengthChange(row.original.id, 'inside', inside + 1);
                  }}
                >
                  +
                </button>
                <input className='number'
                  type="text"
                  value={row.original.inside}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/, '');
                    handleLengthChange(row.original.id, 'inside', value);
                  }}
                />
                <button
                  onClick={() => {
                    const inside = parseInt(row.original.inside, 10);
                    handleLengthChange(row.original.id, 'inside', Math.max(inside - 1, 0));
                  }}
                >
                  -
                </button>
              </div>
            ),
          },
          {
            Header: 'Outside',
            accessor: 'outside',
            headerClassName: 'regular-header',
            Cell: ({ row }) => (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  onClick={() => {
                    const outside = parseInt(row.original.outside, 10);
                    handleLengthChange(row.original.id, 'outside', outside + 1);
                  }}
                >
                  +
                </button>
                <input className='number'
                  type="text"
                  value={row.original.outside}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/, '');
                    handleLengthChange(row.original.id, 'outside', value);
                  }}
                />
                <button
                  onClick={() => {
                    const outside = parseInt(row.original.outside, 10);
                    handleLengthChange(row.original.id, 'outside', Math.max(outside - 1, 0));
                  }}
                >
                  -
                </button>
              </div>
            ),
          },
        ],
      },
      {
        Header: 'Pc(s)',
        accessor: 'pc(s)',
        headerClassName: 'bottom-header',
        Cell: ({ row }) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => {
                const pcs = parseInt(row.original['pc(s)'], 10);
                handlePcsChange(row.original.id, pcs + 1);
              }}
            >
              +
            </button>
            <input className='number'
              type="text"
              value={row.original['pc(s)']}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/, '');
                handlePcsChange(row.original.id, value);
              }}
            />
            <button
              onClick={() => {
                const pcs = parseInt(row.original['pc(s)'], 10);
                handlePcsChange(row.original.id, Math.max(pcs - 1, 0));
              }}
            >
              -
            </button>
          </div>
        ),
      },

    ],
    [doorDesignations, data.length]
  );




  const handleCheckboxChange = (rowIndex, cellIndex) => {
    const updatedCheckboxes = rightTableCheckboxes.map((row, i) =>
      row.map((checkbox, j) => (i === rowIndex && j === cellIndex ? !checkbox : checkbox))
    );
    setRightTableCheckboxes(updatedCheckboxes);
  };

  return (
    <div className='Main-div' style={{ display: 'flex', width: '90%', backgroundColor: '#F4F4F4' }}>
      <div style={{ flex: '1', width: '50%', backgroundColor: '#f0f0f0', padding: '20px' }}>
        <ResponsiveTable columns={columns} data={data} />
        <div className="last-container" style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="newbtn" onClick={handleAddRows1}>+</button>
          {data.length > 2 && <button className="newbtn" onClick={() => handleRemoveRow(data[data.length - 1].id)}>-</button>}
          <select className='select3'
            value={numRowsToAdd}
            onChange={(e) => setNumRowsToAdd(parseInt(e.target.value))}
          >
            {[...Array(150)].map((_, index) => (
              <option key={index} value={index + 1}>{index + 1}</option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ flex: '1', width: '50%', backgroundColor: '#e0e0e0', padding: '20px', overflowX: 'auto' }}>
        <h2>Right Div with Table</h2>
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
      </div>
    </div>
  );
};

export default App;
