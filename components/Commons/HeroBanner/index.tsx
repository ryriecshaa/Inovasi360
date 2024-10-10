import { Col, Row, Typography, Image, Grid } from "antd";
import styles from "./HeroBanner.module.scss";
import Button from "@commons/Button";
import cn from "classnames";
import { eventLabelContent } from "@internal/home/const";

type HeroBannerType = {
  title: JSX.Element;
  description: string;
  buttonName: string;
  image: string;
  backgroundColor: "dark" | "light";
  imagePosition: "center" | "bottom";
  url : string;
};

const Index = ({
  title,
  description,
  buttonName,
  image,
  backgroundColor,
  imagePosition,
  url,
}: HeroBannerType) => {
  const { useBreakpoint } = Grid;
  const { lg } = useBreakpoint();

  return (
    <>
      <div
        className={cn(styles.heroBanner, {
          [styles.heroBanner__dark]: backgroundColor === "dark",
          [styles.heroBanner__light]: backgroundColor === "light",
        })}>
        <Row className={styles.heroBanner__row}>
          <Col
            xs={24}
            lg={14}
            order={lg ? 1 : 2}
            className={styles.heroBanner__colContent}>
            {backgroundColor === "light" && (
              <div
                className={styles.heroBanner__logo}
                style={{ backgroundImage: "url(/assets/signal.png)" }}>
                <Typography className={styles.heroBanner__logoTitle}>
                  {eventLabelContent.title}
                </Typography>
              </div>
            )}
            <Typography.Title className={styles.heroBanner__title}>
              {title}
            </Typography.Title>
            <Typography.Title className={styles.heroBanner__description}>
              {description}
            </Typography.Title>
            <Button
              title={buttonName}
              typeButton={backgroundColor === "dark" ? "default" : "outline"}
              href={url}
            />
          </Col>
          <Col
            order={lg ? 2 : 1}
            xs={24}
            lg={10}
            className={cn({
              [styles.heroBanner__colImageCenter]: imagePosition === "center",
              [styles.heroBanner__colImageBottom]: imagePosition === "bottom",
            })}>
            <div
              className={cn({
                [styles.heroBanner__imageCenter]: imagePosition === "center",
                [styles.heroBanner__imageBottom]: imagePosition === "bottom",
              })}>
              <Image src={image} preview={false} />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Index;
