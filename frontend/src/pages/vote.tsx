import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "../index.css"
import VoteApp from "../VoteApp.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VoteApp />
  </StrictMode>
)
