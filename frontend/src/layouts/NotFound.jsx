import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ fontSize: '3rem', color: '#f44336' }}>404</h1>
      <p style={{ fontSize: '1.5rem' }}>Page Not Found</p>
      <Link to="/" style={{ fontSize: '1.2rem', color: '#1976D2' }}>
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
