import Button from "@commons/Button";
import {StoryType} from "@internal/story/type";
import {Image, Typography} from "antd";
import styles from "./Headline.module.scss";

const StoryCard = (props: StoryType) => {
    const {title, content, image, isHeadline, id} = props;
    return (
        <div className={styles.headline}>
            <Image
                preview={false}
                src={image}
                alt={title}
                className={styles.headline__thumbnail}
            />
            <Typography.Title
                level={isHeadline ? 2 : 4}
                className={styles.headline__title}
            >
                {title}
            </Typography.Title>
            <Typography.Title level={isHeadline ? 3 : 5} ellipsis>
                {content}
            </Typography.Title>
            <Button href={`/story/${id}`} title="Read More" typeButton="outline"/>
        </div>
    );
};

export default StoryCard;
