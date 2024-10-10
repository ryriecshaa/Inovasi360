import { Typography } from "antd";
import styles from "./JobCard.module.scss";

type JobCardPropsType = {
  location: string;
  name: string;
};

const JobCard = (props: JobCardPropsType) => {
  const { location, name } = props;

  return (
    <div className={styles.jobCard}>
      <Typography.Title level={5} className={styles.jobCard__location}>
        {location.toUpperCase()}
      </Typography.Title>
      <Typography.Title className={styles.jobCard__name}>
        {name}
      </Typography.Title>
    </div>
  );
};

export default JobCard;
