import Button from "@commons/Button";
import styles from "./Footer.module.scss";
import { Col, Grid, Image, Row, Space, Typography } from "antd";
import { footerMenu } from "@internal/home/const";
import Link from "next/link";
import Drawer from "@commons/Drawer";
import { getFooterQuery } from "query/FooterQuery";
import { SocmedFooterQuery } from "query/SocmedFooterQuery"
import { getProductQuery } from "query/ProductQuery"
import { getPortofolioQuery } from "query/PortofolioQuery";
import { getStoryQuery } from "query/StoryQuery";
import { getPrivacyAndPolicyQuery } from "query/PrivacyAndPolicyQuery";
import { getTermAndConditionQuery } from "query/TermAndConditionQuery";
import { useState, useEffect } from "react";
import { filter } from "lodash";

const Footer = () => {
  const [isJudulFooter, setJudulFooter] = useState([]);
  const [isSubJudulFooter, setSubJudulFooter] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isSocmed, setSocmed] = useState<Array<{ title: string; link: string; }>>([]);
  const [isProducts, setProducts] = useState<Array<{ title: string; link: string }>>([]);
  const [isPortfolio, setPortfolio] = useState<Array<{ title: string; link: string }>>([]);
  const [isPrivacyAndPolicy, setPrivacyAndPolicy] = useState<Array<{ title: string; link: string }>>([]);
  const [isTermAndCondition, setTermAndCondition] = useState<Array<{ title: string; link: string }>>([]);
  const [isStayUpdate, setStayUpdate] = useState<Array<{ title: string; link: string }>>([]);
  const { useBreakpoint } = Grid;
  const { md } = useBreakpoint();


  const getSelectionFooter = async () => {
    const { props } = await getFooterQuery();
    const footer = props.footer;
    return { footer };
  };

  useEffect(() => {
    getSelectionFooter()
      .then((result) => {
        console.log(result)
        setJudulFooter(result.footer[0].node.wording.judul)
        setSubJudulFooter(result.footer[0].node.wording.subJudul)
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);


  const getWordingFooter = async () => {
    const response = await getFooterQuery();
    if (response.data) {
      const footer = response.data.allWordingFooter.edges.filter((node: any) => {
        let getAksiTerapkan = node?.node?.wording.aksiTerapkan

        if (getAksiTerapkan !== null) {
          if (getAksiTerapkan[0] == 'Terapkan') {
            return true
          }
        }
      });
      const wordingTerapkan = footer[0].node.wording;
      setJudulFooter(wordingTerapkan.judul);
      setSubJudulFooter(wordingTerapkan.subJudul);
    }
  };

  useEffect(() => {
    getWordingFooter();
  }, []);


  const getSocmedFooter = async () => {
    const response = await SocmedFooterQuery('5');
    if (response.data) {
      const updateData = response.data.allSocialMedia.edges.map((edges: { node: any; }) => {
        const { node } = edges;
        const { socialMedia } = node;

        return {
          title: socialMedia.namaSocialMedia,
          link: socialMedia.link,
        };

      });
      setSocmed(updateData)
    }
  }

  const getProductsFooter = async () => {
    const response = await getProductQuery('5');
    if (response.data) {
      const updateData = response.data.allProduct.edges.map((edges: { node: any; }) => {
        const { node } = edges;
        const { product } = node;

        return {
          title: product.nameProduct,
          link: `/product/${product?.nameProduct?.replaceAll(/\s/g, '')}`,
        };

      });
      setProducts(updateData)
    }
  }

  const getPortfolioFooter = async () => {
    const response = await getPortofolioQuery('5');
    if (response.data) {
      const updateData = response.data.allPortfolio.edges.map((edges: { node: any; }) => {
        const { node } = edges;
        const { product, portfolioId } = node;

        return {
          title: product.namePortfolio,
          link: `/portfolio/${portfolioId}`,
        };

      });
      setPortfolio(updateData)
    }
  }

  const getStoryFooter = async () => {
    const response = await getStoryQuery('5');
    if (response.data) {
      const Category = new Set();
      const updateData = response.data.allStory.edges.reduce(
        (acc: { title: any; link: string; }[], { node }: any) => {
          const { kategoriStory } = node;
          let kategori = kategoriStory.edges[0].node.name;


          if (!Category.has(kategori)) {
            !Category.add(kategori);

            acc.push({
              title: kategori,
              link: `/story/`,
            });
          }

          return acc;
        },
        []
      );
      setStayUpdate(updateData)
    }
  };

  useEffect(() => {
    getSocmedFooter();
    getProductsFooter();
    getPortfolioFooter();
    getStoryFooter();
  }, []);


  const getPrivacyAndPolicy = async () => {
    const response = await getPrivacyAndPolicyQuery();
    if (response.data) {
      const updateData = response.data.allPrivacyAndPolicy.edges.map((edges: { node: any; }) => {
        const { node } = edges;
        const { privacyAndPolicy } = node;
        const getAksiTerapkan = privacyAndPolicy.aksiTerapkan;
        if (getAksiTerapkan == 'Terapkan') {
          return {
            title: "Privacy & Condition",
            link: `/privacyandpolicy/`,
          };
        }
        return null;
      });
      const filteredData = updateData.filter((data: null) => data !== null);
      setPrivacyAndPolicy(filteredData)
    }
  }
  useEffect(() => {
    getPrivacyAndPolicy();
  }, []);


  const getTermAndCondition = async () => {
    const response = await getTermAndConditionQuery();
    if (response.data) {
      const updateData = response.data.allTermAndCondition.edges.map((edges: { node: any; }) => {
        const { node } = edges;
        const { termAndCondition } = node;
        const getAksiTerapkan = termAndCondition.aksiTerapkan;
        if (getAksiTerapkan == 'Terapkan') {
          return {
            title: "Term & Condition",
            link: `/termandcondition/`,
          };
        }
        return null;
      });
      const filteredData = updateData.filter((data: null) => data !== null);
      setTermAndCondition(filteredData)
    }
  }
  useEffect(() => {
    getTermAndCondition();
  }, []);


  return (
    <div className={styles.footer}>
      <div className={styles.footer__container}>
        <Drawer openCalled={openDrawer} closedClick={() => setOpenDrawer(false)} />
        <div
          className={styles.footer__contactUs}
          style={{ backgroundImage: "url(/assets/contact_us.png)" }}
        >
          <div className={styles.footer__content}>
            <div className={styles.footer__title}>
              {isJudulFooter}
            </div>
            <div className={styles.footer__subtitle}>
              {isSubJudulFooter}
            </div>
            <Space className={styles.footer__button}>
              <Button
                title="Ask Anything"
                typeButton="outline-light"
                href="/get-collab"
              ></Button>
              <Button title="Read FAQ" typeButton="outline-light" onClick={() => setOpenDrawer(true)} ></Button>
            </Space>
          </div>
        </div>
        <div className={styles.footer__footer}>
          <Row gutter={[36, 36]} justify={md ? "end" : "space-between"}>
            <Col lg={6} md={8} xs={24}>
              <div className={styles.footer__footerText}>
                <Typography.Title
                  level={4}
                  className={styles.footer__footerText__email}
                >
                  hello@inovasi360.id
                </Typography.Title>
                <Typography.Title
                  level={5}
                  className={styles.footer__footerText__address}
                >
                  Jl. Cipaku Indah VII No. 10, Bandung<br></br> Jawa Barat,
                  Indonesia<br></br>40143
                </Typography.Title>
                <Typography.Title
                  level={5}
                  className={styles.footer__footerText__address}
                >
                  +62 22 2009655
                </Typography.Title>
                <Typography.Title
                  level={5}
                  className={styles.footer__footerText__address}
                >
                  © 2023 Inovasi 360
                </Typography.Title>
              </div>
            </Col>
            <Col lg={4} md={8} xs={12} key={0}>
              <div className={styles.footer__footerText}>
                <Typography.Title level={5} className={styles.footer__menu}>
                  Products
                </Typography.Title>
                {isProducts.map((product, indexProduct) => (
                  <Link
                    key={indexProduct}
                    className={styles.footer__subMenu}
                    href={product.link}
                    data-after={product.title}
                  >
                    <span>{product.title}</span>
                  </Link>
                ))}
              </div>
            </Col>
            <Col lg={4} md={8} xs={12} key={0}>
              <div className={styles.footer__footerText}>
                <Typography.Title level={5} className={styles.footer__menu}>
                  Portfolios
                </Typography.Title>
                {isPortfolio.map((portfolio, indexPortfolio) => (
                  <Link
                    key={indexPortfolio}
                    className={styles.footer__subMenu}
                    href={portfolio.link}
                    data-after={portfolio.title}
                  >
                    <span>{portfolio.title}</span>
                  </Link>
                ))}
              </div>
            </Col>
            <Col lg={3} md={8} xs={12} key={0}>
              <div className={styles.footer__footerText}>
                <Typography.Title level={5} className={styles.footer__menu}>
                  Stay Update
                </Typography.Title>
                {isStayUpdate.map((stayUpdate, indexStayUpdate) => (
                  <Link
                    key={indexStayUpdate}
                    className={styles.footer__subMenu}
                    href={{ pathname: stayUpdate.link, query: { category: stayUpdate.title } }}
                    data-after={stayUpdate.title}
                  >
                    <span>{stayUpdate.title}</span>
                  </Link>
                ))}
              </div>
            </Col>
            <Col lg={3} md={8} xs={12} key={0}>
              <div className={styles.footer__footerText}>
                <Typography.Title level={5} className={styles.footer__menu}>
                  Socials
                </Typography.Title>
                {isSocmed.map((socmed, indexSocmed) => (
                  <Link
                    key={indexSocmed}
                    className={styles.footer__subMenu}
                    href={socmed.link}
                    target="_blank"
                    data-after={socmed.title}
                  >
                    <span>{socmed.title}</span>
                  </Link>
                ))}
              </div>
            </Col>
            <Col lg={4} md={8} xs={12} key={0}>
              <div className={styles.footer__footerText}>
                <Typography.Title level={5} className={styles.footer__menu}>
                  Information
                </Typography.Title>
                {isTermAndCondition.map((termAndCondition, indexTermAndCondition) => (
                  <Link
                    key={indexTermAndCondition}
                    className={styles.footer__subMenu}
                    href={`/termandcondition`}
                    data-after={termAndCondition.title}
                  >
                    <span>{termAndCondition.title}</span>
                  </Link>
                ))}
                {isPrivacyAndPolicy.map((privacyAndPolicy, indexPrivacyAndPolicy) => (
                  <Link
                    key={indexPrivacyAndPolicy}
                    className={styles.footer__subMenu}
                    href={`/privacyandpolicy`}
                    data-after={privacyAndPolicy.title}
                  >
                    <span>{privacyAndPolicy.title}</span>
                  </Link>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Footer;