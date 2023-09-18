import { useState } from 'react';
import { list } from './Api';
import './App.css';
import { SingleDropdown } from './Dropdowns';
function App() {
  const [value, setValue] = useState('');
  return (
    <div style={{ display: 'flex', width: '100%', placeContent: 'center', margin: '0.8rem' }}>
      <SingleDropdown queryKey='listing' queryFn={list} value={value} onChange={(val) => setValue(val)} />
    </div>
  );
}

export default App;
