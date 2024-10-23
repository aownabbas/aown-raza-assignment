import React from 'react';

const InputField = ({ type, name, value, onChange, placeholder, icon }) => {
  return (
    <div className="input-wrapper">
      <span className="icon"><img src={icon} alt="Shop Illustration" /></span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default InputField;
