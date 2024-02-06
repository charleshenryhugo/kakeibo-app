import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    fetch('/api/getIncomes')
      .then(res => res.json())
      .then(data => setIncomes(data));
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          See Incomes
        </a>
        <ul>
          {incomes.map((income, index) => (
            <li key={index}>{income['amount(yen)']}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
