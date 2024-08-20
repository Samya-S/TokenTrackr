"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps,
  Legend,
  ResponsiveContainer,
} from "recharts";

export interface PriceData {
  prices: [number, number][];
}

interface PriceChartProps {
  data: PriceData;
}

// Format a Unix timestamp as a date string in the format DD/MM/YY
const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear().toString().slice(-2); // Last two digits of the year

  return `${day}/${month}/${year}`;
};

// Custom tooltip component for the price chart
const CustomTooltip: React.FC<TooltipProps<any, string>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' }}>
        <p className="label">{`Date: ${label}`}</p>
        <p className="intro">{`Price: $ ${Number(payload[0].value).toFixed(2)}`}</p>
      </div>
    );
  }

  return null;
};

const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
  // Convert the prices array to an array of objects with date and price properties
  const prices = data.prices.map(([timestamp, price]) => ({
    date: formatDate(timestamp),
    price,
  }));

  // Calculate the interval for the X-axis labels
  const [interval, setInterval] = useState(Math.floor(prices.length / 5));

  // Update the interval value when the window is resized
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setInterval(Math.floor(prices.length / 4));
      } else if (width < 1200) {
        setInterval(Math.floor(prices.length / 6));
      } else {
        setInterval(Math.floor(prices.length / 10));
      }
    };

    handleResize(); // Set the initial interval value
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [prices.length]);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={prices}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="date" interval={interval} />
            <YAxis />
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <Tooltip content={CustomTooltip} />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="black" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
