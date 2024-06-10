import { url } from "@/context/Api";
import { useEffect, useState } from "react";
import { Select } from "antd";
import ColumnChart from "./components/ColumnChart";
import PieChart from "./components/PieChart";
import useFetch from "@/customeHook/useFetch";
import axios from "axios";

type RevenueByBrandItem = {
  [key: string]: string; // Adjust the value type according to your actual data structure
};
function Dashboard() {
  const [dataRaw, setData] = useState<RevenueByBrandItem[] | null>(null);
  useEffect(() => {
    axios
      .get(`${url}/dashboard/revenue-by-brand`)
      .then((res) => setData(res.data));
  }, []);
  const data = dataRaw?.map((item: RevenueByBrandItem) => {
    return {
      type: item.brand,
      value: item.totalRevenue,
    };
  });
  const ListChart = [
    { id: 0, component: <ColumnChart data={data} /> },
    { id: 1, component: <PieChart data={data} /> },
  ];
  const [chartId, SetChartId] = useState(0);

  const [numberUser] = useFetch(`${url}/overview/number_user`);
  const [numberProductSell] = useFetch(`${url}/overview/number_order`);
  const [revenue] = useFetch(`${url}/overview/revenue`);

  const handleChange = (value: number) => {
    SetChartId(value);
  };
  return (
    <div className="flex px-12 pt-3 grow gap-x-6">
      <div className="flex flex-col w-[60%]">
        <div className="bg-indigo-950 text-white px-6 py-2 rounded-lg shadow">
          <h2>Overview</h2>
          <p>How your shop is performing in this month</p>
          <div className="flex justify-between">
            <p>{numberUser} User</p>
            <p>{numberProductSell} Orders</p>
            <p>{revenue}$</p>
          </div>
        </div>
        <div>
          <Select
            defaultValue={0}
            style={{ width: "130px" }}
            onChange={handleChange}
            options={[
              { value: 0, label: "Column chart" },
              { value: 1, label: "Pie chart" },
            ]}
            className="flex ml-auto my-4"
          />
          {ListChart[chartId]?.component}
        </div>
      </div>
      <div className="w-[40%]">b</div>
    </div>
  );
}

export default Dashboard;
