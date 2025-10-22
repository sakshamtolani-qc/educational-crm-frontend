import React from 'react';
import styles from './Attendance.module.css';

type SelectAllCheckboxProps = {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  disabled: boolean;
};

const SelectAllCheckbox: React.FC<SelectAllCheckboxProps> = ({ isChecked, onChange, disabled }) => {
  return (
    <div className={styles.selectAllContainer}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span>Select All</span>
    </div>
  );
};

export default SelectAllCheckbox;