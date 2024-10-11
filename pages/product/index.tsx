import ProductCard from "@commons/Card/ProductCard";
import Filter from "@commons/Filter";
import Header from "@commons/Header";
import Layout from "@commons/Layout";
import Search from "@commons/Search";
import { Col, Row } from "antd";
import classNames from "classnames";
import { useEffect, useState } from "react";
import styles from "./Product.module.scss";
import { getProductQuery } from "query/ProductQuery";
import { WordingProductQuery } from "query/WordingProductQuery";

const Story = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [isListProduct, setListProduct] = useState<Array<{ title: string; description: string; subdescription: string; image: string; halfWidth: boolean; urlDetail: string}>>([]);
  const [isAllListProduct, setIsAllListProduct] = useState<Array<{ title: string; description: string; subdescription: string; image: string; halfWidth: boolean; urlDetail: string}>>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isListCategoryProduct, setListCategoryProduct] = useState<Array<{ label: string; value: string; }>>([]);
  const [IsJudulProduk, setIsJudulProduk] = useState("");
  const [isSubJudulProduk, setIsSubJudulProduk] = useState("");

  const getWordingProduct = async () => {
    const response = await WordingProductQuery();
    if (response.data) {
      const filterWording = response.data.allWordingProduct.edges.filter((edges: any) => {
        let getAksiTerapkan = edges?.node?.wording.aksiTerapkan
        if (getAksiTerapkan !== null ) {
          if (getAksiTerapkan == 'Terapkan') {
            return true
          }
        }  
      });
      const wordingTerapkan = filterWording[0].node.wording;
      setIsJudulProduk(wordingTerapkan.judul);
      setIsSubJudulProduk(wordingTerapkan.subJudul);
    }
  };

  useEffect(() => {
    getWordingProduct();
  }, []);

  const getListProduct = async () => {
    const response = await getProductQuery();
    if (response.data) {
      const arrayKategoriTemp: Array<{label: string, value: string}> = [];
      const updatedData = response.data.allProduct.edges.map((edges: { node: any; }) => {
        const { node } = edges;
        const { product, kategoriProduct } = node;
        if(kategoriProduct?.edges?.length) {
          const kategori = kategoriProduct.edges[0].node;
          let isExist = arrayKategoriTemp.find(x => x.label == kategori.name);

          if (!isExist){
            arrayKategoriTemp.push({
              label: kategori.name,
              value: kategori.kategoriProductId,
            });
          }
        }
        return{
          title : product.headline1,
          description : product.nameProduct,
          urlDetail : product.nameProduct ? product.nameProduct.replaceAll(/\s/g,'') : "",
          subDescription : product.subHeadline1,
          image : product?.bannerHeadline1?.sourceUrl,
          kategori : kategoriProduct.edges[0].node.name,
        };
      });
      setIsAllListProduct(updatedData);
      setListProduct(updatedData);
      setListCategoryProduct(arrayKategoriTemp);
    }
  };

  useEffect(() => {
    getListProduct();
  }, []);

  useEffect(()=>{
    const timer = setTimeout(() => {
      if(searchValue.length == 0 && filterValue.length == 0){
        setListProduct(isAllListProduct);
      }else{
        setListProduct(searchProduct(isAllListProduct));
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, filterValue, isAllListProduct])


  const handleResize = () => {
    if (window.innerWidth < 767.5) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const searchProduct = (listProduct : any) => {
    if(searchValue.length > 0 && filterValue.length > 0){
      const filteredCategory = listProduct.filter((item:any) => item.kategori.toLowerCase().includes(filterValue.toLowerCase()));
      const filteredProduct = filteredCategory.filter((item:any) => item.title.toLowerCase().includes(searchValue.toLowerCase()) || item.description.toLowerCase().includes(searchValue.toLowerCase()));
      return filteredProduct;
    }else if(searchValue.length > 0){
      const filteredProduct = listProduct.filter((item:any) => item.title.toLowerCase().includes(searchValue.toLowerCase()) || item.description.toLowerCase().includes(searchValue.toLowerCase()));
      return filteredProduct
    }else{
      const filteredProduct = listProduct.filter((item:any) => item.kategori.toLowerCase().includes(filterValue.toLowerCase()));
      return filteredProduct;
    }
  }

  const handleSearchProduct = (e: any) => {
    setSearchValue(e.target.value);
  }

  const handleFilterProduct = (label: string) => {
    if(filterValue.length == 0 || filterValue != label){
      setFilterValue(label);
      setActiveCategory(label);
    }else if(filterValue == label){
      setFilterValue("");
      setActiveCategory("");
    }
  }

  return (
    <Layout navbarColor="light">
      <div className={styles.product}>
        <Header
          title={IsJudulProduk}
          subtitle={isSubJudulProduk}
          flexWidth
        />
        <Row
          className={styles.product__searching}
          gutter={isMobile ? [0, 0] : [36, 36]}>
          <Col
            span={isMobile ? "" : "6"}>
            <Row gutter={[12, 24]}>
              <Col>
                <Search placeholder="Find Cases" handleSearch={handleSearchProduct} />
              </Col>
              {isListCategoryProduct.map((item: any, index) => {
                return (
                  <Col key={index}>
                    <Filter
                      isActive={activeCategory === item.label}
                      value={item.value}
                      label={item.label}
                      onClick={() => handleFilterProduct(item.label)}
                    />
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Col
            span={isMobile ? "" : "18"}
            className={
              isMobile ? styles.product__mobileCard2 : styles.product__content
            }>
            <Row gutter={isMobile ? [0, 0] : [48, 0]}>
              {isListProduct.map((item, index) => {
                return (
                  <Col
                    span={isMobile ? "" : "12"}
                    key={index}
                    className={
                      isMobile
                        ? styles.product__mobileCard
                        : classNames({
                            [styles.product__oddCard]: index % 2 !== 0,
                          })
                    }>
                    <ProductCard {...item} halfWidth
                    />
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Story;
