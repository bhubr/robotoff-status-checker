import React, { useState, useEffect } from 'react';
import Example from './components/Example';
import './App.css';

const getRequestsStatistics = (stats) => {
  if (!stats)
    return {
      errorRatio: 'N/A',
      avgResTime: 'N/A',
    };

  const erroredRequests = stats.filter((s) => s.outcome === 'error');
  const numErrors = erroredRequests.length;
  const errorRatio = ((100 * numErrors) / stats.length).toFixed(1);

  const okRequests = stats.filter((s) => s.outcome !== 'error');
  const avgResTime =
    okRequests.reduce((sum, stat) => sum + stat.time, 0) / okRequests.length;
  return {
    errorRatio: `${errorRatio}%`,
    avgResTime: `${(avgResTime / 1000).toFixed(2)}s`,
  };
};

function App() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/questions-stats')
      .then((res) => res.json())
      .then((requests) => {
        const processedRequests = requests
          // .filter((s, i) => i < 1000)
          .map((s) => ({ ...s, time: s.recvAt - s.sentAt }));
        setStats(processedRequests);
      })
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

  const statistics = getRequestsStatistics(stats);
  return (
    <div className="App">
      {error && <p>{error.message}</p>}
      <button type="button" onClick={exportData}>
        Export data
      </button>
      <span className="App-stat">Error ratio: {statistics.errorRatio}</span>
      <span className="App-stat">
        Avg res time (non-errored): {statistics.avgResTime}
      </span>
      {stats && <Example stats={stats} />}
    </div>
  );
}

export default App;
