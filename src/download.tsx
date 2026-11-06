import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import DownloadPage from "./DownloadPage";
import "./guides.css";
import "./download.css";

const root = document.getElementById("root")!;
const page = <StrictMode><DownloadPage /></StrictMode>;
if (root.hasChildNodes()) hydrateRoot(root, page);
else createRoot(root).render(page);
