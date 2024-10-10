import styles from "../ProductCard/ProductCard.module.scss";
import { Typography } from "antd";
import NavigationButton from "@commons/NavigationButton";
import Link from "next/link";
import Label from "@commons/Label";
import classNames from "classnames";

type ProductType = {
  id: string | null,
  title: string;
  description: string;
  image: string | null;
  halfWidth?: boolean;
};

const Index = ({ id, title, description, image, halfWidth }: ProductType) => {
  return (
    <>
      <div
        className={classNames(styles.product, {
          [styles.product__halfWidth]: halfWidth,
        })}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Label name={description} />

        <div className={styles.product__info}>
          <Typography.Title className={styles.product__title}>
            {title}
          </Typography.Title>

          <Typography.Title className={styles.product__description}>
            {description}
          </Typography.Title>

          <Link href={`/portfolio/${id}`}>
            <NavigationButton />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Index;
