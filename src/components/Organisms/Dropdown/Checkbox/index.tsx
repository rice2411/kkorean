import { Box, Checkbox, Svg } from "@/components/Atoms";
import { FileHelpers } from "@/helpers";
import { useClickOutside } from "@/hooks";
import React, { useRef, useState } from "react";

interface Props {
  label: string;
  id: string;
  options: { value: number; label: string }[];
  onChangeValue: (data: { id: string; data: string[] }) => void;
  className?: string;
}

const DropdownCheckbox: React.FC<Props> = ({
  id,
  label,
  options,
  onChangeValue,
  className,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [isOpenUserMenu, setIsOpenUserMenu] = useState<boolean>(false);

  const handleChange = (data: { value: string; isChecked: boolean }) => {
    const currentData = [...selectedData];

    if (data.isChecked) {
      currentData.push(data.value);
      setSelectedData(currentData);
      onChangeValue({ id, data: currentData });
      return;
    } else {
      const newData = currentData.filter((val) => val !== data.value);
      setSelectedData(newData);
      onChangeValue({ id, data: newData });
      return;
    }
  };

  useClickOutside(parentRef, dropdownRef, () => setIsOpenUserMenu(false));

  return (
    <>
      <Box
        className={`relative hover:bg-gray-200 border border-stone-300 rounded-full 
          ${
            selectedData.length > 0 &&
            "bg-primary-50 text-primary-600 border-primary-400"
          } ${className}`}
      >
        <Box
          ref={parentRef}
          onClick={() => {
            setIsOpenUserMenu((state) => !state);
          }}
          className="flex items-center justify-center text-xs w-auto p-2 cursor-pointer"
        >
          {label}
          <Svg
            className={`h-4 w-4 pb-1  ${
              selectedData.length > 0 && "text-primary-500"
            }`}
            src={FileHelpers.getLocalFile("down-arrow", "path")}
          />
        </Box>
        <Box
          ref={dropdownRef}
          className={`${
            !isOpenUserMenu && "hidden"
          } absolute z-50 mt-4 w-max   text-base list-none bg-white rounded Boxide-y Boxide-gray-100 shadow top-7 p-2 `}
          id="dropdown"
        >
          {options.map((options) => (
            <Checkbox
              className="p-1 text-black"
              key={options.value + label}
              label={options.label}
              value={options.value.toString()}
              onChange={handleChange}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default DropdownCheckbox;
