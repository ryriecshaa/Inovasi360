import Header from "@commons/Header";
import Layout from "@commons/Layout";
import styles from "./TermAndCondition.module.scss";
import { useEffect, useState } from "react";
import React from "react";
import { getTermAndConditionQuery } from "query/TermAndConditionQuery";
import { Row, Col } from "antd";
import _ from "lodash";

const TermAndCondition = () => {
  const [isJudul, setJudul] = useState("");
  const [isSubJudul, setSubJudul] = useState("");
  const [isContent, setContent] = useState("");

  const allTermAndCondition = async () => {
    const response = await getTermAndConditionQuery();
    if (response.data) {
      const termAndCondition = response.data.allTermAndCondition.edges.filter((edges: any) => {
        let getAksiTerapkan = edges?.node?.termAndCondition.aksiTerapkan
        if (getAksiTerapkan !== null) {
          if (getAksiTerapkan == 'Terapkan') {
            return true
          }
        }
      });
      const termAndConditionTerapkan = termAndCondition[0].node.termAndCondition;
      setJudul(termAndConditionTerapkan.judul);
      setSubJudul(termAndConditionTerapkan.subJudul);
      setContent(termAndConditionTerapkan.content);
    }
  };

  useEffect(() => {
    allTermAndCondition();
  }, []);

  const formatContentWithPTags = (content: string) => {
    return content
      .split("\n")
      .map((line, index) => `<p key=${index}>${line}</p>`)
      .join("");
  };

  return (
    <Layout navbarColor="light">
      <div className={styles.termAndCondition}>
        <Header
        title={isJudul}
        subtitle={isSubJudul}
        />
        <Row>
          <Col span={24}>
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: formatContentWithPTags(isContent) }} />
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default TermAndCondition;
