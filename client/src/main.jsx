import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/Auth.jsx";
import { SearchProvider } from "./context/Search.jsx";
import CartProvider from "./context/Cart.jsx";
import SidebarProvider from "./context/SidebarProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <AuthProvider>
      <SearchProvider>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </SearchProvider>
    </AuthProvider>
  </CartProvider>
);
