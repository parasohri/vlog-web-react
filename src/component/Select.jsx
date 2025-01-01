import React, { useId, forwardRef } from 'react';

const Select = forwardRef(({ options, label, className, ...props }, ref) => {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select id={id} ref={ref} className={`form-select ${className}`} {...props}>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
