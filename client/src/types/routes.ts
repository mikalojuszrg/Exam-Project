import { LazyExoticComponent, PropsWithChildren } from "react";

type MainRoute = {
  path: "/timeline" | "/timeline/:id";
  Component: LazyExoticComponent<() => JSX.Element>;
};

type AuthRoute = {
  path: "/register" | "/login";
  Component: LazyExoticComponent<() => JSX.Element>;
};

export type MainLayoutRoutes = {
  Layout: (children: PropsWithChildren) => JSX.Element;
  routes: MainRoute[];
};
export type AuthLayoutRoutes = {
  Layout: (children: PropsWithChildren) => JSX.Element;
  routes: AuthRoute[];
};
