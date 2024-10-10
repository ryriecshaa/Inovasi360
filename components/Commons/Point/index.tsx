import { Col, Row, Typography } from "antd";
import styles from "./Point.module.scss";

type PointType = {
  items: string[];
};

const Point = ({ items }: PointType) => {
  return (
    <div className={styles.point}>
      {items.map((item, index) => (
        <Row gutter={[0, 48]} key={index}>
          <Col key={index} lg={2} md={2} sm={24} xs={24}>
            <div className={styles.point__number}>
              <Typography.Title level={3}>{index + 1}</Typography.Title>
            </div>
          </Col>
          <Col
            key={index}
            lg={22}
            md={22}
            sm={24}
            xs={24}
            className={styles.point__col}
          >
            <Typography.Title level={3} className={styles.point__content}>
              {item}
            </Typography.Title>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default Point;
