import Button from "@commons/Button";
import JobCard from "@commons/Card/JobCard";
import { JobType } from "@internal/common/type";
import { Col, Row, Typography } from "antd";
import styles from "./Career.module.scss";
import { AboutUsQuery } from "query/AboutUsQuery";

type CareerPropsType = {
  title: string;
  subtitle: string;
  jobs: JobType[];
  buttonName: string;
  buttonHref: string;
};

const Career = (props: CareerPropsType) => {
  const { title, subtitle, jobs, buttonName, buttonHref } = props;
  


  return (
    <div className={styles.career}>
      <div className={styles.career__header}>
        <Typography.Title level={1} className={styles.career__title}>
          {title}
        </Typography.Title>
        <Typography.Title level={3} className={styles.career__subtitle}>
          {subtitle}
        </Typography.Title>
      </div>
      <Row gutter={[48, 36]}>
        {jobs &&
          jobs.map((item, index) => (
            <Col key={index} lg={8} sm={24} className={styles.career__subtitle}>
              <JobCard location={item.location} name={item.name} />
            </Col>
          ))}
      </Row>
      <Button
        href={buttonHref}
        className={styles.career__button}
        title={buttonName}
        typeButton="outline"
      />
    </div>
  );
};

export default Career;


