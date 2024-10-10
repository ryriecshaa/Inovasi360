import { companies } from "@internal/home/const";
import { Typography, Image, Space, Row, Col } from "antd";
import styles from "./Companies.module.scss";
import { HomeSectionFour } from "query/HomeQuery";
import { useState, useEffect } from "react";

const Companies = () => {
  const [isCompanies, setCompanies] = useState<any[]>([]);
  const getSelectionCompanies = async () => {
    const response = await HomeSectionFour();
    if (response.data) {
      let companies =
        response.data.allWordingClient.edges?.filter((item: any) => {
          let getAksiTerapkanFour = item?.node.wordingClient.terapkan[0]
          if (getAksiTerapkanFour !== null) {
            if (getAksiTerapkanFour == 'Terapkan') {
              return true
            }
          }
        });
      setCompanies(companies);
    }
  };

  useEffect(() => {
    getSelectionCompanies();
  },[]);

  return (
    <div className={styles.companies}>
      <Typography.Title level={3} className={styles.companies__title}>
        Trusted collaboration by more than 80+ companies.
      </Typography.Title>
      <Row gutter={[36, 36]} justify="space-evenly">
        {isCompanies.map((item, index) => (
          <Col key={index} md={4} lg={3}>
            <Image alt={item.node.wordingClient.namaPerusahaan} src={item.node.wordingClient.logo?.sourceUrl} preview={false} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Companies;
