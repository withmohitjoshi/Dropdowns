import { useQuery } from 'react-query';
import { BsChevronDown } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { FiLoader } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import useClickOutsideHandler from './useClickOutsideHandler';

const SingleDropdown = ({ queryKey = 'listing', queryFn = null, value = '', onChange = () => {}, placeholder = 'Select option', displayKeyWithLabel = false, isRawData = false, rawData = null }) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [listData, setListData] = useState([]);

  const {
    data: apiData,
    isSuccess,
    isError,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [queryKey, length],
    queryFn: () => queryFn({ length }),
    select: (data) => data?.data?.data,
    refetchOnWindowFocus: false,
    enabled: Boolean(queryFn) && !isRawData,
    retry: 0,
  });

  useClickOutsideHandler(dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    if (Array.isArray(apiData) && apiData.length > 0 && isSuccess) {
      setListData(apiData);
    }
  }, [isSuccess, apiData]);

  useEffect(() => {
    if (isRawData && Array.isArray(rawData) && rawData.length > 0) {
      setListData(rawData);
    }
  }, [isRawData, rawData]);

  return (
    <div className='dropdown' ref={dropdownRef}>
      <div
        className='dropdown-bar'
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <p className='placeholder'>{value ? listData.find((item) => item.value === value)?.label ?? placeholder : placeholder}</p>
        <div className='dropdown-bar-icons'>
          {value && (
            <RxCross2
              onClick={(e) => {
                e.stopPropagation();
                onChange('');
              }}
            />
          )}
          <BsChevronDown
            style={{
              transform: `rotate(${isOpen ? '-180deg' : '0deg'})`,
            }}
          />
        </div>
      </div>
      {isOpen && (
        <div className='dropdown-panel'>
          <input className='search-bar' type='search' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='search' />
          {isError && <div className='no-records'>Error while getting list</div>}
          {(isLoading || isFetching) && <FiLoader className='dropdown-loader' />}
          {(!isLoading || !isFetching) && !isError && Array.isArray(listData) && listData.length === 0 && <div className='no-records'>No records</div>}
          {!search && Array.isArray(listData) && listData.length > 0 && listData.map(({ value, label }, index, arr) => <DropdownListItem {...{ index, label, value, displayKeyWithLabel, onChange, arr }} key={index} />)}
          {search && Array.isArray(listData) && listData.length > 0 && listData.filter(({ value, label }) => label.toLowerCase().includes(search.toLowerCase()) || value.includes(search)).map(({ value, label }, index) => <DropdownListItem {...{ index, label, value, displayKeyWithLabel, onChange, arr }} key={index} />)}
        </div>
      )}
    </div>
  );
};

export default SingleDropdown;

const DropdownListItem = ({ index, label, arr, value, displayKeyWithLabel, onChange }) => {
  return (
    <div
      key={index}
      className='single-dropdown-list-item'
      onClick={() => {
        onChange(value);
      }}
    >
      <p>
        {label} {displayKeyWithLabel ? `(${value})` : ''}
      </p>
    </div>
  );
};
