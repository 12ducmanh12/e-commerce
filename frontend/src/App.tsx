
import AppTopBar from "./layout/AppTopBar";
import routes from "./routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<AppTopBar />}>
          {routes.map((route: any) => (
            <Route path={route.route} element={route.component} key={route.key}/>
          ))}
          {/* <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/product/:id" element={<DetailProduct />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
