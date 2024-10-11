import Header from "@commons/Header";
import Layout from "@commons/Layout";
import { getCollabContent, getCollabFilters } from "@internal/get-collab/const";
import styles from "./GetCollab.module.scss";
import Form from "@component/GetCollab/Form";
import { WordingGetCollabQuery } from "query/WordingGetCollabQuery";
import { AddCollab, GetCollabQuery } from "query/GetCollabQuery";
import { useEffect, useState } from "react";
import { category } from "@internal/story/const";

const AboutUs = () => {
  const [isGetCollab, setGetCollab] = useState([]);
  const [isTitle, setTitle] = useState("");
  const [isSubTitle, setSubTitle] = useState("");
  const [listKategoriGetCollab, setListKategoriGetCollab] = useState<Array<{ isActive: boolean; label: string; value: string; }>>([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const getWordingGetCollab = async () => {
    const response = await WordingGetCollabQuery();
    if (response.data) {
      const filterWording = response.data.allWordingGetCollab.edges.filter((edges: any) => {
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
    getWordingGetCollab();
  }, []);


  const getKategoriGetCollab = async () => {
    const response = await GetCollabQuery();
    if (response.data) {
      const kategori = response.data.allKategoriGetCollab.edges.map((edges: { node:any; }) => {
      const { node } = edges;
      return{
        isActive: false,
        label: node.name,
        value: node.kategoriGetCollabId,
      };
      });
      setListKategoriGetCollab(kategori);
    }
  };

  useEffect(() => {
    getKategoriGetCollab();
    // getAddCollab();
  }, []);



  return (
    <Layout navbarColor="light">
      <div className={styles.getCollab}>
        <Header
          title={isTitle}
          subtitle={isSubTitle}
        />
        <Form filters={listKategoriGetCollab}></Form>
      </div>
    </Layout>
  );
};

export default AboutUs;
