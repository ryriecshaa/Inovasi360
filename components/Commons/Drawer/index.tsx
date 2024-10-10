import styles from "./Drawer.module.scss";
import { Button, Drawer, Space, Typography, Input } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import Accordion from "@commons/Accordion";
import { FaqQuery } from "query/FaqQuery";
import ButtonKategori from "@commons/Button/indexButtonKategori";

type propsDrawer = {
  openCalled?: boolean | false;
  closedClick: () => void;
};

const DrawerComponent = ({ openCalled, closedClick }: propsDrawer) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeButton, setActiveButton] = useState(null); 
  

  const getFaq = async () => {
    const { props } = await FaqQuery();
    const getfaq = props;
    const getKategori = getfaq.faq.map((category: any) => {
      const kategori = category.node.kategoriFAQ.nodes[0].name;
      return kategori;
    });
    const uniqueKategori = Array.from(new Set(getKategori));
    return { getfaq, getKategori: uniqueKategori as string[] };
  };
  
  useEffect(() => {
    getFaq().then((result) => {
      const faqData = result.getfaq.faq;
      const getKategoriForClick = result.getKategori;
      setData(faqData);
      setCategory(getKategoriForClick);
      setFilteredData(faqData);
      setSelectedCategory(null);
    });
  }, []);
  

  const getDataKategory = (kategori: any) => {
    setSelectedCategory(kategori);
    setActiveButton(kategori === null ? null : kategori);

    const filtered = data.filter((item: any) => {
      const kategoriItem = item.node.kategoriFAQ.nodes[0].name;
      return (
        (!kategori || kategoriItem === kategori) &&
        item.node.faq.pertanyaan.toLowerCase().includes(searchValue.toLowerCase())
      );
    });

    setFilteredData(filtered);
  };
  
  const handleSearch = (e: any) => {
    const value = e.target.value;
    setSearchValue(value);
    const filtered = data.filter((item: any) => {
      const kategoriItem = item.node.kategoriFAQ.nodes[0].name;
      return (
        (!selectedCategory || kategoriItem === selectedCategory) &&
        item.node.faq.pertanyaan.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredData(filtered);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    if (closedClick) {
      closedClick();
    }
  };

  
  return (
    <>
      <Button
        className={styles.floatingButton}
        shape="circle"
        onClick={showDrawer}>
        ?
      </Button>
      <Drawer
        className={styles.drawer}
        title={
          <Space>
            <Button
              className={styles.drawer__headerIconSearch}
              icon={<SearchOutlined type="default" />}
              type="default"></Button>
            <Input
            className={styles.drawer__headerTitle}
            placeholder="What can we help you with?"
            style={{ whiteSpace: "nowrap", width: "300px" }}
            onChange={handleSearch}
            value={searchValue}
            />
          </Space>
        }
        placement="right"
        onClose={onClose}
        closable={false}
        open={open || openCalled}
        extra={
          <Space>
            <Button
              onClick={onClose}
              className={styles.drawer__headerIconClose}
              icon={<CloseOutlined />}
              type="default"
            />
          </Space>
        }>
        {category.map((item: any, index) => {
          return (
            <>
              {" "}
              <ButtonKategori
                title={item}
                className="buttonKategori"
                typeButton="outline"
                onClick={() => {
                  setActiveButton(selectedCategory === item ? null : item);
                  getDataKategory(selectedCategory === item ? null : item);
                }}
                statusActive={activeButton === item}
              />
            </>
          );
        })}
        <div className={styles.drawer__accordionContainer}>
          {filteredData.length === 0 ? (
            <Typography.Text
            style={{
              textAlign: "center",
              color: "black",
              fontWeight: "bold",
              marginTop: "20px",
            }}>
              Data tidak ditemukan
              </Typography.Text>
          ) : (
            filteredData.map((item: any, index) => (
              <Accordion
                key={index}
                header={item.node.faq.pertanyaan}
                content={item.node.faq.jawaban}
              />
        ))
      )}
        </div>
      </Drawer>
    </>
  );
};

export default DrawerComponent;