import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { companyAPI, reviewAPI } from '../api';
import Header from '../components/Header';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [companiesResponse, reviewsResponse] = await Promise.all([
        companyAPI.list(),
        reviewAPI.list()
      ]);

      setCompanies(companiesResponse.data.data || []);
      setReviews(reviewsResponse.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
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
      <div style={{ padding: '2.5rem 0' }}>
        <div className="container">
          <div className="mb-8">
            <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              Welcome back, {user?.userName}!
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
              Here's what's happening in your ReviewHub community.
            </p>
          </div>

          <div className="grid grid-3 mb-8">
            <div className="card text-center">
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>
                {companies.length}
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>
                Total Companies
              </div>
            </div>

            <div className="card text-center">
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--success-color)', marginBottom: '0.5rem' }}>
                {reviews.length}
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>
                Total Reviews
              </div>
            </div>

            <div className="card text-center">
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--warning-color)', marginBottom: '0.5rem' }}>
                4.2
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>
                Avg Rating
              </div>
            </div>
          </div>

          <div className="card">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
              Quick Actions
            </h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/create-company" className="btn btn-primary">
                Add New Company
              </Link>
              <Link to="/companies" className="btn btn-outline">
                Browse Companies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
