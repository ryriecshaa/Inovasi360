import styles from "./Detail.module.scss";
import { Typography, Grid } from "antd";
import Button from "@commons/Button";
import DetailCard from "@commons/Card/DetailCard";
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time
import { useState, useEffect } from "react";

type DetailType = {
  title: string;
  subtitle: string;
  buttonName: string;
  urlDetail: string | null;
  itemDetail: itemDetailType[];
};

export type itemDetailType = { title: string; description: string; image: string | null; urlDetail: string | null };
const { useBreakpoint } = Grid;

const Detail = ({ title, subtitle, buttonName, urlDetail, itemDetail }: DetailType) => {
  // nanti diganti kalo udah ngambil data dari cms
  const [width, setWidth] = useState(600);

  const { lg, md, sm } = useBreakpoint();

  useEffect(() => {
    let totalWidth = itemDetail.length;
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
    <div className={styles.detail}>
      <div className={styles.detail__content}>
        <Typography.Title className={styles.detail__title}>
          {title}
        </Typography.Title>
        <Typography.Title className={styles.detail__description}>
          {subtitle}
        </Typography.Title>
        <Button title={buttonName} typeButton="outline" href={urlDetail ?? "/"} />
      </div>
      <Draggable
        axis="x"
        bounds={{ left: -width * 2, top: 0, right: 0, bottom: 0 }}>
        <div className="App">
          {itemDetail.map((item, index) => (
            <DetailCard
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
              urlDetail={item.urlDetail}
            />
          ))}
        </div>
      </Draggable>
    </div>
  );
};

export default Detail;
