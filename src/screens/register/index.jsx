
import React, { useState } from 'react';
import InputField from '../../components/fields/Inputfield';
import PasswordField from '../../components/fields/PasswordField';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate and handle form submission logic here
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
    } else {localStorage.setItem('user', JSON.stringify(formData));
      navigate("/login")
      alert('Account created successfully!');
    }
  };

  return (
    <div className="registration-container">
      <div className="left-panel">
        <img src="./images/Frame.png" alt="Shop Illustration" />
        <h2>Welcome to Assignment </h2>
        <p>Muhammad Aown Raza</p>
      </div>
      <div className="right-panel">
        <form onSubmit={handleSubmit}>
          <h2>Registration</h2>
          <InputField
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            icon="./images/name.png"
          />
          <InputField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            icon="./images/email.png"
          />
          <PasswordField
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <PasswordField
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
          />
          <button type="submit" className="submit-btn">
            Create Account
          </button>
          <div>
          <p className='mb-2'>
            Already have an account? 
          </p>

          <button className="login-btn">
          <Link to="/login" >Login</Link>
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
