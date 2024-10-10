import { graphUrl } from "configs/public_url";
import axios from "axios";
import Swal from 'sweetalert2';

export const getDetailProductQuery = async (maxLength = '999', withNotif = true) => {
  let headers = {
    "Content-Type": "application/json",
  };

  let queryData = JSON.stringify({  
    query: `query NewQuery {
      allProduct (first: ${maxLength}){
        edges {
          node {
            product {
              nameProduct
              headline1
              subHeadline1
              headline2
              subHeadline2
              linkWebsite
              linkPlaystore
              linkAppstore
              judulGambar
              deskripsiGambar
              headline3
              subHeadline3
              judulCard1
              deskripsiCard1
              judulCard2
              deskripsiCard2
              judulCard3
              deskripsiCard3
              headline4
              subHeadline4
              bannerHeadline1 {
                sourceUrl
                uri
              }
              gambar {
                sourceUrl
                uri
              }
            }
            kategoriProduct {
              edges {
                node {
                  name
                  kategoriProductId
                }
              }
            }
          }
        }
      }
    }`,
    variables: {},
  });

  return await axios({
    url: graphUrl,
    method: "POST",
    headers,
    data: queryData,
  })
    .then((res) => {
      return { status: res.status, ...res.data };
    })
    .catch((error) => {
      if (withNotif) {
        Swal.fire('Gagal !', (error.response && error.response.data && error.response.data.message) ? error.response.data.message : error.toString(), 'error')
        return [];
      }
      console.log(error);
    });
};
