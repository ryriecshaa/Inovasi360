import React, { Component, useMemo, useState } from "react";
import SideMenu from "./SideMenu";
import { Drawer, Button, Image, Layout } from "antd";
import styles from "./Header.module.scss";
import Link from "next/link";
import { headerMenu, sideMenu } from "@internal/home/const";
import cn from "classnames";

type NavbarPropsType = {
  navbarColor: string;
};

const Navbar = (props: NavbarPropsType) => {
  const { navbarColor } = props;
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const mainMenu = useMemo(() => {
    return (headerMenu || []).map((item, key) => ({
      key: key.toString(),
      url: item.url,
      isMainMenu: true,
      label: (
        <Link
          href={item.url}
          data-after={item.title}
          className={styles.menu__link}
        >
          <span>{item.title}</span>
        </Link>
      ),
    }));
  }, []);

  const rightMenu = useMemo(() => {
    return (sideMenu || []).map((item, key) => ({
      key: headerMenu.length.toString(),
      url: item.url,
      isMainMenu: false,
      label: (
        <Link
          href={item.url}
          data-after={item.title}
          className={styles.menu__link}
        >
          <span>{item.title}</span>
        </Link>
      ),
    }));
  }, []);

  return (
    <div
      className={cn(styles.menu, {
        [styles.menu__dark]: navbarColor === "dark",
        [styles.menu__light]: navbarColor === "light",
      })}
    >
      <nav className={styles.menuBar}>
        <div className={styles.menuCon}>
          <Link href="/">
            <Image
              alt="brand-logo"
              preview={false}
              src={
                navbarColor === "dark"
                  ? "/assets/logo.png"
                  : "/assets/logo_light.png"
              }
            />
          </Link>
          <div className={styles.leftMenu}>
            <SideMenu menu={mainMenu} isMainMenu />
          </div>
          <div className={styles.rightMenu}>
            <SideMenu menu={rightMenu} isMainMenu={false} />
          </div>
          <Button
            className={cn(styles.barsMenu, {
              [styles.darkMenu]: navbarColor === "dark",
              [styles.lightMenu]: navbarColor === "light",
            })}
            type="primary"
            onClick={showDrawer}
          >
            <span
              className={cn(styles.barsBtn, {
                [styles.darkBtn]: navbarColor === "dark",
                [styles.lightBtn]: navbarColor === "light",
              })}
            ></span>
          </Button>
          <Drawer
            title="Inovasi 360"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <SideMenu menu={mainMenu} isMainMenu />
            <SideMenu menu={rightMenu} isMainMenu={false} />
          </Drawer>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
