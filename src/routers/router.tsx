import { DefaultLayout } from "../layouts/DefaultLayout";
import { Home } from "../pages/Home";

export const DefaultRouter = [
  {
    path: "/",
    layout: DefaultLayout,
    component: Home,
  },
];
