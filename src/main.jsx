import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import FireBaseContext from "./context/FireBaseContext.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FireBaseContext>
      <App />
    </FireBaseContext>
  </BrowserRouter>
);
