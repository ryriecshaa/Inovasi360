import Career from "@component/AboutUs/Career";
import Header from "@component/AboutUs/Header";
import Layout from "@commons/Layout";
import Statistic from "@commons/Statistic";
import {
  careerContent,
  headerContent,
  jobContent,
  statisticContent,
} from "@internal/about-us/const";
import styles from "./AboutUs.module.scss";
import { AboutUsQuery } from "query/AboutUsQuery";
import { useEffect, useState } from "react";
import { getCareerQuery } from "query/CareerQuery";

const AboutUs = () => {
  const [isTitle, setTitle] = useState("");
  const [isSubTitle, setSubTitle] = useState("");
  const [isHeadlineHeader, setHeadlineHeader] = useState("");
  const [isSubHeadlineHeader, setSubHeadlineHeader] = useState("");
  const [isHeadlineStatistic, setHeadlineStatistic] = useState("");
  const [isSubHeadlineStatistic, setSubHeadlineStatistic] = useState("");
  const [isHeadlineJob, setHeadlineJob] = useState("");
  const [isSubHeadlineJob, setSubHeadlineJob] = useState("");
  const [metricStatistic, setMetricStatistic] = useState<Array<{ title: string; subtitle: string; image: string; }>>([]);
  const [isSectionCareer, setSectionCareer] = useState([]);

  const getAboutUs = async () => {
    const response = await AboutUsQuery();
    if (response.data) {
      const getAboutUs = response.data.allAboutUs.edges[0].node.aboutUs;
      setHeadlineHeader(getAboutUs.headline1);
      setSubHeadlineHeader(getAboutUs.subHeadline1);
      setHeadlineStatistic(getAboutUs.headline2);
      setSubHeadlineStatistic(getAboutUs.subHeadline2);
      setHeadlineJob(getAboutUs.headline3);
      setSubHeadlineJob(getAboutUs.subHeadline3);
      setMetricStatistic([
        {
          title: getAboutUs.judulCard21,
          subtitle: getAboutUs.deskripsiCard21,
          image: "/assets/smile.png",
        },
        {
          title: getAboutUs.judulCard22,
          subtitle: getAboutUs.deskripsiCard22,
          image: "/assets/chat.png",
        },
        {
          title: getAboutUs.judulCard23,
          subtitle: getAboutUs.deskripsi23,
          image: "/assets/chat.png"
        },
      ])

    }
  };
  
useEffect(() => {
  getAboutUs();
}, []);


const getSectionCareer = async () => {
  const response = await getCareerQuery();
  if (response.data) {
    const sectionCareer = response.data.allCareer.edges.map((edges: { node: any; }) => {
      const { node } = edges;
      const { career } = node;
      return{
        name : career.posisi?.name,
        location : career.location.name,
      };
    })
    .slice(0, 3);
    setSectionCareer(sectionCareer);
  };
};

useEffect(() => {
  getSectionCareer();
}, []);

  return (
    <Layout navbarColor="light">
      <div className={styles.aboutUs}>
        <Header
          // title={headerContent.title}
          // subtitle={headerContent.subtitle}
          title={isHeadlineHeader}
          subtitle={isSubHeadlineHeader}
          // items={headerContent.itemCard}
        />
        <Statistic
          // title={statisticContent.title}
          // subtitle={statisticContent.subtitle}
          title={isHeadlineStatistic}
          subtitle={isSubHeadlineStatistic}
          metrics={metricStatistic}
          withButton={true}
          textAlign="left"
          getCollabStyle="outline"
          isAboutUs={true}
        />
        <Career
          // title={careerContent.title}
          // subtitle={careerContent.subtitle}
          title={isHeadlineJob}
          subtitle={isSubHeadlineJob}
          buttonHref={careerContent.buttonHref}
          buttonName={careerContent.buttonName}
          jobs={isSectionCareer}></Career>
      </div>
    </Layout>
  );
};

export default AboutUs;