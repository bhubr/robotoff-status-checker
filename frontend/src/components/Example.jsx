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
  const processedStats = stats
    .filter((s, i) => i < 1000)
    .map((s, i) => {
      let time = s.recvAt - s.sentAt;
      if (time > CEIL_MS) {
        time = CEIL_MS;
      }
      return { ...s, x: i, y: time };
    });
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
        <LineSeries className="first-series" data={processedStats} />
      </XYPlot>
    </div>
  );
}

export default Example;
