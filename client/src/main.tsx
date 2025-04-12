import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { useEffect } from "react";

// Initialize data on page load
const initializeData = async () => {
  try {
    await fetch("/api/initialize-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Data initialized successfully");
  } catch (error) {
    console.error("Error initializing data:", error);
  }
};

// Component wrapper to initialize data
const AppWithInitializer = () => {
  useEffect(() => {
    initializeData();
  }, []);

  return <App />;
};

createRoot(document.getElementById("root")!).render(<AppWithInitializer />);
