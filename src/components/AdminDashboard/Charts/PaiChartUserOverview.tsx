import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Total User", value: 400 },
  { name: "Premium User", value: 300 },
  { name: "Total Society", value: 300 },
  // { name: "Total Recipe", value: 200 },
  // { name: "Total Recipe Post", value: 500 },
  // { name: "Total Appreciate", value: 800 },
  // { name: "Total Dislike", value: 300 },
  // { name: "Total Comments", value: 700 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  // "#FF8042",
  // "#FF6384",
  // "#36A2EB",
  // "#FFCE56",
  // "#4BC0C0",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      className="text-xs"
      dominantBaseline="central"
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      x={x}
      y={y}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PaiChartUserOverview = () => {
  return (
    <div className=" mx-auto  p-6 rounded-lg">
      <h2 className="text-xl font-bold text-white text-center mb-4">
        User Overview Statistics
      </h2>
      <div className="w-full h-[300px] -mt-4 -mb-4">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              cx="50%"
              cy="50%"
              data={data}
              dataKey="value"
              fill="#8884d8"
              innerRadius={50} // Donut appearance
              label={renderCustomizedLabel}
              labelLine={false}
              outerRadius={100}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value} items`,
                name,
              ]}
              wrapperClassName="text-sm bg-gray-800 text-gray-200 rounded p-2 shadow-lg"
            />
            <Legend
              className="text-gray-400"
              height={36}
              iconType="circle"
              verticalAlign="bottom"
              wrapperStyle={{ fontSize: "12px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PaiChartUserOverview;
