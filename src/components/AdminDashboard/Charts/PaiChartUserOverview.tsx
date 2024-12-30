import { useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { useUser } from "@/src/context/user.provider";
import { getAllUser } from "@/src/services/AuthService";
import { getAllSociety } from "@/src/services/SocietyServices";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

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
  const { user: currentUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<
    { recipes: any; allUser: any } | any
  >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data }: any = await getAllSociety();
        const user: any = await getAllUser();

        setUserInfo({ society: data, user });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);
  const data = [
    { name: "Total User", value: userInfo?.user?.dataLength },
    { name: "Premium User", value: userInfo?.user?.premiumUserLength },
    { name: "Total Society", value: userInfo?.society.length },
  ];

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
