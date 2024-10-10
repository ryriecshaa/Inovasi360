import { Row, Col } from "antd";
import styles from "./ListCareer.module.scss";
import CareerCard from "@commons/Card/CareerCard";

type ListCareerPropsType = {
  items: ItemsType[];
};

export type ItemsType = { title: string; location: string };

const ListCareer = ({ items }: ListCareerPropsType) => {
  return (
    <div className={styles.listCareer}>
      <Row gutter={[48, 48]}>
        {items.map((item, index) => (
          <Col key={index} lg={12} sm={24}>
            <CareerCard title={item.title} location={item.location} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ListCareer;
