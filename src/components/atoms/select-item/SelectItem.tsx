import React, { useEffect, useState } from 'react'
import { OptionModel } from '../../../models';
import { useFilterStore } from '../../../global/filterState';

const SelectItem = ({optionName, titleFilter}: OptionModel ) => {

  const [selectedOption, setSelectedOption] = useState<boolean>(false);

  const { setFilters, removeOption } = useFilterStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isSelected = !selectedOption;
    setSelectedOption(isSelected);
    console.log(titleFilter.toLowerCase())
    if (isSelected) {
      setFilters(event.target.value, titleFilter.toLowerCase());
    } else {
      removeOption(event.target.value, titleFilter.toLowerCase());
    }
  };

  return (
    <div className="relative">
    <input
      className="sr-only peer"
      type="checkbox"
      value={optionName}
      name={titleFilter}
      id={`${titleFilter}-${optionName}`}
      checked={selectedOption}
      onChange={(e) => handleChange(e)}
    />
    <label
      htmlFor={`${titleFilter}-${optionName}`} 
      className={`border-[1px] border-[#E5E7EB] block cursor-pointer select-none rounded-xl px-2 py-3 text-center ${
        selectedOption ? 'bg-[#EEE3FF] font-bold text-white' : ''
      } peer-checked:bg-[#EEE3FF] peer-checked:font-normal peer-checked:text-[#8054C7]`}
    >
      {optionName}
    </label>
  </div>
  );
}

export default SelectItem