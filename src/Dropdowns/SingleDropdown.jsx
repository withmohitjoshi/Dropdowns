import { useQuery } from 'react-query';
import '../assets/SingleDropdown.css';
import { BsChevronDown } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { FiLoader } from 'react-icons/fi';
import { useRef, useState } from 'react';

const SingleDropdown = ({ queryKey = 'listing', queryFn = null, value = '', onChange = () => { }, placeholder = 'Select option', displayKeyWithLabel = false }) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [length, setLength] = useState(10)
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKey, length],
    queryFn: () => queryFn({ length }),
    select: (data) => data?.data?.data,
    refetchOnWindowFocus: false,
    enabled: Boolean(queryFn),
  });

  return (
    <div className='dropdown' ref={dropdownRef}>
      <div className='dropdown-bar' onClick={() => setIsOpen(!isOpen)}>
        <p className='placeholder'>{placeholder}</p>
        <div className='dropdown-bar-icons'>
          {value && <RxCross2 />}
          <BsChevronDown
            style={{
              transform: `rotate(${isOpen ? '-180deg' : '0deg'})`,
            }}
          />
        </div>
      </div>
      {isOpen && <DropdownPanel {...{ search, setSearch, data, isLoading, isError, onChange, displayKeyWithLabel }} />}
    </div>
  );
};

export default SingleDropdown;

const DropdownPanel = ({ search, setSearch, isLoading, data, onChange, setLength, displayKeyWithLabel }) => {
  return (
    <>
      <div className='dropdown-panel'>
        <input className='search-bar' type='search' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='search' />
        {isLoading && <FiLoader className='dropdown-loader' />}
        {Array.isArray(data) &&
          data.length > 0 &&
          data.map(({ value, label }, index) => {
            return (
              <div className='dropdown-list' onClick={() => onChange(value)} key={index}>
                <p>{label} ({displayKeyWithLabel && value})</p>
              </div>
            );
          })}
      </div>
    </>
  );
};
