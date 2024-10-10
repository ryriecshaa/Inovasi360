import styles from "./DetailCard.module.scss";
import Link from "next/link";
import { Typography } from "antd";
import NavigationButton from "@commons/NavigationButton";
import Label from "@commons/Label";
import classNames from "classnames";

type DetailType = {
  title: string;
  description: string;
  image: string | null;
  urlDetail: string | null;
  halfWidth?: boolean;
};

const index = ({ title, description, image, urlDetail, halfWidth }: DetailType) => {
  return (
    <>
      <div
        className={classNames(styles.detail, {
          [styles.detail__halfWidth]: halfWidth,
        })}
        style={{
          backgroundImage: image ? `url(${image})` : 'url(https://source.unsplash.com/collection/905011/1000x1000)',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Label name={description} />
        <div className={styles.detail__info}>
          <Typography.Title className={styles.detail__title}>
            {title}
          </Typography.Title>
          <Typography.Title className={styles.detail__description}>
            {description}
          </Typography.Title>
          <Link href={urlDetail ?? '/'}>
            <NavigationButton />
          </Link>
        </div>
      </div>
    </>
  );
};

export default index;
