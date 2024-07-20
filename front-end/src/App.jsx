import React from "react";

import { Outlet } from "react-router-dom";

import Header from "./components/Header";

// deixa o header para todas as páginas, e o "Outlet" é o conteúdo que atualiza no DOM
function App() {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  )
}

export default App;