import React, { useEffect, useRef, useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { FiLoader } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import { useQuery } from 'react-query';
import useClickOutsideHandler from './useClickOutsideHandler';
const MultiDropdown = ({ name = '', queryKey = 'listing', queryFn = null, values = [], onChange = () => {}, placeholder = 'Select option', isRawData = false, rawData = null, displayKeyWithLabel = false }) => {
  const dropdownRef = useRef(null);
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
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
        <p className='placeholder'>{values.length > 0 ? `${values.length} ${values.length > 1 ? 'values' : 'value'} selected` : placeholder}</p>
        <div className='dropdown-bar-icons'>
          {values.length > 0 && (
            <RxCross2
              onClick={(e) => {
                e.stopPropagation();
                onChange([]);
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
          {(isLoading || isFetching) && <FiLoader className='dropdown-loader' />}
          {(!isLoading || !isFetching) && !isError && Array.isArray(listData) && listData.length === 0 && <div className='no-records'>No records</div>}
          {values.length > 0 &&
            values.map(({ label, value }, index) => (
              <DropdownListItem
                key={`${name}_${label}_${value}_${index}`}
                {...{
                  name,
                  label,
                  value,
                  index,
                  displayKeyWithLabel,
                  values,
                  checked: true,
                  onChange: () => {
                    const newState = [...values];
                    newState.splice(index, 1);
                    onChange(newState);
                  },
                }}
              />
            ))}
          <hr />
          {!search &&
            Array.isArray(listData) &&
            listData.map(({ value, label }, index) => {
              if (values.findIndex((item) => item.value === value && item.label === label) > -1) return <React.Fragment key={`${name}_${label}_${value}_${index}`}></React.Fragment>;
              return (
                <DropdownListItem
                  key={`${name}_${label}_${value}_${index}`}
                  {...{
                    name,
                    label,
                    value,
                    index,
                    displayKeyWithLabel,
                    values,
                    onChange: () => {
                      onChange([...values, { label, value }]);
                    },
                  }}
                />
              );
            })}
          {search &&
            Array.isArray(listData) &&
            listData
              .filter((item) => item.label.toLowerCase().includes(search.toLowerCase()) || item.value.includes(search))
              .map(({ value, label }, index) => {
                if (values.findIndex((item) => item.value === value && item.label === label) > -1) return <React.Fragment key={`${name}_${label}_${value}_${index}`}></React.Fragment>;
                return (
                  <DropdownListItem
                    key={`${name}_${label}_${value}_${index}`}
                    {...{
                      name,
                      label,
                      value,
                      index,
                      displayKeyWithLabel,
                      values,
                      onChange: () => {
                        onChange([...values, { label, value }]);
                      },
                    }}
                  />
                );
              })}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;

const DropdownListItem = ({ name, label, value, index, checked = false, onChange, displayKeyWithLabel, values }) => {
  return (
    <div className='multi-dropdown-list-item'>
      <input
        type='checkbox'
        checked={checked}
        id={`${name}_${label}_${value}_${index}`}
        onChange={() => {
          onChange([...values, { label, value }]);
        }}
      />
      <label htmlFor={`${name}_${label}_${value}_${index}`}>
        {label} {displayKeyWithLabel ? `(${value})` : ''}
      </label>
    </div>
  );
};
