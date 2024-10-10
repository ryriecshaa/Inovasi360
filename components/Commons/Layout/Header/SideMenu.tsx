import React, { ReactNode, useCallback, useState } from "react";
import { Menu, Grid } from "antd";
import { useRouter } from "next/router";
import { MenuItemType } from "@internal/common/type";

const { useBreakpoint } = Grid;

type SideMenuPropsType = {
  menu: MenuItemType[];
  isMainMenu: boolean;
};

const getSelectedMenu = (
  menu: MenuItemType[],
  pathname: string,
  isMainMenu: boolean
) => {
  let selectedMenu;
  if (!isMainMenu && menu.length === 1) {
    selectedMenu = menu.find(
      ({ url, isMainMenu }) => url && url === pathname && !isMainMenu
    );
    return selectedMenu?.key || "";
  } else return "";
};

const getSelectedMainMenu = (
  menu: MenuItemType[],
  pathname: string,
  isMainMenu: boolean
) => {
  const routePath = pathname.split("/")[1];
  let selectedMenu;
  if (isMainMenu && menu.length > 1) {
    selectedMenu = menu.find(
      ({ url, isMainMenu }) =>
        url && url.indexOf(routePath) !== -1 && isMainMenu
    );
    return selectedMenu?.key || "";
  } else return "";
};

const SideMenu = (props: SideMenuPropsType) => {
  const { pathname } = useRouter();
  const { lg } = useBreakpoint();
  const { menu, isMainMenu } = props;
  const selectedMainMenu = getSelectedMainMenu(menu, pathname, isMainMenu);
  const selectedMenu = getSelectedMenu(menu, pathname, isMainMenu);

  return isMainMenu ? (
    <Menu
      selectedKeys={[selectedMainMenu]}
      mode={lg ? "horizontal" : "inline"}
      disabledOverflow
    >
      {menu.map((item, index) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  ) : (
    <Menu
      selectedKeys={[selectedMenu]}
      mode={lg ? "horizontal" : "inline"}
      disabledOverflow
    >
      {menu.map((item, index) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );
};

export default SideMenu;
