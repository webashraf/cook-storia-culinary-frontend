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
    name: "2024-01-01",
    appreciate: 5,
    dislike: 3,
    comments: 7,
  },
  {
    name: "2024-01-02",
    appreciate: 2,
    dislike: 1,
    comments: 4,
  },
  {
    name: "2024-01-03",
    appreciate: 3,
    dislike: 2,
    comments: 6,
  },
  {
    name: "2024-01-04",
    appreciate: 6,
    dislike: 0,
    comments: 5,
  },
  {
    name: "2024-01-05",
    appreciate: 0,
    dislike: 1,
    comments: 3,
  },
  {
    name: "2024-01-06",
    appreciate: 1,
    dislike: 2,
    comments: 4,
  },
  {
    name: "2024-01-07",
    appreciate: 0,
    dislike: 1,
    comments: 2,
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
