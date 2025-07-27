import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      
      <section className="hero">
        <div className="container">
          <h1>ReviewHub</h1>
          <p>Connect, Review, and Rate Companies with Transparency</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/companies" className="btn btn-primary" style={{ backgroundColor: 'white', color: 'var(--primary-color)' }}>
              Browse Companies
            </Link>
            <Link to="/register" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="text-center mb-8">
            <h2 style={{ fontSize: '2.25rem', fontWeight: '700', marginBottom: '1rem' }}>
              Why Choose ReviewHub?
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              Build trust and transparency in the business community through authentic reviews and ratings.
            </p>
          </div>

          <div className="grid grid-3" style={{ marginTop: '3rem' }}>
            <div className="card text-center">
              <div style={{ 
                width: '4rem', 
                height: '4rem', 
                background: 'var(--primary-color)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1.5rem',
                fontSize: '1.5rem',
                color: 'white'
              }}>
                ⭐
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Authentic Reviews
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Share your genuine experiences and help others make informed decisions about companies.
              </p>
            </div>

            <div className="card text-center">
              <div style={{ 
                width: '4rem', 
                height: '4rem', 
                background: 'var(--success-color)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1.5rem',
                fontSize: '1.5rem',
                color: 'white'
              }}>
                🏢
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Company Profiles
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Comprehensive company information with detailed reviews, ratings, and business insights.
              </p>
            </div>

            <div className="card text-center">
              <div style={{ 
                width: '4rem', 
                height: '4rem', 
                background: 'var(--warning-color)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1.5rem',
                fontSize: '1.5rem',
                color: 'white'
              }}>
                👥
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Community Driven
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Join a community of professionals sharing insights and building business transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--background-color)', padding: '4rem 0' }}>
        <div className="container">
          <div className="grid grid-3 text-center">
            <div>
              <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>
                1000+
              </div>
              <div style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
                Companies Listed
              </div>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--success-color)', marginBottom: '0.5rem' }}>
                5000+
              </div>
              <div style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
                Reviews Posted
              </div>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--warning-color)', marginBottom: '0.5rem' }}>
                2500+
              </div>
              <div style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
                Active Users
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background: 'var(--text-primary)', color: 'white', padding: '2.5rem 0' }}>
        <div className="container text-center">
          <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
            ReviewHub
          </div>
          <p style={{ opacity: '0.8' }}>
            Building transparency in business relationships through authentic reviews.
          </p>
          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <p style={{ opacity: '0.6' }}>
              © 2024 ReviewHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
