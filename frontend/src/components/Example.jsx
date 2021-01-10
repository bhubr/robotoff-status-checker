import React from 'react';

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
} from 'react-vis';

function Example({ stats }) {
  const processedStats = stats
    .filter((s, i) => i < 1000)
    .map((s, i) => {
      let time = s.recvAt - s.sentAt;
      if (time > 5000) {
        time = 5000;
      }
      return { ...s, x: i, y: time };
    });
  return (
    <div>
      <XYPlot
        width={window.innerWidth - 50}
        height={window.innerHeight - 50}
        yDomain={[0, 5000]}
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
