import { DefaultLayout } from "../layouts/DefaultLayout";
import { Home } from "../pages/Home";
import { PageNotFound } from "../pages/PageNotFound";

export const DefaultRouter = [
  {
    path: "/",
    layout: DefaultLayout,
    component: Home,
  },
  {
    path: "/*",
    layout: DefaultLayout,
    component: PageNotFound,
  },
];
