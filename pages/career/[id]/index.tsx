import {useEffect, useState} from "react";
import Layout from "@commons/Layout";
import styles from "./Detail.module.scss";
import Header from "@commons/Header";
import { detailCareerContent } from "@internal/career/const";
import Point from "@commons/Point";
import { Divider, Row, Col, Typography, Space } from "antd";
import Button from "@commons/Button";
import Filter from "@commons/Filter";
import { getCareerQuery } from "query/CareerQuery";
import Link from "next/link";

const Detail = () => {
  let careerChosen = "";

  const [detailCareer, setDetailCareer] = useState<Array<{jobLocation:string; jobType: string; jobDesc: string; skill:string[]}>>([]);
  const [location, setLocation] = useState<string[]>([])
  const [jobType, setJobType] = useState<string[]>([])
  const [careerTitle, setCareerTitle] = useState("")
  const [careerKeterangan, setCareerKeterangan] = useState("")
  const [isExistCareer, setIsExistCareer] = useState(false)
  const [activeType, setActiveType] = useState("")
  const [activeLocation, setActiveLocation] = useState("")
  const [activeCareer, setActiveCareer] = useState<{
    jobLocation : string,
    jobType : string,
    jobDesc : string,
    skill : string[] 
  }>({jobLocation : "",
    jobType : "",
    jobDesc : "",
    skill : []})

  useEffect(() => {
    const currentPath = window.location.pathname.split('/');
    careerChosen = decodeURIComponent(currentPath[currentPath.indexOf('career')+1]);
    setCareerTitle(careerChosen);
  }, []);

  const getDetailCareer = async () => {
    const response = await getCareerQuery();
    if (response.data) {
      const jobLocation: string[] = Array();
      const jobType: string[] = Array();
      const allData = response.data.allCareer.edges
      .map((edges: { node: any; }) => {
        const { node } = edges;
        const { career } = node;
        if(career?.posisi?.name == careerChosen){
          setCareerKeterangan(career?.keterangan);

          if(!jobLocation.find(x => x == career?.location.name)){
            jobLocation.push(career?.location.name);
          }

          if(!jobType.find(x => x == career?.jobType.name)){
            jobType.push(career?.jobType.name);
          }
          
          return{
            jobLocation : career?.location,
            jobType : career?.jobType,
            jobDesc : career?.jobDeskripsi,
            skill : career?.skill
          };
        }
    });

    const filtered = allData.filter((item: any)=> item !== undefined);
    for(const key in filtered){
      if(filtered.hasOwnProperty(key)){
        filtered[key].skill = convertStringToArray(filtered[key].skill);
        filtered[key].jobLocation = filtered[key].jobLocation.name;
        filtered[key].jobType = filtered[key].jobType.name;
      }
    }

    setJobType(jobType);
    setLocation(jobLocation);
    setDetailCareer(filtered);
    };
};

  useEffect(() => {
    getDetailCareer();
  }, [])

  const handleType = (label: string) => {
    if(activeType == label){
      setActiveType("");
    }else{
      setActiveType(label);
    }
  }
  
  const handleLocation = (label: string) => {
    if(activeLocation == label){
      setActiveLocation("");
    }else{
      setActiveLocation(label);
    }
  }

  function convertStringToArray(skill : string) : string[] {
    return skill.split("\r\n").filter(skill => skill.trim() !== "");
  }

  useEffect(() => {
    const actCareer = detailCareer.find((item) => item.jobLocation == activeLocation && item.jobType == activeType);
    if(actCareer){
      setActiveCareer(actCareer);
      setIsExistCareer(true);
    }else{
      setActiveCareer({jobLocation : "",
      jobType : "",
      jobDesc : "",
      skill : []})
      setIsExistCareer(false);
    }
  }, [activeLocation, activeType])

  return (
    <Layout navbarColor="light">
      <div className={styles.detail}>
        <Header
          flexWidth
          title={careerTitle}
          subtitle={careerKeterangan}
        />
        <Divider className={styles.detail__hr} />
        <Row>
          <Col lg={12} sm={24}>
            <Typography.Title key={4}>Job Type</Typography.Title>
            <div className={styles.detail__listLabel}>
              <Space size={24}>
                {jobType.map((item, index) => (
                  <Filter
                    key={index}
                    label={item}
                    value={item}
                    isActive={item === activeType}
                    onClick={() => handleType(item)}
                  />
                ))}
              </Space>
            </div>
          </Col>
          <Col lg={12} sm={24}>
            <Typography.Title key={4}>Location</Typography.Title>
            <div className={styles.detail__listLabel}>
              <Space size={24}>
                {location.map((item, index) => (
                  <Filter
                    label={item}
                    key={index}
                    value={item}
                    isActive={item === activeLocation}
                    onClick={() => handleLocation(item)}
                  />
                ))}
              </Space>
            </div>
          </Col>
        </Row>
        {
          activeType !== "" && activeLocation !== "" && isExistCareer && (
            <>
              <Divider className={styles.detail__hr} />
              <Header
                title="Job Desc"
                subtitle={activeCareer.jobDesc}
              />
              <Divider className={styles.detail__hr} />
              <Header
                title="Must-Have Skills"
                subtitle={detailCareerContent.skill.description}
              />
              <Point items={activeCareer.skill} />
              <Divider className={styles.detail__hr} />
              <Link href={{pathname:'/career/[title]/[type]/[location]/Apply', query:{title: careerTitle, type: activeType, location: activeLocation}}}>
                <Button title="Apply Now" typeButton="default"/>
              </Link>
            </>
          )
        }{
          activeType !== "" && activeLocation !== "" && !isExistCareer &&(
            <>
              <Header title="" subtitle="Posisi Tidak Tersedia" center={true}/>
            </>
          )
        }
      </div>
    </Layout>
  );
};

export default Detail;
