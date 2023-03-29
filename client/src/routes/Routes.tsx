import { Navigate, Route, Routes as RoutesWrapper } from "react-router-dom";
import { authLayoutRoutes, mainLayoutRoutes } from "./const";

import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const Routes = () => {
  const { isLoggedIn } = useContext(UserContext);

  const { Layout, routes } = isLoggedIn ? mainLayoutRoutes : authLayoutRoutes;
  return (
    <RoutesWrapper>
      {routes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Layout>
              <Component />
            </Layout>
          }
        />
      ))}
      <Route
        path="*"
        element={
          <Layout>
            <Navigate to={{ pathname: "/login" }} />
          </Layout>
        }
      />
    </RoutesWrapper>
  );
};

export default Routes;
