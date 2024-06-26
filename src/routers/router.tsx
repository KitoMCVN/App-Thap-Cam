import { DefaultLayout } from "../layouts/DefaultLayout";
import { Home } from "../pages/Home";
import Login from "../pages/Login/Login";
import { PageNotFound } from "../pages/PageNotFound";

export const DefaultRouter = [
  {
    path: "/",
    layout: DefaultLayout,
    component: Home,
  },
  {
    path: "/auth/login",
    layout: DefaultLayout,
    component: Login,
  },
  {
    path: "/*",
    layout: DefaultLayout,
    component: PageNotFound,
  },
];

export const LoggedRouter = [
  {
    path: "/auth/*",
    layout: DefaultLayout,
    component: PageNotFound,
  },
];
