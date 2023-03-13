import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, useRoutes } from "react-router-dom";
import loadable from './loadable'

const router = [
  {
    path: "/",
    element: loadable('/app'),
  },
]

export default router

// export default function Routes () {
//   const routes = useRoutes(router)
//   return routes
// }