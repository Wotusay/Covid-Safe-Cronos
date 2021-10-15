import React from 'react';

const SelectInput = ({
  item,
  handleChange,
  options,
  name,
}: {
  item: string;
  handleChange: any;
  options: string[];
  name: string;
}) => {
  return (
    <select
      className="pl-2 pr-2 capitalize border border-textColor rounded-xl bg-whiteAccent text-navyBlue"
      onChange={handleChange}
      value={item}
      name={name}
      id={name}
      required
    >
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
