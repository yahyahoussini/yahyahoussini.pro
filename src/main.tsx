import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initGA } from "./lib/analytics";

// Initialize Google Analytics
initGA();

// Ensure root element exists before rendering
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found. Make sure index.html has a div with id='root'");
}

createRoot(rootElement).render(<App />);
