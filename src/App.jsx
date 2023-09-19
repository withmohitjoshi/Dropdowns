import { useState } from 'react';
import { list } from './Api';
import './App.css';
import data from './assets/MOCK_DATA.json';
import { MultiDropdown, SingleDropdown } from './Dropdowns';
function App() {
  // const [value, setValue] = useState('');
  const [values, setValues] = useState([]);
  console.log('🚀 ~ file: App.jsx:8 ~ App ~ values:', values);
  return (
    <div style={{ display: 'flex', width: '100%', placeContent: 'center', margin: '0.8rem' }}>
      {/* <SingleDropdown queryKey='listing' queryFn={list} value={value} onChange={(val) => setValue(val)} /> */}
      <MultiDropdown name='multidropdown' queryKey='listing' queryFn={list} values={values} onChange={(val) => setValues(val)} />
    </div>
  );
}

export default App;
