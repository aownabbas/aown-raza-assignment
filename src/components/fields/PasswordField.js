import React, { useState } from 'react';

const PasswordField = ({ name, value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="input-wrapper">
      <span className="icon"><img src="./images/lock.png" alt="Shop Illustration" /></span>
      <input
        type={showPassword ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
      <span className="toggle-password" onClick={togglePasswordVisibility}>
        {showPassword ? <img src="./images/hide_password.png" alt="view" /> : <img src="./images/view.png" alt="view" />}
      </span>
    </div>
  );
};

export default PasswordField;
