import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Page A",
    appreciate: 5,
    dislike: 2400,
    comments: 2400,
  },
  {
    name: "Page B",
    appreciate: 2,
    dislike: 1398,
    comments: 2210,
  },
  {
    name: "Page C",
    appreciate: 3,
    dislike: 9800,
    comments: 2290,
  },
  {
    name: "Page D",
    appreciate: 6,
    dislike: 3908,
    comments: 2000,
  },
  {
    name: "Page E",
    appreciate: 0,
    dislike: 4800,
    comments: 2181,
  },
  {
    name: "Page F",
    appreciate: 1,
    dislike: 3800,
    comments: 2500,
  },
  {
    name: "Page G",
    appreciate: 0,
    dislike: 4300,
    comments: 2100,
  },
];

const ActivatesChart = () => {
  return (
    <div style={{ width: "100%" }}>
      <h4 className="text-center font-semibold text-lg mb-4">
        Post Activities Overview
      </h4>

      {/* LineChart for Appreciate */}
      <ResponsiveContainer height={200} width="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
          syncId="anyId"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            dataKey="appreciate"
            fill="#8884d8"
            stroke="#8884d8"
            type="monotone"
          />
        </LineChart>
      </ResponsiveContainer>

      {/* LineChart for Dislike */}
      <ResponsiveContainer height={200} width="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
          syncId="anyId"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            dataKey="dislike"
            fill="#82ca9d"
            stroke="#82ca9d"
            type="monotone"
          />
          <Brush />
        </LineChart>
      </ResponsiveContainer>

      {/* AreaChart for Comments */}
      <ResponsiveContainer height={200} width="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
          syncId="anyId"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            dataKey="comments"
            fill="#ff7300"
            stroke="#ff7300"
            type="monotone"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivatesChart;
