import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface ILayout {
  children?: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <>
      <main>{children}</main>
      <Outlet />
    </>
  );
};

export default Layout;
