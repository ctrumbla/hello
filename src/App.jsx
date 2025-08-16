import React from "react";
import Dashboard from "./components/Dashboard";

export default function App() {
  const currentUser = "Alice";
  return <Dashboard currentUser={currentUser} />;
}
