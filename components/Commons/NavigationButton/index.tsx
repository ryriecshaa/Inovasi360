import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styles from "./NavigationButton.module.scss";

const index = () => {
  return (
    <>
      <Button className={styles.navigationButton} shape="circle" icon={<ArrowRightOutlined />} />
    </>
  );
};

export default index;
