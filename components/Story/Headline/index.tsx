import Button from "@commons/Button";
import StoryCard from "@commons/Card/StoryCard";
import { StoryType } from "@internal/story/type";
import { Image, Typography } from "antd";
import styles from "./Headline.module.scss";

const Headline = (props: StoryType) => {
  const { title, content, image, id } = props;
  return (
    <div className={styles.headline}>
      <StoryCard {...props} isHeadline />
    </div>
  );
};

export default Headline;
