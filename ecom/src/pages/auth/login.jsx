import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../../host';
import MobileLogo from "../../assets/logo1.jpg";

function Login({ setToken }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            console.log(formData)
            const response = await axios.post(`${API}/adminlogin`, formData);
            const { token } = response.data;
            
            setToken(token);
            localStorage.setItem('token', token);
            toast.success('Login successful');
            navigate('/dashboard');
            // Clear form data after successful login
            setFormData({ email: '', password: '' });

        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Invalid email or password');
            } else {
                toast.error('An error occurred. Please try again later.');
            }
        }
    }

    return (
        <section className="vh-100" style={{ backgroundImage: `url(${MobileLogo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
           <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong " style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-5" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                                <h6 className="mb-2 text-center" style={{ color: '#17273D', fontWeight : 'bolder' } }>Ecom</h6>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-outline mb-3">
                                        <label className="form-label" htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="Email"
                                            name='email'
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formData.email}
                                            required
                                        />
                                    </div>
                                    <div className="form-outline mb-3">
                                        <label className="form-label" htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            placeholder="Password"
                                            name='password'
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formData.password}
                                            required
                                        />
                                    </div>
                                    <div className='text-center'>
                                        <button className="btn btn-dark text-center" type="submit">
                                            Sign in
                                        </button>
                                    </div>
                                </form>
                                <p className="small fw-bold mt-2 pt-1 mb-0">
                                   Don't have an Account?
                                    <Link to="/register" className="link-danger">Sign Up</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;
