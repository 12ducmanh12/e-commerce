import { Pie } from "@ant-design/plots";
import { memo } from "react";

function PieChart({ data }: any) {
  const config = {
    data,
    angleField: "value",
    colorField: "type",
    paddingRight: 80,
    label: {
      text: "value",
      position: "outside",
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };
  return (
    <div>
      <Pie {...config} />
    </div>
  );
}

export default memo(PieChart);
