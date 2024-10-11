  import PortfolioCard from "@commons/Card/PortfolioCard";
  import Filter from "@commons/Filter";
  import Header from "@commons/Header";
  import Layout from "@commons/Layout";
  import Search from "@commons/Search";
  import { Col, Divider, Row } from "antd";
  import classNames from "classnames";
  import { useEffect, useState } from "react";
  import styles from "./Portfolio.module.scss";
  import { WordingPortofolioQuery } from "query/WordingPortofolioQuery";
  import { getPortofolioQuery } from "query/PortofolioQuery";

  const Story = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTitle, setTitle] = useState("");
    const [isSubTitle, setSubTtile] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [activeCategory, setActiveCategory] = useState("");
    const [listPortofolio, setListPortofolio] = useState<Array<{ id: string | null; title: string; description: string; image: string | null; }>>([]);
    const [listAllPortofolio, setListAllPortofolio] = useState<Array<{ id: string | null; title: string; description: string; image: string | null; }>>([]);
    const [listKategoriPortofolio, setListKategoriPortofolio] = useState<Array<{ label: string; value: string; }>>([]);
    const [wordingPortofolio, setWordingPortofolio] = useState([]);

    const handleResize = () => {
      if (window.innerWidth < 767.5) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    const getWordingPortofolio = async () => {
      const response = await WordingPortofolioQuery();
      if (response.data) {
        const filterWording = response.data.allWordingPortfolio.edges.filter((edges: any) => {
          let getAksiTerapkan = edges?.node?.wording.aksiTerapkan
          
          if (getAksiTerapkan !== null) {
            if (getAksiTerapkan[0] == 'Terapkan') {
              return true
            }
          }
          
        });
        const wordingTerapkan = filterWording[0].node.wording;
        setTitle(wordingTerapkan.judul);
        setSubTtile(wordingTerapkan.subJudul);
      }
    };

    useEffect(() => {
      getWordingPortofolio();
    }, []);


    const getListPortofolio = async () => {
      const response = await getPortofolioQuery();
      if (response.data) {
        const arrayKategoriTemp: Array<{label: string, value: string}> = [];
        const updatedData = response.data.allPortfolio.edges.map((edges: { node: any; }) => {
          const { node } = edges;
          const { portfolioId, product, kategoriPortopolio } = node;
          if(kategoriPortopolio?.edges?.length) {
            const kategori = kategoriPortopolio.edges[0].node;
            let isExist = arrayKategoriTemp.find(x => x.label == kategori.name);
  
            if (!isExist){
              arrayKategoriTemp.push({
                label: kategori.name,
                value: kategori.kategoriPortofolioId,
              });
            }
          }
          return{
            id: portfolioId.toString(),
            title : product.headline1,
            description : product.subHeadline1,
            image : product.bannerHeadline1.sourceUrl,
            kategori : kategoriPortopolio.edges[0].node.name
          };
        });
        setListAllPortofolio(updatedData);
        setListPortofolio(updatedData);
        setListKategoriPortofolio(arrayKategoriTemp);
      }
    };

    useEffect(() => {
      getListPortofolio();

    }, []);
    
    useEffect(() => {
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(()=>{
      const timer = setTimeout(() => {
        if(searchValue.length == 0 && filterValue.length == 0){
          setListPortofolio(listAllPortofolio);
        }else{
          setListPortofolio(searchPortofolio(listAllPortofolio));
        }
      }, 300);

      return () => clearTimeout(timer);
    }, [searchValue, filterValue, listAllPortofolio])

    const searchPortofolio = (listPortofolio:any) => {
      if(searchValue.length > 0 && filterValue.length > 0){
        const filteredCategory = listPortofolio.filter((item:any) => item.kategori.toLowerCase().includes(filterValue.toLowerCase()));
        const filteredPortofolio = filteredCategory.filter((item:any) => item.title.toLowerCase().includes(searchValue.toLowerCase()) || item.description.toLowerCase().includes(searchValue.toLowerCase()));
        return filteredPortofolio;
      }else if(searchValue.length > 0){
        const filteredPortofolio = listPortofolio.filter((item:any) => item.title.toLowerCase().includes(searchValue.toLowerCase()) || item.description.toLowerCase().includes(searchValue.toLowerCase()));
        return filteredPortofolio;
      }else{
        const filteredPortofolio = listPortofolio.filter((item:any) => item.kategori.toLowerCase().includes(filterValue.toLowerCase()));
        return filteredPortofolio;
      }
    }

    const handleSearchPortofolio = (e:any) => {
      setSearchValue(e.target.value);
    }

    const handleFilterPortofolio = (label:string) => {
      if (filterValue.length == 0 || filterValue != label){
        setFilterValue(label);
        setActiveCategory(label);
      }else if(filterValue == label){
        setFilterValue("");
        setActiveCategory("");
      }
    }

    return (
      <Layout navbarColor="light">
        <div className={styles.portfolio}>
          <Header
            // title={portfolioContent.title}
            // subtitle={portfolioContent.subtitle}
            title={isTitle}
            subtitle={isSubTitle}
            flexWidth
          />
          <Row
            className={styles.portfolio__searching}
            gutter={isMobile ? [0, 0] : [36, 36]}>
            <Col
              // className={styles.portfolio__findStory}
                span={isMobile ? "" : "6"}>
                <Row gutter={[12, 24]}>
                  <Col>
                    <Search placeholder="Find Cases" handleSearch={handleSearchPortofolio} />
                  </Col>
                  {listKategoriPortofolio.map((item, index) => (
                    <Col key={index}>
                      <Filter
                        isActive={activeCategory === item.label}
                        value={item.value}
                        label={item.label}
                        onClick={() => handleFilterPortofolio(item.label)}
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
            <Col
              span={isMobile ? "" : "18"}
              className={
                isMobile
                  ? styles.portfolio__mobileCard2
                  : styles.portfolio__content
              }>
              <Row gutter={isMobile ? [0, 0] : [48, 0]}>
                {listPortofolio.map((item, index) => (
                  <Col
                    span={isMobile ? "" : "12"}
                    key={index}
                    className={
                      isMobile
                        ? styles.portfolio__mobileCard
                        : classNames({
                            [styles.portfolio__oddCard]: index % 2 !== 0,
                          })
                    }>
                    <PortfolioCard {...item} halfWidth />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>
      </Layout>
    );
  };

  export default Story;