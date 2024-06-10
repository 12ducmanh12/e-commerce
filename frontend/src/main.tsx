import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import "./index.css";
import "/node_modules/primeflex/primeflex.css"
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import productsReducer, { productsFetch } from "./context/productsSlice.ts";
// import { productsApi } from "./context/productsApi.ts";
import CartReducer, { getTotals } from "./context/CartSlice.ts";
import AuthReducer, { LoadUser } from "./context/AuthSlice.ts";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: CartReducer,
    auth: AuthReducer,
    // [productsApi.reducerPath]: productsApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(productsFetch());
store.dispatch(getTotals(null));
store.dispatch(LoadUser(null));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
