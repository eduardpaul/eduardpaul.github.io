import React from "react"
import Seo from "../components/seo"

const DeepInfantPage = () => (
  <iframe
    src="/deepinfant-app/index.html"
    title="DeepInfant — Baby Cry Classifier"
    allow="microphone"
    style={{
      position: "fixed",
      inset: 0,
      width: "100%",
      height: "100%",
      border: "none",
    }}
  />
)

export default DeepInfantPage

export const Head = ({ location }) => (
  <Seo
    title="DeepInfant — Baby Cry Classifier"
    description="AI-powered infant cry classifier running entirely in your browser using ONNX Runtime Web."
    pathname={location.pathname}
  />
)
