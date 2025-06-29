import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  TooltipItem,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import "./DateRangeGraphWidget.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface BarData {
  value: number;
  dayLetter: string;
}

interface DateRangeGraphWidgetProps {
  startDate: string;
  endDate: string;
  data: BarData[];
}

const DateRangeGraphWidget: React.FC<DateRangeGraphWidgetProps> = ({
  startDate,
  endDate,
  data,
}) => {
  const lineLabels: string[] = [];
  const lineData: number[] = [];

  const barLabels: string[] = [];
  data.forEach(item => {
    barLabels.push(item.dayLetter);
  });

  // Add the initial point (0,0) for the line to start from the origin
  lineLabels.push('');
  lineData.push(0);

  data.forEach((item) => {
    lineLabels.push('');
    lineData.push(item.value);

    lineLabels.push(item.dayLetter);
    lineData.push(item.value);

    lineLabels.push('');
    lineData.push(item.value);
  });

  lineLabels.push('');
  lineData.push(0);

  const chartData = {
    labels: lineLabels,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Bar Data',
        data: lineLabels.map((label) => {
          if (barLabels.includes(label)) {
            const originalDataPoint = data.find(d => d.dayLetter === label);
            return originalDataPoint ? originalDataPoint.value : null;
          }
          return null;
        }) as (number | null)[],
        backgroundColor: 'white',
        borderColor: 'transparent',
        barPercentage: 1.0,
        categoryPercentage: 1.0,
        order: 2,
      },
      {
        type: 'line' as const,
        label: 'Line Data',
        data: lineData,
        borderColor: '#4ab1b3',
        backgroundColor: '#65C0C3',
        fill: false,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointBackgroundColor: '#4ab1b3',
        pointBorderColor: '#fff',
        pointBorderWidth: 1,
        order: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar' | 'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          title: function(context: TooltipItem<'bar' | 'line'>[]) {
            if (context[0].label !== '') {
              return context[0].label;
            }
            return undefined;
          },
          label: function(context: TooltipItem<'bar' | 'line'>) {
            if (context.dataset.type === 'line' && context.raw !== 0 && context.raw !== null) {
              return `${context.dataset.label}: ${context.raw}`;
            }
            if (context.dataset.type === 'bar' && context.raw !== null) {
              return `${context.dataset.label}: ${context.raw}`;
            }
            return undefined;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          callback(this: unknown, value: string | number) {
            if (typeof value === 'number') {
              const label = (this as CategoryScale).getLabelForValue(value);
              return label === '' ? '' : label;
            }
            return '';
          },
          color: '#555',
          font: {
            size: 12,
          },
        },
        offset: true,
      },
      y: {
        min: 0,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        beginAtZero: true,
      },
    },
    elements: {
      line: {
        tension: 0,
      },
      bar: {
        borderRadius: 5,
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad',
    },
  };

  return (
    <div className="widget-container">
      <div className="date-range">
        <u>
          {startDate} ~ {endDate}
        </u>
      </div>
      <div className="graph-content">
        <div className="chart-container-wrapper">
          <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default DateRangeGraphWidget;