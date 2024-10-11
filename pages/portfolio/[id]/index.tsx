import styles from "./StoryDetail.module.scss";
import Layout from "@commons/Layout";
import Statistic from "@commons/Statistic";
import DetailComponent from "@component/Home/Detail";
import ListDetailwithId from "@component/Detail/ListDetailwithId";
import { Col, Divider, Image, Row, Space } from "antd";
import Filter from "@commons/FilterDetail";
import Header from "@commons/Header";
import { detailItemContent, detailContent } from "@internal/detail/const";
import ThumbnailCard from "@commons/Card/ThumbnailCard";
import ImageBanner from "@commons/ImageBanner";
import { getDetailPortofolioQuery } from "query/DetailPortofolioQuery";
import { getPortofolioQuery } from "query/PortofolioQuery";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Link from "next/link";
import FilterLinkDetail from "@commons/FilterLinkDetail";


const Detail = () => {
  const router = useRouter()
  const { id } = router.query;
  const urlId =  parseInt(id as string, 10);

  const [isDetailPortofolio, setDetailPortofolio] = useState(initialPortofolio);
  const [isNamaPortofolio, setNamaPortofolio] = useState<Array<{ id: string; name: string; }>>([]);
  const [isDetailLinks, setDetailLinks] = useState(Array<{ title: string; type: string; link: string; }>);
  const [moreItemPortfolio, setMoreItemPortfolios] = useState<Array<{ title: string; description: string; image: string | null; urlDetail: string | null;}>>([]);


  const getDetailPortofolio = async () => {
    const response = await getDetailPortofolioQuery(urlId);
    if (response.data) {
      let detail = response.data.portfolioBy.product;
      let category = response.data.portfolioBy.kategoriPortopolio.edges.map((edge: { node: { name: any; }; }) =>{ return edge.node.name});
      detail.listKategori = category
      setDetailPortofolio(detail);
      let links = [
        {
          title: "Go to website",
          type: "website",
          link: detail.linkWebsite
        },
        {
          title: "App Store",
          type: "ios",
          link: detail.linkAppStore
        },
        {
          title: "Playstore",
          type: "android",
          link: detail.linkPlaystore,
        }
      ]
      setDetailLinks(links);
    }
  };
  
  useEffect(() => {
    if(urlId){
      getDetailPortofolio();
    }
  }, [urlId]);


  const getNamaPortofolio = async () => {
    const response = await getPortofolioQuery('5');
    if (response.data) {
      const headlinePortfolios: Array<{ title: string, description: string, image: string | null, urlDetail: string | null }> = [];
      const namaPortofolio = response.data.allPortfolio.edges.map((edges: any, index: number) => {
        const { node } = edges;
        const { product, portfolioId } = node;

        headlinePortfolios?.push({
          title: product?.headline1,
          description: product?.subHeadline1,
          image: product?. bannerHeadline1?.sourceUrl,
          urlDetail: `/portfolio/${portfolioId}`
        })

        return {
          id: portfolioId,
          name: product.namePortfolio,
        };
      });
      setNamaPortofolio(namaPortofolio);
      setMoreItemPortfolios(headlinePortfolios.slice(0, 4))
    };
  };

  useEffect(() => {
    getNamaPortofolio();
  }, []);

  const filteredMoreItemPortfolio = moreItemPortfolio.filter((item) => item.urlDetail !== `/portfolio/${id}`);


  return (
    <Layout navbarColor="light">
      <ListDetailwithId itemDetail={isNamaPortofolio} selectedKategori={urlId.toString()}/>
      <div className={styles.detail__sectionContent}>
        <div className={styles.detail__sectionContent__listLabel}>
          <Space size={24}>
            {isDetailPortofolio.listKategori.map((item: any, index) => {
              return (
               <Filter
                   key={index}
                   label= {item}
                   value= {item}
                   isActive={false}
               />
              )
            })}
          </Space>
        </div>
        <Header
          title={isDetailPortofolio.headline1}
          subtitle={isDetailPortofolio.subHeadline1}
        />
      </div>
      <ImageBanner title={isDetailPortofolio.bannerHeadline1.sourceUrl} image={isDetailPortofolio.bannerHeadline1.sourceUrl} />
      <div className={styles.detail__sectionContent}>
        <Header
          title={isDetailPortofolio.headline2}
          subtitle={isDetailPortofolio.subHeadline2}
        />
        <div className={styles.detail__sectionContent__listLabel}>
          <Space size={10}>
            {isDetailLinks.map((item, index) => (
              item?.link !== undefined && item?.link !== null && ( 
                <Link key={index} href={item.link} target="_blank">
                  <FilterLinkDetail
                      key={index}
                      label={item.title}
                      value={item.type}
                      isActive={false}
                  />
                </Link>
              )
            ))}
          </Space>
        </div>
      </div>
      <Divider className={styles.detail__hr} />
      <div className={styles.detail__thumbnail}>
              <ThumbnailCard
                image={isDetailPortofolio.gambar.sourceUrl}
                title={isDetailPortofolio.judulGambar}
                subtitle={isDetailPortofolio.deskripsiGambar}
              />
      </div>
      <Statistic
        title={isDetailPortofolio.headline3}
        subtitle={isDetailPortofolio.subHeadline3}
        metrics={[
          {
            title: `${isDetailPortofolio?.judulCard1}`,
            subtitle: `${isDetailPortofolio?.deskripsiCard1}`,
            image: "/assets/smile.png",
        },
        {
            title: `${isDetailPortofolio?.judulCard2}`,
            subtitle: `${isDetailPortofolio?.deskripsiCard2}`,
            image: "/assets/chat.png",
        },
        {
            title: `${isDetailPortofolio?.judulCard3}`,
            subtitle: `${isDetailPortofolio?.deskripsiCard3}`,
            image: "/assets/chat.png",
        },
        ]}
        textAlign="left"
       getCollabStyle="default"/>
      <div className={styles.detail__detailSection}>
      <DetailComponent
          title= {isDetailPortofolio?.headline4 ??""}
          subtitle= {isDetailPortofolio?.subHeadline4 ??""}
          buttonName="More Portfolios"
          urlDetail='/portfolio'
          itemDetail={filteredMoreItemPortfolio.slice(0, 4).map((item: any) => ({
            title: item.name,
            description: item.description,
            image: item.image,
            urlDetail: item.urlDetail,
          }))}
        />
      </div>
    </Layout>
  );
};

let initialPortofolio: any = {
  namePortfolio: "",
  headline1: "",
  headline2: "",
  headline3: "",
  headline4: "",
  subHeadline1: "",
  subHeadline2: "",
  subHeadline3: "",
  subHeadline4: "",
  judulCard1: "",
  judulCard2: "",
  judulCard3: "",
  judulGambar: "",
  deskripsiGambar: "",
  deskripsiCard1: "",
  deskripsiCard2: "",
  deskripsiCard3: "",
  bannerHeadline1: {},
  gambar: {},
  linkAppStore: "",
  linkPlaystore: "",
  linkWebsite: "",
  listKategori: [],
  
}

export default Detail;
