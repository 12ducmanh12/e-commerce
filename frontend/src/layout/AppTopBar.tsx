import { Outlet, Link, useNavigate } from "react-router-dom";
import Cart from "@/assets/cart.svg";
import { Badge } from "primereact/badge";
import { useDispatch, useSelector } from "react-redux";
import { LogOutUser } from "@/context/AuthSlice";
import { toast } from "react-toastify";
import { Input } from "antd";
import type { SearchProps } from "antd/es/input/Search";
const { Search } = Input;
function AppTopBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);
  const auth = useSelector((state: any) => state.auth);
  const isWhitespaceString = (str: string) => !str.replace(/\s/g, "").length;
  const onSearch: SearchProps["onSearch"] = (value, _e) => {
    if (value && !isWhitespaceString(value)) navigate(`/?search=${value}`);
    else navigate("/");
  };

  return (
    <div className="sticky top-0">
      <nav className="bg-black px-20 py-4">
        <ul className="flex flex-row justify-between items-center">
          <li>
            <Link to="/" className="text-white text-4xl font-semibold">
              OnlineShop
            </Link>
          </li>
          <Search
            placeholder="Sản phẩm bạn cần tìm"
            onSearch={onSearch}
            style={{ width: "40%" }}
          />
          <div className="flex gap-x-5 items-center">
            <li>
              <Link to="/cart" className="flex flex-row">
                <img src={Cart} width={40} height={40} />
                <Badge value={cart.cartItems.length} severity="success"></Badge>
              </Link>
            </li>
            {auth._id ? (
              <li className="flex flex-row gap-x-6">
                {auth.isAdmin ? (
                  <Link to="/admin">
                    <p className="text-white text-lg">Admin</p>
                  </Link>
                ) : null}
                <Link
                  to="/"
                  className="text-white text-lg cursor-pointer"
                  onClick={() => {
                    dispatch(LogOutUser(null));
                    toast.warning("Logged out!", { position: "bottom-left" });
                  }}
                >
                  Logout
                </Link>
              </li>
            ) : (
              <li className="flex flex-row gap-x-6">
                <Link to="/register">
                  <p className="text-white text-lg">Register</p>
                </Link>
                <Link to="/login">
                  <p className="text-white text-lg">Login</p>
                </Link>
              </li>
            )}
          </div>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
export default AppTopBar;
