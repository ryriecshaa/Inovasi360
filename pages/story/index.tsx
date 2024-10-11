import StoryCard from "@commons/Card/StoryCard";
import Filter from "@commons/Filter";
import Header from "@commons/Header";
import Layout from "@commons/Layout";
import Search from "@commons/Search";
import Headline from "@component/Story/Headline";
import {
  category,
  headline,
  listStory,
  storyContent,
} from "@internal/story/const";
import { Col, Divider, Row, Space } from "antd";
import styles from "./Story.module.scss";
import { WordingStoryQuery } from "query/WordingStoryQuery";
import { useEffect, useState } from "react";
import ListStory  from "@component/Story/Headline";
import { getStoryQuery } from "query/StoryQuery";
import { strict } from "assert";
import striptags from 'striptags';
import { useRouter } from "next/router";
import { isEmptyBindingElement } from "typescript";


const Story = () => {
  const router = useRouter()
  const [searchVal, setSearchVal] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [isTitle, setTitle] = useState("");
  const [isSubTitle, setSubTitle] = useState("");
  const [allListStory, setAllListStory] = useState<Array<{id: any; image: string; title: string; content: string; }>>([]);
  const [listStory, setListStory] = useState<Array<{ id: any; image: string; title: string; content: string; }>>([]);
  const [listKategoriStory, setListKategoriStory] = useState<Array<{ label: string; value: string; }>>([]);
  useEffect(() => {
    if (router.query !== new Object()) {
      setActiveCategory(router.query.category as string)
      setFilterValue(router.query.category as string)
    }
    else {
      setActiveCategory("")
      setFilterValue("")
    }
  },[router])
  useEffect(() => {
  },[filterValue])
  
  const getWordingStory = async () => {
    const response = await WordingStoryQuery();
    if (response.data) {
      const filterWording = response.data.allWordingStory.edges.filter((edges: any) => {
        let getAksiTerapkan = edges?.node?.wording.aksiTerapkan
        if (getAksiTerapkan !== null) {
          if (getAksiTerapkan == 'Terapkan') {
            return true
          }
        }
      });
      const wordingTerapkan = filterWording[0].node.wording;
      setTitle(wordingTerapkan.judul);
      setSubTitle(wordingTerapkan.subJudul);
    }
  };

  useEffect(() => {
    getWordingStory();
  }, []);

  const getListStory = async () => {
    const response = await getStoryQuery();
    if (response.data) {
      const arrayKategoriTemp: Array<{label: string, value: string}> =[];
      const updatedData = response.data.allStory.edges.map((edges: { node: any; }) => {
        const { node } = edges;
        const { story, kategoriStory } = node;
        if(kategoriStory?.edges?.length) {
          const kategori = kategoriStory.edges[0].node;
          let isExist = arrayKategoriTemp.find(x => x.label == kategori.name);

          if (!isExist){
            arrayKategoriTemp.push({
              label: kategori.name,
              value: kategori.kategoriStoryId,
            });
          }
        }
        return{
          id: node.databaseId,
          title : story.judul,
          content: striptags(story.story),
          image : story.banner.sourceUrl,
          kategori : kategoriStory.edges[0].node.name
        };
      });
      setAllListStory(updatedData);
      setListStory(updatedData);
      setListKategoriStory(arrayKategoriTemp);
    };
  };

  useEffect(() => {
    getListStory();
  }, []);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      if(searchVal.length == 0 && filterValue == ""){
        setListStory(allListStory);
      }else{
        setListStory(searchStory(allListStory));
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchVal, filterValue, allListStory]);

  const searchStory = (listStory : any) => {
    if(filterValue == undefined){
      const filteredData = listStory.filter((item : any) => item.title.toLowerCase().includes(searchVal.toLowerCase()) || item.content.toLowerCase().includes(searchVal.toLowerCase()));
      return filteredData;
    }

    if(searchVal.length > 0 && filterValue.length > 0){
      const filteredCategory = listStory.filter((item : any) => item.kategori.toLowerCase().includes(filterValue.toLowerCase()));
      const filteredData = filteredCategory.filter((item : any) => item.title.toLowerCase().includes(searchVal.toLowerCase()) || item.content.toLowerCase().includes(searchVal.toLowerCase()));
      return filteredData;
      
    }else if(filterValue.length > 0){
      const filteredData = listStory.filter((item : any) => item.kategori.toLowerCase().includes(filterValue.toLowerCase()));
      return filteredData;
    }
  }

  const handleSearchStory = (e: any) => {
    const val = e.target.value;
    setSearchVal(val);
  }

  const handleFilterStory = (label : string) => {
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
      <div className={styles.story}>
        <Header
          title={isTitle}
          subtitle={isSubTitle}
          flexWidth
          className={styles.story__header}
        />
        <Row gutter={[36, 36]}>
          <Col xs={24} lg={6}>
            <Row gutter={[12, 24]}>
              <Col>
                <Search placeholder="Find Story" handleSearch={handleSearchStory} />
              </Col>
              {listKategoriStory.map((item, index) => (
                <Col key={index}>
                  <Filter
                    isActive={activeCategory === item.label}
                    value={item.value}
                    label={item.label}
                    onClick={() => handleFilterStory(item.label)}
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col xs={24} lg={18} className={styles.story__content}>
            <Headline
              id={listStory[0]?.id}
              image={listStory[0]?.image}
              title={listStory[0]?.title}
              content={listStory[0]?.content}
            />
            <Divider />
            <Row gutter={[72, 72]}>
              {listStory.slice(1).map((item, index) => (
                <Col xs={24} lg={12} key={index}>
                  <StoryCard {...item} />
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
