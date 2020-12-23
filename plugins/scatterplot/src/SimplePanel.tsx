import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import * as d3 from 'd3';
import ReactTooltip from 'react-tooltip';



interface Props extends PanelProps<SimpleOptions> {

}





export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {


  const styles = getStyles();
  const margin = { left: 40, top: 30, right: 30, bottom: 35 };
  const chartWidth = width - (margin.left + margin.right);
  const chartHeight = height - (margin.top + margin.bottom);


  let points: any = [];
  let pointsNotGrouped: any = [];

  console.log(data)


  data.series[0].fields[0].values.toArray().forEach((time, index) => { //For 2each data point

    let point = { xValue: 0, yValue: 0, id: "0", color: '#00cc00' }


    //Check all data for generating the graph exists
    let fieldToX = data.series[0].fields.find(field =>
      field.name === options.axisXmetric
    );

    let fieldToY = data.series[0].fields.find(field =>
      field.name === options.axisYmetric
    );

    let fieldToID = data.series[0].fields.find(field =>
      field.name === options.groupBy
    );

    if (fieldToX && fieldToY && fieldToID) {
      console.log(fieldToID.values.get(index) + ' ' + options.highlightTeam)
      let colorpoint = fieldToID.values.get(index) === options.highlightTeam ? '#0066ff' : 'rgb(155, 155, 155)';
      point = {
        xValue: fieldToX.values.get(index),
        yValue: fieldToY.values.get(index),
        id: fieldToID.values.get(index),
        color: colorpoint,
      }
    }

    //console.log(point)
    pointsNotGrouped.push(point);

  });

  pointsNotGrouped.forEach((point: any) => {

    let existingPoint = points.find((p: any) => p.id === point.id);
    if (existingPoint) {
      existingPoint.xValue += point.xValue;
      existingPoint.yValue += point.yValue;
    }
    else {
      points.push(point);
    }
  })
  console.log("final results:")
  console.log(points)




  let maxX = Math.max.apply(Math, points.map((p: any) => { return p.xValue; }));
  let maxY = Math.max.apply(Math, points.map((p: any) => { return p.yValue; }));
  //The maximum of both axis is the real maximum.
  maxX = maxX > maxY ? maxX : maxY;
  maxY = maxX > maxY ? maxX : maxY;

  const xScale = d3.scaleLinear().domain([0, maxX]).range([0, chartWidth]);
  const yScale = d3.scaleLinear().domain([0, maxY]).range([chartHeight, 0]);
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);
  let limit = d3.line()([[0, 0], [chartWidth, -chartHeight]]);
  let threshold = d3.line()([[0, 0], [chartWidth, -chartHeight * (options.threshold / 100)]]);
  console.log(limit)

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <ReactTooltip />
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g
            transform={`translate(0, ${chartHeight})`}
            ref={node => {
              d3.select(node).call(xAxis as any);
            }}
          />

          <g
            transform={`translate(0, 0)`}
            ref={node => {
              d3.select(node).call(yAxis as any);
            }}
          />

          <polygon transform={`translate(0, ${chartHeight})`} fill="rgba(220, 100, 100, 0.15)" stroke-width="2"
            points={`0,0
            ${chartWidth}, ${-chartHeight * (options.threshold / 100)}
            ${chartWidth},0`} />
            
            <polygon transform={`translate(0, ${chartHeight})`} fill="rgba(150, 150, 150, 0.12)" stroke-width="2"
            points={`0,0
            ${chartWidth}, ${-chartHeight}
            0,${-chartHeight}`} />

        {/* <path transform={`translate(0, ${chartHeight})`} d={limit?.toString()} stroke="green" stroke-width="2" stroke-dasharray="6 4" /> */}
        
          <path transform={`translate(0, ${chartHeight})`} d={threshold?.toString()} stroke="rgba(200, 0, 0, 0.3)" stroke-width="1" />
          <g>
            {points.map((point: any) => (
              <circle data-tip={point.id} fill={point.color} cx={xScale(point.xValue)} cy={yScale(point.yValue)} r={5} />
            ))}
          </g>





        </g>
        <text x={- height / 2} y="6" fill="black" transform={`rotate(270 0,00)`} dominant-baseline="middle" text-anchor="middle">{options.yAxisTitle}</text>
        <text x={width / 2} y={height - 6} fill="black" transform={`translate(0,0)`} dominant-baseline="middle" text-anchor="middle">{options.xAxisTitle}</text>
      </svg>


    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
