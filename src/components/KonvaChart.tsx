"use client";
import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Text, Line, Circle } from "react-konva";
import Konva from "konva";
import { barColors } from "../config";
React.useLayoutEffect = React.useEffect 


interface SeriesType{
  label: string,
  color: string
}

interface RevenueDataType{
  revenue: number,
  year: number,
  month: number,
  transactions: number
}

interface IBarChart{
  w: number,
  h: number,
  revenueData: Array<RevenueDataType>,
  maxData: number,
  series: Array<SeriesType>,
  xLabels: Array<string>,
  xLabelSize: number,
  xLabelFontSize: number,
  yLabelSize:  number,
  currency: string,
  onComingRev: number,
  barSpacing: number,
  startSpacing: number,
  lastSpacing: number,
  seriesSize: number,
  valueFontSize: number,
  yLabelFontSize: number,
  marginTop: number,
}


const BarChart = ({
  w,
  h,
  revenueData,
  maxData,
  series,
  xLabels,
  xLabelSize,
  xLabelFontSize,
  yLabelSize,
  currency,
  onComingRev,
  barSpacing,
  startSpacing,
  lastSpacing,
  seriesSize,
  valueFontSize,
} : IBarChart) => {
  const barWidth =
    (w - yLabelSize - startSpacing - lastSpacing - 11 * barSpacing) / 3 / 12;
  const circleRadius = Math.abs( barWidth / 8 );
  const seriesWidth = seriesSize;

  const nodeRefs = useRef<Array<any>>([]);
  const [curMonth, setCurMonth] = useState(0);
  
  useEffect(() => {
    setCurMonth((h - xLabelSize - 50) / 10000 * onComingRev + curMonth);
    nodeRefs.current.forEach((node: any, index) => {
      if (curMonth !== 0) {
        if (index === 0) {
        } else if (index === 1) {// current month
          node.to({
            height: ((h - xLabelSize - seriesWidth * 5) / maxData) * curMonth,
            duration: 2,
            easing: Konva.Easings.EaseIn,
          });
          if (((h - xLabelSize - 50) / maxData) * curMonth > h - xLabelSize - 50) {
            node.setAttrs({ height: 0 });
            setCurMonth(0);
          }
        } else {// coins falling
          var tween = new Konva.Tween({
            node: node,
            duration: 2/(h - xLabelSize + 10 - 5) * (h-xLabelSize + 10 - 5 + 60 * (index - 2)),
            y: h - xLabelSize - 5,
            easing: Konva.Easings.Linear,
            onFinish: () => {
              node.setAttrs({
                y: -60 * index,
              });
            },
          });
          tween.play();
        }
      }
    });
  }, [onComingRev]);

  return (
    <Stage width={w} height={h}>
      <Layer>
        {xLabels &&
          xLabels.map((xLabel, index) => {
            let x =
              startSpacing + yLabelSize + index * (barWidth * 3 + barSpacing);
            let y = h - xLabelSize + 5;
            return (
              <React.Fragment key={index}>
                <Text
                  x={x}
                  y={y}
                  fontSize={xLabelFontSize}
                  text={xLabel.substring(0, 3)}
                  fill={"white"}
                  width={3 * barWidth}
                  align="center"
                />
              </React.Fragment>
            );
          })}
        {/* Draw y labels */}
        {[...Array(6)].map((_, index) => {
          let x = -5;
          let y =
            h -
            xLabelSize -
            ((h - xLabelSize - 50) / 5) * index;
          return (
            <React.Fragment key={index}>
              <Text
                x={x}
                y={y}
                fontSize={16}
                text={(20000 * index).toString()}
                fill={"white"}
                width={yLabelSize}
                align="right"
              />
            </React.Fragment>
          );
        })}
        {/* Draw the value */}
        <Text
          x={w - 160}
          y={20}
          fontSize={valueFontSize}
          text={currency == 'kr'? ( curMonth.toFixed(0) + ',' + (parseInt(curMonth.toFixed(2)) - parseInt(curMonth.toFixed(0))) * 100 + currency) : currency + curMonth.toFixed(0)}
          fill={"white"}
          width={150}
          align="center"
        />
        <Text
          x={w - 160}
          y={50}
          fontSize={12}
          text="Last Hour"
          fill={"white"}
          width={150}
          align="center"
        />
        {/* Draw series for chart */}
        {series &&
          series.map((series_item, index) => {
            let x = yLabelSize + seriesWidth;
            let y = 20 + seriesWidth * 2 * index;
            return (
              <React.Fragment key={index}>
                <Rect
                  x={x}
                  y={y}
                  width={seriesWidth}
                  height={seriesWidth}
                  fill={series_item.color}
                  scaleY={1}
                />
                <Text
                  x={x + seriesWidth + 3}
                  y={y}
                  fontSize={10}
                  text={series_item.label}
                  fill="white"
                />
              </React.Fragment>
            );
          })}
        {[...Array(10)].map((_, index) => {
          let x =
            11 * (barWidth * 3 + barSpacing) +
            startSpacing +
            yLabelSize +
            2 * barWidth +
            barWidth / 2;
          x += (Math.random() - 1 / 2) * 2 * (barWidth / 2 - circleRadius);
          return (
            <React.Fragment key={index}>
              <Circle
                x={x}
                y={-60 * index - 10}
                ref={(el): any => (nodeRefs.current[index + 2] = el)}
                radius={circleRadius}
                fill="gold"
              />
            </React.Fragment>
          );
        })}
        {/* Draw bars for each month */}
        {revenueData &&
          [...Array(12)].map((_, index) => {
            let x =
              index * (barWidth * 3 + barSpacing) + yLabelSize + startSpacing;
            return (
              <React.Fragment key={index}>
                <Rect
                  x={x}
                  y={h - xLabelSize}
                  width={barWidth}
                  height={
                    ((h - xLabelSize - 50) / 5 /20000) * revenueData[index].revenue
                  }
                  fill={revenueData[index].year == 2021 ? barColors.color1: barColors.color2}
                  scaleY={-1}
                />
                <Rect
                  x={x + barWidth}
                  y={h - xLabelSize}
                  width={barWidth}
                  height={
                    ((h - xLabelSize - 50) / 5 /20000) * revenueData[index + 12].revenue
                  }
                  fill={revenueData[index + 12].year == 2022 ? barColors.color2: barColors.color3}
                  scaleY={-1}
                />
                {index === 11 ? (
                  <Rect
                    ref={(el): any => (nodeRefs.current[1] = el)}
                    x={x + barWidth * 2}
                    y={h - xLabelSize}
                    width={barWidth}
                    height={0}
                    fill={barColors.color4}
                    scaleY={-1}
                  />
                ) : (
                  <Rect
                    x={x + barWidth * 2}
                    y={h - xLabelSize}
                    width={barWidth}
                    height={
                      ((h - xLabelSize - 50) / 5 /20000) * revenueData[index + 24].revenue
                    }
                    fill={revenueData[index + 24].year == 2024 ? barColors.color4: barColors.color3}
                    scaleY={-1}
                  />
                )}
              </React.Fragment>
            );
          })}

        <Line
          points={[yLabelSize, h - xLabelSize, w - lastSpacing, h - xLabelSize]}
          stroke={"white"}
          strokeWidth={2}
        />
        <Line
          points={[yLabelSize, h - xLabelSize, yLabelSize, 0]}
          stroke={"white"}
          strokeWidth={2}
        />
        {/* Draw x labels */}
      </Layer>
    </Stage>
  );
};

export default BarChart;
