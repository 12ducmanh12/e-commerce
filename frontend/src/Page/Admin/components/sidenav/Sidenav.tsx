import Items from "./components/Items";
import { useNavigate, useSearchParams } from "react-router-dom";

function Sidenav() {
  const navigate = useNavigate();
  const ChangeTab = (id: Number) => {
    navigate(`?tab=${id}`);
  };
  const [searchParams] = useSearchParams();
  const tabId = Number(searchParams.get("tab")) || 0;
  return (
    <div className="pt-4 border-r border-gray-400 w-2/12">
      <p className="text-2xl font-normal mb-5 text-center">Admin</p>
      <div
        onClick={() => {
          ChangeTab(0);
        }}
      >
        <Items active={tabId == 0}>
          <p>Create product</p>
        </Items>
      </div>
      <div
        onClick={() => {
          ChangeTab(1);
        }}
      >
        <Items active={tabId == 1}>
          <p>List product</p>
        </Items>
      </div>
      <div
        onClick={() => {
          ChangeTab(2);
        }}
      >
        <Items active={tabId == 2}>
          <p>Dashboard</p>
        </Items>
      </div>
    </div>
  );
}

export default Sidenav;
