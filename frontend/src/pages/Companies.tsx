import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { companyAPI } from '../api';
import Header from '../components/Header';

interface Company {
  _id: string;
  companyName: string;
  companyCity: string;
  companyLocation: string;
}

const Companies: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await companyAPI.list();
      setCompanies(response.data.data || []);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <Header />
        <div className="loading">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      
      <section style={{ background: 'var(--background-color)', padding: '4rem 0' }}>
        <div className="container">
          <div className="text-center mb-6">
            <h1 style={{ fontSize: '2.25rem', fontWeight: '700', marginBottom: '1rem' }}>
              Discover Companies
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              Browse through our extensive database of companies and read authentic reviews.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>
              Companies ({companies.length})
            </h2>
            <Link to="/create-company" className="btn btn-primary">
              Add Company
            </Link>
          </div>

          {companies.length > 0 ? (
            <div className="grid grid-3">
              {companies.map((company) => (
                <Link
                  key={company._id}
                  to={`/company/${company._id}`}
                  className="card"
                  style={{ 
                    textDecoration: 'none', 
                    color: 'inherit',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    width: '5rem',
                    height: '5rem',
                    background: 'var(--primary-color)',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    fontSize: '1.5rem',
                    color: 'white'
                  }}>
                    🏢
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {company.companyName}
                  </h3>
                  
                  <div style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    📍 {company.companyCity}, {company.companyLocation}
                  </div>

                  <div style={{ 
                    background: 'var(--primary-color)', 
                    color: 'white', 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '0.75rem', 
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    width: 'fit-content'
                  }}>
                    View Details
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card text-center" style={{ padding: '4rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🏢</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                No companies yet
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Be the first to add a company to our platform!
              </p>
              <Link to="/create-company" className="btn btn-primary">
                Add First Company
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Companies;
