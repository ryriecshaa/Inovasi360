import Layout from "@commons/Layout";
import Header from "@commons/Header";
import { otherStory } from "@internal/story/const";
import styles from "./StoryDetail.module.scss";
import ImageBanner from "@commons/ImageBanner";
import parse from "html-react-parser";
import { Col, Row, Typography, Grid } from "antd";
import StoryCard from "@commons/Card/StoryCard";
import Draggable from "react-draggable";
import { useState, useEffect } from "react";
import { getDetailStory } from "query/DetailStory";
import striptags from 'striptags'
import { useRouter } from "next/router";
import { getStoryQuery } from "query/StoryQuery";
// import useWindowSize from "@utils/windowSize"
const { useBreakpoint } = Grid;

const StoryDetail = () => {
  // const {width} = useWindowSize()
  const [width, setWidth] = useState(600);
  const { lg, md, sm, xs } = useBreakpoint();
  const router = useRouter();
  const { slug } = router.query;
  const id = parseInt(slug as string, 10);
  const [isDetailStoryTitle, setDetailStoryTitle] = useState("");
  const [isDetailStorySubtitle, setDetailStorySubtitle] = useState("");
  const [isDetailStoryBanner, setDetailStoryBanner] = useState("");
  const [isDetailStoryDescription, setDetailStoryDescription] = useState("");
  const [isListDetailStory, setListDetailStory] = useState<Array<{ image: string; title: string; content: string; id: string; }>>([]);

  useEffect(() => {
    let totalWidth = otherStory.length
    if (xs) {
      totalWidth = totalWidth * 250
      setWidth(totalWidth)
    } else {
      totalWidth = totalWidth * 200
      setWidth(totalWidth)
    }
  });
  useEffect(() => {
    getListDetailStory();
  }, []);

  const getStoryDetail = async () => {
    const response = await getDetailStory(id);
    if (response.data) {
      const storyDetail = response.data.storyBy.story;
      setDetailStoryTitle(storyDetail.judul);
      setDetailStorySubtitle(storyDetail.penulis);
      setDetailStoryBanner(storyDetail.banner.sourceUrl);
      setDetailStoryDescription(storyDetail.story);
    }
  }
  useEffect(() => {
    if (id) {
      getStoryDetail();
    }
  }, [id])

  const getListDetailStory = async () => {
    const response = await getStoryQuery('999');
    if (response.data) {
      const updateData = response.data.allStory.edges.map((edges: { node: any; }) => {
        const { node } = edges;
        const { story, storyId } = node;

        return {
          title: story.judul,
          content: striptags(story.story),
          image: story.banner?.sourceUrl,
          id: node.databaseId,
        };
      });
      setListDetailStory(updateData)
    }
  };

  return (
    <Layout navbarColor="light">
      <div className={styles.storyDetail__withPadding}>
        <Header
          title={isDetailStoryTitle}
          subtitle={isDetailStorySubtitle}
        />
      </div>
      <ImageBanner title={isDetailStoryTitle} image={isDetailStoryBanner} />
      <div className={styles.storyDetail__withPadding}>
        <Typography.Paragraph className={styles.storyDetail__content}>
          {parse(isDetailStoryDescription)}
        </Typography.Paragraph>
      </div>
      <div className={styles.storyDetail__withPadding}>
        <Typography.Title className={styles.storyDetail__otherStory}>
          Stories you might like
        </Typography.Title>
        {!xs && (
          <Row gutter={[60, 60]}>
          {isListDetailStory.map((item, index) => {
            const itemId = parseInt(item.id, 10);
            if (itemId !== id) {
              return (
                <Col span={8} key={index}>  
                  <StoryCard {...item} />
                </Col>
              );
            }
            return null;
          }).filter(Boolean).slice(0, 3)}
        </Row>
        )}
      </div>
      {xs && (
        <Draggable
          axis="x"
          bounds={{ left: -width, top: 0, right: 0, bottom: 0 }}
        >
          <div className={styles.storyDetail__containerOtherStory}>
            {otherStory.map((item, index) => (
              <StoryCard id={""} {...item} key={index} />
            ))}
          </div>
        </Draggable>
      )}
    </Layout>
  );
};

export default StoryDetail;
