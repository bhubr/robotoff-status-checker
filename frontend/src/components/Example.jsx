import React, {useState} from 'react';
import {curveCatmullRom} from 'd3-shape';

import {
  XYPlot,
  XAxis,
  YAxis,
  ChartLabel,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
} from 'react-vis';

function Example({ stats }) {
  const processedStats = stats.filter((s, i) => i < 10)
    .map((s, x) => ({ ...s, x, y: s.recvAt - s.sentAt }))
  return (
    <div>
      <XYPlot width={500} height={500}>
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis />
        <YAxis />
        <ChartLabel
          text="X Axis"
          className="alt-x-label"
          includeMargin={false}
          xPercent={0.025}
          yPercent={1.01}
          />

        <ChartLabel
          text="Y Axis"
          className="alt-y-label"
          includeMargin={false}
          xPercent={0.06}
          yPercent={0.06}
          style={{
            transform: 'rotate(-90)',
            textAnchor: 'end'
          }}
          />
        <LineSeries
          className="first-series"
          data={processedStats}
        />
        <LineSeries className="second-series" data={null} />
        <LineSeries
          className="third-series"
          curve={'curveMonotoneX'}
          data={[{x: 1, y: 10}, {x: 2, y: 4}, {x: 3, y: 2}, {x: 4, y: 15}]}
          strokeDasharray={'7, 3'}
        />
        <LineSeries
          className="fourth-series"
          curve={curveCatmullRom.alpha(0.5)}
          style={{
            // note that this can not be translated to the canvas version
            strokeDasharray: '2 2'
          }}
          data={[{x: 1, y: 7}, {x: 2, y: 11}, {x: 3, y: 9}, {x: 4, y: 2}]}
        />
      </XYPlot>
    </div>
  );
}

export default Example;
