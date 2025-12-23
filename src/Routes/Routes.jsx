import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Apps from "../Pages/Apps";
import Installation from "../Pages/Installation";
import AppsDetails from "../Pages/AppsDetails";
import Loading from "../Pages/loading";
import ErrorApps from "../Components/ErrorApps";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <Loading />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/apps",
        element: <Apps />,
      },
      {
        path: "/installation",
        element: <Installation />,
      },
      {
        path: "/apps/:id",
        element: <AppsDetails />,
      },

      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
