import Statistic from "@commons/Statistic";
import Layout from "@commons/Layout";
import HeroBanner from "@commons/HeroBanner";
import HeroBanner2 from "@commons/HeroBanner/indexBanner2";
import Product from "@component/Home/Portfolio";
import styles from "./home.module.scss";
import {
  productContent,
  statisticContent,
  heroBannerContent,
  eventBannerContent,
} from "@internal/home/const";
import { productList } from "@internal/home/const/ProductList";
import Companies from "@component/Home/Companies";
import {
  HomeSectionOne, 
  HomeSectionTwo, 
  HomeSectionTwoProduct, 
  HomeSectionThree,
  HomeSectionFive,
} from "query/HomeQuery";
import { useState, useEffect } from "react";
import AnimasiBanner from "@component/Home/Animasi/AnimasiBanner";

const Home = () => {
  let empty_state = (process.env.NEXT_PUBLIC_EMPTY_STATE === "true");

  const [isHovered, setIsHovered] = useState(false);

  const [isJudulBanner, setJudulBanner] = useState("");
  const [isSubJudulBanner, setSubJudulBanner] = useState("");
  const [isJudulPortofolio, setJudulPortofolio] = useState("");
  const [isSubJudulPortofolio, setSubJudulPortofolio] = useState("");
  const [isJudulUtamaAchievement, setJudulUtamaAchievement] = useState("");
  const [isSubJudulUtamaAchievement, setSubJudulUtamaAchievement] = useState("");
  const [isJudulEvent, setJudulEvent] = useState("");
  const [isDeskripsiEvent, setDeskripsiEvent] = useState("");
  const [isLinkEvent, setLinkEvent] = useState("");
  const [isHeadlineProduk, setHeadlineProduk] = useState<Array<{ id: string | null; title: string; description: string; image: string | null; }>>([]);
  const [metricStatistic, setMetricStatistic] = useState<Array<{ title: string; subtitle: string; image: string; }>>([]);


  const getWordingBanner = async () => {
    const response = await HomeSectionOne();
    if (response.data) {
      const filterWordingOne = response.data.allWordingBanner.edges.filter((node:any) => {
        let getAksiTerapkan = node?.node.wording.aksiTerapkan
        if (getAksiTerapkan !== null) {
          if (getAksiTerapkan == 'Terapkan') {
            return true
          }
        }
      });

      let judulBanner = filterWordingOne[0].node.wording.judul;
      let subJudulBanner = filterWordingOne[0].node.wording.subJudul;
      setJudulBanner(judulBanner);
      setSubJudulBanner(subJudulBanner);
    }
  };

  const getWordingPortfolio = async () => {
    const response = await HomeSectionTwo();
    if (response.data) {
      const filterWordingTwo = response.data.allWordingPortfolioHome.edges.filter((node:any) => {
        let getAksiTerapkanTwo = node?.node.wording.aksiTerapkan
        if (getAksiTerapkanTwo !== null) {
          if (getAksiTerapkanTwo == 'Terapkan') {
            return true
          }
        }
      });

      let judulBanner = filterWordingTwo[0].node.wording.judul;
      let subJudulBanner = filterWordingTwo[0].node.wording.subJudul;
      setJudulPortofolio(judulBanner);
      setSubJudulPortofolio(subJudulBanner);
    }
  };

  const getHeadlinePortfolio = async () => {
    const response = await HomeSectionTwoProduct('3');
    if (response.data) {
      const portfolios = response.data.allPortfolio.edges.map((edges: { node: any; }) => {
        const { node } = edges;
        return{
          id: node.portfolioId.toString(),
          title : node.product.headline1,
          description : node.product.subHeadline1,
          image : node.product.bannerHeadline1.sourceUrl,
        };
      });
      setHeadlineProduk(portfolios);
    }
  };

  const getWordingAchivement = async () => {
    const response = await HomeSectionThree();
    if (response.data) {
      const filterWordingThree = response.data.allWordingAchievement.edges.filter((node:any) => {
        let getAksiTerapkanThree = node?.node.wordingAchievement.aksiTerapkan
        if (getAksiTerapkanThree !== null) {
          if (getAksiTerapkanThree == 'Terapkan') {
            return true
          }
        }
      });

      let judulUtamaAchievement = filterWordingThree[0].node.wordingAchievement.judul;
      let subJudulUtamaAchievement = filterWordingThree[0].node.wordingAchievement.subJudul;
      let judulAchievement1 = filterWordingThree[0].node.wordingAchievement.judulCard1;
      let subJudulAchievement1 = filterWordingThree[0].node.wordingAchievement.deskripsiCard1;
      let judulAchievement2 = filterWordingThree[0].node.wordingAchievement.judulCard2;
      let subJudulAchievement2 = filterWordingThree[0].node.wordingAchievement.deskripsiCard2;
      let judulAchievement3 = filterWordingThree[0].node.wordingAchievement.judulCard3;
      let subJudulAchievement3 = filterWordingThree[0].node.wordingAchievement.deskripsiCard3;
      
      setJudulUtamaAchievement(judulUtamaAchievement);
      setSubJudulUtamaAchievement(subJudulUtamaAchievement);
      setMetricStatistic([
        {
          title: judulAchievement1,
          subtitle: subJudulAchievement1,
          image: "/assets/smile.png",
        },
        {
          title: judulAchievement2,
          subtitle: subJudulAchievement2,
          image: "/assets/chat.png",
        },
        {
          title: judulAchievement3,
          subtitle: subJudulAchievement3,
          image: "/assets/chat.png"
        },
      ])
    }
  };

  const getHeadlineEvent = async () => {
    const response = await HomeSectionFive('1');
    if (response.data) {
      const filterWordingFive = response.data.allEvent.edges.filter((node:any) => {
        let getAksiTerapkanFive = node?.node.event.aksiTerapkan
        if (getAksiTerapkanFive !== null) {
          if (getAksiTerapkanFive == 'Terapkan'){
            return true
          }  
        }
      });
      
      let judulEvent = filterWordingFive[0].node.event.judulEvent;
      let pemateri = filterWordingFive[0].node.event.pemateri;
      let tanggalEvent = filterWordingFive[0].node.event.tanggal;
      let linkEvent = filterWordingFive[0].node.event.link;
      if (tanggalEvent == null) {
        tanggalEvent = ""
      }
      let deskripsiEvent = pemateri + "  " + tanggalEvent;

      setJudulEvent(judulEvent);
      setDeskripsiEvent(deskripsiEvent);
      setLinkEvent(linkEvent);
    }
  }


  useEffect(() => {
    getWordingBanner();
    getWordingPortfolio();
    getHeadlinePortfolio();
    getWordingAchivement();
    getHeadlineEvent();
  }, []);

  // AnimasiBanner();
  const animasiData = { titleBanner: "digital innovations for your business" };

  if (empty_state) {
    // BUAT PRODUCTION
    return (
      <div className={styles.background}>
        <div className={styles.descriptionContainer}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Coming Very Soon</h1>
            <h1 className={styles.title}>On <span className={styles.title__orange}>Rocket Speed</span></h1>
          </div>

          <h2 className={styles.subTitle}>Our Products Proudly Presented to You:</h2>

          <div className={styles.productsContainer}>
            {productList.map((product, index) => (
              <div
                key={`product-list-idx-${index}`}
                className={styles.productCard}
              >
                <img
                  className={styles.productImage}
                  src={product.img}
                  alt={product.alt}
                />

                <div className={styles.buttonContainer}>
                  {product.button.map((button, index) => (
                    <button
                      key={`button-list-idx-${index}`}
                      onClick={() => window.open(button.link, '_blank')}
                      className={styles.button}
                    >
                      <img
                        src={button.imgUrl}
                        alt={button.alt}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.imageContainer}>
          <img
            className={styles.rocketImage}
            src="assets/rocket.png"
            alt='rocket-image'
          />
        </div>
      </div>
    )
  }
  // BUAT DEV
  return (
    <Layout navbarColor="dark">
      <HeroBanner
        title={<>{isJudulBanner} <AnimasiBanner /></>}
        description={isSubJudulBanner}
        buttonName={heroBannerContent.buttonName}
        image={heroBannerContent.image}
        backgroundColor="dark"
        imagePosition="center"
        url="/get-collab"
      />
      <Product
        title={isJudulPortofolio}
        subtitle={isSubJudulPortofolio}
        buttonName={productContent.buttonName}
        itemProduct={isHeadlineProduk}
      />
      <Statistic
        title={isJudulUtamaAchievement}
        subtitle={isSubJudulUtamaAchievement}
        metrics={metricStatistic}
        textAlign="left"
        withButton={true}
        getCollabStyle="default"
      />
      <Companies />
      <div className={styles.home__event}>
        <a href={isLinkEvent} target="_blank" rel="noopener noreferrer">
          <HeroBanner2
            title={isJudulEvent}
            description={isDeskripsiEvent}
            buttonName={eventBannerContent.buttonName}
            image={eventBannerContent.image}
            backgroundColor="light"
            imagePosition="bottom"
          />
        </a>
      </div>
    </Layout>
  );

};

export default Home;
