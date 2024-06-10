import Register from "./page/Auth/Register";
import Login from "./page/Auth/Login";
import Admin from "./page/Admin/Admin";
import CheckoutSuccess from "./page/Checkout/CheckoutSuccess";
import DetailProduct from "./page/DetailProduct/DetailProduct";
import Home from "./page/Home/Home";
import Cart from "./page/Cart/Cart";

const routes = [
  {
    key: "register",
    title: "Đăng kí",
    route: "/register",
    component: <Register />,
  },
  {
    key: "login",
    title: "Login",
    route: "/login",
    component: <Login />,
  },
  {
    key: "admin",
    title: "Admin",
    route: "/admin",
    component: <Admin />,
  },
  {
    key: "checkout",
    title: "Checkout thanh cong",
    route: "/checkout-success",
    component: <CheckoutSuccess />,
  },
  {
    key: "detail",
    title: "Chi tiet san pham",
    route: "/product/:id",
    component: <DetailProduct />,
  },
  {
    key: "home",
    title: "Chi tiet san pham",
    route: "/",
    component: <Home />,
  },
  {
    key: "cart",
    title: "Chi tiet san pham",
    route: "/cart",
    component: <Cart />,
  },
];

export default routes;
