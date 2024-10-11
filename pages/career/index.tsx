import CareerCard from "@commons/Card/CareerCard";
import { useEffect, useState } from "react";
import styles from "./Career.module.scss";
import Header from "@commons/Header";
import Layout from "@commons/Layout";
import { headerContent, careerContent } from "@internal/career/const";
import { Row, Col, Typography } from "antd";
import ListCareer from "@component/Career/ListCareer";
import { WordingCareerQuery } from "query/WordingCareerQuery";
import { getCareerQuery } from "query/CareerQuery";
import Career from "@component/AboutUs/Career";
import { handleError } from "@apollo/client/link/http/parseAndCheckHttpResponse";

const Index = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTitle, setTitle] = useState("");
  const [isSubTitle, setSubTitle] = useState("");
  const [listCareer, setListCareer] = useState<Array<{title:string, location:string}>>([]);

  const getWordingCareer = async () => {
    const response = await WordingCareerQuery();
    if (response.data) {
      const wording = response.data.allWordingCareer.edges[0].node.wording;
      setTitle(wording.judul);
      setSubTitle(wording.subJudul);
    }
  };

  useEffect(() => {
    getWordingCareer();
  }, []);

  const getListCareer = async () => {
    const response = await getCareerQuery();
    if (response.data) {
      const careerData: Array<{title: string, location: string}> = [];
      const allData = response.data.allCareer.edges.map((edges: { node: any; }) => {
        const { node } = edges;
        const { career } = node;

        let isExist = careerData.find(x => x.title == career?.posisi?.name && x.location == career?.location?.name)
        if(!isExist){
          careerData.push({
            title: career?.posisi?.name,
            location: career?.location?.name
          })
        }
        return{
          title : career?.posisi?.name,
          location : career?.location?.name,
      };
    });

    for (let i = 0; i < careerData.length; i++){
      for(let j = i + 1; j < careerData.length; j++){
        if (careerData[i].title === careerData[j].title) {
          if (!careerData[i].location.includes(careerData[j].location)) {
            if (careerData[i].location.split(", ").length < 2) {
              careerData[i].location += `, ${careerData[j].location}`;
            } else if (careerData[i].location.split(", ").length < 3) {
              careerData[i].location += ", ...";
            }
          }
          careerData.splice(j, 1);
          j--;
        }
      }
    }

    setListCareer(careerData);
  };
};

useEffect(() => {
  getListCareer();
}, []);

  return (
    <Layout navbarColor="light">
      <div className={styles.career}>
        <Header
          title={isTitle}
          subtitle={isSubTitle}
          flexWidth
          className={styles.career__header}
        />
        <ListCareer items={listCareer} />
      </div>
    </Layout>
  );
};

export default Index;
