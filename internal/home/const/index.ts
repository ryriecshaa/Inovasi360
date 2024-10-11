import { getFooterQuery } from "query/FooterQuery";
import { useState, useEffect } from "react";

export const headerMenu = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Product",
    url: "/product",
  },
  {
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    title: "Career",
    url: "/career",
  },
  {
    title: "Story",
    url: "/story",
  },
  {
    title: "About Us",
    url: "/about-us",
  },
];

export const sideMenu = [
  {
    title: "Let's Get Collab",
    url: "/get-collab",
  },
];

export const footerMenu = [
  {
    title: "Products",
    subMenu: [
      {
        title: "Dzikra App",
        url: "/detail",
      },
      {
        title: "Dimulai.id",
        url: "/detail",
      },
      {
        title: "Organify",
        url: "/detail",
      },
      {
        title: "Telemedicine",
        url: "/detail",
      },
    ],
  },
  {
    title: "Portfolios",
    subMenu: [
      {
        title: "Latest Case",
        url: "/portfolio",
      },
      {
        title: "Web",
        url: "/portfolio",
      },
      {
        title: "Mobile",
        url: "/portfolio",
      },
      {
        title: "Sales",
        url: "/portfolio",
      },
      {
        title: "Management",
        url: "/portfolio",
      },
    ],
  },
  {
    title: "Stay Updated",
    subMenu: [
      {
        title: "Newsletter",
        url: "/story",
      },
      {
        title: "Latest Story",
        url: "/story",
      },
    ],
  },
];

export const statisticContent = {
  title: "Better begins now.",
  subtitle:
    "We don’t wait for things to get better. We collab to make things better.<br> Have a better idea?",
  metrics: [
    {
      title: "1.293",
      subtitle: "Product Users",
      image: "/assets/smile.png",
    },
    {
      title: "89",
      subtitle: "Clients Collab",
      image: "/assets/chat.png",
    },
    {
      title: "178",
      subtitle: "Projects Handled",
      image: "/assets/chat.png",
    },
  ],
};

export const heroBannerContent = {
  title: "Digital innovations for your ",
  description: "Crafting the latest solution in this era for any interests.",
  buttonName: "Let's Get Collab",
  buttonUrl: "/get-collab",
  image: "assets/banner_home.png",
};

export const eventLabelContent = {
  title: "Event Webinar",
};

export const eventBannerContent = {
  title: "Fenomena & Dampak Ngemis Online.",
  description: "By Rika Yanti on June 15, 2023.",
  buttonName: "Register Now",
  image: "assets/banner_mic.png",
};

export const productContent = {
  title: "We've crafted lots of impactful solution.",
  description:
    " We believe everything we've been doing is for good yet positive impacts.",
  buttonName: "See Our Portfolio",
};

export const companies = [
  {
    image: "assets/companies/indonesian_ortopedy.png",
    alt: "Indonesian Orthopaedic Association",
  },
  { image: "assets/companies/semen_indonesia.png", alt: "Semen Indonesia" },
  { image: "assets/companies/gapura.png", alt: "Gapura" },
  { image: "assets/companies/bank_indonesia.png", alt: "Bank Indonesia" },
  { image: "assets/companies/kimia_farma.png", alt: "Kimia Farma" },
  { image: "assets/companies/biofarma.png", alt: "Biofarma" },
  { image: "assets/companies/jabar.png", alt: "Pemprov Jabar" },
  { image: "assets/companies/agrico.png", alt: "Agrico" },
  { image: "assets/companies/poultry.png", alt: "Poultry" },
  { image: "assets/companies/akses_prima.png", alt: "Akses Prima" },
  { image: "assets/companies/infia.png", alt: "Infia" },
  { image: "assets/companies/bpk.png", alt: "Badan Pemeriksa Keuangan" },
];
