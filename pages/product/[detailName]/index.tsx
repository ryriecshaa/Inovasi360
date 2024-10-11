import styles from "./Detail.module.scss";
import Layout from "@commons/Layout";
import Statistic from "@commons/Statistic";
import DetailComponent from "@component/Home/Detail";
import ListDetail from "@component/Detail/ListDetail";
import { Col, Divider, Image, Row, Space, Typography } from "antd";
import Filter from "@commons/FilterDetail";
import FilterLinkDetail from "@commons/FilterLinkDetail";
import Header from "@commons/Header";
import { detailContent } from "@internal/detail/const";
import ThumbnailCard from "@commons/Card/ThumbnailCard";
import ImageBanner from "@commons/ImageBanner";
import { getDetailProductQuery } from "../../../query/DetailProductQuery";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getProductQuery } from "query/ProductQuery";
import { idText } from "typescript";

const Detail = () => {
    const { asPath, pathname } = useRouter();
    const splitPath = asPath.split("/")

    const [isDetailProduct, setDetailProduct] = useState(initialProduct);
    const [isDetailItemContent, setDetailItemContent] = useState(Array<string>);
    const [isDetailSection, setDetailSection] = useState<Array<{ label: string; value: string; }>>([]);
    const [isDetailLinks, setDetailLinks] = useState(Array<string>);
    const [isNamaProduct, setNamaProduct] = useState<Array<{ id: string; name: string; }>>([]);
    const [moreItemProduct, setMoreItemProducts] = useState<Array<{ title: string; description: string; image: string | null; urlDetail: string | null; }>>([]);


    const getDetailProduct = async () => {
        const response = await getDetailProductQuery('5');
        if (response.data) {
            // ?Setup Detail Product
            const updatedData = response.data.allProduct.edges.filter((edges: any, index: number) => {
                let convertNameProduct = edges?.node?.product?.nameProduct?.replaceAll(/\s/g, '')
                if (splitPath[2] !== '[detailName]') {
                    return convertNameProduct == splitPath[2];
                }
            });

            setDetailProduct(updatedData[0]?.node?.product);

            let links = [
                updatedData[0]?.node?.product.linkWebsite,
                updatedData[0]?.node?.product.linkPlaystore,
                updatedData[0]?.node?.product.linkAppstore
            ]

            setDetailLinks(links);

            //  ?Setup Category Item
            const listDetailSectionContent: Array<{ label: string; value: string }> = [];
            listDetailSectionContent.push({
                label: updatedData[0]?.node?.kategoriProduct?.edges[0].node?.name,
                value: updatedData[0]?.node?.kategoriProduct?.edges[0].node?.kategoriProductId
            });
            setDetailSection(listDetailSectionContent);
            //

            // ?Setup All Name Products
            const product = response.data.allProduct.edges;
            let listDetailItem: Array<string> = [];
            let nameProductItem = "";
            product.map((item: any) => {
                nameProductItem = item.node.product.nameProduct;
                listDetailItem.push(nameProductItem);
            })
            setDetailItemContent(listDetailItem);
            //
        }
    };
    useEffect(() => {
        if (splitPath[2] !== '[detailName]') {
            getDetailProduct();
        }
    }, [splitPath[2]]);

    const getAllProduct = async () => {
        const response = await getProductQuery();
        if (response.data) {
            const headlineProducts: Array<{ title: string, description: string, image: string | null, urlDetail: string | null }> = [];
            const namaProduct = response.data.allProduct.edges.map((edges: any, index: number) => {
                const { node } = edges;
                const { product, productId } = node;

                headlineProducts?.push({
                    title: product?.headline1,
                    description: product?.subHeadline1,
                    image: product?.bannerHeadline1?.sourceUrl,
                    urlDetail: product.nameProduct ? product.nameProduct.replaceAll(/\s/g, '') : "",
                })

                return {
                    id: productId,
                    name: product.nameProduct,
                };
            });
            setNamaProduct(namaProduct);
            setMoreItemProducts(headlineProducts.slice(0, 4))
        };
    };

    useEffect(() => {
        getAllProduct();
    }, []);

    const filteredMoreItemProduct = moreItemProduct.filter((item) => {
        const itemNameProduct = item.urlDetail
            ? item.urlDetail.substring(item.urlDetail.lastIndexOf('/') + 1)
            : '';
        const detailProductName = isDetailProduct?.nameProduct?.replaceAll(/\s/g, '');
        return itemNameProduct !== detailProductName;
    });


    return (
        <Layout navbarColor="light">
            <ListDetail itemDetail={isDetailItemContent} selectedKategori={isDetailProduct?.nameProduct?.replaceAll(/\s/g, '')} />
            <div className={styles.detail__sectionContent}>
                <div className={styles.detail__sectionContent__listLabel}>
                    <Space size={24}>
                        {isDetailSection.map((item: any, index) => {
                            return (
                                <Filter
                                    key={index}
                                    label={item.label}
                                    value={item.value}
                                    isActive={false}
                                />
                            );
                        })}
                    </Space>
                </div>
                <Header
                    title={isDetailProduct?.headline1 ?? ""}
                    subtitle={isDetailProduct?.subHeadline1 ?? ""} // contoh penggunaan nya, bisa di console.log ya data nya
                />
            </div>
            <ImageBanner title={isDetailProduct?.title} image={isDetailProduct?.bannerHeadline1.sourceUrl ?? ""} />
            <div className={styles.detail__sectionContent}>
                <Header
                    title={isDetailProduct?.headline2 ?? ""}
                    subtitle={isDetailProduct?.subHeadline2 ?? ""}
                />
                <div className={styles.detail__sectionContent__listLabel}>
                    <Space size={10}>
                        {detailContent.platform.map((item, index) => {
                            const link = isDetailLinks[index];
                            if (link && link !== 'null') {
                                return (
                                    <Link key={index} href={link} target="_blank">
                                        <FilterLinkDetail
                                            key={index}
                                            label={item.title}
                                            value={item.type}
                                            isActive={false}
                                        />
                                    </Link>
                                );
                            }
                            return null;
                        })}
                    </Space>
                </div>

            </div>
            <Divider className={styles.detail__hr} />
            <div className={styles.detail__thumbnail}>
                            <ThumbnailCard
                                image={isDetailProduct?.gambar?.sourceUrl ?? ""}
                                title={isDetailProduct?.judulGambar ?? ""}
                                subtitle={isDetailProduct?.deskripsiGambar ?? ""}
                            />
            </div>
            <Statistic
                title={isDetailProduct?.headline3 ?? ""}
                subtitle={isDetailProduct?.subHeadline3 ?? ""}
                metrics={[
                    {
                        title: `${isDetailProduct?.judulCard1}`,
                        subtitle: `${isDetailProduct?.deskripsiCard1}`,
                        image: "/assets/smile.png",
                    },
                    {
                        title: `${isDetailProduct?.judulCard2}`,
                        subtitle: `${isDetailProduct?.deskripsiCard2}`,
                        image: "/assets/chat.png",
                    },
                    {
                        title: `${isDetailProduct?.judulCard3}`,
                        subtitle: `${isDetailProduct?.deskripsiCard3}`,
                        image: "/assets/chat.png",
                    },
                ]}
                textAlign="left"
                getCollabStyle="default"
            />
            <div className={styles.detail__detailSection}>
                <DetailComponent
                    title={isDetailProduct?.headline4 ?? ""}
                    subtitle={isDetailProduct?.subHeadline4 ?? ""}
                    buttonName="More Product"
                    urlDetail='/product'
                    itemDetail={filteredMoreItemProduct.slice(0, 4).map((item: any) => ({
                        title: item.name,
                        description: item.description,
                        image: item.image,
                        urlDetail: item.urlDetail,
                    }))}
                />
            </div>
        </Layout>
    );
};

let initialProduct: any = {
    bannerHeadline1: {},
    deskripsiCard1: "",
    deskripsiCard2: "",
    deskripsiCard3: "",
    deskripsiGambar: "",
    gambar: {},
    headline1: "",
    headline2: "",
    headline3: "",
    headline4: "",
    judulCard1: "",
    judulCard2: "",
    judulCard3: "",
    judulGambar: "",
    linkAppstore: "",
    linkPlaystore: "",
    linkWebsite: "",
    nameProduct: "",
    subHeadline1: "",
    subHeadline2: "",
    subHeadline3: "",
    subHeadline4: "",
}
export default Detail;
