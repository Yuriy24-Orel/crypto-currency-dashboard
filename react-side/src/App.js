import React from 'react';
import HistoryTable from './components/HistoryTable/HistoryTable';
import ExchangeControls from './components/ExchangeControls/ExchangeControls';

function App() {
  return (
    <div>
      <ExchangeControls />
      <HistoryTable />
    </div>
  );
}

export default App;
