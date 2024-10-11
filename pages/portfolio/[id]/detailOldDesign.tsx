import Layout from "@commons/Layout";
import Header from "@commons/Header";
import { otherStory, storyDetail } from "@internal/story/const";
import styles from "./StoryDetail.module.scss";
import ImageBanner from "@commons/ImageBanner";
import parse from "html-react-parser";
import { Col, Row, Typography } from "antd";
import StoryCard from "@commons/Card/StoryCard";

const Detail = () => {
  return (
    <Layout navbarColor="light">
      <div className={styles.storyDetail__withPadding}>
        <Header title={storyDetail.title} subtitle="Published by Inovasi360" />
      </div>
      <ImageBanner title={storyDetail.title} image={storyDetail.image} />
      <div className={styles.storyDetail__withPadding}>
        <Typography.Paragraph className={styles.storyDetail__content}>
          {parse(storyDetail.content)}
        </Typography.Paragraph>
      </div>
      <div className={styles.storyDetail__withPadding}>
        <Typography.Title className={styles.storyDetail__otherStory}>
          Stories you might like
        </Typography.Title>
        <Row gutter={[60, 60]}>
          {otherStory.map((item, index) => (
            <Col span={8} key={index}>
              {/* <StoryCard {...item} /> */}
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default Detail;
