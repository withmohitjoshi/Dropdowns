import { useState } from 'react';
import { list } from './Api';
import './App.css';
import { MultiDropdown, SingleDropdown } from './Dropdowns';
function App() {
  const [value, setValue] = useState('');
  const [values, setValues] = useState([]);
  return (
    <div style={{ display: 'flex', width: '100%', placeContent: 'center', margin: '0.8rem' }}>
      <SingleDropdown queryKey='listing' queryFn={list} value={value} onChange={(val) => setValue(val)} />
      <MultiDropdown name='multidropdown' queryKey='listing' queryFn={list} values={values} onChange={(val) => setValues(val)} />
    </div>
  );
}

export default App;
