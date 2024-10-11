import Header from "@commons/Header";
import Layout from "@commons/Layout";
import styles from "./Apply.module.scss";
import FormApply from "@component/Career/FormApply";
import { useEffect, useState } from "react";
import { getCareerQuery } from "query/CareerQuery";
import Link from "next/link";
import Button from "@commons/Button";

const Apply = () => {
    
    let careerChosen = "";
    let locationChosen = "";
    let typeChosen = "";
    const [careerTitle, setCareerTitle] = useState("")
    const [careerSubtitle, setCareerSubtitle] = useState("")
    const [activeLocation, setActiveLocation] = useState("")
    const [activeType, setActiveType] = useState("")
    const [careerId, setCareerId] = useState(0);
    const [lokasiId, setLokasiId] = useState(0);
    const [tipeId, settipeId] = useState(0);
    const [jobList, setJobList] = useState([]);
    const [isExistCareer, setIsExistCareer] = useState(false)
    

    const getDetailCareer = async () => {
        const response = await getCareerQuery();
        let loaded = false;
        
        if (response.data) {
            const jobLoc: string[] = Array();
            const type: string[] = Array();
            const allData = response.data.allCareer.edges
            .map((edges: { node: any; }) => {
                const { node } = edges;
                const { career } = node;
                if(career?.posisi?.name == careerChosen){
                    setCareerSubtitle(career?.keterangan);
                    setCareerId(career?.posisi?.posisiCareerId);
    
                if(!jobLoc.find(x => x == career?.location.name)){
                    jobLoc.push(career?.location);
                }
    
                if(!type.find(x => x == career?.jobType.name)){
                    type.push(career?.jobType);
                }
                
                return{ 
                    jobLocation : career?.location,
                    jobType : career?.jobType,
                };
            }
        });
        const filtered = allData.filter((item: any)=> item !== undefined);
        for(const key in filtered){
            if(filtered.hasOwnProperty(key)){
                filtered[key].jobLocation = [filtered[key].jobLocation.name, filtered[key].jobLocation.lokasiCareerId as number];
                filtered[key].jobType = [filtered[key].jobType.name, filtered[key].jobType.kategoriCareerId as number];
            }
        }
        setJobList(filtered);
        const isCareer = filtered.find((item: any) => (item.jobLocation[0] == locationChosen) && (item.jobType[0] == typeChosen))
        if(isCareer){
            setIsExistCareer(true)
            loaded = true;
        }else{
            setIsExistCareer(false)
            loaded = true;
        }

        
        };
    };
    
    useEffect(() => {
        const currentPath = window.location.pathname.split('/');
        careerChosen = decodeURIComponent(currentPath[currentPath.indexOf('career')+1]);
        typeChosen = decodeURIComponent(currentPath[currentPath.indexOf('career')+2]);
        locationChosen = decodeURIComponent(currentPath[currentPath.indexOf('career')+3]);
        setCareerTitle(careerChosen);
        setActiveType(typeChosen);
        setActiveLocation(locationChosen);

        const idTipe = jobList.find((item: any) => (item.jobLocation[0] == locationChosen) && (item.jobType[0] == typeChosen))?.jobType[1]
        const idLokasi = jobList.find((item: any) => (item.jobLocation[0] == locationChosen) && (item.jobType[0] == typeChosen))?.jobLocation[1]
        settipeId(idTipe);
        setLokasiId(idLokasi);
    }, [jobList]);

    useEffect(() => {
        getDetailCareer();
    }, []);

    return (
        <Layout navbarColor="light">
            <div className={styles.Apply}>
                <Header
                    title={careerTitle}
                    subtitle={careerSubtitle}
                />
                {isExistCareer && jobList.length > 0 && tipeId !== undefined && lokasiId !== undefined &&
                <FormApply
                activeLocation={activeLocation}
                activeType={activeType}
                posisiId={careerId}
                typeId={tipeId}
                locationId={lokasiId}
                />}
                {
                    !isExistCareer && jobList.length > 0 && 
                    <>
                    <Header title="" subtitle="Lowongan Tidak Tersedia" center={true}/>
                    <Link href={{pathname:'/career/[careerTitle]', query:{careerTitle:careerTitle}}}>
                        <Button className={styles.Apply__buttonBack} title="Kembali" typeButton="outline"/>
                    </Link>
                    </>
                }
            </div>
        </Layout>
    );
};

export default Apply;
