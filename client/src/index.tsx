import React from "react";
import ReactDOM from "react-dom/client";
import App from "App";
import { UserContextProvider } from "storage/userContext";
import { TodosContextProvider } from "storage/todosContext";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <TodosContextProvider>
        <App />
      </TodosContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

