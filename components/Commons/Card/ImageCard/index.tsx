import { ItemsType } from "@internal/common/type";
import { Card, Typography, Image } from "antd";
import styles from "./ImageCard.module.scss";

const ImageCard = (props: ItemsType) => {
  const { title, image, subtitle } = props;
  return (
    <Card className={styles.imageCard}>
      <Image height={100} width={100} src={image} alt={title} preview={false} />
      <Typography.Title className={styles.imageCard__title} level={1}>
        {title}
      </Typography.Title>
      <Typography.Title className={styles.imageCard__subtitle} level={3}>
        {subtitle}
      </Typography.Title>
    </Card>
  );
};

export default ImageCard;
