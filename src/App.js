import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  let firstLoad = true
  const [data, setData] = useState();
  const [displayData, setDisplayData] = useState();
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('All');
  const [selectedSkills, setSelectedSkills] = useState([]);

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

  const handleDesignation = (e) => {
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

  const handleSkillChange = (e, skill) => {
    const isChecked = e.target.checked;

    setSelectedSkills(prevSkills => {
      if (isChecked) {
        return [...prevSkills, skill];
      } else {
        return prevSkills.filter(prevSkill => prevSkill !== skill);
      }
    });

    setSkill()
  };

  const setSkill = () => {
    console.log(selectedSkills)
    const searchResults = data.employees.filter(employee => {
      const employeeSkills = employee.skills.map(skill => skill.toLowerCase());
      const allIncluded = employeeSkills.every(element => selectedSkills.includes(element.toLowerCase()));
      console.log(allIncluded)
      return allIncluded
    });
    console.log(searchResults)

    setDisplayData({ employees: searchResults });
  }

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
          onChange={handleDesignation}
        >
          <option value="All">All Designations</option>
          {data &&
            data.employees &&
            [...new Set(data.employees.map(employee => employee.designation))].map((designation, index) => (
              <option key={index} value={designation}>{designation}</option>
            ))}
        </select>
        <div>
          <label>Skills:</label>
          <input
            type="checkbox"
            value="Python"
            checked={selectedSkills.includes("Python")}
            onChange={(e) => handleSkillChange(e, "Python")}
          />
          <span>Python</span>
          <input
            type="checkbox"
            value="SQL"
            checked={selectedSkills.includes("SQL")}
            onChange={(e) => handleSkillChange(e, "SQL")}
          />
          <span>SQL</span>
          <input
            type="checkbox"
            value="Javascript"
            checked={selectedSkills.includes("javascript")}
            onChange={(e) => handleSkillChange(e, "javascript")}
          />
          <span>Javascript</span>
          <input
            type="checkbox"
            value="Manual Testing"
            checked={selectedSkills.includes("Manual Testing")}
            onChange={(e) => handleSkillChange(e, "Manual Testing")}
          />
          <span>Photoshop</span>
          <input
            type="checkbox"
            value="Photoshop"
            checked={selectedSkills.includes("javascript")}
            onChange={(e) => handleSkillChange(e, "javascript")}
          />
          
          {/* Add more checkboxes for other skills */}
        </div>

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
