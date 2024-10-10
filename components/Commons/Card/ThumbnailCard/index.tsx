import { Card, Image, Typography } from "antd";
import styles from "./ThumbnailCard.module.scss";

type thumbnailCardType = {
  image: string;
  title: string;
  subtitle: string;
};

const ThumbnailCard = ({ image, title, subtitle }: thumbnailCardType) => {
  return (
    <Card className={styles.thumbnailCard}>
      <div className={styles.thumbnailCard__image}>
        <Image
          src={image}
          alt={title}
          preview={false}
        />
      </div>
    </Card>
  );
};

export default ThumbnailCard;
