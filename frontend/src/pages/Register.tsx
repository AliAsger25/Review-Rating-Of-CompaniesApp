import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api';
import Header from '../components/Header';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPassword: '',
    userPhoneNo: '',
    userCity: '',
    userState: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const submitData = new FormData();
      submitData.append('userName', formData.userName);
      submitData.append('userEmail', formData.userEmail);
      submitData.append('userPassword', formData.userPassword);
      submitData.append('userPhoneNo', formData.userPhoneNo);
      submitData.append('userCity', formData.userCity);
      submitData.append('userState', formData.userState);
      submitData.append('isActive', 'true');

      await authAPI.register(submitData);
      setSuccess('Registration successful! Please login.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div style={{ 
        minHeight: 'calc(100vh - 80px)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '2.5rem 1.25rem' 
      }}>
        <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
          <div className="text-center mb-6">
            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              Create Account
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Join our community to share your experiences
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="userPassword"
                value={formData.userPassword}
                onChange={handleChange}
                className="form-input"
                placeholder="Create password"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="userPhoneNo"
                value={formData.userPhoneNo}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="userCity"
                  value={formData.userCity}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your city"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">State</label>
                <input
                  type="text"
                  name="userState"
                  value={formData.userState}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your state"
                  required
                />
              </div>
            </div>

            {error && (
              <div style={{ 
                color: 'var(--error-color)', 
                fontSize: '0.875rem', 
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}

            {success && (
              <div style={{ 
                color: 'var(--success-color)', 
                fontSize: '0.875rem', 
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {success}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginBottom: '1rem' }}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="text-center">
              <p style={{ color: 'var(--text-secondary)' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
