import styles from "./Product.module.scss";
import { Typography, Grid } from "antd";
import Button from "@commons/Button";
import PortfolioCard from "@commons/Card/PortfolioCard";

import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time
import { useState, useEffect } from "react";

type ProductType = {
  title: string;
  subtitle: string;
  buttonName: string;
  itemProduct: itemProductType[];
};

export type itemProductType = { id: string | null; title: string; description: string; image: string };
const { useBreakpoint } = Grid;

const Product = ({ title, subtitle, buttonName, itemProduct }: ProductType) => {
  // nanti diganti kalo udah ngambil data dari cms
  const [width, setWidth] = useState(600);

  const { lg, md, sm } = useBreakpoint();

  useEffect(() => {
    let totalWidth = itemProduct.length;
    if (lg) {
      totalWidth = totalWidth * 200;
      setWidth(totalWidth);
    } else if (md || sm) {
      totalWidth = totalWidth * 225;
      setWidth(totalWidth);
    } else {
      totalWidth = totalWidth * 165;
      setWidth(totalWidth);
    }
  });

  return (
    <div className={styles.product}>
      <div className={styles.product__content}>
        <Typography.Title className={styles.product__title}>
          {title}
        </Typography.Title>
        <Typography.Title className={styles.product__description}>
          {subtitle}
        </Typography.Title>
        <Button title={buttonName} typeButton="outline" href="/portfolio" />
      </div>
      <Draggable
        axis="x"
        bounds={{ left: -width * 2, top: 0, right: 0, bottom: 0 }}>
        <div className="App">
          {itemProduct.map((item, index) => (
            <PortfolioCard
              key={index}
              id={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      </Draggable>
    </div>
  );
};

export default Product;
