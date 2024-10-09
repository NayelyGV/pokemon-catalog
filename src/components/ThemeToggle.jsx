import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const ThemeToggle = ({ isChecked, onChange }) => (
    <div className="toggle" onClick={onChange}>
        <input
            type="checkbox"
            id="themeSwitch"
            onChange={onChange}
            checked={isChecked}
            style={{ display: 'none' }}
        />
        <div className="toggle-bg" style={{ backgroundColor: isChecked ? '#4caf50' : '#ccc' }}></div>
        <div className="toggle-thumb" style={{ left: isChecked ? '32px' : '1px' }}>
            <FontAwesomeIcon icon={isChecked ? faMoon : faSun} />
        </div>
    </div>
);

export default ThemeToggle;
