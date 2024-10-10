import { Collapse, Typography } from "antd";
import styles from "./Accordion.module.scss";

type AccordionPropsType = {
  header: string;
  content: string;
  key: number;
};

const Accordion = (props: AccordionPropsType) => {
  const { header, key, content } = props;
  return (
    <Collapse
      // collapsible="header"
      className={styles.accordion}
      expandIconPosition="end"
      ghost
    >
      <Collapse.Panel
        className={`${styles["accordion-panel"]} ${styles["accordion-panel-header"]}`}
        header={<Typography.Text>{header}</Typography.Text>}
        key={key}
      >
        <Typography.Text>{content}</Typography.Text>
      </Collapse.Panel>
    </Collapse>
  );
};

export default Accordion;
