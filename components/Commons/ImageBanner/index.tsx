import { Image } from "antd";
import styles from "./ImageBanner.module.scss";

type ImageBannerType = {
  image: string;
  title: string;
};
const ImageBanner = ({ image, title }: ImageBannerType) => {
  return (
    <div className={styles.imageBanner}>
      <Image src={image} alt={title} preview={false} />
    </div>
  );
};

export default ImageBanner;
