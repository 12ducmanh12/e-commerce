import { useSearchParams } from "react-router-dom";
import CreateProduct from "./components/createProduct/CreateProduct";
import ListProduct from "./components/listProduct/listProduct";
import Sidenav from "./components/sidenav/Sidenav";
import Dashboard from "./components/dashboard/Dashboard";

function Admin() {
  const [searchParams] = useSearchParams();
  const tabId = Number(searchParams.get("tab")) || 0;
  const ListMenu = [
    { id: 0, component: <CreateProduct /> },
    { id: 1, component: <ListProduct /> },
    { id: 2, component: <Dashboard /> },
  ];

  return (
    <div className="flex flex-row h-[88vh]">
      <Sidenav />
      {ListMenu[tabId]?.component}
    </div>
  );
}

export default Admin;
