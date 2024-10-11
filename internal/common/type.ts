import { ReactNode } from "react";

export type SectionType = {
  title: string;
  subtitle: string;
  // items: ItemsType[];
};

export type ItemsType = { title: string; subtitle: string; image: string };

export type MenuItemType = {
  key: string;
  label: ReactNode;
  url: string;
  isMainMenu: boolean;
};

export type JobType = {
  location: string;
  name: string;
};

export type FilterType = {
  label: string;
  value: string;
  isActive: boolean;
  onClick?: () => void;
};
