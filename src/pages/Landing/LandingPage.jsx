import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/LandingPage.css'; // Adjust the path as necessary

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1>Welcome to WorkNest</h1>
        <p>Select your role to continue</p>
        <div className="button-group">
          <Link to="/login">
            <button className="btn btn-user">Login as User</button>
          </Link>
          <Link to="/worker/login">
            <button className="btn btn-worker">Login as Worker</button>
          </Link>
        </div>
        <div className="footer">
          Don’t have an account?
          <Link to="/register"> Register as User</Link> |{' '}
          <Link to="/worker/register">Register as Worker</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
