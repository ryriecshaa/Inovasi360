import { Card, Typography, Image, Space } from "antd";

import styles from "./MetricCard.module.scss";

type MetricPropsType = {
  title: string;
  subtitle: string;
  image: string;
};

const Metric = (props: MetricPropsType) => {
  const { title, subtitle, image } = props;
  return (
    <div className={styles.metric}>
      <div className={styles.metric__statistic}>
        <Typography.Text className={styles.metric__title}>
          {title}
        </Typography.Text>
        <Image
          className={styles.metric__image}
          preview={false}
          src={image}
          alt={title}
        />
      </div>
      <Typography.Text className={styles.metric__subtitle}>
        {subtitle}
      </Typography.Text>
    </div>
  );
};

export default Metric;
