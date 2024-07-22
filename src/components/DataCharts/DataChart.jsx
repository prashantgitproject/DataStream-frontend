import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { lightOptions } from "./Themes";
import { months } from "../../utils/utility";

const DataChart = (props) => {
  const { data, options } = props;
  const chartRef = useRef<HTMLCanvasElement>(null);

  months({ count: 7 });
  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        ...props,
        options: {
          ...options,
          ...lightOptions,
        },
      });
      return () => {
        chart.destroy();
      };
    }
  }, [data]);
  return <canvas className="" ref={chartRef} />;
};
Chart.register(...registerables);

export default DataChart;