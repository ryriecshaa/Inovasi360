import { Typography } from "antd";
import classNames from "classnames";
import styles from "./Header.module.scss";
import parse from "html-react-parser";
import cn from "classnames";

type headerPropsType = {
  title: string;
  subtitle: string;
  center?: boolean;
  flexWidth?: boolean;
  className?: string;
};

const Header = ({
  title,
  subtitle,
  center,
  flexWidth,
  className,
}: headerPropsType) => {
  return (
    <div className={styles.header}>
      <div
        className={classNames(styles.header__content, className, {
          [styles.header__center]: center,
          [styles.header__flexWidth]: flexWidth,
        })}>
        <Typography.Title level={1} className={styles.header__title}>
          {title}
        </Typography.Title>
        <Typography.Title level={2} className={styles.header__subtitle}>
          {parse(subtitle)}
        </Typography.Title>
      </div>
    </div>
  );
};

export default Header;
