
import React, { useEffect, useState } from 'react';
import InputField from '../../components/fields/Inputfield';
import PasswordField from '../../components/fields/PasswordField';
import '../register/style.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login_status, LoginStatus } from '../../redux/slices/registerSlice';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [d, setD] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const data = useSelector(login_status)
    console.log(data, "data");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const storedUserObject = JSON.parse(localStorage.getItem('user'));

    // console.log(storedUserObject, "storedUser");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.email === "") {
            alert('enter email');
        }

        if (formData.password === "") {
            alert('enter password');
        }

        if (formData?.email === storedUserObject?.email && formData.password === storedUserObject.password) {
            dispatch(LoginStatus(true))
            localStorage.setItem('login_status', JSON.stringify(true));
        } else {
            alert('credentials not valid');
        }
    };

    useEffect(() => {
        if (data === true) {
            navigate('/');
        }
    }, [data, navigate]);


    return (
        <div className="registration-container">
            <div className="left-panel">
                <img src="./images/Frame.png" alt="Shop Illustration" />
                <h2>Welcome to Assignment </h2>
                <p>Muhammad Aown Raza</p>
            </div>
            <div className="right-panel">
                <form onSubmit={handleSubmit}>
                    <h2>Welcome</h2>
                    <InputField
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        icon="./images/email.png"
                    />
                    <div>
                        <PasswordField
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                        <p className="right-text">
                            Forget Password
                        </p>
                    </div>
                    <button type="submit" className="submit-btn">
                        Log in
                    </button>
                    <div>
                        <p className='mb-2'>
                            Have no account yet?
                        </p>

                        <button className="login-btn" onClick={()=>navigate("/sign-up")}>
                            Registration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;