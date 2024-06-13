// src/App.js
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

import './App.css';
import { useState } from 'react';

const App = () => {
  const [month, setMonth] = useState('03'); // Default to March

  return (
    <div>
      <h1>Transaction Dashboard</h1>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(m => (
          <option key={m} value={m}>{new Date(2000, m - 1).toLocaleString('default', { month: 'long' })}</option>
        ))}
      </select>
      <TransactionsTable month={month} />
      <Statistics month={month} />
      <BarChart month={month} />
      <PieChart month={month} />
    </div>
  );
};

export default App;
