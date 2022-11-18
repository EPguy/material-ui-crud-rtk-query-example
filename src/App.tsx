import React from 'react';
import {RouterProvider} from "react-router-dom";
import Router from "./router/Router";

function App() {
  return (
      <RouterProvider router={Router()} fallbackElement={<>Just Blank!</>}/>
  );
}

export default App;
