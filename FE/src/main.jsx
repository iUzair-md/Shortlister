import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AuthContextProvider from "./context/authcontext/AuthContextProvider.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import TestContextProvider from "./context/testcontext/TestContextProvider.jsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TestContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </TestContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
