import { Col, Row, Typography } from "antd";
import Metric from "@commons/Card/MetricCard";
import styles from "./Statistic.module.scss";
import cn from "classnames";
import Header from "@commons/Header";
import Button from "@commons/Button";

type StatisticPropsType = {
  title: string;
  subtitle: string;
  metrics: { title: string; subtitle: string; image: string }[];
  withButton?: boolean;
  isAboutUs?: boolean;
  textAlign: "center" | "left";
  getCollabStyle: "default" | "outline" | "outline-light"
};

const Statistic = (props: StatisticPropsType) => {
  const { title, subtitle, metrics, withButton, textAlign, getCollabStyle, isAboutUs } = props;

  return (
    <div className={styles.statistic}>
      <div className={styles.statistic__content}>
        <div
          className={cn(styles.statistic__header, {
            [styles.statistic__header__left]: textAlign === "left",
            [styles.statistic__header__center]: textAlign === "center",
          })}
        >
          <Header title={title} subtitle={subtitle}></Header>

          {withButton && isAboutUs && (
            <div className={styles.statistic__buttonAboutUs}>
              <Button title="Let's Get Collab" typeButton={getCollabStyle} href="/get-collab"></Button>
            </div>
          )}

          {withButton && !isAboutUs && (
            <div className={styles.statistic__button}>
              <Button title="Let's Get Collab" typeButton={getCollabStyle} href="/get-collab"></Button>
            </div>
          )}
        </div>

        <Row gutter={[48, 48]}>
          {metrics &&
            metrics.map((item, index) => (
              <Col lg={8} sm={24} key={index}>
                <div style={{ height: '100%', display: 'flex' }}>
                  <Metric
                    title={item.title}
                    subtitle={item.subtitle}
                    image={item.image}
                  />
                </div>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};

export default Statistic;