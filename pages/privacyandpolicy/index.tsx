import Header from "@commons/Header";
import Layout from "@commons/Layout";
import styles from "./PrivacyAndPolicy.module.scss";
import { useEffect, useState } from "react";
import React from "react";
import { getPrivacyAndPolicyQuery } from "query/PrivacyAndPolicyQuery";
import { Row, Col } from "antd";
import _ from "lodash";

const PrivacyAndPolicy = () => {
  const [isJudul, setJudul] = useState("");
  const [isSubJudul, setSubJudul] = useState("");
  const [isContent, setContent] = useState("");

  const allPrivacyAndPolicy = async () => {
    const response = await getPrivacyAndPolicyQuery();
    if (response.data) {
      const privacyAndPolicy = response.data.allPrivacyAndPolicy.edges.filter((edges: any) => {
        let getAksiTerapkan = edges?.node?.privacyAndPolicy.aksiTerapkan
        if (getAksiTerapkan !== null) {
          if (getAksiTerapkan == 'Terapkan') {
            return true
          }
        }
      });
      const privacyAndPolicyTerapkan = privacyAndPolicy[0].node.privacyAndPolicy;
      setJudul(privacyAndPolicyTerapkan.judul);
      setSubJudul(privacyAndPolicyTerapkan.subJudul);
      setContent(privacyAndPolicyTerapkan.content);
    }
  };

  useEffect(() => {
    allPrivacyAndPolicy();
  }, []);

  const formatContentWithPTags = (content: string) => {
    return content
      .split("\n")
      .map((line, index) => `<p key=${index}>${line}</p>`)
      .join("");
  };

  return (
    <Layout navbarColor="light">
      <div className={styles.privacyAndPolicy}>
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

export default PrivacyAndPolicy;
