import styles from "./Label.module.scss";
import { Typography } from "antd";

type LabelType = {
    name: string;
}

const index = ({name}: LabelType) => {
    return (
        <Typography className={styles.label}>
            {name}
        </Typography>
    )
}

export default index;