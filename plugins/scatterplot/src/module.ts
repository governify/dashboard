import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
  return builder
    .addTextInput({
      path: 'axisXmetric',
      name: 'X Axis Metric',
      description: 'Select metric for X axis',
      defaultValue: 'metric_',
    })
    .addTextInput({
      path: 'axisYmetric',
      name: 'Y Axis Metric',
      description: 'Select metric for Y axis',
      defaultValue: 'metric_',
    })
    .addTextInput({
      path: 'groupBy',
      name: 'Group By',
      description: 'Specify the id of the data grouping',
      defaultValue: 'scope_',
    })
    .addTextInput({
      path: 'guaranteeFormula',
      name: 'Guarantee Formula',
      description: 'For drawing limit line',
      defaultValue: 'x - y = 0',
    })
    .addTextInput({
      path: 'tooltipText',
      name: 'Tooltip text',
      description: 'Tooltip text when mouse is hover the data',
      defaultValue: 'Value',
    })
    .addBooleanSwitch({
      path: 'showSeriesCount',
      name: 'Show series counter',
      defaultValue: false,
    })
    .addRadio({
      path: 'seriesCountSize',
      defaultValue: 'sm',
      name: 'Series counter size',
      settings: {
        options: [
          {
            value: 'sm',
            label: 'Small',
          },
          {
            value: 'md',
            label: 'Medium',
          },
          {
            value: 'lg',
            label: 'Large',
          },
        ],
      },
      showIf: config => config.showSeriesCount,
    })
    .addTextInput({
      path: 'xAxisTitle',
      name: 'Legend in X Axis',
      description: 'Legend',
      defaultValue: 'Metric 2',
    })
    .addTextInput({
      path: 'yAxisTitle',
      name: 'Legend in Y Axis',
      description: 'Legend',
      defaultValue: 'Metric 1',
    })
    .addTextInput({
      path: 'highlightTeam',
      name: 'Highlighted Team',
      description: 'Hightlight2',
      defaultValue: 'Team',
    })
    .addNumberInput({
      path: 'threshold',
      name: 'Threshold',
      description: 'Guarantee threshold',
      defaultValue: 75,
    });
});
