import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { companyAPI } from '../api';
import Header from '../components/Header';

const CreateCompany: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyCity: '',
    companyLocation: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

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

    try {
      const submitData = new FormData();
      submitData.append('companyName', formData.companyName);
      submitData.append('companyCity', formData.companyCity);
      submitData.append('companyLocation', formData.companyLocation);
      submitData.append('isActive', 'true');

      await companyAPI.create(submitData);
      navigate('/companies');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to create company');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

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
            <div style={{
              width: '5rem',
              height: '5rem',
              background: 'var(--primary-color)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '2rem',
              color: 'white'
            }}>
              🏢
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              Add New Company
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Help grow our community by adding a company profile
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter company name"
                required
              />
            </div>

            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">
                  City
                </label>
                <input
                  type="text"
                  name="companyCity"
                  value={formData.companyCity}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter city"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Location/Address
                </label>
                <input
                  type="text"
                  name="companyLocation"
                  value={formData.companyLocation}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter location"
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

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button
                type="button"
                onClick={() => navigate('/companies')}
                className="btn btn-outline"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ flex: 1 }}
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Company'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
