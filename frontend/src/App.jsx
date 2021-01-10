import React, { useState, useEffect } from 'react';
import Example from './components/Example';
import './App.css';

function App() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch('http://localhost:8000/api/questions-stats')
      .then((res) => res.json())
      .then(setStats)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const exportData = () =>
    fetch('http://localhost:8000/api/questions-stats/export')
      .then(async (res) => {
        if (!res.ok) {
          const message = await res.text();
          throw new Error(message);
        }
      })
      .catch(setError);
  if (loading) return <p>loading</p>;

  return (
    <div className="App">
      {error && <p>{error.message}</p>}
      <button type="button" onClick={exportData}>
        Export data
      </button>
      {stats && <Example stats={stats} />}
    </div>
  );
}

export default App;
