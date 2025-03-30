import React, { useEffect, useState, useRef } from "react";
import "./Dropdown.css";

const Dropdown = ({ options, multipleSelect = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(multipleSelect ? [] : null);
  const onClickDropdown = () => setIsOpen((prev) => !prev);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    if (multipleSelect) {
      const isOptionSelected = selectedOptions.includes(option);
      if (isOptionSelected) {
        // if already selected, remove from selected list
        setSelectedOptions(prev => prev.filter(item => item !== option));
      } else {
        // otherwise, add to list
        setSelectedOptions(prev => [...prev, option]);
      }
    } else {
      setSelectedOptions(option);
      setIsOpen(false);
    }
  };

  const getDisplayText = () => {
    if (multipleSelect) {
      if (selectedOptions.length > 0)
        return selectedOptions.join(", ")
      return "Select option(s)";
    }
    return selectedOptions || "Select option";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }
  , []);

  return (
    <div className="dropdown" ref={dropdownRef} data-testid="dropdown">
      <div className="dropdown-header" onClick={onClickDropdown}>
        {getDisplayText()}
        <div className="arrow">{isOpen ? "▲" : "▼"}</div>
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {!multipleSelect && (
            <div className="dropdown-action-buttons">
              <button onClick={() => setSelectedOptions(multipleSelect ? [] : null)}>Clear selection</button>
            </div>
          )}
          {multipleSelect && (
            <div className="dropdown-action-buttons">
              <button onClick={() => setSelectedOptions(options)}>Select All</button>
              <button onClick={() => setSelectedOptions(multipleSelect ? [] : null)}>Deselect All</button>
            </div>
          )}
          <ul>
              {options.map((option) => (
                <li
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`dropdown-item ${selectedOptions && selectedOptions.includes(option) ? "selected" : ""}`}
                >
                  {multipleSelect ? (
                    <label className="dropdown-label">
                      <input
                        type="checkbox"
                        checked={selectedOptions.includes(option)}
                        className="checkbox"
                        onChange={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                      />
                      {option}
                    </label>
                  ) : (
                    <div>{option}</div>
                  )}
                </li>
              ))}
            </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;