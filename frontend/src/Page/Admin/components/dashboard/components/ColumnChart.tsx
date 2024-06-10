import { Column } from "@ant-design/plots";
import { memo } from "react";
function ColumnChart({ data }: any) {
  const config = {
    data,
    xField: "type",
    yField: "value",
    legend: false,
  };
  return (
    <div>
      <Column {...config} />
    </div>
  );
}

export default memo(ColumnChart);
