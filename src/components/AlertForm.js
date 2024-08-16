import React, { useState } from 'react';

function AlertForm({ handleAlertSubmission }) {
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAlertSubmission({ city, email });
    setCity('');
    setEmail('');
  };

  return (
    <div className="alert-form">
      <h2>Get Weather Alerts</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Set Alert</button>
      </form>
    </div>
  );
}

export default AlertForm;
