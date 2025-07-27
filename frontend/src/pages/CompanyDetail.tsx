import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { companyAPI } from '../api';
import Header from '../components/Header';

interface Company {
  _id: string;
  companyName: string;
  companyCity: string;
  companyLocation: string;
}

const CompanyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCompany();
    }
  }, [id]);

  const fetchCompany = async () => {
    try {
      const response = await companyAPI.details(id!);
      setCompany(response.data.data);
    } catch (error) {
      console.error('Error fetching company details:', error);
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

  if (!company) {
    return (
      <div>
        <Header />
        <div className="container" style={{ padding: '2.5rem 0', textAlign: 'center' }}>
          <h1>Company not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container" style={{ padding: '2.5rem 0' }}>
        <div className="card mb-8">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '5rem',
              height: '5rem',
              background: 'var(--primary-color)',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              color: 'white'
            }}>
              🏢
            </div>

            <div>
              <h1 style={{ fontSize: '2.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                {company.companyName}
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                📍 {company.companyCity}, {company.companyLocation}
              </p>
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: i < 4 ? 'var(--warning-color)' : 'var(--border-color)', fontSize: '1.125rem' }}>
                  ⭐
                </span>
              ))}
              <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                4.0 rating
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            About this company
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            This is {company.companyName}, located in {company.companyCity}, {company.companyLocation}. 
            More details about reviews and ratings will be available once the review system is implemented.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
