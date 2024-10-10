import Footer from "@commons/Layout/Footer";
import Header from "@commons/Layout/Header";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  navbarColor: "dark" | "light";
};

const Layout = (props: LayoutProps) => {
  const { children, navbarColor } = props;
  return (
    <>
      <Header navbarColor={navbarColor} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
