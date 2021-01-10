import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
} from 'react-vis';

const CEIL_MS = 20000;

function Example({ stats }) {
  const ceiledStats = stats.map((s, i) => ({
    ...s,
    x: i,
    y: Math.min(s.time, CEIL_MS),
  }));
  return (
    <div>
      <XYPlot
        width={window.innerWidth - 80}
        height={window.innerHeight - 50}
        yDomain={[0, CEIL_MS * 1.05]}
      >
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis />
        <YAxis />
        <LineSeries className="first-series" data={ceiledStats} />
      </XYPlot>
    </div>
  );
}

export default Example;
