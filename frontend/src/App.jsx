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
  if (loading) return <p>loading</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="App">
      <Example stats={stats} />
    </div>
  );
}

export default App;
