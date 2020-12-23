type SeriesSize = 'sm' | 'md' | 'lg';

export interface SimpleOptions {
  axisXmetric: string;
  axisYmetric: string;
  groupBy: string;
  tooltipText: string;
  guaranteeFormula: string;
  radius: number;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
  xAxisTitle: string;
  yAxisTitle: string;
  highlightTeam: string;
  threshold: number;
}
