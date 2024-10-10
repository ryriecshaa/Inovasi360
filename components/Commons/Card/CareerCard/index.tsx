import styles from "./CareerCard.module.scss";
import Button from "@commons/Button";
import { Card, Typography } from "antd";

import { HiOutlineLocationMarker } from "react-icons/hi";
import Link from "next/link";

type CareerCardType = {
  title: string;
  location: string;
};
const index = ({ title, location }: CareerCardType) => {
  return (
    <>
      <Card className={styles.careerCard}>
        <div className={styles.careerCard__location}>
          <HiOutlineLocationMarker className={styles.careerCard__iconLocation} />
          <Typography.Title level={5}>{location}</Typography.Title>
        </div>
        <Typography.Title level={1} className={styles.careerCard__title}>
          {title}
        </Typography.Title>
        <Link href={`/career/${title}`}>
          <Button title="View Detail" typeButton="outline" />
        </Link>
      </Card>
    </>
  );
};

export default index;
