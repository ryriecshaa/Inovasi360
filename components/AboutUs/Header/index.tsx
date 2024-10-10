import ImageCard from "@commons/Card/ImageCard";
import Header from "@commons/Header";
import { SectionType } from "@internal/common/type";
import { Col, Row } from "antd";
import styles from "./Header.module.scss";
import { AboutUsQuery } from "query/AboutUsQuery";
import { useEffect, useState } from "react";

const HeaderComponent = (props: SectionType) => {
  const { title, subtitle } = props;
  const [titleCard1, setTitleCard1] = useState("");
  const [deskripsiCard1, setDeskripsiCard1] = useState("");
  const [titleCard2, setTitleCard2] = useState("");
  const [deskripsiCard2, setDeskripsiCard2] = useState("");
  const [titleCard3, setTitleCard3] = useState("");
  const [deskripsiCard3, setDeskripsiCard3] = useState("");

  const getHeader = async () => {
    const response = await AboutUsQuery();
    if (response.data) {
      const getCard = response.data.allAboutUs.edges[0].node.aboutUs;
      const titleCard1 = getCard.judulCard11;
      const deskripsiCard1 = getCard.deskripsiCard11;
      const titleCard2 = getCard.judulCard12;
      const deskripsiCard2 = getCard.deskripsiCard12;
      const titleCard3 = getCard.judulCard13;
      const deskripsiCard3 = getCard.deskripsiCard13;
      
      setTitleCard1(titleCard1);
      setDeskripsiCard1(deskripsiCard1);
      setTitleCard2(titleCard2);
      setDeskripsiCard2(deskripsiCard2);
      setTitleCard3(titleCard3);
      setDeskripsiCard3(deskripsiCard3);
    }
  };

  useEffect(() => {
    getHeader();
  }, []);
  
  return (
    <div className={styles.header}>
      <Header title={title} subtitle={subtitle} center flexWidth></Header>
      {/* <Row gutter={[48, 48]}>
        {items.map((item, index) => (
          <Col key={index} lg={8} sm={24}>
            <ImageCard
              title={item.title}
              image={item.image}
              subtitle={item.subtitle}
            />
          </Col>
        ))}
      </Row> */}
      <Row gutter={[48, 48]}>
        <Col lg={8} sm={24}>
          <ImageCard
            title={titleCard1}
            image="/assets/inspiring.png"
            subtitle={deskripsiCard1}
          />
        </Col>
        <Col lg={8} sm={24}>
          <ImageCard
            title={titleCard2}
            image="/assets/impactful.png"
            subtitle={deskripsiCard2}
          />
        </Col>
        <Col lg={8} sm={24}>
          <ImageCard
            title={titleCard3}
            image="/assets/enrich.png"
            subtitle={deskripsiCard3}
          />
        </Col>
      </Row>
    </div>
  );
};

export default HeaderComponent;