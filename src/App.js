import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState();
  const [displayData, setDisplayData] = useState();
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('All');

  useEffect(() => {
    const getData = async () => {
      const temp = await axios.get("https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json");
      setData(temp.data);
      setDisplayData(temp.data);
    };
    getData();
  }, []);

  const searchUser = () => {
    const searchResults = data.employees.filter(
      employee => employee.name && employee.name.toLowerCase().includes(name.toLowerCase())
    );
    setDisplayData({ employees: searchResults });
  };

  const handleSelectChange = (e) => {
    const selectedDesignation = e.target.value;
    setDesignation(selectedDesignation);

    if (selectedDesignation === 'All') {
      setDisplayData(data);
    } else {
      const searchResults = data.employees.filter(
        employee => employee.designation && employee.designation.toLowerCase().includes(selectedDesignation.toLowerCase())
      );
      setDisplayData({ employees: searchResults });
    }
  };

  const cancelOperation = () => {
    setDisplayData(data);
  };

  return (
    <div>
      <h1>Developer Directory</h1>
      <div>
        <input
          type="text"
          id="searchName"
          placeholder="Search by Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={searchUser}>Search</button>
        <select
          id="searchDesignation"
          value={designation}
          onChange={handleSelectChange}
        >
          <option value="All">All Designations</option>
          {data &&
            data.employees &&
            [...new Set(data.employees.map(employee => employee.designation))].map((designation, index) => (
              <option key={index} value={designation}>{designation}</option>
            ))}
        </select>
        <button onClick={cancelOperation}>Cancel</button>
      </div>

      <table id="developersTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {displayData && displayData.employees && displayData.employees.map((employee) => (
            <tr>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.designation}</td>
              <td>{employee.skills.join(', ')}</td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
